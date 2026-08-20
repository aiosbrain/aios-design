import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Component tests for @aios-alpha/ui.
//
// Deliberately NOT the root vite.config.ts: that one exists to serve the KitchenSink
// preview and pulls in Tailwind, which these tests never need. The suite asserts
// contract invariants over rendered output (brand ink, variant APIs, export surface),
// not compiled CSS — Tailwind class names are asserted as the strings the components
// emit, which is what a consumer's own Tailwind build compiles.
//
// Coverage instruments the PUBLISHED surface only: everything reachable from index.ts.
// src/ (the local preview app) and this config are excluded — they are not shipped.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["test/**/*.test.{ts,tsx}"],
    setupFiles: ["test/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["index.ts", "components/**/*.{ts,tsx}", "lib/**/*.ts"],
      reporter: ["text-summary", "lcov"],
      reportsDirectory: "coverage",
    },
  },
});
