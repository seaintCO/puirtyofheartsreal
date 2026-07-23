-- PurityOS, consultation booking, shop waitlist, and safe profile updates.
-- This migration is additive and does not modify course curriculum or progress data.

create table if not exists public.purityos_subscriptions (
    user_id uuid primary key references auth.users(id) on delete cascade,
    stripe_customer_id text,
    stripe_subscription_id text unique,
    status text not null default 'inactive'
        check (status in (
            'inactive',
            'trialing',
            'active',
            'past_due',
            'unpaid',
            'paused',
            'canceled',
            'incomplete',
            'incomplete_expired'
        )),
    current_period_end timestamptz,
    cancel_at_period_end boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists purityos_subscriptions_customer_index
on public.purityos_subscriptions(stripe_customer_id)
where stripe_customer_id is not null;

create table if not exists public.purityos_conversations (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    title text not null default 'New conversation',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists purityos_conversations_user_updated_index
on public.purityos_conversations(user_id, updated_at desc);

create table if not exists public.purityos_messages (
    id uuid primary key default gen_random_uuid(),
    conversation_id uuid not null
        references public.purityos_conversations(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    role text not null check (role in ('user', 'assistant')),
    content text not null check (char_length(content) between 1 and 12000),
    created_at timestamptz not null default now()
);

create index if not exists purityos_messages_conversation_created_index
on public.purityos_messages(conversation_id, created_at);

create table if not exists public.purityos_daily_usage (
    user_id uuid not null references auth.users(id) on delete cascade,
    usage_date date not null default current_date,
    message_count integer not null default 0 check (message_count >= 0),
    updated_at timestamptz not null default now(),
    primary key (user_id, usage_date)
);

create table if not exists public.consultation_requests (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete set null,
    name text not null,
    email text not null,
    phone text,
    topic text not null,
    preferred_date date,
    preferred_time text,
    message text,
    status text not null default 'new'
        check (status in ('new', 'contacted', 'scheduled', 'completed', 'declined')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists consultation_requests_status_created_index
on public.consultation_requests(status, created_at desc);

create table if not exists public.product_waitlist (
    id uuid primary key default gen_random_uuid(),
    email text not null,
    product_slug text not null,
    created_at timestamptz not null default now(),
    unique(email, product_slug)
);

create table if not exists public.newsletter_subscribers (
    id uuid primary key default gen_random_uuid(),
    email text not null unique,
    status text not null default 'subscribed'
        check (status in ('subscribed', 'unsubscribed')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

drop trigger if exists purityos_subscriptions_set_updated_at
on public.purityos_subscriptions;
create trigger purityos_subscriptions_set_updated_at
before update on public.purityos_subscriptions
for each row execute function public.set_updated_at();

drop trigger if exists purityos_conversations_set_updated_at
on public.purityos_conversations;
create trigger purityos_conversations_set_updated_at
before update on public.purityos_conversations
for each row execute function public.set_updated_at();

drop trigger if exists consultation_requests_set_updated_at
on public.consultation_requests;
create trigger consultation_requests_set_updated_at
before update on public.consultation_requests
for each row execute function public.set_updated_at();

drop trigger if exists newsletter_subscribers_set_updated_at
on public.newsletter_subscribers;
create trigger newsletter_subscribers_set_updated_at
before update on public.newsletter_subscribers
for each row execute function public.set_updated_at();

create or replace function public.has_purityos_access()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select
        public.is_admin()
        or exists (
            select 1
            from public.purityos_subscriptions
            where user_id = auth.uid()
              and status in ('trialing', 'active')
        );
$$;

revoke all on function public.has_purityos_access() from public;
grant execute on function public.has_purityos_access() to authenticated;

create or replace function public.consume_purityos_message()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
    next_count integer;
begin
    if auth.uid() is null or not public.has_purityos_access() then
        raise exception 'PurityOS subscription required';
    end if;

    insert into public.purityos_daily_usage (
        user_id,
        usage_date,
        message_count,
        updated_at
    )
    values (auth.uid(), current_date, 1, now())
    on conflict (user_id, usage_date)
    do update set
        message_count = public.purityos_daily_usage.message_count + 1,
        updated_at = now()
    where public.purityos_daily_usage.message_count < 30
    returning message_count into next_count;

    if next_count is null then
        raise exception 'Daily PurityOS message limit reached';
    end if;

    return next_count;
end;
$$;

revoke all on function public.consume_purityos_message() from public;
grant execute on function public.consume_purityos_message() to authenticated;

create or replace function public.update_my_profile(
    new_full_name text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    if auth.uid() is null then
        raise exception 'Authentication required';
    end if;

    update public.profiles
    set full_name = left(trim(coalesce(new_full_name, '')), 120),
        updated_at = now()
    where id = auth.uid();
end;
$$;

revoke all on function public.update_my_profile(text) from public;
grant execute on function public.update_my_profile(text) to authenticated;

create or replace function public.issue_my_certificate()
returns public.certificates
language plpgsql
security definer
set search_path = public
as $$
declare
    completed_lessons integer;
    issued public.certificates;
begin
    if auth.uid() is null then
        raise exception 'Authentication required';
    end if;

    select count(distinct lesson_id)
    into completed_lessons
    from public.lesson_progress
    where user_id = auth.uid()
      and course_id = 'purity-main'
      and completed = true;

    if completed_lessons < 24 then
        raise exception 'Complete all lessons before issuing a certificate';
    end if;

    insert into public.certificates (
        user_id,
        course_id,
        certificate_number
    )
    values (
        auth.uid(),
        'purity-main',
        'POH-' || extract(year from now())::text || '-' ||
        upper(substring(md5(auth.uid()::text) from 1 for 8))
    )
    on conflict (user_id, course_id)
    do update set user_id = excluded.user_id
    returning * into issued;

    return issued;
end;
$$;

revoke all on function public.issue_my_certificate() from public;
grant execute on function public.issue_my_certificate() to authenticated;

alter table public.purityos_subscriptions enable row level security;
alter table public.purityos_conversations enable row level security;
alter table public.purityos_messages enable row level security;
alter table public.purityos_daily_usage enable row level security;
alter table public.consultation_requests enable row level security;
alter table public.product_waitlist enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "Users view own PurityOS subscription"
on public.purityos_subscriptions
for select to authenticated
using (auth.uid() = user_id or public.is_admin());

create policy "Users manage own PurityOS conversations"
on public.purityos_conversations
for all to authenticated
using (auth.uid() = user_id and public.has_purityos_access())
with check (auth.uid() = user_id and public.has_purityos_access());

create policy "Users view own PurityOS messages"
on public.purityos_messages
for select to authenticated
using (
    auth.uid() = user_id
    and exists (
        select 1
        from public.purityos_conversations
        where purityos_conversations.id = conversation_id
          and purityos_conversations.user_id = auth.uid()
    )
);

create policy "Users create own PurityOS messages"
on public.purityos_messages
for insert to authenticated
with check (
    auth.uid() = user_id
    and public.has_purityos_access()
    and exists (
        select 1
        from public.purityos_conversations
        where purityos_conversations.id = conversation_id
          and purityos_conversations.user_id = auth.uid()
    )
);

create policy "Users view own PurityOS usage"
on public.purityos_daily_usage
for select to authenticated
using (auth.uid() = user_id);

create policy "Admins view consultations"
on public.consultation_requests
for select to authenticated
using (public.is_admin());

create policy "Admins update consultations"
on public.consultation_requests
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins view product waitlist"
on public.product_waitlist
for select to authenticated
using (public.is_admin());

create policy "Admins view newsletter subscribers"
on public.newsletter_subscribers
for select to authenticated
using (public.is_admin());
