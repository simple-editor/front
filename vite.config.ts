import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg"],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@/pages", replacement: "/src/pages" },
      { find: "@/components", replacement: "/src/components" },
      { find: "@/hooks", replacement: "/src/hooks" },
      { find: "@/layouts", replacement: "/src/layouts" },
      { find: "@/assets", replacement: "/src/assets" },
      // { find: "node_modules", replacement: "/node_modules" },
    ],
  },
  server: {
    host: "localhost",
    port: 3000,
    proxy: {
      "/api": {
        target:
          "http://ec2-3-37-192-116.ap-northeast-2.compute.amazonaws.com:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
