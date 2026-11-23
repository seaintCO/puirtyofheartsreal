-- Unified member access; applied to the connected PurityOS database on 2026-11-23.
-- Historical one-time course purchases and VIP access are preserved.
CREATE OR REPLACE FUNCTION public.has_course_access()
RETURNS boolean LANGUAGE sql STABLE SECURITY INVOKER
SET search_path = public
AS $function$
  SELECT auth.uid() IS NOT NULL AND (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND (p.paid IS TRUE OR p.vip_access IS TRUE OR p.role = 'admin')
    )
    OR EXISTS (
      SELECT 1 FROM public.purityos_subscriptions s
      WHERE s.user_id = auth.uid()
        AND s.status IN ('active', 'trialing')
        AND s.current_period_end > now()
    )
  );
$function$;
REVOKE ALL ON FUNCTION public.has_course_access() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_course_access() TO authenticated;

-- ALMA is part of the subscription, not a permanent course purchase.
CREATE OR REPLACE FUNCTION public.has_purityos_access()
RETURNS boolean LANGUAGE sql STABLE SECURITY INVOKER
SET search_path = public
AS $function$
  SELECT auth.uid() IS NOT NULL AND (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
    OR EXISTS (
      SELECT 1 FROM public.purityos_subscriptions s
      WHERE s.user_id = auth.uid()
        AND s.status IN ('active', 'trialing')
        AND s.current_period_end > now()
    )
  );
$function$;
REVOKE ALL ON FUNCTION public.has_purityos_access() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_purityos_access() TO authenticated;

-- Stripe-subscription rows are written only by the service-role webhook.
REVOKE ALL ON TABLE public.purityos_subscriptions FROM anon, authenticated;
GRANT SELECT ON TABLE public.purityos_subscriptions TO authenticated;
CREATE UNIQUE INDEX IF NOT EXISTS purityos_subscriptions_stripe_id_uq
  ON public.purityos_subscriptions (stripe_subscription_id)
  WHERE stripe_subscription_id IS NOT NULL;

DROP POLICY IF EXISTS "Subscribed members can view published resources" ON public.vault_resources;
CREATE POLICY "Subscribed members can view published resources"
  ON public.vault_resources FOR SELECT TO authenticated
  USING (published IS TRUE AND public.has_course_access());

CREATE TABLE IF NOT EXISTS public.stripe_webhook_events (
  event_id text PRIMARY KEY,
  event_type text NOT NULL,
  processed_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.stripe_webhook_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.stripe_webhook_events FROM PUBLIC, anon, authenticated;
