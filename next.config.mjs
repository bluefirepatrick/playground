import { createTheme } from "@mui/material";
import { withPigment } from "@pigment-css/nextjs-plugin";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    webpackBuildWorker: true,
  }
};

/**
 * @type {import('@pigment-css/nextjs-plugin').PigmentOptions}
 */
const pigmentConfig = {
  transformLibraries: ["@mui/material"],
  theme: createTheme({
    palette: {
      mode: "dark",
    },
  }),
};
export default withPigment(nextConfig, pigmentConfig);
