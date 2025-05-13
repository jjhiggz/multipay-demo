export default {
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
        console.log("IMPORT SOURCE:", node.source.value);
        // Only check relative imports
        if (!node.source.value.startsWith(".")) return;

        // Get the import path (e.g. './foo', '../foo')
        const importPath = node.source.value;

        // Is it a sibling? (starts with './' but not '../')
        const isSibling =
          importPath.startsWith("./") && !importPath.startsWith("../");

        for (const specifier of node.specifiers) {
          if (
            specifier.type === "ImportSpecifier" &&
            specifier.imported.name.startsWith("_") &&
            !isSibling
          ) {
            context.report({
              node: specifier,
              messageId: "noExternalPrivateImport",
              data: { name: specifier.imported.name },
            });
          }
        }
      },
    };
  },
};
