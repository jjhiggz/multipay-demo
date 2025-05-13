import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

let a = 0;
/** @type {import("eslint").Linter.FlatConfig} */
const privateImports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow importing private (underscore-prefixed) functions from outside sibling files",
      category: "Best Practices",
      recommended: false,
    },
    schema: [], // no options
    messages: {
      noExternalPrivateImport:
        "Private function '{{name}}' can only be imported from sibling files.",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        // Only check relative imports
        if (!node.source.value.startsWith(".")) return;

        // Get the import path (e.g. './foo', '../foo')
        const importPath = node.source.value;

        // Is it a sibling? (starts with './' but not '../')
        const isSibling = (() => {
          if (!importPath.startsWith("./")) {
            return false;
          }

          if (importPath.split("/").length > 2) {
            return false;
          }

          return true;
        })();
        console.log({ isSibling, importPath });

        const badSpecifiers = node.specifiers.filter((specifier) => {
          return specifier.imported?.name.startsWith("_") && !isSibling;
        });

        for (const specifier of badSpecifiers) {
          context.report({
            node: specifier,
            messageId: "noExternalPrivateImport",
            data: { name: specifier.imported.name },
          });
        }
      },
    };
  },
};
export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    rules: {
      "custom/violate-private-imports": "error",
    },
    plugins: {
      custom: {
        rules: {
          "violate-private-imports": privateImports,
        },
      },
    },
  },
]);
