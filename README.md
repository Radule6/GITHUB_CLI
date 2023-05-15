# GitHub CLI Tool

This is a command-line tool for performing various GitHub operations using the GitHub API.

## Available Methods

### 1. Create

The `create-repo` command allows you to create a new GitHub repository.
It will ask you to provide the name of the repository you want to create.
It will ask you if you want it private or public

### 2.

The `clone-repo` command allows you to clone github repositories to this project.
This project utilizes a repositories folder where it will store and hold all the data from your repositories that you create
It will ask you to provide the name of a user you want to clone a repo from.
It will ask you to provide teh name of the repo

### 3.

The `delete-repo` command allows you to delete your repositories.
It will provide you with the list of your repositories and after chosing it will delete the repository you want.

### 4.

The `list-repo` command allows you to list all the repositories that you have on Github.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.

## Installation

1. Clone this repository.
2. Install the dependencies by running `npm install`.
3. Configure the GitHub access token by runnig the application first time. You can get your Github access token in the settings on github.com
4. Run the tool using `node run githubCli

## License

This project is licensed under the [MIT License](LICENSE).
