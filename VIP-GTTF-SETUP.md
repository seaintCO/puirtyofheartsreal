# GTTF VIP Dashboard Setup

1. Apply the new Supabase migration:

   `npx supabase db push`

2. Sign in as an admin and open `/dashboard/admin/vip`.

3. Select **Grant VIP** for an existing member. VIP access automatically keeps full paid-course access enabled and adds `/dashboard/vip`.

4. VIP members can use:
   - Interactive strategic playbook
   - Personal and company vision
   - SWOT, strategic advantage, CSFs, KPIs, and diagnostic
   - One-year and long-term plans
   - Current and future accountability structures
   - Sales, marketing, operations, people, finance, and leadership systems
   - 90-day goals and action accountability
   - Session preparation for Susan
   - Protected downloads of the two supplied reference resources

The reference files are served through an authenticated API route and are not placed in the public folder.
