import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import Unfonts from "unplugin-fonts/vite";
import { meta } from "vite-plugin-meta-tags";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";
import convertWebp from "./src/js/services/convertWebp";
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
		Unfonts({
			custom: {
				families: [
					{
						name: "Benzin",
						local: "Benzin",
						src: "src/font/benzin-bold.woff2",
					},
					{
						name: "Benzin",
						local: "Benzin Medium",
						src: "src/font/benzin-medium.woff2",
					},
					{
						name: "Benzin",
						local: "Benzin Regular",
						src: "src/font/benzin-regular.woff2",
					},
					{
						name: "Benzin",
						local: "Benzin Semibold",
						src: "src/font/benzin-semibold.woff2",
					},
					{
						name: "ttfirsneue",
						local: "ttfirsneue Demibold",
						src: "src/font/ttfirsneue-demibold.woff2",
					},
					{
						name: "ttfirsneue",
						local: "ttfirsneue Medium",
						src: "src/font/ttfirsneue-medium.woff2",
					},
				],
				display: "swap",
				preload: true,
				injectTo: "head-prepend",
			},
		}),
		meta({
			title: "title",
			description: "описание",
			url: "https://liongroup.by/",
			img: "/images/meta-og-image.jpg",
			color: "#ffffff",
		}),
		vitePluginFaviconsInject("src/favicon/favicon.png", {
			background: "#fff",
			path: "assets/fav",
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
		convertWebp({
			inputDir: "dist",
			width: 180,
			quality: 80,
			excludeFolder: ["images"],
		}),
		// legacy({
		// 	targets: ["defaults"],
		// }),
	],
});
