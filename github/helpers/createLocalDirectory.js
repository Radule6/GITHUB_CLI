import fs from 'fs';
import { exec } from 'child_process';
import inquirer from 'inquirer';
export async function createLocalDirectory(repositoryName, repositoryUrl) {
    const repositoriesFolder = "./repositories1"
    //need to create repositories folder, then check if it exists etc
    if (!fs.existsSync(repositoriesFolder)) {
        fs.mkdir(repositoriesFolder, (err) => {
            if (err)
                throw err;
            console.log("Created the repositry folder");

        })
    }

    const localFolder = `./${repositoriesFolder}/${repositoryName}`
    const gitInitCmd = `cd ${localFolder} && git init`;
    const gHRemoteBranchCommand = `${repositoryUrl}.git`
    await fs.mkdir(localFolder, (error) => {
        if (error) {
            console.error(error)
            return
        }
    })
    exec(gitInitCmd, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }

    });
    console.log("Local folder created and configured to be a Git repository.");
    console.log(`To start using your git folder change directory to ${localFolder} and run this command git remote add origin \x1b[1m%s\x1b[0m `, gHRemoteBranchCommand);
}

export async function createEnv() {
    //if the app is loaded first time it should create a .env file and ask the user to provide its credentials and github auth token with all the necessary privililges

    const file = './.env'

    if (!fs.existsSync(file)) {
        const credentials = await inquirer.prompt([{
            type: "password",
            name: "GITHUB_AUTH_TOKEN",
            message: "Please provide with a valid GithHub authorization token:"
        }, {
            type: "input",
            name: "GITHUB_USERNAME",
            message: "Please provide a your valid Github Username:"
        }])
        const envString = `GITHUB_AUTH_TOKEN=${credentials.GITHUB_AUTH_TOKEN}\nGITHUB_USERNAME=${credentials.GITHUB_USERNAME}`
        writeToFile(file, envString)
    }


    return;
}

function writeToFile(name, data) {
    fs.writeFile(name, data, (err) => {
        if (err) {
            console.log("Unable to create file");
            throw err;
        }
        console.log("Data has been written to file successfully.");
    });
}
