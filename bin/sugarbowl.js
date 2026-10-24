#!/usr/bin/env node
// Sugarbowl CLI: an orchestration theatre. Nothing here talks to the network.
const { version } = require("../package.json");

const ci = process.argv.includes("--ci") || !process.stdout.isTTY;
const color = !ci && !process.env.NO_COLOR;
const paint = (code) => (s) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
const honey = paint("38;5;215"), pink = paint("38;5;211"), dim = paint("2"), green = paint("32"), bold = paint("1");
const sleep = (ms) => new Promise((r) => setTimeout(r, ci ? 0 : ms));
const CONSOLE_URL = "https://basmith.net/vibe-hacker/?ref=sugarbowl-cli";

const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

async function step(label, ms, done = "done") {
  if (ci) return console.log(`✓ ${label} ${done}`);
  const end = Date.now() + ms;
  let i = 0;
  while (Date.now() < end) {
    process.stdout.write(`\r${honey(SPINNER[i++ % SPINNER.length])} ${label}`);
    await sleep(80);
  }
  process.stdout.write(`\r${green("✓")} ${label} ${dim(done)}\n`);
}

async function main() {
  console.log(`\n  ${honey(bold("◆ sugarbowl"))} ${dim("v" + version)}  ${dim("the orchestration layer for agent skills")}\n`);
  await step("Detecting agents", 700, "claude-code, codex, cursor (3)");
  await step("Indexing skills", 900, "1,247 skills, 312 MCP servers");
  await step("Warming the honey cache", 800, "viscous");
  await step("Granulating inference", 900, "4,096 crystals");
  await step("Negotiating SkillMesh topology", 1000, "47 agents meshed");
  await step("Dissolving context limits via SSP", 900, "1.2M tokens dissolved");
  await step("Caramelizing RAG", 1200, "golden brown");
  console.log(`\n  ${pink("☕")} ${bold("Orchestration complete.")} Your agents are ready.\n`);
  await sleep(1200);
  console.log(dim("  ...okay, real talk: Sugarbowl is a good-natured honeypot for promo-spam and"));
  console.log(dim("  AI-written recruiter emails. None of the above happened. But you ran it, and"));
  console.log(dim("  that makes you the kind of curious person I would actually like to hear from.\n"));
  console.log(`  ${honey("▶")} Live Agent Console (a real idle game): ${bold(CONSOLE_URL)}\n`);
}

main();
