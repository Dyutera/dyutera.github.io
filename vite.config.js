import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./src/config/site.js";

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "dyutera-site-metadata",
      transformIndexHtml(html) {
        const url = site.url.replace(/\/$/, "");
        return html
          .replace("__SITE_TITLE__", escapeHtml(site.title))
          .replaceAll("__SITE_DESCRIPTION__", escapeHtml(site.description))
          .replace("__SITE_OG_TITLE__", escapeHtml(site.title))
          .replace(
            "<!-- configured-domain -->",
            url
              ? `<link rel="canonical" href="${escapeHtml(url)}/" /><meta property="og:url" content="${escapeHtml(url)}/" /><meta property="og:image" content="${escapeHtml(url)}/images/social-card.png" /><meta name="twitter:image" content="${escapeHtml(url)}/images/social-card.png" />`
              : "",
          );
      },
    },
  ],
});
