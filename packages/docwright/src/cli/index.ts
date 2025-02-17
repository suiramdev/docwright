#! /usr/bin/env bun

import { version } from "../../package.json";
import { Command } from "commander";
import { generateCommand } from "./commands/generate";

const program = new Command();

program
  .name("docwright")
  .description("Generate structured UI documentation from scenario files")
  .version(version);

program.addCommand(generateCommand);

program.parse();
