import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const projectRoot = process.cwd();
const fixtureRoot = fs.mkdtempSync(
  path.join(os.tmpdir(), "premium-kit-consumer-"),
);
const fixturesRoot = path.join(fixtureRoot, "fixtures");
const port = 3200 + (process.pid % 400);
const origin = `http://127.0.0.1:${port}`;
const npmCommand = "npm";
const npxCommand = "npx";
let server;
let succeeded = false;

function write(relativePath, content) {
  const absolutePath = path.join(fixtureRoot, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content);
}

function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    cwd,
    env: { ...process.env, CI: "1" },
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} exited with status ${result.status}`);
  }
}

function createFixture(name, useSrc) {
  const fixturePath = path.join(fixturesRoot, name);
  const sourceRoot = useSrc ? "src/" : "";
  const aliasTarget = useSrc ? "./src/*" : "./*";

  write(
    `fixtures/${name}/package.json`,
    `${JSON.stringify(
      {
        name: `premium-kit-fixture-${name}`,
        version: "1.0.0",
        private: true,
        scripts: { build: "next build", typecheck: "tsc --noEmit" },
        dependencies: {
          next: "16.2.11",
          react: "19.2.4",
          "react-dom": "19.2.4",
        },
        devDependencies: {
          "@tailwindcss/postcss": "^4",
          "@types/node": "^20",
          "@types/react": "^19",
          "@types/react-dom": "^19",
          postcss: "^8.5.22",
          tailwindcss: "^4",
          typescript: "^5",
        },
      },
      null,
      2,
    )}\n`,
  );
  write(
    `fixtures/${name}/components.json`,
    `${JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: true,
        tsx: true,
        tailwind: {
          config: "",
          css: `${sourceRoot}app/globals.css`,
          baseColor: "neutral",
          cssVariables: true,
          prefix: "",
        },
        iconLibrary: "lucide",
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
          ui: "@/components/ui",
          lib: "@/lib",
          hooks: "@/hooks",
        },
      },
      null,
      2,
    )}\n`,
  );
  write(
    `fixtures/${name}/tsconfig.json`,
    `${JSON.stringify(
      {
        compilerOptions: {
          target: "ES2017",
          lib: ["dom", "dom.iterable", "esnext"],
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "react-jsx",
          plugins: [{ name: "next" }],
          paths: { "@/*": [aliasTarget] },
        },
        include: [
          "next-env.d.ts",
          "**/*.ts",
          "**/*.tsx",
          ".next/types/**/*.ts",
        ],
        exclude: ["node_modules"],
      },
      null,
      2,
    )}\n`,
  );
  write(
    `fixtures/${name}/next-env.d.ts`,
    '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n',
  );
  write(
    `fixtures/${name}/postcss.config.mjs`,
    'export default { plugins: { "@tailwindcss/postcss": {} } };\n',
  );
  write(
    `fixtures/${name}/${sourceRoot}app/globals.css`,
    '@import "tailwindcss";\n',
  );
  write(
    `fixtures/${name}/${sourceRoot}app/layout.tsx`,
    `import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
  );
  write(
    `fixtures/${name}/${sourceRoot}app/page.tsx`,
    `export default function Page() {
  return <main>Premium Kit consumer fixture</main>;
}
`,
  );

  return { fixturePath, sourceRoot };
}

function verifyInstallation({ fixturePath, sourceRoot }) {
  const expected = [
    `${sourceRoot}components/primitives/button.tsx`,
    `${sourceRoot}components/primitives/layout.tsx`,
    `${sourceRoot}components/primitives/reveal.tsx`,
    `${sourceRoot}components/primitives/motion-scope.tsx`,
    `${sourceRoot}components/blocks/hero-split.tsx`,
    `${sourceRoot}components/blocks/content-index.tsx`,
    `${sourceRoot}components/blocks/article-layout.tsx`,
    `${sourceRoot}components/blocks/checkout-form.tsx`,
    `${sourceRoot}lib/cn.ts`,
  ];
  for (const relativePath of expected) {
    if (!fs.existsSync(path.join(fixturePath, relativePath))) {
      throw new Error(`Installed fixture is missing ${relativePath}`);
    }
  }

  const globalsPath = path.join(fixturePath, `${sourceRoot}app/globals.css`);
  const globals = fs.readFileSync(globalsPath, "utf8");
  for (const marker of ["--pk-bg", "@theme inline", ".pk-prose"]) {
    if (!globals.includes(marker)) {
      throw new Error(
        `${path.relative(fixturePath, globalsPath)} is missing ${marker}`,
      );
    }
  }
}

async function waitForRegistry() {
  const deadline = Date.now() + 30_000;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${origin}/r/registry.json`);
      if (response.ok) return;
      lastError = new Error(`registry responded ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Registry server did not become ready: ${lastError}`);
}

async function stopServer() {
  if (!server || server.exitCode !== null) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
    });
  } else {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      server.kill("SIGTERM");
    }
  }
}

async function main() {
  if (!fs.existsSync(path.join(projectRoot, ".next", "BUILD_ID"))) {
    throw new Error(
      "Run `npm run build` before the consumer fixture; it tests the production registry server.",
    );
  }

  const withSrc = createFixture("with-src", true);
  const withoutSrc = createFixture("without-src", false);
  write(
    "package.json",
    `${JSON.stringify(
      {
        name: "premium-kit-consumer-fixtures",
        private: true,
        workspaces: ["fixtures/*"],
      },
      null,
      2,
    )}\n`,
  );

  run(npmCommand, ["install", "--ignore-scripts", "--no-audit"], fixtureRoot);

  console.log(`\nStarting production registry at ${origin}`);
  server = spawn(
    npmCommand,
    ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: projectRoot,
      env: { ...process.env, NODE_ENV: "production" },
      stdio: "inherit",
      detached: process.platform !== "win32",
      shell: process.platform === "win32",
    },
  );
  await waitForRegistry();

  const representativeItems = [
    "button",
    "hero-split",
    "content-index",
    "article-layout",
    "checkout-form",
  ].map((slug) => `${origin}/r/${slug}.json`);

  for (const fixture of [withSrc, withoutSrc]) {
    console.log(`\nInstalling into ${path.basename(fixture.fixturePath)} fixture`);
    run(
      npxCommand,
      [
        "--yes",
        "shadcn@4.14.1",
        "add",
        ...representativeItems,
        "--yes",
        "--overwrite",
      ],
      fixture.fixturePath,
    );
    verifyInstallation(fixture);
    run(npmCommand, ["run", "typecheck"], fixture.fixturePath);
    run(npmCommand, ["run", "build"], fixture.fixturePath);
  }

  succeeded = true;
  console.log("\nConsumer registry fixtures: OK");
}

try {
  await main();
} finally {
  await stopServer();
  if (succeeded) {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
  } else {
    console.error(`\nFixture preserved for inspection: ${fixtureRoot}`);
  }
}
