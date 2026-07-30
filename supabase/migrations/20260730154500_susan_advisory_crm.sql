-- Susan Wagner Private Advisory CRM.
-- Additive only: does not modify course curriculum, lessons, quizzes, or progress.

create table if not exists public.advisory_clients (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete set null,
    name text not null,
    email text not null,
    phone text,
    business_name text not null,
    website text,
    industry text not null,
    business_stage text not null,
    team_size text,
    revenue_range text,
    primary_challenge text not null,
    desired_outcome text not null,
    why_susan text,
    source text not null default 'website',
    stage text not null default 'applied'
        check (stage in (
            'applied',
            'reviewing',
            'invited',
            'enrolled',
            'active',
            'paused',
            'completed',
            'declined'
        )),
    investment_amount integer not null default 0 check (investment_amount >= 0),
    vision_statement text,
    mission_statement text,
    three_year_vision text,
    strategic_goals text,
    growth_strategy text,
    quarterly_objectives text,
    exit_plan text,
    next_actions text,
    next_session_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists advisory_clients_stage_created_index
on public.advisory_clients(stage, created_at desc);

create index if not exists advisory_clients_email_index
on public.advisory_clients(lower(email));

create table if not exists public.advisory_notes (
    id uuid primary key default gen_random_uuid(),
    client_id uuid not null references public.advisory_clients(id) on delete cascade,
    author_id uuid references auth.users(id) on delete set null default auth.uid(),
    note_type text not null default 'general'
        check (note_type in ('general', 'session', 'strategy', 'follow_up', 'decision')),
    note text not null check (char_length(note) between 1 and 12000),
    created_at timestamptz not null default now()
);

create index if not exists advisory_notes_client_created_index
on public.advisory_notes(client_id, created_at desc);

create table if not exists public.advisory_milestones (
    id uuid primary key default gen_random_uuid(),
    client_id uuid not null references public.advisory_clients(id) on delete cascade,
    title text not null,
    description text,
    status text not null default 'pending'
        check (status in ('pending', 'in_progress', 'completed', 'blocked')),
    due_date date,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists advisory_milestones_client_status_index
on public.advisory_milestones(client_id, status, sort_order, created_at);

drop trigger if exists advisory_clients_set_updated_at on public.advisory_clients;
create trigger advisory_clients_set_updated_at
before update on public.advisory_clients
for each row execute function public.set_updated_at();

drop trigger if exists advisory_milestones_set_updated_at on public.advisory_milestones;
create trigger advisory_milestones_set_updated_at
before update on public.advisory_milestones
for each row execute function public.set_updated_at();

alter table public.advisory_clients enable row level security;
alter table public.advisory_notes enable row level security;
alter table public.advisory_milestones enable row level security;

drop policy if exists "Admins manage advisory clients" on public.advisory_clients;
create policy "Admins manage advisory clients"
on public.advisory_clients
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins manage advisory notes" on public.advisory_notes;
create policy "Admins manage advisory notes"
on public.advisory_notes
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins manage advisory milestones" on public.advisory_milestones;
create policy "Admins manage advisory milestones"
on public.advisory_milestones
for all to authenticated
using (public.is_admin())
with check (public.is_admin());
