import { defineConfig } from "astro/config";
import stylex from "astro-stylex";

// https://astro.build/config
export default defineConfig({
	integrations: [stylex()],
});
