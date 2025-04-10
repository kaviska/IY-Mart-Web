import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react-hooks/exhaustive-deps": "off", // Disable missing dependency warnings for useEffect
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variable errors
      "@typescript-eslint/no-explicit-any": "off", // Disable errors for using 'any' type
      "@next/next/no-img-element": "off", // Disable warnings for using <img> instead of <Image />
    },
  },
];

export default eslintConfig;