#! /usr/bin/env bun

import { Command } from "commander";
import { generateCommand } from "./commands/generate";

const program = new Command();

program
  .name("docwright")
  .description("Generate structured UI documentation from scenario files");

program.addCommand(generateCommand);

program.parse();
