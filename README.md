# Typescript Api

The main purpose of this repository is to show our knowhow of Node.js and api development. Therefore we made an advanced exmaple project 
for a timer api that holds to a specific set of
requirements(which are listed below.)

It is not a goal of this repo to be a comprehensive guide at this moment in time. Yet we would like it to be in the future.

If there are any Updates, errors of improvements that you can find we would love to hear them! Please provide a pull reqest if you do.

# Table of contents:

-   [Pre-reqs](#pre-reqs)
-   [Getting started](#getting-started)
-   [TypeScript + Node](#typescript--node)
    -   [Project Structure](#project-structure)
    -   [Project Scripts](#project-scripts)
    -   [Type Definition](#type-definition-dts-files)
-   [Dependencies](#dependencies)
    -   [`dependencies`](#dependencies)
    -   [`devDependencies`](#devdependencies)
-   [Used Recources](#used-recources)

# Pre-reqs

To build and run this app locally you will need a few things:

-   Install [Node.js](https://nodejs.org/en/)
-   Install [MongoDB](https://docs.mongodb.com/manual/installation/)
-   Install [VS Code](https://code.visualstudio.com/)
-   Install Typescript, Nodemon, ts-node en prettier

```
npm i -g typescript nodemon ts-node prettier
```

# Getting started

-   Clone the repository

```
git clone https://github.com/sebastiaanswanenberg/time-timer.git
```

-   Install dependencies

```
cd <project_name>
npm install
```

-   Provide a Mongo database

Our recommendation would be to use [MongoDb Atlas](https://www.mongodb.com/cloud/atlas) for testing and create your own pro production pruposes.

A simple integration of a full stack api with a mongoose database.

# Typescript + Node

Typescript can be installed along with the development packages by running the npm install command. Visual studio code will automagicly detect that you are using typescript.

## Project Structure

Since typescript is a compiled language we have devided the project in a 'source' and build folder. Typescript (`.ts`) files live `src` folder and after compilation are output as JavaScript (`.js`) in
the `build` folder. The `views` folder remain top level as expected.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name                   | Description                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **.vscode**            | Contains VS Code specific settings                                                                                                             |
| **build**              | Contains the distributable (or output) from your TypeScript build. This is the code you ship                                                   |
| **node_modules**       | Contains all your npm dependencies                                                                                                             |
| **source**             | Contains your source code that will be compiled to the dist dir                                                                                |
| **source/config**      | Passport authentication strategies and All settings for the application.                                                                       |
| **source/controllers** | Controllers define functions that respond to various http requests There is at least a controller per collection                               |
| **source/models**      | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB These will also house the interface or type used. |
| **source/**server.ts   | Entry point to your express app                                                                                                                |
| **source/test**        | Contains your tests.                                                                                                                           |
| **views**              | Views define how your app renders on the client. In this case we're using ejs                                                                  |
| .env.example           | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos.                                                  |
| .copyStaticAssets.ts   | Build script that copies images, fonts, and JS libs to the dist folder                                                                         |
| package.json           | File that contains npm dependencies and scripts                                                                                                |
| tsconfig.json          | Config settings for compiling server code written in TypeScript                                                                                |

## Project Scripts

| Npm Script           | Description                                                                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start`              | Does the same as 'npm run serve'. And will call nodemon to watch for changes(only is build folder. For bebugging.) Can be invoked with `npm start` |
| `build`              | Builds the project by compiling the sass and ts files and copys all static assets.                                                                 |
| `test`               | Run all mocha tests.                                                                                                                               |
| `copy-static-assets` | Copy all static assets to the build folder.                                                                                                        |
| `watch-sass`         | Compile all scss files and watch them. Recommended to run in a seterate terminal as this will not start the server.                                |

## Type Definition

To make sure typescript can accurately display all errors it needs a type definition. you can make these yourself. However for most popular packages there already is a version. This can be located by
running:

```
npm i --save-dev @types/[packagename]
```

# Dependencies

//TODO: add all packages when the project is finished.

# Dev Dependencies

//TODO: add all packages when the project is finished.

# Used recources

| Purpose of recource                                                                                                                                                                                                                                                                           | Link                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `Node authentication with roles` was used for the basic overview and role functionality. However with typescript we did run in a bunch of erros. If this was becouse of the age of the project or typescript i dont know. However becouse of the explanation it provided it was very helpful. | https://scotch.io/tutorials/easy-node-authentication-setup-and-local |
| This microsoft project we found at the midpoint in development and used this for the `passport implementation.` However as our setup and SOC was somewhat diffrent we did not use everything.                                                                                                 | https://github.com/microsoft/TypeScript-Node-Starter                 |
|                                                                                                                                                                                                                                                                                               |                                                                      |
