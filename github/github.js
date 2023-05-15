import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import { checkRepoFolder, createLocalDirectory } from './helpers/createFiles.js';
import { validateRepositoryCreation } from './errorHandling/handleGithub.js';
import { createUserRepoError, listRepoErrors, cloneRepoErrors, deleteRepoErrors } from "./errorHandling/errorException.js"
import { execSync } from "child_process";
dotenv.config();

const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN || null
const octokit = new Octokit({ auth: GITHUB_AUTH_TOKEN });
const owner = process.env.GITHUB_USERNAME

export const createRepository = async (repositoryName, isPrivate) => {
    let repositoryUrl = null;
    try {
        validateRepositoryCreation(repositoryName, isPrivate)
        const response = await octokit.repos.createForAuthenticatedUser({
            name: repositoryName,
            private: isPrivate,
        });

        repositoryUrl = response.data.html_url;
        console.log('Successfully created repository: \x1b[1m%s\x1b[0m', repositoryUrl);
        createLocalDirectory(repositoryName, repositoryUrl)
    } catch (error) {
        createUserRepoError(error)
    }


}
export const listAllRepositories = async () => {
    let repos = []
    try {
        const response = await octokit.repos.listForAuthenticatedUser()
        response.data.forEach(repo => repos.push(repo.name))
        return repos

    } catch (error) {
        listRepoErrors(error)
    }

}

export const deleteRepository = async (repoName) => {
    try {
        await octokit.repos.delete({
            owner: owner,
            repo: repoName
        })
        console.log(`Sucessfully deleted repository:${repoName}`);
    } catch (error) {
        deleteRepoErrors(error)
    }

}


export const cloneRepository = async (owner, repoName) => {

    try {
        const { data } = await octokit.repos.get({
            owner,
            repo: repoName,
        });
        const cloneUrl = data.clone_url;
        const localPath = "./repositories"
        await checkRepoFolder()
        execSync(`git clone ${cloneUrl} ${localPath}`);
        console.log(`Repository cloned to localPath`);

    } catch (error) {
        cloneRepoErrors(error)
    }

}
