# Page Components

This folder now stores reusable page UI components only.

Next.js App Router routes live in `src/app/**/page.tsx` and import these
components so the visual UI can stay unchanged while routing stays Next-native.

| App route | UI component |
| --- | --- |
| `/` | `src/routes/index.tsx` |
| `/about` | `src/routes/about.tsx` |
| `/services` | `src/routes/services.tsx` |
| `/campaign-website` | `src/routes/campaign-website.tsx` |
| `/contact` | `src/routes/contact.tsx` |
| `/packages` | `src/routes/packages.tsx` |
| `/portfolio` | `src/routes/portfolio.tsx` |
| `/blog` | `src/routes/blog.tsx` |
