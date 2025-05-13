import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";

const copyConstantsFiles = () => {
  const sourceDir = join(process.cwd(), "apps", "server", "src", "constants");
  const targetDir = join(
    process.cwd(),
    "apps",
    "frontend",
    "src",
    "constants",
    "from-api"
  );

  // Create target directory if it doesn't exist
  mkdirSync(targetDir, { recursive: true });

  const files = readdirSync(sourceDir);

  files.forEach((file) => {
    const sourcePath = join(sourceDir, file);
    const targetPath = join(targetDir, file);

    const content = readFileSync(sourcePath, "utf-8");
    writeFileSync(targetPath, content);
    console.log(`Copied ${file} to frontend constants`);
  });
};

copyConstantsFiles();
