create table if not exists public.vip_client_coaching (
  user_id uuid primary key references auth.users(id) on delete cascade,
  client_stage text not null default 'onboarding',
  assigned_focus text not null default '',
  internal_notes text not null default '',
  next_session_at timestamptz,
  last_reviewed_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.vip_client_coaching enable row level security;

create policy "admin manages vip coaching" on public.vip_client_coaching
for all using (public.is_admin()) with check (public.is_admin());

create index if not exists vip_client_coaching_stage_idx on public.vip_client_coaching(client_stage);
