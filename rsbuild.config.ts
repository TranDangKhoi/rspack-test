import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  server: {
    port: 5933,
  },
  source: {
    alias: {
      "@": "./src",
    },
  },
});
