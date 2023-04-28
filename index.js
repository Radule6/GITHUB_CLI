#!/usr/bin/env node --experimental-modules
import { mainMenu, handleCommand } from "./commands/commands.js";
import { createEnv, createLocalDirectory } from "./github/helpers/createLocalDirectory.js";


createLocalDirectory("TEST", "TEST")

/*
await createEnv()
const command = await mainMenu();
await handleCommand(command)

*/