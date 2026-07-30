-- Keep advisory pricing private and unset until Susan decides to publish an offer.
-- The legacy column remains for CRM compatibility, but new leads default to zero.

alter table if exists public.advisory_clients
  alter column investment_amount set default 0;

update public.advisory_clients
set investment_amount = 0
where investment_amount > 0
  and stage in ('applied', 'reviewing', 'invited');
