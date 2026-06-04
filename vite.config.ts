import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/siliconcanvascom/", // OK here ONLY if wrapper passes it correctly
  },

  tanstackStart: {
    server: { entry: "server" },
  },
});
