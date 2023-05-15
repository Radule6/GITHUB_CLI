export function createUserRepoError(error) {
    if (error.status === 401) {
        console.log('Authentication error: Please check your GitHub token.');
    } else if (error.status === 422) {
        console.log('Error creating repository: Possible duplicate repository name.');
    } else {
        console.log(`Error creating repository: ${error.message}`);
    }
}
export function listRepoErrors(error) {
    if (error.status === 401) {
        console.log('Authentication error: Please check your GitHub token.');
    } else if (error.status === 422) {
        console.log('Error listing repositories');
    } else {
        console.log('Error listing repositories');
    }
}
export function cloneRepoErrors(error) {
    switch (error.status) {
        case 401:
            console.log('Authentication error: Please check your GitHub token.');
            break;
        case 404:
            console.log('Repository not found. Check your input again.');
            break;
        case 422:
            console.log('Error cloning repository. Please try again later.');
            break;
        default:
            console.log('Error cloning repository');
    }

}

export function deleteRepoErrors(error) {
    switch (error.status) {
        case 401:
            console.log('Authentication error: Please check your GitHub token.');
            break;
        case 403:
            console.log("Higher level of authorization needed to delete a repo. Check with your issued GitHub token.");
            break;
        case 404:
            console.log('Repository not found. Check your input again.');
            break;
        case 422:
            console.log('Error deleting repository. Please try again later.');
            break;
        default:
            console.log('Error deleting repository');
    }

}