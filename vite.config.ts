import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@/pages", replacement: "/src/pages" },
      { find: "@/components", replacement: "/src/components" },
      { find: "@/hooks", replacement: "/src/hooks" },
      { find: "@/layouts", replacement: "/src/layouts" },
      { find: "@/assets", replacement: "/src/assets" },
      { find: "node_modules", replacement: "/node_modules" },
    ],
  },
  server: {
    host: "localhost",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
