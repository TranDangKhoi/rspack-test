import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 5933,
  },
  source: {
    alias: {
      "@": "./src",
    },
  },
});
