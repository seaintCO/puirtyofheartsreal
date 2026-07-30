-- Authentication and private-data hardening.
-- Additive security only: no course, lesson, quiz, or progress content changes.

alter table public.profiles enable row level security;
alter table public.purityos_subscriptions enable row level security;
alter table public.purityos_conversations enable row level security;
alter table public.purityos_messages enable row level security;
alter table public.purityos_daily_usage enable row level security;
alter table public.consultation_requests enable row level security;
alter table public.advisory_clients enable row level security;
alter table public.advisory_notes enable row level security;
alter table public.advisory_milestones enable row level security;

-- Remove any legacy profile mutation policy that could allow a signed-in user to
-- change paid access, role, Stripe identifiers, or other privileged fields.
do $$
declare
    policy_record record;
begin
    for policy_record in
        select policyname
        from pg_policies
        where schemaname = 'public'
          and tablename = 'profiles'
          and upper(cmd) in ('ALL', 'INSERT', 'UPDATE', 'DELETE')
    loop
        execute format(
            'drop policy if exists %I on public.profiles',
            policy_record.policyname
        );
    end loop;
end;
$$;

-- Users may read only the profile rows allowed by RLS. Profile mutations happen
-- through vetted SECURITY DEFINER functions or the server-side service role.
revoke insert, update, delete, truncate, references, trigger
on table public.profiles
from anon, authenticated;

grant select on table public.profiles to authenticated;

-- Anonymous visitors never receive direct table access to private operational
-- data. Public forms write through validated server routes using the service role.
revoke all on table public.purityos_subscriptions from anon;
revoke all on table public.purityos_conversations from anon;
revoke all on table public.purityos_messages from anon;
revoke all on table public.purityos_daily_usage from anon;
revoke all on table public.consultation_requests from anon;
revoke all on table public.advisory_clients from anon;
revoke all on table public.advisory_notes from anon;
revoke all on table public.advisory_milestones from anon;

-- Trigger-only and privileged helper functions must not be callable publicly.
revoke all on function public.handle_new_user() from public, anon, authenticated;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

revoke all on function public.update_my_profile(text) from public, anon;
grant execute on function public.update_my_profile(text) to authenticated;

revoke all on function public.has_purityos_access() from public, anon;
grant execute on function public.has_purityos_access() to authenticated;

revoke all on function public.consume_purityos_message() from public, anon;
grant execute on function public.consume_purityos_message() to authenticated;

revoke all on function public.issue_my_certificate() from public, anon;
grant execute on function public.issue_my_certificate() to authenticated;

revoke all on function public.increment_resource_download(uuid) from public, anon;
grant execute on function public.increment_resource_download(uuid) to authenticated;
