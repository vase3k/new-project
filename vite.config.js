import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { webfontDownload } from "vite-plugin-webfont-dl";
import { meta } from "vite-plugin-meta-tags";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import resizeImagesPlugin from "./src/js/services/resize-img";
import legacy from "@vitejs/plugin-legacy";

const baseName = `/${path.basename(process.cwd())}`;

export default defineConfig({
  base: baseName,
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
      },
    },
  },

  plugins: [
    tailwindcss(),
    webfontDownload(
      [
        "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap",
      ],
      {
        injectAsStyleTag: false,
        minifyCss: true,
        assetsSubfolder: "fonts",
      },
    ),
    meta({
      title: "title",
      description: "описание",
      url: "https://liongroup.by/",
      img: "/images/meta-og-image.jpg",
      color: "#ffffff",
    }),
    vitePluginFaviconsInject("src/favicon/favicon.png", {
      background: "#fff",
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        favicons: true,
        windows: false,
        yandex: true,
      },
      appName: "title",
      appShortName: "title",
      appDescription: "title",
    }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 75 },
    }),
    resizeImagesPlugin({
      inputDir: "dist",
      width: 1366,
    }),
    legacy({
      targets: ["defaults"],
    }),
  ],
});
