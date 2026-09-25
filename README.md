# DYUTERA

A responsive software agency website built with React, Vite, Tailwind CSS, Lucide React, and Framer Motion. It is a static, single-page website with section links and native project dialogs. No database, backend, or routing rewrites are required.

## Run locally

Use Node.js 22 LTS and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

```sh
npm run build
npm run preview
```

The production output is in `dist/`. Preview normally runs at `http://localhost:4173`.

## Content and configuration

| File                       | What to edit                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------ |
| `src/config/site.js`       | Company name, metadata, production URL, contact details, social links, form endpoint |
| `src/data/content.js`      | Hero, about, mission, vision, process, approach, section headings, navigation        |
| `src/data/services.js`     | Service descriptions and icon keys                                                   |
| `src/data/projects.js`     | Portfolio entries, filters, technologies, screenshots and approved links             |
| `src/data/technologies.js` | Technology groups and featured tools                                                 |
| `src/components/UI.jsx`    | Replaceable SVG logo, buttons, headings and icon mapping                             |
| `public/favicon.svg`       | Browser icon                                                                         |
| `public/images/`           | Original SVG concept previews and social sharing image                               |
| `src/index.css`            | Theme, layouts, responsive rules, interaction styles                                 |

All blank contact values are intentionally hidden. No contact address, client, delivery history, testimonial, or business metric is invented. The numbers inside the concept dashboard are fictional UI sample data, not company results.

### Before publication

1. Set `site.url` to your actual HTTPS domain, without a trailing slash. Vite uses this at build time to generate canonical, Open Graph URL, and social image metadata. Leave it blank while the domain is unknown.
2. Add your real business email and/or Formspree endpoint. Add only real phone, WhatsApp, location, GitHub, and LinkedIn details. Social URLs must be full HTTPS URLs. Phone should include the country code; WhatsApp should contain international digits only.
3. Replace the clearly labeled illustrative projects with actual projects as they become available. The client filter intentionally has an empty state until approved client work is added.
4. Update the social sharing card if your brand message changes.

### Projects

Each entry supports `id`, `title`, `subtitle`, `category`, `type`, `status`, `preview`, `description`, `problem`, `solution`, `image`, `screenshots`, `technologies`, `features`, `demoUrl`, and `githubUrl`.

- Categories are `our-project` and `client-project`.
- Keep `status: 'Illustrative concept'` for placeholders. For actual work, clear `status` or replace the component label logic as appropriate.
- Images use root paths such as `/images/project-name.webp`. Use optimized WebP/AVIF images where practical. The preview ratio is 3:2; images are lazy loaded.
- Use `image: ''` and `screenshots: []` for a project without screenshots; the card uses a branded text fallback.
- Leave absent links blank. Add a demo URL only when it works. Add a GitHub URL only when the repository is public and approved for sharing.
- Technologies in placeholder entries are envisioned choices, not evidence of implemented applications.

### Contact form

**Formspree:** Create and activate a form in your own Formspree account, set its recipient and allowed domains, then paste the HTTPS form endpoint into `site.formEndpoint`. It is a public form endpoint, not a secret API key. Verify your address and test a real inquiry before launching. The form submits via fetch and supports loading, success, error, and timeout states. Failure preserves the visitor’s text. An empty honeypot field is included.

**Email fallback:** Leave `formEndpoint` blank and set `site.email`. Submission opens a `mailto:` draft with the visitor’s information. The visitor must send the draft in their email client; the site never reports this as a delivered inquiry. No email application can be guaranteed on every device. An email link is also displayed beside the form. Long messages may exceed some email clients’ URL limits; use Formspree for dependable long inquiries.

**Neither configured:** Submission is disabled with an honest public message that inquiries are not open yet. Configure either method to enable it. No fake success message is shown. No message is stored on a server owned by this site.

## Deploy to GitHub Pages

The repository remote is `Dyutera/dyutera.github.io`. `base: '/'` in `vite.config.js` supports its root GitHub Pages URL and a custom domain. The site uses fragment links (`#projects`, `#contact`) rather than path-based React routing; direct section links and refresh work without a 404 fallback.

1. In the GitHub repository, open **Settings → Pages → Build and deployment**, and choose **GitHub Actions** as the source.
2. Commit and push the project, including `package-lock.json`, to `main`.
3. The workflow in `.github/workflows/deploy.yml` installs locked dependencies, builds the site, uploads `dist/`, and deploys it. The Actions run reports the published URL.
4. For a manual deployment, run **Deploy DYUTERA to GitHub Pages** through the Actions tab.

No deployment has been performed by this implementation. Pushing to `main` after enabling Pages triggers deployment.

### Namecheap custom domain and HTTPS

Use your actual domain wherever `your-domain.com` appears below. Do not publish the example value.

1. Verify the domain in your GitHub account or organization’s Pages settings using the TXT record GitHub provides. Follow [GitHub’s domain verification instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).
2. In this repository’s **Settings → Pages → Custom domain**, enter your domain (for example, `your-domain.com`) and save it **before** pointing DNS at GitHub.
3. If Namecheap hosts your DNS, open **Domain List → Manage → Advanced DNS → Host Records**. If you use other nameservers, make these changes at that DNS provider instead. Preserve unrelated email, verification, and other service records; replace conflicting parking/redirect records only for the web hostnames being configured.
4. Add these records, with TTL set to Automatic:

| Type  | Host  | Value               |
| ----- | ----- | ------------------- |
| A     | `@`   | `185.199.108.153`   |
| A     | `@`   | `185.199.109.153`   |
| A     | `@`   | `185.199.110.153`   |
| A     | `@`   | `185.199.111.153`   |
| CNAME | `www` | `dyutera.github.io` |

These are the records documented by [GitHub for custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). The `www` target is the GitHub account’s Pages domain, without a protocol or repository path. Namecheap describes the host record editor in its [A record guide](https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain/).

5. Wait for DNS validation, which can take up to 24 hours. Check in PowerShell with `Resolve-DnsName your-domain.com` and `Resolve-DnsName www.your-domain.com`.
6. In **Settings → Pages**, enable **Enforce HTTPS** once GitHub has issued the certificate. Check both apex and `www` addresses; GitHub redirects to the configured primary domain.
7. Set `site.url` to that primary HTTPS URL, rebuild and push. Verify canonical and social metadata in the page source.

This custom Actions deployment does not require a `CNAME` file; the domain is managed in the repository’s Pages settings. If moving to branch-based deployment later, follow GitHub’s CNAME instructions for that mode.

### Updating after deployment

Edit the relevant data, configuration, components or assets; run the checks below; commit and push to `main`. The workflow rebuilds and publishes automatically. Do not commit `dist/` or `node_modules/`.

## Verification

```sh
npx playwright install chromium
npm run build
npm test
```

The browser suite runs against the production preview. It checks project filtering, dialogs and keyboard focus, mobile navigation, layout overflow, reduced motion, missing-contact behavior, and asset loading. The form provider success/error and mailto paths are verified with a temporary local configuration and intercepted network requests; no real inquiries are sent during tests.

The site includes visible keyboard focus, a skip link, semantic sections, native modal focus containment and Escape handling, required form labels and browser validation, live status announcements, and reduced-motion support. Fonts are served locally; the only runtime third-party request is the configured form submission.
