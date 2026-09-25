// Test-only configuration: no real messages or changes to src/config/site.js.
import { createServer } from "vite";
import config from "../vite.config.js";

const mode = process.argv[2];
const server = await createServer({
  ...config,
  configFile: false,
  cacheDir: `node_modules/.vite-test-${mode}`,
  plugins: [
    ...config.plugins,
    {
      name: "test-contact-settings",
      enforce: "pre",
      transform(code, id) {
        if (!id.replaceAll("\\", "/").endsWith("/src/config/site.js")) return;
        return code
          .replace(/email:\s*["']{2},/, "email: 'inquiries@example.test',")
          .replace(
            /formEndpoint:\s*["']{2},/,
            mode === "form"
              ? "formEndpoint: 'https://forms.example.test/inquiry',"
              : "formEndpoint: '',",
          );
      },
    },
  ],
  server: {
    host: "127.0.0.1",
    port: Number(process.argv[3]),
    strictPort: true,
  },
});
await server.listen();
