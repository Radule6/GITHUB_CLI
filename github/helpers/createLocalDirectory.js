import fs from 'fs';
import { exec } from 'child_process';
export function createLocalDirectory(repositoryName, repositoryUrl) {
    //need to create repositories folder, then check if it exists etc

    const localFolder = `./repositories/${repositoryName}`
    const gitInitCmd = `cd ${localFolder} && git init`;
    const gHRemoteBranchCommand = `${repositoryUrl}.git`
    fs.mkdir(localFolder, (error) => {
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