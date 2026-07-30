# Susan Wagner Liquid Glass Revamp

## Updated experience

- Minimal, Apple-inspired liquid-glass public website with pink, violet, and soft blue accents.
- Purity Of Hearts is the primary platform brand; Susan Wagner remains the featured educator and private growth strategist.
- Education, PurityOS, Work with Susan, About, Login, Enrollment, and the member portal now share one visual system.
- Work with Susan contains no public price or investment language.
- Every Work with Susan call to action now routes to the growth strategy call form.
- Strategy-call submissions are saved to consultation requests and mirrored into Susan's private growth CRM.
- The CRM retains vision, goals, growth strategy, objectives, milestones, notes, sessions, next actions, and exit planning.

## Course preservation

The following course-critical files match the supplied platform exactly:

- `src/data/business-course.ts`
- `src/data/module-quizzes.ts`
- `src/data/business-study-tools.ts`
- `src/hooks/useBusinessCourseProgress.ts`
- `src/lib/auth/require-paid-user.ts`

The course player, quizzes, flashcards, cheat sheets, assignments, notes, journal, certificates, and progress behavior were not rewritten. Their interface styling was updated only.

## Required Supabase migrations

Run:

```text
supabase/migrations/20260730154500_susan_advisory_crm.sql
supabase/migrations/20260730213000_hide_advisory_pricing.sql
```

## Windows setup and repair

- Run `INSTALL-WINDOWS.ps1` for a clean dependency install and local launch.
- Run `fix-next.ps1` when `.next` manifests are corrupted or a dependency such as `lucide-react` is missing.
