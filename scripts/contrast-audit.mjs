import fs from "fs";

/**
 * Contrast audit for the theme tokens.
 * Checks the pairs that carry text in real components and prints a corrected
 * value for any pair below WCAG AA (4.5:1 for normal text).
 */

const css = fs.readFileSync("src/design/themes.css", "utf8");

const hex = (v) => {
  let h = v.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const toHex = (c) =>
  "#" + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
const lum = (c) => {
  const a = c.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};
const ratio = (a, b) => {
  const l1 = lum(a);
  const l2 = lum(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
};
const fix = (col, bg, target = 4.6) => {
  const c = hex(col);
  const b = hex(bg);
  const toward = lum(b) > 0.4 ? [0, 0, 0] : [255, 255, 255];
  for (let t = 0; t <= 1.001; t += 0.01) {
    const cand = c.map((v, i) => v + (toward[i] - v) * t);
    if (ratio(cand, b) >= target) return `${toHex(cand)} (${ratio(cand, b).toFixed(2)})`;
  }
  return toHex(toward);
};

let failures = 0;

for (const m of css.matchAll(/\[data-theme="([a-z]+)"\]\s*\{([\s\S]*?)\n\}/g)) {
  const [, name, body] = m;
  const get = (token) => {
    const match = body.match(new RegExp(`--pk-${token}:\\s*(#[0-9a-fA-F]{3,8})`));
    return match ? match[1] : null;
  };

  const bg = get("bg");
  const subtle = get("bg-subtle");
  const faint = get("fg-faint");
  const muted = get("fg-muted");
  const accent = get("accent");
  const accentFg = get("accent-fg");

  if (!bg || !faint || !accent || !accentFg || !muted || !subtle) {
    console.log(name, "could not parse tokens");
    continue;
  }

  const checks = [
    ["faint on bg", faint, bg],
    ["faint on subtle", faint, subtle],
    ["muted on bg", muted, bg],
    ["accent button", accent, accentFg],
    ["accent text on bg", accent, bg],
  ];

  const notes = [];
  for (const [label, fg, back] of checks) {
    const r = ratio(hex(fg), hex(back));
    if (r < 4.5) {
      failures += 1;
      notes.push(`${label} ${r.toFixed(2)} ${fg} -> ${fix(fg, back)}`);
    }
  }

  console.log(name.padEnd(11), notes.length ? notes.join("\n            ") : "ok");
}

console.log(`\n${failures} pair(s) below WCAG AA`);
process.exit(failures > 0 ? 1 : 0);
