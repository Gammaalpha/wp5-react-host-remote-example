# Remote App

This is the remote application which exposes components/functions to be consumed by the shell application.

## Exposing components in Webpack

Components or functions to be consumed by other apps can be added to the exposes section in webpack as shown below.

```javascript:
   {
       ...
        exposes: {
          "./CustomButton": "./src/components/CustomButton/CustomButton",
          "./customMessage": "./src/functions/customMessage",
        },
   }
```

This allows for any number of components/functions to be exposed during build time based on their relative path.

## Available Scripts

In the project directory, you can run:

### yarn dev

Runs the app in development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### yarn prod

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### yarn clean

Cleans the build folder and all its contents.
