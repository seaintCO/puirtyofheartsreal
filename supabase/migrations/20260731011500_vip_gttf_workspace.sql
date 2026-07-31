-- VIP / GTTF private growth workspace
alter table public.profiles
  add column if not exists vip_access boolean not null default false;

create table if not exists public.vip_workspaces (
  user_id uuid primary key references auth.users(id) on delete cascade,
  personal_vision text not null default '',
  company_vision text not null default '',
  values_culture text not null default '',
  swot text not null default '',
  strategic_advantage text not null default '',
  critical_success_factors text not null default '',
  kpis text not null default '',
  business_diagnostic text not null default '',
  one_year_plan text not null default '',
  long_term_plan text not null default '',
  current_org text not null default '',
  future_org text not null default '',
  sales_system text not null default '',
  marketing_system text not null default '',
  operations_system text not null default '',
  people_system text not null default '',
  finance_system text not null default '',
  leadership_system text not null default '',
  coach_focus text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.vip_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default '90-day goal',
  success_metric text,
  target_date date,
  status text not null default 'active' check (status in ('active','complete','paused')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vip_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  goal_id uuid references public.vip_goals(id) on delete set null,
  title text not null,
  due_date date,
  status text not null default 'open' check (status in ('open','done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vip_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  wins text not null default '',
  blockers text not null default '',
  decisions text not null default '',
  next_commitment text not null default '',
  coach_question text not null default '',
  created_at timestamptz not null default now()
);

alter table public.vip_workspaces enable row level security;
alter table public.vip_goals enable row level security;
alter table public.vip_actions enable row level security;
alter table public.vip_checkins enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;

create or replace function public.has_vip_access()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and (vip_access = true or role = 'admin')) $$;

create policy "vip workspace owner or admin select" on public.vip_workspaces for select using (user_id = auth.uid() or public.is_admin());
create policy "vip workspace owner insert" on public.vip_workspaces for insert with check (user_id = auth.uid() and public.has_vip_access());
create policy "vip workspace owner or admin update" on public.vip_workspaces for update using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

create policy "vip goals owner or admin select" on public.vip_goals for select using (user_id = auth.uid() or public.is_admin());
create policy "vip goals owner insert" on public.vip_goals for insert with check (user_id = auth.uid() and public.has_vip_access());
create policy "vip goals owner or admin update" on public.vip_goals for update using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy "vip goals owner or admin delete" on public.vip_goals for delete using (user_id = auth.uid() or public.is_admin());

create policy "vip actions owner or admin select" on public.vip_actions for select using (user_id = auth.uid() or public.is_admin());
create policy "vip actions owner insert" on public.vip_actions for insert with check (user_id = auth.uid() and public.has_vip_access());
create policy "vip actions owner or admin update" on public.vip_actions for update using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy "vip actions owner or admin delete" on public.vip_actions for delete using (user_id = auth.uid() or public.is_admin());

create policy "vip checkins owner or admin select" on public.vip_checkins for select using (user_id = auth.uid() or public.is_admin());
create policy "vip checkins owner insert" on public.vip_checkins for insert with check (user_id = auth.uid() and public.has_vip_access());
create policy "vip checkins owner or admin delete" on public.vip_checkins for delete using (user_id = auth.uid() or public.is_admin());
