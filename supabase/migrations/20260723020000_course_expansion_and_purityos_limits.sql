-- Align certificate completion with the expanded curriculum and add a monthly
-- PurityOS ceiling in addition to the existing daily limit.

create table if not exists public.course_requirements (
    course_id text primary key,
    required_lessons integer not null check (required_lessons > 0),
    updated_at timestamptz not null default now()
);

insert into public.course_requirements (course_id, required_lessons, updated_at)
values ('purity-main', 32, now())
on conflict (course_id)
do update set
    required_lessons = excluded.required_lessons,
    updated_at = excluded.updated_at;

create table if not exists public.purityos_monthly_usage (
    user_id uuid not null references auth.users(id) on delete cascade,
    usage_month date not null,
    message_count integer not null default 0 check (message_count >= 0),
    updated_at timestamptz not null default now(),
    primary key (user_id, usage_month)
);

alter table public.course_requirements enable row level security;
alter table public.purityos_monthly_usage enable row level security;

drop policy if exists "Members view course requirements"
on public.course_requirements;
create policy "Members view course requirements"
on public.course_requirements
for select to authenticated
using (true);

drop policy if exists "Users view own PurityOS monthly usage"
on public.purityos_monthly_usage;
create policy "Users view own PurityOS monthly usage"
on public.purityos_monthly_usage
for select to authenticated
using (auth.uid() = user_id);

create or replace function public.consume_purityos_message()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
    next_daily_count integer;
    next_monthly_count integer;
    current_month date := date_trunc('month', current_date)::date;
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
    returning message_count into next_daily_count;

    if next_daily_count is null then
        raise exception 'Daily PurityOS message limit reached';
    end if;

    insert into public.purityos_monthly_usage (
        user_id,
        usage_month,
        message_count,
        updated_at
    )
    values (auth.uid(), current_month, 1, now())
    on conflict (user_id, usage_month)
    do update set
        message_count = public.purityos_monthly_usage.message_count + 1,
        updated_at = now()
    where public.purityos_monthly_usage.message_count < 500
    returning message_count into next_monthly_count;

    if next_monthly_count is null then
        raise exception 'Monthly PurityOS message limit reached';
    end if;

    return next_daily_count;
end;
$$;

revoke all on function public.consume_purityos_message() from public;
grant execute on function public.consume_purityos_message() to authenticated;

create or replace function public.issue_my_certificate()
returns public.certificates
language plpgsql
security definer
set search_path = public
as $$
declare
    completed_lessons integer;
    lessons_required integer;
    issued public.certificates;
begin
    if auth.uid() is null then
        raise exception 'Authentication required';
    end if;

    select required_lessons
    into lessons_required
    from public.course_requirements
    where course_id = 'purity-main';

    if lessons_required is null then
        raise exception 'Course requirement is not configured';
    end if;

    select count(distinct lesson_id)
    into completed_lessons
    from public.lesson_progress
    where user_id = auth.uid()
      and course_id = 'purity-main'
      and completed = true;

    if completed_lessons < lessons_required then
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
