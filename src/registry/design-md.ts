import "server-only";

import { readSource } from "./source";
import { presets, type Preset } from "@/design/presets";

/*
 * DESIGN.md generator.
 *
 * Produces one complete, portable design specification per visual theme, built
 * from the same two files the running site uses: the token defaults in
 * tokens.css and the per-theme overrides in themes.css. Nothing here is a
 * second copy of the palette that could drift; the values are read at build
 * time from the CSS that ships.
 *
 * The output is aimed at an AI agent or a developer who needs the theme as
 * words and numbers, not as a rendered page: colour roles, type system, shape,
 * spacing, motion budget, imagery direction and the do/do-not rules implied by
 * the design read.
 */

type Tokens = Record<string, string>;

/** Parses the :root defaults every theme inherits. */
function readDefaults(): Tokens {
  const css = readSource("src/design/tokens.css");
  const root = css.match(/:root\s*\{([\s\S]*?)\n\}/);
  return root ? parseDeclarations(root[1]) : {};
}

/** Parses one theme's override block from themes.css. */
function readThemeTokens(id: string): Tokens {
  const css = readSource("src/design/themes.css");
  const block = css.match(
    new RegExp(`\\[data-theme="${id}"\\]\\s*\\{([\\s\\S]*?)\\n\\}`),
  );
  return block ? parseDeclarations(block[1]) : {};
}

function parseDeclarations(body: string): Tokens {
  const tokens: Tokens = {};
  for (const match of body.matchAll(/(--pk-[a-z-]+):\s*([^;]+);/g)) {
    tokens[match[1].trim()] = match[2].trim();
  }
  return tokens;
}

function dial(value: number, low: string, mid: string, high: string) {
  if (value <= 3) return low;
  if (value <= 6) return mid;
  return high;
}

/** Motion budget in words, driven by the motion dial. */
function motionBudget(motion: number) {
  if (motion <= 3)
    return "Near static. Hover and focus feedback only. No entrance animation, no parallax, no marquee.";
  if (motion <= 6)
    return "Measured. One entrance reveal per section, hover feedback on interactive elements, at most one marquee. Everything collapses under reduced motion.";
  return "Cinematic. Scroll-tied reveals, pointer physics on feature cards and a single hero motion moment are all in budget, provided each one is motivated and degrades under reduced motion.";
}

/** Imagery direction, from the design read and scheme. */
function imageryDirection(preset: Preset) {
  const base =
    preset.scheme === "dark"
      ? "Photography sits on a dark ground, so favour images with their own light source and deep shadows."
      : "Photography sits on a light ground, so favour evenly lit, high-key images that do not fight the paper.";
  return `${base} ${preset.read}`;
}

function px(value: string | undefined, fallback: string) {
  return value ?? fallback;
}

