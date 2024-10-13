import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const assetUrl = process.env.VITE_NEXT_PUBLIC_ASSET_URL;
  return {
    server: { https: true },
    plugins: [react(), mkcert()],
    base: "/",
    test: {
      globals: true,
      environment: "jsdom",
    },
  };
});
