import fs from 'fs';
import { exec } from 'child_process';
export function createLocalDirectory(repositoryName, repositoryUrl) {

    const localFolder = `./repositories/${repositoryName}`
    const gitInitCmd = `cd ${localFolder} && git init`;
    console.log(`${repositoryUrl}.git`)
    fs.mkdir(localFolder, (error) => {
        if (error) {
            console.error(error)
            return
        }
    })
    console.log(`${localFolder} folder created successfully!`);
    exec(`cd ${localFolder} && git init `, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        exec(gHRemoteBranchCommand, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`GitHub remote branch added!`);
            console.log(`Change to that folder to be able to code. Happy Coding!`);
        });
    });




}