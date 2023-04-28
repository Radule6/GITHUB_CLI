import inquirer from "inquirer";
export const createRepoCommand = async () => {
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
export const listUserRepos = async () => {
    await listAllRepositories()
    await continuePrompt()
}

export const mainMenu = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'command',
            message: 'Select a command:',
            choices: [
                'create-repo',
                'clone-repo',
                'delete-repo',
                'list-repos',
                'manage-users',
                'exit'
            ],
        },
    ]);
    return answers.command;
};


export const handleCommand = async (command) => {
    switch (command) {
        case 'create-repo':
            await createRepoCommand();
            break;
        case 'list-repos':
            await listUserRepos();
            break;
        case 'delete-repo':
            console.log('Thank you for using the GitHub CLI tool. Goodbye!');
            break;
        case 'exit':
            console.log('Thank you for using the \x1b[1m%s\x1b[0m tool. Goodbye!', "Github CLI");
            break;
        default:
            console.log(`Unknown command: ${command}`);
            break;
    }
};

export const continuePrompt = async () => {
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