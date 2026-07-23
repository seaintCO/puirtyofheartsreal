# Purity of Hearts Platform

A production-ready member platform for the existing Purity of Hearts course,
private community, 1:1 consultation requests, PurityOS, the Purity Luma
coming-soon shop, and the SEAINT Booking partner sandbox.

The course lessons, quizzes, flashcards, and study content remain in their
original data files. This upgrade changes the experience and adds products; it
does not rewrite the curriculum.

## What is included

- Premium responsive marketing site and glass member dashboard
- Existing 24-lesson course, quizzes, flashcards, notes, journal, resources,
  progress tracking, and completion certificate
- Supabase authentication, row-level security, private resource storage, and
  admin resource uploads
- Existing one-time Stripe course checkout
- Separate $50/month PurityOS Stripe subscription
- Saved PurityOS conversations, membership billing portal, daily usage limit,
  moderation, cost controls, and crisis-safe response boundaries
- Private Discord links in the community and PurityOS experience
- 1:1 consultation request form plus admin request management
- Purity Luma face mask, neck mask, and home panel launch waitlists
- Interactive SEAINT Booking client/owner sandbox
- Newsletter capture

## Local setup (PowerShell)

Open PowerShell in the extracted project folder:

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

Before `npm run dev`, replace every placeholder in `.env.local`. Never commit
`.env.local`.

## Supabase setup

The project contains two ordered migrations:

1. `supabase/migrations/20260710150000_launch_ready.sql`
2. `supabase/migrations/20260723010000_purityos_platform.sql`

For a new Supabase project:

```powershell
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

For the already-connected project, run `npx supabase db push` from this folder.
Review the output before confirming a production migration.

The first migration creates the private `resource-vault` storage bucket and the
course tables. The second migration adds PurityOS, consultation requests,
product waitlists, newsletter subscribers, certificate issuance, and safe
profile updates.

To make the owner account an admin, run this once in the Supabase SQL editor
after that person signs up:

```sql
update public.profiles
set role = 'admin'
where email = 'OWNER_EMAIL_HERE';
```

## Stripe setup

Create two Stripe prices:

- Course price: the existing one-time course purchase
- PurityOS: recurring monthly price for **$50 USD**

Place their price IDs in `STRIPE_COURSE_PRICE_ID` and
`STRIPE_PURITYOS_PRICE_ID`.

Create a webhook endpoint:

```text
https://YOUR_DOMAIN.com/api/stripe/webhook
```

Subscribe it to:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `charge.refunded`
- `charge.dispute.created`

Copy the signing secret to `STRIPE_WEBHOOK_SECRET`. Enable Stripe’s customer
portal so PurityOS members can cancel or update billing from the chat.

For local webhook testing:

```powershell
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Use the temporary `whsec_...` value printed by the Stripe CLI in `.env.local`.

## PurityOS setup and boundaries

Add `OPENAI_API_KEY` only as a server-side environment variable. It is never
sent to the browser. `OPENAI_MODEL` is configurable; the included default is
`gpt-5.6-terra` to balance response quality and subscription economics.

PurityOS is intentionally described as a faith-centered reflection and
business-support companion—not as a licensed therapist. It:

- saves chats only to the signed-in member’s Supabase account;
- checks active subscription access server-side;
- moderates input and output;
- limits each member to 30 messages per day and uses bounded chat history;
- provides general support but not diagnosis, medical care, emergency support,
  legal advice, or guaranteed business outcomes.

Before launch, the client should have local counsel review the Terms and Privacy
pages for the business’s jurisdiction and actual operating practices.

## Vercel deployment

1. Push this folder to the intended GitHub repository.
2. Import the repository in Vercel.
3. Add every value from `.env.example` in Vercel Project Settings →
   Environment Variables.
4. Set `NEXT_PUBLIC_SITE_URL` to the final `https://` domain.
5. Deploy.
6. Add the production Stripe webhook URL and update
   `STRIPE_WEBHOOK_SECRET` in Vercel.
7. Add the final domain to Supabase Authentication → URL Configuration:
   - Site URL: `https://YOUR_DOMAIN.com`
   - Redirect URL: `https://YOUR_DOMAIN.com/auth/callback`
8. Redeploy after changing environment variables.

## Launch verification

Run:

```powershell
npm run check
```

Then verify these flows in Stripe test mode:

- new account and email verification;
- one-time course purchase and dashboard access;
- lesson progress, notes, quizzes, journal, resources, and certificate;
- $50 PurityOS subscription, saved chats, delete chat, and billing portal;
- cancel PurityOS and confirm access ends after Stripe updates the status;
- consultation form and admin status management;
- all three product waitlists;
- newsletter signup;
- Discord links;
- mobile dashboard navigation;
- booking sandbox client and owner views.

Do not switch Stripe to live mode until every test-mode flow passes.
