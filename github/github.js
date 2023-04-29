import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import { createLocalDirectory } from './helpers/createFiles.js';
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
        validateRepositoryCreation(repositoryName, isPrivate)
        // Create the repository on GitHub
        const response = await octokit.repos.createForAuthenticatedUser({
            name: repositoryName,
            private: isPrivate,
        });

        // Set the success flag and message
        success = true;
        repositoryUrl = response.data.html_url;
        console.log('Successfully created repository: \x1b[1m%s\x1b[0m', repositoryUrl);
        createLocalDirectory(repositoryName, repositoryUrl)


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


export const listAllRepositories = async () => {
    let success = false;
    let errorMessage = null;
    let repos = []
    try {
        const response = await octokit.repos.listForAuthenticatedUser()
        response.data.forEach(repo => repos.push(repo.name))
        success = true;
        return repos

    } catch (error) {
        if (error.status === 401) {
            errorMessage = 'Authentication error: Please check your GitHub token.';
        } else if (error.status === 422) {
            errorMessage = 'Error listing repositories';
        } else {
            errorMessage = 'Error listing repositories';
        }
    }
    if (!success) {
        console.error(errorMessage);
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
        if (error.status == 404) {
            console.log("Unable to delete repository because it does not exist... Check the input please!");
        }
        if (error.status == 403) {
            console.log("Higher level of authorization needed to delete a repo. Check with your issued Github token");
        }
        console.log("Error while deleting repository");
    }

}
export const cloneRepo = () => {
    try { } catch (error) { }

}

export const manageRepoUsers = () => {
    try { } catch (error) { }

}