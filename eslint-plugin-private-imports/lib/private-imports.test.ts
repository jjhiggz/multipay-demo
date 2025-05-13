import { test, expect, describe } from "bun:test";
import { ESLint } from "eslint";
import privateImportsRule from "./rules/private-imports.js";

const testPluginName = "private-imports-test";
const ruleId = `${testPluginName}/no-external-private-import`;

const runLint = async (code: string, filename = "src/foo.ts") => {
  const eslint = new ESLint({
    overrideConfig: {
      languageOptions: { ecmaVersion: 2022, sourceType: "module" },
      plugins: {
        [testPluginName]: {
          rules: { "no-external-private-import": privateImportsRule as any },
        },
      },
      rules: { [ruleId]: "error" },
    },
  });
  return await eslint.lintText(code, { filePath: filename });
};

describe("private-imports/no-external-private-import", () => {
  test("allows importing private from sibling", async () => {
    const code = 'import { _foo } from "./bar";';
    const [result] = await runLint(code, "src/foo.ts");
    expect(result.errorCount).toBe(0);
  });

  test("errors on importing private from non-sibling", async () => {
    const code = 'import { _foo } from "../bar";';
    const [result] = await runLint(code, "src/foo.ts");
    expect(result.errorCount).toBe(1);
    expect(result.messages[0].ruleId).toBe(ruleId);
    expect(result.messages[0].message).toContain(
      "can only be imported from sibling files"
    );
  });

  test("ignores non-private imports", async () => {
    const code = 'import { foo } from "../bar";';
    const [result] = await runLint(code, "src/foo.ts");
    expect(result.errorCount).toBe(0);
  });

  //   test("ignores absolute imports", async () => {
  //     const code = 'import { _foo } from "lib/bar";';
  //     const [result] = await runLint(code, "src/foo.ts");
  //     expect(result.errorCount).toBe(0);
  //   });
});
