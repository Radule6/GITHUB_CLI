/*
*
*This method checks the validity of the parametrs that are needed for creating a repository
*
*/
export function validateRepositoryCreation(repositoryName, isPrivate) {
    if (!repositoryName) {
        console.error('Repository name is required.');
        return;
    }

    if (typeof isPrivate !== 'boolean') {
        console.error('isPrivate argument must be a boolean value.');
        return;
    }

    return true;
}