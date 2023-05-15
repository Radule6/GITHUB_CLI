#!/usr/bin/env node --experimental-modules
import { mainMenu, handleCommand } from "./commands/commands.js";
import { checkEnv } from "./github/helpers/createFiles.js";

await checkEnv()
const command = await mainMenu();
await handleCommand(command)

