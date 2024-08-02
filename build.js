import { build } from "esbuild";

build({
  entryPoints: [
    "./src/index.ts",
    "./src/dependencies/index.ts",
    "./src/handlers/index.ts",
    "./src/routes/index.ts",
    "./src/utility/index.ts",
    // "./src/middleware/index.ts",
    "./src/schema/index.ts",
    "./src/resources/index.ts",
  ],
  outdir: "dist/src",
  bundle: true,
  platform: "node",
  // assetNames: 'dist/output/[name].[ext]',
  // resolveExtensions:['.ts','.json'],
  external: ["@aws-sdk/client-kms", "prisma", "@prisma/client", "aws-lambda","yup"], // This ensures aws-sdk is treated as an external dependency
  outExtension: {
    ".js": ".mjs",
  },
  target: "ES2022", // or whatever your Node.js target version is
  sourcemap: false,
  format: "esm",
  splitting: true, // Enable code splitting to generate separate output files
  chunkNames: "./chunks/[name]-[hash]", // Optional: define naming pattern for chunks
}).catch(() => process.exit(1));
