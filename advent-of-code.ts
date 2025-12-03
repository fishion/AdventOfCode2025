#!/usr/bin/env node

import { execSync } from "node:child_process"

execSync(
  `/usr/bin/env npx tsx day${process.argv[2].padStart(2, "0")}/index.ts ${process.argv.slice(3).join(" ")}`,
  { stdio: "inherit" },
)
