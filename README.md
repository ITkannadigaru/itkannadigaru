This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on GitHub Pages

This repo is configured to export the Next.js app as a static site and deploy it with GitHub Actions.

1. Push the repo to GitHub with the repository name `ITkannadigaru`.
2. In GitHub, open **Settings > Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to the `main` branch, or run the **Deploy to GitHub Pages** workflow manually from the **Actions** tab.

The Pages build command is:

```bash
npm run build:pages
```

The exported static site is generated in `out/`.

## Student sign-in

Google sign-in uses Supabase Auth and is optional; no subscription is required.
It currently signs students in only: progress, quiz answers and certificates
remain in browser storage and are not associated with the account or synced.
Do not use a shared device for sensitive practice data.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to the project's URL and publishable
key (the legacy anon key is also supported). These values are public in the
client build. Never use a secret or service-role key. For GitHub Pages builds,
set the same names under **Settings > Secrets and variables > Actions >
Variables**; Next.js embeds them at build time.

Enable the Google provider in Supabase Auth. In Google Cloud, configure a Web
application OAuth client with the site origin and the Supabase provider's
callback URL. Store its client secret in Supabase, not in this repository.
Add the deployed `https://itkannadigaru.github.io/itkannadigaru/login`
and any local development login URL to Supabase's redirect allow list. If the
Google app is in testing mode, add each test user in Google Cloud. See the
[Supabase Google sign-in guide](https://supabase.com/docs/guides/auth/social-login/auth-google).

Lesson Like, Comment and Subscribe links open YouTube; these are optional and
the website does not submit actions on a learner's behalf.

## Learning path

The Python for AI pilot lives at `/itkannadigaru/learn/python-for-ai`. Lesson
titles, YouTube video IDs, original study notes, exercises, and links to related
notebooks are maintained in `src/lib/python-lessons.ts`. Update this list as
new videos are published. Notes are short companions and should be checked
against the corresponding video before publication.

Opening a video updates the course's videos-opened progress in browser local
storage on one device; it does not verify playback. In every course,
learners mark lessons complete separately. Marking all published lessons
complete unlocks a self-reported certificate that can be printed or saved as a
PDF. There is no completion verification, cross-device sync, or email delivery.

Other course video lists are a snapshot in `src/data/playlists.json`. Update
their video IDs and titles when playlists change. Thumbnails load from YouTube.
`src/lib/course-lessons.ts` maps all 120 additional videos by video ID to beginner
explanations, illustrative examples, quizzes and practical acceptance checklists.
Each course includes a prerequisite roadmap. CKA lessons are displayed by their
published day number, including Day 21 in its correct position.

### Notebook notes and practice

The Python pilot also includes twelve source notebooks from
`ManojKRISHNAPPA/ITK-COMPLETE-GENAI-SERIES`, reproduced with the owner's
permission. `src/data/python-notebooks.json` pins the source commit and import
date. Shared modules are presented in full, not as transcripts of individual
videos. Days with project links rather than a matching notebook retain their
original companion notes.

Run `npm run import:python-notes` with authenticated `gh` to refresh the snapshot,
then review the generated content before committing it. The importer preserves
markdown, code and saved plain-text outputs; it excludes raw cells, HTML/rich
outputs, tracebacks and execution metadata. The site renders Markdown without
raw HTML and never executes notebook code. Run `npm run test:notes` to check
the importer.

`src/lib/python-assessments.ts` contains an original knowledge check and a
practical assignment checklist for each of the 23 lessons. Answers receive
feedback; assignment checks are self-reported. These results persist per day
in browser storage, do not upload submissions or grade code, and do not gate
the existing self-reported certificate.

### All-playlist learning workspaces

The remaining nine playlists have the same watch/read/practise/complete flow.
On desktop, the sticky notes-and-practice panel scrolls independently of the
curriculum and supports keyboard scrolling. Selecting Read notes starts at the
top; Quiz & assignment jumps to the assessment. Mobile retains page scrolling.
All ten courses support lesson search and Previous/Next navigation in published
order, even while the curriculum is filtered. Last selected lessons are saved by
video ID in `itkannadigaru-resume-{course-slug}-v1` and restored on course visits.
The homepage lists saved courses under Continue learning, most recent first.
Resume state is device-local, separate from opened videos and manual completion;
storage failures are shown rather than silently discarded.

Watch video opens the selected lesson's official YouTube privacy-enhanced player
inside the notes panel. Playback is never automatic: press Play in the loaded
player. Thumbnails and Open on YouTube remain external fallbacks. Loading a player
counts as opening a video, not verified playback, completion or a guaranteed
YouTube view. Embedding must be enabled by the uploader and allowed by the browser;
the iframe sends the origin Referer required by YouTube. Player availability,
restrictions and counted views remain controlled by YouTube.

`src/data/course-notes.json` contains 74 related Markdown, notebook and Terraform
documents from the owner's AI, CKA, Terraform and AWS repositories. Each document
records its pinned commit and source URL. Only documents referenced by a course
are passed to its reader. Source numbering can differ from video numbering;
the mapping is explicit. Shared modules are not presented as exact video notes.

Refresh with `npm run import:course-notes` using authenticated `gh`, then review
topic alignment, sensitive values, compatibility and image links before
publication. Large notebooks are retrieved through GitHub's blob endpoint.
Markdown tables are rendered; relative image links resolve against the pinned
source. Raw HTML and rich notebook outputs remain disabled.

Lessons without a matching source retain explicitly labeled original companion
content. In particular, vaguely titled LeetCode and microservices parts do not
claim to reproduce the exact video exercise. Cloud tasks start with mock data,
read-only reporting or reviewed plans; imported examples are not instructions
to execute against production.

Assessment storage keys include both playlist and video identity. Answers and
assignment checks remain separate from videos-opened progress and manual course
completion. The Python pilot's original storage keys are preserved. Certificates
are downloadable through print/save-as-PDF; no email, verified grading or
professional credential is provided.

Certificates retain the white-and-gold landscape design and recognize
completion using the learner's name, course title and channel slogan, without
lesson counts or additional qualification wording on the PDF. The course page
still explains that completion is self-reported; no accreditation, independent
verification or professional credits are claimed.
An original gold ITK learning seal appears on the certificate. It is a vector
brand badge, not an accreditation mark or a copy of the YouTube channel logo.

### Student-style study notes

Every lesson's expanded reader begins with a contextual study guide: the core
idea, a mental model, a worked example explained step by step, a common mistake,
a concise revision card, an ungraded recall prompt and a practical task.
`src/lib/course-study-guides.ts` covers the 120 non-pilot lessons;
`src/lib/python-study-guides.ts` covers the 23 Python for AI lessons. Guides are
keyed by video ID, so shared notebooks do not produce identical day-level notes.
Missing guides fail explicitly rather than showing generic filler.

The reader includes section navigation and works even without an attached
GitHub module. Original source documents remain unchanged in separately
expandable reference sections with pinned attribution. Importing a fresh source
snapshot does not overwrite these authored explanations. Review a guide's
examples and walkthrough together whenever lesson content changes.

The reader's recall disclosure is a revision aid only: it does not submit an
assessment, mark a task complete or change certificate eligibility.

### Learning paths, visual examples and final projects

The homepage also offers expandable AI Engineer and DevOps Engineer career
roadmaps. `src/lib/career-roadmaps.ts` defines the ordered phases, topic cards
and their explanations, plus links to relevant available courses. The roadmaps
are guidance, not a guarantee of employment or a claim that every topic has a
dedicated course. Selecting a roadmap does not record progress.

The homepage roadmap offers AI Engineering, DevOps & Kubernetes, Cloud &
Infrastructure, and Python & Interview Readiness paths from
`src/lib/learning-paths.ts`. Every milestone links to an existing course or its
final project. Prerequisites and unavailable foundation coverage are explicit;
the animated milestone bar is exploration, not earned progress.

Every one of the 143 lesson guides has an interactive visual walkthrough using
its authored explanatory steps. `src/lib/lesson-visuals.ts` also supplies 37
original flow/comparison examples with expected observations and symptom/fix
cards, including all 23 Python foundation lessons and examples across every
other course. Expectations are teaching targets, never claimed to be code
executed in the page. Original imported documents remain unchanged.

Each course has a distinct final project brief from
`src/lib/course-projects.ts`: prerequisites, four build stages, fictional/local
fixtures, expected demonstrations, acceptance cases, portfolio deliverables,
troubleshooting and lab safety. Projects are available through
`#course-project` without requiring certificate completion. They are
self-reviewed assignments, not implemented student apps, uploads or automated
grading, and do not change certificate eligibility. AWS cleanup stays read-only
and mock-data based; Terraform starts with a local file; Kubernetes/Helm labs
use disposable local environments; model calls can be mocked.
