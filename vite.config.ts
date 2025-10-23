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
        "@app-types": path.resolve(__dirname, "./types"),
        "@app-types/components": path.resolve(__dirname, "./types/components"),
        "@app-types/index": path.resolve(__dirname, "./types/index"),
        "@public": path.resolve(__dirname, "./public"),
        "@components": path.resolve(__dirname, "./app/components"),
        "@routes": path.resolve(__dirname, "./app/routes"),
        "@utils": path.resolve(__dirname, "./app/utils"),
        "@hooks": path.resolve(__dirname, "./app/hooks"),
        "@contexts": path.resolve(__dirname, "./app/contexts"),
        "@data": path.resolve(__dirname, "./app/data"),
        "@services": path.resolve(__dirname, "./app/services"),
        "@analysis": path.resolve(__dirname, "./app/components/analysis"),
        "@auth": path.resolve(__dirname, "./app/components/auth"),
        "@batch": path.resolve(__dirname, "./app/components/batch"),
        "@comparison": path.resolve(__dirname, "./app/components/comparison"),
        "@layout": path.resolve(__dirname, "./app/components/layout"),
        "@modals": path.resolve(__dirname, "./app/components/modals"),
        "@resume": path.resolve(__dirname, "./app/components/resume"),
        "@toast": path.resolve(__dirname, "./app/components/toast"),
        "@ui": path.resolve(__dirname, "./app/components/ui"),
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
