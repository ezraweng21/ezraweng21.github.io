import { FlatCompat } from "@eslint/eslintrc";
import nextVitals from "eslint-config-next/core-web-vitals.js";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const config = [...compat.config(nextVitals)];

export default config;
