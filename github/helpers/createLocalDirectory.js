import fs from 'fs';
import { exec } from 'child_process';
export function createLocalDirectory(repositoryName, repositoryUrl) {

    const localFolder = `./repositories/${repositoryName}`
    const gitInitCmd = `cd ${localFolder} && git init`;
    const gHRemoteBranchCommand = `${repositoryUrl}.git`
    console.log(`${repositoryUrl}.git`)
    fs.mkdir(localFolder, (error) => {
        if (error) {
            console.error(error)
            return
        }
    })
    console.log(`${localFolder} folder created successfully!`);
    exec(gitInitCmd, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }

    });
    console.log("We have configured this folder to be a Git repository.");
    console.log(`To start using your git folder change directory to ${localFolder} and run this command git remote add origin ${gHRemoteBranchCommand}`);




}