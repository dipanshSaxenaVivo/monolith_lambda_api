<div align="center">
    <img src="https://imgs.search.brave.com/I7vrfjMkMvDaF-2s0jNYZUV8ktA1uTggOWQAxxES0Q8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC90eXBlc2Ny/aXB0LWljb24taWNv/bi0xMDI0eDEwMjQt/dmgzcGZlejgucG5n" alt="Logo" width="80" height="80">
  <a href="https://github.com/degenta69/repo_name">
    <img src="https://icon.icepanel.io/AWS/svg/Compute/Lambda.svg" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">
Typescript-Monolith-Lambda-Api-Template
</h1>

  <p align="center">
    Nodejs serverless monolithic architecture api with typescript and aws lambda
    <br />
    <!-- <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a> -->
    <!-- <br /> -->
    <!-- <br /> -->
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<br/>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#clean-code-practices">Clean Code Practices</a></li>
        <li><a href="#modular-design-and-reusability">Modular Design and Reusability</a></li>
        <li><a href="#automated-deployment-workflow">Automated Deployment Workflow</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#documentation">Documentation</a>
      <ul>
        <li><a href="#injector-and-dependency-container">Injector & Dependency Container</a></li>
        <li><a href="#route-handling">Route Handling</a></li>
        <li><a href="#esbuild-configuration">Esbuild Configuration</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<br/>

# About The Project

This repository provides a well-structured, production-ready template for building robust and scalable Node.js serverless APIs using AWS Lambda. It leverages TypeScript for enhanced type safety and maintainability, Prisma for efficient database interactions, and AWS Key Management Service (KMS) for secure data encryption.

## Clean Code Practices:

- #### Dependency Injection (DI):

  Handlers receive dependencies (like database clients or logging services) as function parameters instead of relying on global state or singletons. This promotes cleaner code, easier testing, and improved modularity.

- #### Pure Functions:

  Handler functions are designed as pure functions: given the same inputs, they always produce the same outputs and have no side effects like modifying global state. This simplifies reasoning about their behavior and makes them more testable.

- #### TypeScript:
  Strong typing enforces data consistency, reducing runtime errors and improving code reliability. It also enhances developer experience with code completion and easier refactoring.

## Modular Design and Reusability:

- #### Dependency Folder:

  This folder houses reusable modules and utilities, promoting code reusability and separation of concerns. Developers can easily import and leverage these modules across different projects.

- #### Monolithic Architecture:

  Ideal for smaller backend projects or rapid prototyping. All functionalities reside within a single codebase for easy deployment and maintenance.

- #### Secure Data Management:

  - Prisma Integration - Simplifies database interactions with a type-safe and performant ORM (Object-Relational Mapper). It reduces boilerplate code and ensures data consistency.

  - AWS KMS Integration - Manages encryption keys centrally for secure data storage and transmission. It complies with data security best practices.

## Automated Deployment Workflow:

- #### Shell Script:
  This script automates code transpilation, build, bundling, and deployment. It prompts developers for the S3 bucket name and Lambda function name, streamline the deployment process.

<br/>
<br/>

# Getting Started

This section walks you through the prerequisites for development and guides you in cloning this repository, deploying your API to AWS Lambda, and customizing configurations.

## Prerequisites

- _aws-cli_: must configure aws cli with an
  IAM user having permission to update lambda invoke lambda and interact with the s3bucket.

- _7zip_: must install 7zip and add it's path to environment variable of your local machine.

- _mongodb_:

  - must create a mongodb database and include it's connection url in .env and it's encrypted value in your lambda function's environment variable as well.
  - additionally please add `db name` at the end of your mongodb string for eg. `mongodb+srv://username:password@clusterName.uniqueID.mongodb.net/`db name`?retryWrites=true&w=majority&appName=clusterName`.
  - also refer to this article before trying to connect your mongodb with lambda, [_article_](https://medium.com/@dipansh.dev.saxena/connecting-mongodb-atlas-to-aws-lambda-a-novices-tale-41ff0a5b3d8e).

- _aws-resources_: create a lambda function from aws console and add a role to that lambda which has the policy of an kms key which will be used for encrypting and decrypting data, also create an s3 bucket for uploading your lambda code, remember their name.

- _environment-variables_: there are 2 environment variables we have to use locally while building the code
  which is DATABASE_URL self explanatory and PRISMA_BINARY_TARGET read about it in this article [*prisma-binaries*](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#binary-targets)

## Installation

Clone the project

```bash
  git clone https://github.com/dipanshSaxenaVivo/monolith_lambda_api.git
```

Go to the project directory

```bash
  cd monolith_lambda_api
```

Install dependencies

```bash
  npm install
```

before deploying the lambda please make valid schema inside src/prisma/schema if you want work with different collection, otherwise keep everything same

Generate prisma and sync your schema with database

```bash
  npx prisma generate && npx prisma db push
```

Deploy to lambda

```bash
  npm run deploy
```

# Documentation

## Injector and Dependency Container

### Overview

- Dependency Injection (DI) promotes cleaner, more modular code by decoupling the creation of dependencies from their usage. This improves testability and maintainability, making it easier to manage and scale the application.

- #### Pre-included Dependencies

  - Database Client: Prisma for database interactions.
  - Logger: A custom logger for tracking application events.
  - Cryptography: For handling encryption and decryption tasks using AWS KMS.

### Implementation

Dependencies are injected into handlers via a centralized injector module, which configures and provides these dependencies to the appropriate handlers based on their needs.

we expose a applier function from our dependency module
which simply adds it's functionality into the key of dependency container.

> example of applier function

```
/**
 * applies KMS dependency to the given dependency container
 *
 * @param {Omit<IDependencyContainer, 'KMS'>} DC
 * @returns {IDependencyContainer}
 */
export const apply_kms = (
  DC: Omit<IDependencyContainer, "KMS">
): IDependencyContainer => {
  console.log("apply kms called");
  return { ...DC, KMS: KMS };
};
```

> example of applying dependency

```
const injector_applied_kms = apply_kms({})
```

now, if we want to apply another dependency for our handlers
we just have to pass `injector_applied_kms` to the corresponding dependency's applier function.

> example of applying prisma dependency

```
const injector_applied_prisma_and_kms = apply_kms(injector_applied_kms)
```

usually we would have to apply all available dependency to all of our handlers so we can instantiate our injector with all applier functions like.

> example of applying all dependencies

```
let injector = apply_prisma(apply_console_logger(apply_kms({} as any)));
```

just be aware of lifecycle methods of aws lambda cold start, warm and shutdown phase
because our dependencies are instantiated in cold start and they are available till the shutdown phase of lambda,
they don't instantiate again in warm phase.
