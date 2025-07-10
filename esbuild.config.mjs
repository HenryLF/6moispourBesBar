import { build } from "esbuild";

import { umdWrapper } from "esbuild-plugin-umd-wrapper";

await build({
  entryPoints: ["src/public/*.ts"],
  outdir: "src/public/",
  bundle: true,
  format: "umd",
  platform: "browser",
  minify: false, // Optional minification
  sourcemap: true, // Optional source maps
  target: ["es2015"], // Browser compatibility target
  loader: {
    ".ts": "ts", // Process TypeScript files
  },
  plugins: [umdWrapper()],
});