export function designMarkdown(preset: Preset): string {
  const defaults = readDefaults();
  const theme = readThemeTokens(preset.id);
  const token = (name: string) => theme[name] ?? defaults[name] ?? "inherit";

  const colorRoles: [string, string, string][] = [
    ["Background", "--pk-bg", "Page ground. Every section sits on this or its subtle sibling."],
    ["Subtle surface", "--pk-bg-subtle", "Alternating section band, input fill, quiet panels."],
    ["Elevated surface", "--pk-bg-elevated", "Cards and overlays that need to lift off the ground."],
    ["Foreground", "--pk-fg", "Primary text and high-emphasis marks."],
    ["Muted foreground", "--pk-fg-muted", "Body copy, secondary text. Passes AA on the ground."],
    ["Faint foreground", "--pk-fg-faint", "Labels, metadata, captions. Smallest legible role."],
    ["Accent", "--pk-accent", "The single accent. Primary actions and one signal per section."],
    ["Accent foreground", "--pk-accent-fg", "Text on the accent. Always paired to keep contrast."],
    ["Accent soft", "--pk-accent-soft", "Accent tint for emphasis fills that must not shout."],
    ["Line", "--pk-line", "Hairlines, dividers and default borders."],
    ["Strong line", "--pk-line-strong", "Input borders and separators that need more presence."],
  ];

  const colorTable = colorRoles
    .map(([role, name, use]) => `| ${role} | \`${token(name)}\` | \`${name}\` | ${use} |`)
    .join("\n");

  const references = preset.references.map((ref) => `\`${ref}\``).join(", ");

  return `# ${preset.name} — Design System

> Generated from \`src/design/tokens.css\` and \`src/design/themes.css\`. Do not hand-edit;
> regenerate with the theme instead. Apply it with \`data-theme="${preset.id}"\`.

## Identity

${preset.read}

- **Sectors:** ${preset.sectors.join(", ")}
- **Colour scheme:** ${preset.scheme}
- **Reference bar:** ${references}

## Design dials

| Dial | Value | Reading |
| --- | --- | --- |
| Variance | ${preset.variance} / 10 | ${dial(preset.variance, "Symmetric and predictable. Centre-aligned, even columns.", "Offset. Deliberate asymmetry, mixed ratios, some overlap.", "Asymmetric. Broken grids, large empty zones, strong diagonals.")} |
| Motion | ${preset.motion} / 10 | ${dial(preset.motion, "Static.", "Measured.", "Cinematic.")} |
| Density | ${preset.density} / 10 | ${dial(preset.density, "Airy. Gallery spacing, few elements per screen.", "Balanced. Standard application spacing.", "Packed. Tight rhythm, more information per screen.")} |

## Colour

One accent, used on every section. Every text pair below passes WCAG AA; do not
introduce a second accent or a hardcoded colour in a component.

| Role | Value | Token | Use |
| --- | --- | --- | --- |
${colorTable}

## Typography

- **Display face:** ${preset.display.name} — ${preset.display.why}
- **Display token:** \`${token("--pk-font-display")}\`
- **Body face:** \`${token("--pk-font-body")}\`
- **Mono face:** \`${token("--pk-font-mono")}\`
- **Display weight:** ${token("--pk-display-weight")}
- **Display tracking:** ${token("--pk-display-tracking")}
- **Display leading:** ${token("--pk-display-leading")}
- **Optical scale:** ${px(theme["--pk-display-scale"] ?? defaults["--pk-display-scale"], "1")} (corrects x-height so headings match across faces)

Headings use the \`display-1\` / \`display-2\` / \`display-3\` utilities. Body copy stays
at the muted foreground for calm hierarchy; reserve the full foreground for emphasis.

## Shape

- **Radius:** \`${token("--pk-radius")}\` (cards, buttons)
- **Small radius:** \`${token("--pk-radius-sm")}\` (inputs, chips)
- **Pill radius:** \`${token("--pk-radius-pill")}\`
- **Shadow:** \`${token("--pk-shadow")}\`
- **Lifted shadow:** \`${token("--pk-shadow-lift")}\`

Pick this one radius system and hold it across the whole page. A pill button on a
square-cornered card is broken, not eclectic.

## Spacing and rhythm

- **Section rhythm:** \`${token("--pk-section-y")}\` between major sections (tightens on mobile)
- **Container width:** \`${token("--pk-container")}\`
- **Reading measure:** \`${token("--pk-measure")}\`

Density is ${preset.density} / 10, so ${dial(preset.density, "err towards more whitespace than feels necessary.", "keep standard application spacing.", "let the layout run dense, but never at the cost of the reading measure.")}

## Motion

- **Duration:** \`${token("--pk-dur")}\` (fast: \`${token("--pk-dur-fast")}\`)
- **Easing:** \`${token("--pk-ease")}\`
- **Budget:** ${motionBudget(preset.motion)}

Anything above a static budget must honour \`prefers-reduced-motion\`.

## Imagery

${imageryDirection(preset)}

Never invent customer logos, metrics or testimonials for the imagery to sit beside.

## Do

- Use exactly one accent, on every section, for the primary action and one signal.
- Keep the radius, type scale and spacing rhythm consistent across the page.
- Let the reference bar set the quality target: ${references}.
- Ship real loading, empty, error and success states for anything interactive.

## Do not

- Do not add a second accent or a gradient the tokens do not define.
- Do not mix radius systems or type families for decorative variety.
- Do not exceed the motion budget above, and do not animate without a reason.
- Do not fill the page with placeholder copy or invented proof.
`;
}

export const designThemes = presets.map((preset) => ({
  id: preset.id,
  name: preset.name,
  sectors: preset.sectors,
  scheme: preset.scheme,
  url: `/r/design/${preset.id}.md`,
}));
