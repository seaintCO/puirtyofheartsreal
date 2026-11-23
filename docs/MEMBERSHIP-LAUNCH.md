# Purity of Hearts — membership launch guide

The website is configured to offer one **monthly subscription**, with the actual amount pulled from Susan's Stripe Price object. No price is hardcoded in the website. Monthly members get course dashboard, Culture Studio, member resources, and ALMA. Existing one-time course purchasers keep their legacy course access; that purchase does not automatically include ALMA.

**Do not collect, share, or paste live API secrets in chat.** Add each secret directly to the **Vercel project** environment variables in its dashboard: \`seaints-projects/puirtyofheartsreal\`.

## 1. Stripe account and monthly price

1. Open **Susan's own Stripe account** (not any other connected business).
2. In **Product catalog**, create **Purity of Hearts Membership** with a recurring **monthly** price. Susan chooses the price. Save its \`price_...\` ID.
3. Create a Stripe **secret API key** with privileges required for Checkout, Customers, Subscriptions, Prices and the Billing Portal. Use the proper test/live mode matching the Price ID.
4. Under Stripe **Developers → Webhooks / Event destinations**, add:
   - Endpoint URL: \`https://gettothef.com/api/stripe/webhook\`
   - Events:
     - \`checkout.session.completed\`
     - \`checkout.session.async_payment_succeeded\`
     - \`customer.subscription.created\`
     - \`customer.subscription.updated\`
     - \`customer.subscription.deleted\`
     - \`invoice.paid\`
     - \`invoice.payment_failed\`
     - \`charge.refunded\`
     - \`charge.dispute.created\`
   - Copy that endpoint's signing secret (\`whsec_...\`).
5. Configure **Stripe Billing → Customer Portal** to let customers view invoices, update payment details, and cancel subscriptions. Portal links are created by the backend for the signed-in customer.

## 2. Vercel environment variables

Set each for the **Production** environment (and Preview separately for testing):

- \`STRIPE_SECRET_KEY\` (server secret)
- \`STRIPE_WEBHOOK_SECRET\` (endpoint-specific server secret)
- \`STRIPE_MEMBERSHIP_PRICE_ID\` (monthly Price ID)
- \`OPENAI_API_KEY\` (server secret)
- \`OPENAI_MODEL\` (optional; default \`gpt-5-mini\`)
- \`NEXT_PUBLIC_SITE_URL=https://gettothef.com\`
- \`NEXT_PUBLIC_SUPABASE_URL\`
- \`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY\`
- \`SUPABASE_SECRET_KEY\` (server secret)

**Redeploy** the production site after adding/changing environment variables.

Do **not** add \`NEXT_PUBLIC_\` to any Stripe/OpenAI/Supabase secret. No Stripe publishable key is needed for hosted Stripe Checkout.

## 3. Supabase

The existing PurityOS project has the \`unified_membership_access\` migration. It creates \`has_course_access()\`, updates \`has_purityos_access()\`, prevents clients from changing subscription records, and records verified Stripe events.

In Supabase Authentication settings, verify the site URL and redirect allowlist include:

- \`https://gettothef.com\`
- \`https://gettothef.com/auth/callback\`

Use a real mailbox and confirm email delivery works. Keep Row Level Security enabled.

## 4. Access & security behavior

1. Visitor signs up at \`/login?next=/membership\` and verifies their email.
2. At \`/membership\`, the **server retrieves the exact monthly price** from Stripe. When Stripe, OpenAI, price, and webhook signing secret are missing, the purchase button remains unavailable.
3. Logged-in customer initiates subscription checkout. The backend creates Stripe-hosted Checkout; no secret keys go to the browser.
4. Stripe sends a signed webhook to \`/api/stripe/webhook\`. The backend verifies the signature, fetches the current Stripe subscription, checks its price, then updates the user's membership record with the service-role key.
5. An active/trialing membership with an unexpired billing period unlocks the dashboard, Culture Studio, and ALMA; Stripe manages renewals and cancellations.
6. Customer manages billing at \`/membership/manage\` or the dashboard account settings. The customer portal manages payment methods and cancellation.
7. Access is denied for expired, unpaid, canceled, paused, or past-due statuses. If canceled **at period end**, an active subscription retains access until the paid period expires.
8. Legacy one-time purchasers remain entitled to course resources; they are not automatically entitled to ALMA.
9. ALMA has limits enforced in the database: **30 messages/day and 500 messages/month**. Her API key is never shared with members.

## 5. Final test checklist before advertising paid access

Use a **test Stripe account + test Price ID + test signing secret** with a separate preview or otherwise isolated test environment.

- Create a new user, verify email, and confirm the dashboard denies access before payment.
- Start Checkout, use a Stripe test card, and confirm the webhook appears **successful** in Stripe events.
- Confirm the new subscriber reaches dashboard, Culture Studio, and ALMA.
- Send a real ALMA message with a funded OpenAI key; test the member's quota behavior.
- Open Stripe Customer Portal; update payment details; verify invoices show the correct amount.
- Cancel at period end; confirm access continues until period end and stops afterwards.
- Test payment failure and subscription deletion events; ensure expired/past-due members are blocked.
- Confirm former one-time course purchasers retain course access and cannot use ALMA without a subscription.
- Test mobile layouts, password reset, site emails, and return URLs.
- Rotate any potentially exposed credentials from old Git history before enabling live payments.

If Stripe is not configured, purchases are **not** taken. A successful Vercel build alone does not confirm the checkout works. Stripe test mode and live mode use separate price IDs, endpoint signing secrets, and customers.
