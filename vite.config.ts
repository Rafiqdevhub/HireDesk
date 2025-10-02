/// <reference types="vitest" />
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(({ command, mode }) => {
  const isTest = mode === "test";
  const plugins = [tailwindcss(), tsconfigPaths()];

  // Only add React Router plugin in non-test environments
  if (!isTest) {
    plugins.push(reactRouter());
  }

  return {
    plugins,
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./app"),
        "@components": path.resolve(__dirname, "./app/components"),
        "@routes": path.resolve(__dirname, "./app/routes"),
        "@utils": path.resolve(__dirname, "./app/utils"),
        "@lib": path.resolve(__dirname, "./app/lib"),
        "@hooks": path.resolve(__dirname, "./app/hooks"),
        "@types": path.resolve(__dirname, "./app/types"),
        "@assets": path.resolve(__dirname, "./app/assets"),
        "@styles": path.resolve(__dirname, "./app/styles"),
        "@public": path.resolve(__dirname, "./public"),
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: [
        "./__tests__/setup/test-setup.ts",
        "./__tests__/setup/jsdom-setup.ts",
        "./__tests__/setup/react-testing-library.ts",
      ],
      include: [
        "**/*.{test,spec}.{js,ts,jsx,tsx}",
        "__tests__/**/*.{js,ts,jsx,tsx}",
      ],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/.{idea,git,cache,output,temp}/**",
        "__tests__/setup/**",
        "__tests__/mocks/**",
        "__tests__/utils/**",
      ],
      globals: true,
      css: true,
      pool: "forks",
      poolOptions: {
        forks: {
          singleFork: true,
        },
      },
      environmentOptions: {
        jsdom: {
          resources: "usable",
        },
      },
    },
  };
});
