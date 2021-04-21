# Create and Push a notification to your web application

## To run the app in devlopment:

`git clone git@github.com:vikashStr/push-notifications.git`
cd into your directory
create a .env file and paste your API key. Please refer `.env.example` file.
Navigate to `Config.ts` file and change `app_id` with your app id
Run `yarn install` from the root of the project
Run `yarn start` to start the devlopment server
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

## Description
This application creates a notification using OneSignal api and pushes it your website.

Please refer to [https://onesignal.com/signup](https://onesignal.com/signup) on how to sign up and add your app_id to your website.

Note: I am running the development  server on port 8000. Please refer [https://documentation.onesignal.com/docs/web-push-setup-faq](https://documentation.onesignal.com/docs/web-push-setup-faq) to test it in localhost.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
