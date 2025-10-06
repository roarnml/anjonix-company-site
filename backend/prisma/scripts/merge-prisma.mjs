// scripts/merge-prisma.mjs
import fs from "fs";
import path from "path";

const prismaDir = path.join(process.cwd(), "prisma");
const modulesDir = path.join(prismaDir, "modules");
const baseSchema = path.join(prismaDir, "schema.prisma");
const outputSchema = path.join(prismaDir, "schema.generated.prisma");

// Read base schema (datasource + generator)
let content = fs.readFileSync(baseSchema, "utf8");

// Collect all .prisma files in modules
const files = fs
  .readdirSync(modulesDir)
  .filter(f => f.endsWith(".prisma"))
  .sort(); // keep order consistent (enums first if needed)

// Merge modules
for (const file of files) {
  const moduleContent = fs.readFileSync(path.join(modulesDir, file), "utf8");
  content += "\n\n" + moduleContent;
}

// Write merged schema
fs.writeFileSync(outputSchema, content);
console.log("✅ Prisma schema merged into schema.generated.prisma");
