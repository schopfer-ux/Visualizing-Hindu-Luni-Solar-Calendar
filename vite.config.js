import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Panchang Pal",
        short_name: "Panchang Pal",
        description: "A kid friendly panchang app!",
        theme_color: "#ffffff",
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: ["react-customizable-progressbar"],
  },
});
