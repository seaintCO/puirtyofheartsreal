create extension if not exists pgcrypto;

-- ============================================================
-- PROFILES
-- ============================================================

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade
);

alter table public.profiles
    add column if not exists email text;

alter table public.profiles
    add column if not exists full_name text;

alter table public.profiles
    add column if not exists avatar_url text;

alter table public.profiles
    add column if not exists role text;

alter table public.profiles
    add column if not exists paid boolean;

alter table public.profiles
    add column if not exists stripe_customer_id text;

alter table public.profiles
    add column if not exists stripe_checkout_session_id text;

alter table public.profiles
    add column if not exists stripe_payment_intent_id text;

alter table public.profiles
    add column if not exists paid_at timestamptz;

alter table public.profiles
    add column if not exists created_at timestamptz;

alter table public.profiles
    add column if not exists updated_at timestamptz;

update public.profiles
set role = 'student'
where role is null;

update public.profiles
set paid = false
where paid is null;

update public.profiles
set created_at = now()
where created_at is null;

update public.profiles
set updated_at = now()
where updated_at is null;

alter table public.profiles
    alter column role set default 'student';

alter table public.profiles
    alter column role set not null;

alter table public.profiles
    alter column paid set default false;

alter table public.profiles
    alter column paid set not null;

alter table public.profiles
    alter column created_at set default now();

alter table public.profiles
    alter column created_at set not null;

alter table public.profiles
    alter column updated_at set default now();

alter table public.profiles
    alter column updated_at set not null;

create unique index if not exists profiles_stripe_customer_id_unique
on public.profiles(stripe_customer_id)
where stripe_customer_id is not null;

-- ============================================================
-- LESSON PROGRESS
-- ============================================================

create table if not exists public.lesson_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    lesson_id text not null
);

alter table public.lesson_progress
    add column if not exists course_id text;

alter table public.lesson_progress
    add column if not exists completed boolean;

alter table public.lesson_progress
    add column if not exists progress_percent integer;

alter table public.lesson_progress
    add column if not exists video_position_seconds integer;

alter table public.lesson_progress
    add column if not exists started_at timestamptz;

alter table public.lesson_progress
    add column if not exists completed_at timestamptz;

alter table public.lesson_progress
    add column if not exists last_viewed_at timestamptz;

alter table public.lesson_progress
    add column if not exists created_at timestamptz;

alter table public.lesson_progress
    add column if not exists updated_at timestamptz;

update public.lesson_progress
set course_id = 'purity-main'
where course_id is null;

update public.lesson_progress
set completed = false
where completed is null;

update public.lesson_progress
set progress_percent =
    case when completed = true then 100 else 0 end
where progress_percent is null;

update public.lesson_progress
set video_position_seconds = 0
where video_position_seconds is null;

update public.lesson_progress
set last_viewed_at = now()
where last_viewed_at is null;

update public.lesson_progress
set created_at = now()
where created_at is null;

update public.lesson_progress
set updated_at = now()
where updated_at is null;

alter table public.lesson_progress
    alter column course_id set default 'purity-main';

alter table public.lesson_progress
    alter column course_id set not null;

alter table public.lesson_progress
    alter column completed set default false;

alter table public.lesson_progress
    alter column completed set not null;

alter table public.lesson_progress
    alter column progress_percent set default 0;

alter table public.lesson_progress
    alter column progress_percent set not null;

alter table public.lesson_progress
    alter column video_position_seconds set default 0;

alter table public.lesson_progress
    alter column video_position_seconds set not null;

alter table public.lesson_progress
    alter column last_viewed_at set default now();

alter table public.lesson_progress
    alter column last_viewed_at set not null;

alter table public.lesson_progress
    alter column created_at set default now();

alter table public.lesson_progress
    alter column created_at set not null;

alter table public.lesson_progress
    alter column updated_at set default now();

alter table public.lesson_progress
    alter column updated_at set not null;

create index if not exists lesson_progress_user_course_index
on public.lesson_progress(user_id, course_id);

create index if not exists lesson_progress_last_viewed_index
on public.lesson_progress(user_id, last_viewed_at desc);

-- ============================================================
-- LESSON NOTES
-- ============================================================

create table if not exists public.lesson_notes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    lesson_id text not null
);

alter table public.lesson_notes
    add column if not exists course_id text;

alter table public.lesson_notes
    add column if not exists content text;

alter table public.lesson_notes
    add column if not exists created_at timestamptz;

alter table public.lesson_notes
    add column if not exists updated_at timestamptz;

