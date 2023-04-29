import inquirer from "inquirer";
import { deleteRepository, listAllRepositories } from "../github/github.js";
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
    const repos = await listAllRepositories()
    repos.forEach(repo => console.log(repo))

    await continuePrompt()
}


export const deleteUserRepo = async () => {
    const choices = await listAllRepositories()
    if (choices.length !== 0) {
        const choice = await inquirer.prompt([{
            type: "list",
            name: "choice",
            message: "Select a repository that you want to delete",
            choices: [...choices]
        }])

        await deleteRepository(choice.choice)
    }
    else {
        console.log("You have no repositories to delete! You have to create one to be able to delete one :D");
    }
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
            await deleteUserRepo();
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