# Zenenti

## Installation

### Requirements
- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/downloads)
- [VSC](https://code.visualstudio.com/download)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- [Expo Go](https://expo.dev/go)

### Commands

- Install the pre-commit hooks on the root folder.
```sh
npm i
```

- Enter to the folder with the app code
```sh
cd zenenti-app
```

- Install app dependencies
```sh
npm i
```

- Run app on dev mode with expo
```sh
npm start
```

- Open the Expo Go app on your phone and read the QR code to see the app.

## Development Guidelines

We work with a trunk-based development. The develop features need to be created on short-lived branches that will be merged back into the main branch frequently.

### 1. Clone the repository

### 2. [Create an issue](https://github.com/InspiranzaDEV/zenenti/issues/new) or pick [one already created](https://github.com/InspiranzaDEV/zenenti/issues)

- The issue description can have a list of checkpoints to complete
- In the project backlog, move the issue ticket from "TODO" to "In Progress"

### 3. Create a branch with the issue number

- First of all, be sure to have on your fork the most recent changes in main:
```sh
git checkout main
git fetch upstream
git merge upstream/main
```

- From main create a branch with the number and name of the issue:
```sh
git checkout -b <NumberOfTheIssue>-<Descriptive-Name-Of-Issue>
```

### 4. Work on your branch, commit regulary

#### How to commit:

- Give the commit a short but descriptive name, and add a # with the number of the issue. Start the commit in lower case.

```sh
git add <route-of-the-files-changed>
git commit -m '<infinitive action> <what has changed> #<number of the issue>'
```

#### Accepted "infinitive actions" for commits
- add
- fix
- delete
- style
- refactor
- update
- test
- build
- change
- improve

### 5. Create pull request (PR)
- Give the PR the same name of the related issue. **E.g.** `3-configure-environment`
```
<Number of the issue>-<Name-of-the-issue>
```
- Assing de PR to your self and connect it to the issue
- Assign reviewers to your PR
- Move the backlog ticket of your issue to "Review"
- Wait for your PR to be validated

### 6. Merge to main and start again!

### 7. Remember to clean
- Close the related issue.
- Delete the branch.

## Vulnerabilities

Expo is a framework built upon various libraries, and occasionally, some vulnerabilities may arise that cannot be immediately fixed until updates are released. If a vulnerability's risk level is low, and we understand how it works and what to be cautious about, we can continue working with the affected functionality. In many cases, the chances of needing to rely on vulnerable features are minimal.

Currently, there is no need to take action on the following vulnerabilities:
- [Node send()](https://github.com/advisories/GHSA-m6fv-jmcg-4jfg)
- [Expo Router Cookies](https://github.com/advisories/GHSA-pxg6-pf52-xh8x)