update public.lesson_notes
set course_id = 'purity-main'
where course_id is null;

update public.lesson_notes
set content = ''
where content is null;

update public.lesson_notes
set created_at = now()
where created_at is null;

update public.lesson_notes
set updated_at = now()
where updated_at is null;

alter table public.lesson_notes
    alter column course_id set default 'purity-main';

alter table public.lesson_notes
    alter column course_id set not null;

alter table public.lesson_notes
    alter column content set default '';

alter table public.lesson_notes
    alter column content set not null;

alter table public.lesson_notes
    alter column created_at set default now();

alter table public.lesson_notes
    alter column created_at set not null;

alter table public.lesson_notes
    alter column updated_at set default now();

alter table public.lesson_notes
    alter column updated_at set not null;

create index if not exists lesson_notes_user_course_index
on public.lesson_notes(user_id, course_id);

-- ============================================================
-- QUIZ ATTEMPTS
-- ============================================================

create table if not exists public.quiz_attempts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    lesson_id text not null
);

alter table public.quiz_attempts
    add column if not exists course_id text;

alter table public.quiz_attempts
    add column if not exists quiz_id text;

alter table public.quiz_attempts
    add column if not exists score integer;

alter table public.quiz_attempts
    add column if not exists total_questions integer;

alter table public.quiz_attempts
    add column if not exists answers jsonb;

alter table public.quiz_attempts
    add column if not exists passed boolean;

alter table public.quiz_attempts
    add column if not exists completed_at timestamptz;

alter table public.quiz_attempts
    add column if not exists created_at timestamptz;

update public.quiz_attempts
set course_id = 'purity-main'
where course_id is null;

update public.quiz_attempts
set quiz_id = lesson_id
where quiz_id is null;

update public.quiz_attempts
set score = 0
where score is null;

update public.quiz_attempts
set total_questions = 0
where total_questions is null;

update public.quiz_attempts
set answers = '{}'::jsonb
where answers is null;

update public.quiz_attempts
set passed =
    case
        when total_questions > 0
        then ((score::numeric / total_questions::numeric) * 100) >= 80
        else false
    end
where passed is null;

update public.quiz_attempts
set completed_at = now()
where completed_at is null;

update public.quiz_attempts
set created_at = now()
where created_at is null;

alter table public.quiz_attempts
    alter column course_id set default 'purity-main';

alter table public.quiz_attempts
    alter column course_id set not null;

alter table public.quiz_attempts
    alter column quiz_id set default 'general';

alter table public.quiz_attempts
    alter column quiz_id set not null;

alter table public.quiz_attempts
    alter column score set default 0;

alter table public.quiz_attempts
    alter column score set not null;

alter table public.quiz_attempts
    alter column total_questions set default 0;

alter table public.quiz_attempts
    alter column total_questions set not null;

alter table public.quiz_attempts
    alter column answers set default '{}'::jsonb;

alter table public.quiz_attempts
    alter column answers set not null;

alter table public.quiz_attempts
    alter column passed set default false;

alter table public.quiz_attempts
    alter column passed set not null;

alter table public.quiz_attempts
    alter column completed_at set default now();

alter table public.quiz_attempts
    alter column completed_at set not null;

alter table public.quiz_attempts
    alter column created_at set default now();

alter table public.quiz_attempts
    alter column created_at set not null;

create index if not exists quiz_attempts_user_course_index
on public.quiz_attempts(user_id, course_id);

create index if not exists quiz_attempts_user_quiz_index
on public.quiz_attempts(user_id, quiz_id);

-- ============================================================
-- PRIVATE JOURNALS
-- ============================================================

