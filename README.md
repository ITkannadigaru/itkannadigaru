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
PDF. There is no account, completion verification, cross-device sync, or email
delivery.

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
