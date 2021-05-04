# Container App

This is the main shell application which serves as an entry point to consume the content exposed by the remote app(s).

## Adding remotes in Webpack

Exposed remotes can be used in the shell app by adding them to the remote section of the webpack configuration file as follows:

```javascript:
   {
       ...
        remotes: {
          "remote-mf": "test_remote@http://localhost:3001/test_remoteEntry.js",
          ...
        },
   }
```

This allows for the exposed remote to be consumed during build time based on the url and port. So ensure that the remote app(s) is already running or lazy load the components/functions if they are not. This will reduce the chances of an error occurring and breaking the application.

## Declaring Exposed Components/Functions

The exposed components/functions can be added to the declarations file as follows to allow for typescript to pick it up.

```javascript:
    declare module "remote-mf/CustomButton";
    declare module "remote-mf/customMessage";
```

## Using Remote Components/Functions

After the exposed remotes have been added to webpack and to the declarations file, it is ready to be used anywhere in our app.

You can import it or lazy load the components/functions as needed into your react file.

```javascript:
    import customMessage from "remote-mf/customMessage"

    const CustomButton = React.lazy(() => import("remote-mf/CustomButton"));
```

Once imported or lazy loaded, you can use it like any other component.

## Available Scripts

In the project directory, you can run:

### yarn dev

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### yarn prod

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### yarn clean

Cleans the build folder and all its contents.