create table if not exists public.journal_entries (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    course_id text default 'purity-main',
    lesson_id text,
    title text not null default 'Journal Entry',
    content text not null default '',
    prompt text,
    mood text,
    entry_date date not null default current_date,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.journal_entries
    add column if not exists user_id uuid references auth.users(id) on delete cascade;

alter table public.journal_entries
    add column if not exists course_id text;

alter table public.journal_entries
    add column if not exists lesson_id text;

alter table public.journal_entries
    add column if not exists title text;

alter table public.journal_entries
    add column if not exists content text;

alter table public.journal_entries
    add column if not exists prompt text;

alter table public.journal_entries
    add column if not exists mood text;

alter table public.journal_entries
    add column if not exists entry_date date;

alter table public.journal_entries
    add column if not exists created_at timestamptz;

alter table public.journal_entries
    add column if not exists updated_at timestamptz;

update public.journal_entries
set course_id = 'purity-main'
where course_id is null;

update public.journal_entries
set title = 'Journal Entry'
where title is null;

update public.journal_entries
set content = ''
where content is null;

update public.journal_entries
set entry_date = current_date
where entry_date is null;

update public.journal_entries
set created_at = now()
where created_at is null;

update public.journal_entries
set updated_at = now()
where updated_at is null;

alter table public.journal_entries
    alter column course_id set default 'purity-main';

alter table public.journal_entries
    alter column title set default 'Journal Entry';

alter table public.journal_entries
    alter column title set not null;

alter table public.journal_entries
    alter column content set default '';

alter table public.journal_entries
    alter column content set not null;

alter table public.journal_entries
    alter column entry_date set default current_date;

alter table public.journal_entries
    alter column entry_date set not null;

alter table public.journal_entries
    alter column created_at set default now();

alter table public.journal_entries
    alter column created_at set not null;

alter table public.journal_entries
    alter column updated_at set default now();

alter table public.journal_entries
    alter column updated_at set not null;

create index if not exists journal_entries_user_date_index
on public.journal_entries(user_id, entry_date desc);

create index if not exists journal_entries_user_updated_index
on public.journal_entries(user_id, updated_at desc);

-- ============================================================
-- SAVED FLASHCARDS
-- ============================================================

create table if not exists public.saved_flashcards (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    course_id text not null default 'purity-main',
    lesson_id text,
    flashcard_id text not null,
    mastered boolean not null default false,
    review_count integer not null default 0,
    last_reviewed_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique(user_id, course_id, flashcard_id)
);

create index if not exists saved_flashcards_user_course_index
on public.saved_flashcards(user_id, course_id);

-- ============================================================
-- CERTIFICATES
-- ============================================================

create table if not exists public.certificates (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    course_id text not null default 'purity-main',
    certificate_number text not null unique,
    issued_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    unique(user_id, course_id)
);

create index if not exists certificates_user_index
on public.certificates(user_id);

-- ============================================================
-- RESOURCE VAULT
-- ============================================================

create table if not exists public.vault_resources (
    id uuid primary key default gen_random_uuid()
);

alter table public.vault_resources
    add column if not exists title text;

alter table public.vault_resources
    add column if not exists description text;

alter table public.vault_resources
    add column if not exists category text;

alter table public.vault_resources
    add column if not exists resource_type text;

alter table public.vault_resources
    add column if not exists storage_path text;

alter table public.vault_resources
    add column if not exists external_url text;

alter table public.vault_resources
    add column if not exists filename text;

alter table public.vault_resources
    add column if not exists mime_type text;

alter table public.vault_resources
    add column if not exists file_size bigint;

alter table public.vault_resources
    add column if not exists duration text;

alter table public.vault_resources
    add column if not exists featured boolean;

alter table public.vault_resources
    add column if not exists published boolean;

alter table public.vault_resources
    add column if not exists sort_order integer;

alter table public.vault_resources
    add column if not exists download_count integer;

alter table public.vault_resources
    add column if not exists created_by uuid references auth.users(id) on delete set null;

alter table public.vault_resources
    add column if not exists created_at timestamptz;

alter table public.vault_resources
    add column if not exists updated_at timestamptz;

update public.vault_resources
set title = 'Untitled Resource'
where title is null;

update public.vault_resources
set category = 'general'
where category is null;

update public.vault_resources
set resource_type = 'file'
where resource_type is null;

update public.vault_resources
set featured = false
where featured is null;

update public.vault_resources
set published = false
where published is null;

update public.vault_resources
set sort_order = 0
where sort_order is null;

update public.vault_resources
set download_count = 0
where download_count is null;

update public.vault_resources
set created_at = now()
where created_at is null;

update public.vault_resources
set updated_at = now()
where updated_at is null;

alter table public.vault_resources
    alter column title set not null;

alter table public.vault_resources
    alter column category set default 'general';

alter table public.vault_resources
    alter column category set not null;

alter table public.vault_resources
    alter column resource_type set default 'file';

alter table public.vault_resources
    alter column resource_type set not null;

alter table public.vault_resources
    alter column featured set default false;

alter table public.vault_resources
    alter column featured set not null;

alter table public.vault_resources
    alter column published set default false;

alter table public.vault_resources
    alter column published set not null;

alter table public.vault_resources
    alter column sort_order set default 0;

alter table public.vault_resources
    alter column sort_order set not null;

alter table public.vault_resources
    alter column download_count set default 0;

alter table public.vault_resources
    alter column download_count set not null;

alter table public.vault_resources
    alter column created_at set default now();

alter table public.vault_resources
    alter column created_at set not null;

alter table public.vault_resources
    alter column updated_at set default now();

alter table public.vault_resources
    alter column updated_at set not null;

create index if not exists vault_resources_published_index
on public.vault_resources(published, sort_order, created_at desc);

-- ============================================================
-- UPDATED_AT FUNCTION AND TRIGGERS
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists profiles_set_updated_at
on public.profiles;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists lesson_progress_set_updated_at
on public.lesson_progress;

create trigger lesson_progress_set_updated_at
before update on public.lesson_progress
for each row
execute function public.set_updated_at();

drop trigger if exists lesson_notes_set_updated_at
on public.lesson_notes;

create trigger lesson_notes_set_updated_at
before update on public.lesson_notes
for each row
execute function public.set_updated_at();

drop trigger if exists journal_entries_set_updated_at
on public.journal_entries;

create trigger journal_entries_set_updated_at
before update on public.journal_entries
for each row
execute function public.set_updated_at();

drop trigger if exists saved_flashcards_set_updated_at
on public.saved_flashcards;

create trigger saved_flashcards_set_updated_at
before update on public.saved_flashcards
for each row
execute function public.set_updated_at();

drop trigger if exists vault_resources_set_updated_at
on public.vault_resources;

create trigger vault_resources_set_updated_at
before update on public.vault_resources
for each row
execute function public.set_updated_at();

-- ============================================================
-- AUTOMATIC PROFILE CREATION
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (
        id,
        email,
        full_name,
        role,
        paid
    )
    values (
        new.id,
        new.email,
        coalesce(
            new.raw_user_meta_data ->> 'full_name',
            new.raw_user_meta_data ->> 'name',
            ''
        ),
        'student',
        false
    )
    on conflict (id) do update
    set
        email = excluded.email,
        full_name = case
            when excluded.full_name <> ''
            then excluded.full_name
            else public.profiles.full_name
        end,
        updated_at = now();

    return new;
end;
$$;

drop trigger if exists on_auth_user_created
on auth.users;

create trigger on_auth_user_created
after insert or update of email, raw_user_meta_data
on auth.users
for each row
execute function public.handle_new_user();

insert into public.profiles (
    id,
    email,
    full_name,
    role,
    paid
)
select
    users.id,
    users.email,
    coalesce(
        users.raw_user_meta_data ->> 'full_name',
        users.raw_user_meta_data ->> 'name',
        ''
    ),
    'student',
    false
from auth.users as users
on conflict (id) do update
set
    email = excluded.email,
    full_name = case
        when excluded.full_name <> ''
        then excluded.full_name
        else public.profiles.full_name
    end,
    updated_at = now();

-- ============================================================
-- ADMIN CHECK
-- ============================================================

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (
        select 1
        from public.profiles
        where id = auth.uid()
          and role = 'admin'
    );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.lesson_notes enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.journal_entries enable row level security;
alter table public.saved_flashcards enable row level security;
alter table public.certificates enable row level security;
alter table public.vault_resources enable row level security;

-- Remove unsafe old profile update policy.

drop policy if exists "Users can update own basic profile"
on public.profiles;

drop policy if exists "Users can update their own safe profile fields"
on public.profiles;

drop policy if exists "Users can view own profile"
on public.profiles;

drop policy if exists "Users can view their own profile"
on public.profiles;

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (
    auth.uid() = id
    or public.is_admin()
);

-- Progress

drop policy if exists "Users manage own progress"
on public.lesson_progress;

drop policy if exists "Users can view their own progress"
on public.lesson_progress;

drop policy if exists "Users can create their own progress"
on public.lesson_progress;

drop policy if exists "Users can update their own progress"
on public.lesson_progress;

drop policy if exists "Users can delete their own progress"
on public.lesson_progress;

create policy "Users can view their own progress"
on public.lesson_progress
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own progress"
on public.lesson_progress
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own progress"
on public.lesson_progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own progress"
on public.lesson_progress
for delete
to authenticated
using (auth.uid() = user_id);

-- Notes

drop policy if exists "Users manage own notes"
on public.lesson_notes;

drop policy if exists "Users can view their own lesson notes"
on public.lesson_notes;

drop policy if exists "Users can create their own lesson notes"
on public.lesson_notes;

drop policy if exists "Users can update their own lesson notes"
on public.lesson_notes;

drop policy if exists "Users can delete their own lesson notes"
on public.lesson_notes;

create policy "Users can view their own lesson notes"
on public.lesson_notes
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own lesson notes"
on public.lesson_notes
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own lesson notes"
on public.lesson_notes
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own lesson notes"
on public.lesson_notes
for delete
to authenticated
using (auth.uid() = user_id);

-- Quiz attempts

drop policy if exists "Users manage own quiz attempts"
on public.quiz_attempts;

drop policy if exists "Users can view their own quiz attempts"
on public.quiz_attempts;

drop policy if exists "Users can create their own quiz attempts"
on public.quiz_attempts;

drop policy if exists "Users can delete their own quiz attempts"
on public.quiz_attempts;

create policy "Users can view their own quiz attempts"
on public.quiz_attempts
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own quiz attempts"
on public.quiz_attempts
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their own quiz attempts"
on public.quiz_attempts
for delete
to authenticated
using (auth.uid() = user_id);

-- Journals

drop policy if exists "Users can view their own journals"
on public.journal_entries;

drop policy if exists "Users can create their own journals"
on public.journal_entries;

drop policy if exists "Users can update their own journals"
on public.journal_entries;

drop policy if exists "Users can delete their own journals"
on public.journal_entries;

create policy "Users can view their own journals"
on public.journal_entries
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own journals"
on public.journal_entries
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own journals"
on public.journal_entries
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own journals"
on public.journal_entries
for delete
to authenticated
using (auth.uid() = user_id);

-- Flashcards

drop policy if exists "Users can view their own flashcards"
on public.saved_flashcards;

drop policy if exists "Users can create their own flashcards"
on public.saved_flashcards;

drop policy if exists "Users can update their own flashcards"
on public.saved_flashcards;

drop policy if exists "Users can delete their own flashcards"
on public.saved_flashcards;

create policy "Users can view their own flashcards"
on public.saved_flashcards
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own flashcards"
on public.saved_flashcards
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own flashcards"
on public.saved_flashcards
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own flashcards"
on public.saved_flashcards
for delete
to authenticated
using (auth.uid() = user_id);

-- Certificates

drop policy if exists "Users can view their own certificates"
on public.certificates;

drop policy if exists "Admins can manage certificates"
on public.certificates;

create policy "Users can view their own certificates"
on public.certificates
for select
to authenticated
using (
    auth.uid() = user_id
    or public.is_admin()
);

create policy "Admins can manage certificates"
on public.certificates
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Resource Vault

drop policy if exists "Paid users can view published resources"
on public.vault_resources;

drop policy if exists "Admins can manage resources"
on public.vault_resources;

create policy "Paid users can view published resources"
on public.vault_resources
for select
to authenticated
using (
    public.is_admin()
    or (
        published = true
        and exists (
            select 1
            from public.profiles
            where profiles.id = auth.uid()
              and profiles.paid = true
        )
    )
);

create policy "Admins can manage resources"
on public.vault_resources
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ============================================================
-- DOWNLOAD COUNTER
-- ============================================================

create or replace function public.increment_resource_download(
    resource_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    if not exists (
        select 1
        from public.profiles
        where id = auth.uid()
          and (
              paid = true
              or role = 'admin'
          )
    ) then
        raise exception 'Paid access required';
    end if;

    update public.vault_resources
    set download_count = download_count + 1
    where id = resource_id
      and published = true;
end;
$$;

revoke all
on function public.increment_resource_download(uuid)
from public;

grant execute
on function public.increment_resource_download(uuid)
to authenticated;

-- ============================================================
-- STORAGE BUCKET
-- ============================================================

insert into storage.buckets (
    id,
    name,
    public,
    file_size_limit
)
values (
    'resource-vault',
    'resource-vault',
    false,
    52428800
)
on conflict (id) do update
set
    public = false,
    file_size_limit = 52428800;

drop policy if exists "Admins can upload vault resources"
on storage.objects;

drop policy if exists "Admins can update vault resources"
on storage.objects;

drop policy if exists "Admins can delete vault resources"
on storage.objects;

drop policy if exists "Paid users can read vault resources"
on storage.objects;

create policy "Admins can upload vault resources"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'resource-vault'
    and public.is_admin()
);

create policy "Admins can update vault resources"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'resource-vault'
    and public.is_admin()
)
with check (
    bucket_id = 'resource-vault'
    and public.is_admin()
);

create policy "Admins can delete vault resources"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'resource-vault'
    and public.is_admin()
);

create policy "Paid users can read vault resources"
on storage.objects
for select
to authenticated
using (
    bucket_id = 'resource-vault'
    and (
        public.is_admin()
        or exists (
            select 1
            from public.profiles
            where profiles.id = auth.uid()
              and profiles.paid = true
        )
    )
);
