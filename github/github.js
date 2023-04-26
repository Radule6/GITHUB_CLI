import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import { createLocalDirectory } from './helpers/createLocalDirectory.js';
import { validateRepositoryCreation } from './errorHandling/handleGithub.js';
dotenv.config();


const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN || null
const octokit = new Octokit({ auth: GITHUB_AUTH_TOKEN });
const owner = process.env.GITHUB_USERNAME



export const createRepository = async (repositoryName, isPrivate) => {
    let success = false;
    let errorMessage = null;
    let repositoryUrl = null;

    try {
        // Create the repository on GitHub
        const response = await octokit.repos.createForAuthenticatedUser({
            name: repositoryName,
            private: isPrivate,
        });

        // Set the success flag and message
        success = true;
        repositoryUrl = response.data.html_url;
        console.log(`Successfully created repository: ${repositoryUrl}`);
        await createLocalDirectory(repositoryName, repositoryUrl)


    } catch (error) {
        if (error.status === 401) {
            errorMessage = 'Authentication error: Please check your GitHub token.';
        } else if (error.status === 422) {
            errorMessage = 'Error creating repository: Possible duplicate repository name.';
        } else {
            errorMessage = `Error creating repository: ${error.message}`;
        }
    }

    if (!success) {
        console.error(errorMessage);
    }
}

/*
export const listAllRepositories = async () => {
    try {
        const response = await octokit.repos.listForAuthenticatedUser()
        response.data.forEach(repo => console.log(repo.name));
    } catch (error) { }
}

export const cloneRepo = () => {
    try { } catch (error) { }

}
export const deleteRepository = async (owner, repoName) => {
    try {
        await octokit.repos.delete({
            owner: owner,
            repo: repoName
        })
    } catch (error) {

    }

}
export const manageRepoUsers = () => {
    try { } catch (error) { }

}
*/