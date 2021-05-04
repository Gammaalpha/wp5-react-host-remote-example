# Micro Frontend Webpack 5 example

This repository contains a working example using webpack 5 module federation, React and TypeScript.

It is based off the [wp5-scaffold-react-ts](https://github.com/Gammaalpha/wp5-scaffold-react-ts) template.

## How to run this app

Ensure the node_modules for the root folder as well as the sub-folders container-app and remote-app have been installed.

Afterwards use the following command to start the project.

> npm run dev:all

or

> yarn dev:all

## Available Scripts

In the project directory, you can run:

### yarn dev:shell

Starts the main container app which is the shell of the application and is where the exposed remotes are consumed.

### yarn dev:remote

Starts the remote app which exposes its components so that they can be consumed by other apps with module federation plugin.

### yarn dev:all

Runs both the remote app and shell app in sequence so that it has all the resources available for use when the app loads.
