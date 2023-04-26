#!/usr/bin/env node --experimental-modules
import inquirer from 'inquirer'
import { createRepository } from './github/github.js';

import { createLocalDirectory } from "./github/helpers/createLocalDirectory.js";
const createRepoCommand = async () => {
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'repoName',
            message: 'Enter the name of the repository:',
            validate: (value) => {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter a repository name.';
                }
            },
        },
        {
            type: 'confirm',
            name: 'isPrivate',
            message: 'Should the repository be private?',
            default: false,
        },
    ])

    await createRepository(userInput.repoName, userInput.isPrivate)
    await continuePrompt()
}


const mainMenu = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'command',
            message: 'Select a command:',
            choices: [
                'create-repo',
                'list-repos',
                'delete-repo',
                // Add more command choices here
            ],
        },
    ]);
    return answers.command;
};


const handleCommand = async (command) => {
    switch (command) {
        case 'create-repo':
            await createRepoCommand();
            break;
        case 'delete':
            console.log('Thank you for using the GitHub CLI tool. Goodbye!');
            break;
        case 'exit':
            console.log('Thank you for using the GitHub CLI tool. Goodbye!');
            break;
        default:
            console.log(`Unknown command: ${command}`);
            break;
    }
};

const continuePrompt = async () => {
    const prompt = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Do you want to continue or exit the application?',
            default: true,
        },
    ]);

    if (prompt.continue) {
        //User wants to continue, display main menu
        const command = await mainMenu();
        await handleCommand(command);
    } else {
        await handleCommand("exit")
    }
}


const command = await mainMenu();
await handleCommand(command)




