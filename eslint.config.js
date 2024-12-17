// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";


// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   { files: ["**/*.{js,mjs,cjs,ts}"] },
//   { languageOptions: { globals: globals.browser } },
//   {
//     rules: {
//       eqeqeq: "off",
//       "no-unused-vars": "error",
//       "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
//       "no-undef": "error"
//     },
//   },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   {
//     ignores: ["node_modules", "dist"],
//   },

// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"], // JavaScript এবং TypeScript ফাইল সাপোর্ট
    languageOptions: {
      parser: parser, // TypeScript ফাইল পার্স করার জন্য
      globals: globals.browser, // ব্রাউজার গ্লোবাল ভেরিয়েবল
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier, // Prettier প্লাগইন যুক্ত করা
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // JavaScript সুপারিশকৃত রুলস
      ...tseslint.configs.recommended.rules, // TypeScript সুপারিশকৃত রুলস
      "prettier/prettier": "error", // Prettier নিয়ম লিন্টিং-এর মধ্যে যুক্ত
    },
  },
  prettierConfig, // Prettier কনফিগারেশন লোড করা
  {
    ignores: ["node_modules", "dist"], // ইগনোর করা ফোল্ডার
  },
];
