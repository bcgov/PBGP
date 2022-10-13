# Alberta Traveller Screening - Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Commands

In the project directory, you can run:

| Command                 | Description                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| npm run start           | Sets `REACT_APP_OUTPUT` to 'ALL' and runs the app in development mode       |
| npm run start:traveller | Sets `REACT_APP_OUTPUT` to 'TRAVELLER' and runs the app in development mode |
| npm run start:admin     | Sets `REACT_APP_OUTPUT` to 'ADMIN' and runs the app in development mode     |
| npm run start:rtop-traveller | Sets `REACT_APP_OUTPUT` to 'RTOP_TRAVELLER' and runs the app in development mode |
| npm run start:rtop-admin     | Sets `REACT_APP_OUTPUT` to 'RTOP_ADMIN' and runs the app in development mode     |
| npm run build           | Sets `REACT_APP_OUTPUT` to 'ALL' and builds the app for production          |
| npm run build:traveller | Sets `REACT_APP_OUTPUT` to 'TRAVELLER' and builds the app for production    |
| npm run build:rtop-admin     | Sets `REACT_APP_OUTPUT` to 'RTOP_ADMIN' and builds the app for production        |
| npm run build:rtop-traveller | Sets `REACT_APP_OUTPUT` to 'RTOP_TRAVELLER' and builds the app for production    |
| npm run build:admin     | Sets `REACT_APP_OUTPUT` to 'ADMIN' and builds the app for production        |
| npm run test            | Sets `REACT_APP_OUTPUT` to 'ALL' and runs frontend tests                    |
| npm run test:traveller  | Sets `REACT_APP_OUTPUT` to 'TRAVELLER' and runs frontend tests              |
| npm run test:admin      | Sets `REACT_APP_OUTPUT` to 'ADMIN' and runs frontend tests                  |

### `npm run start*`

These scripts run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build*`

These scripts build the app for production and place the contents in the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run test*`

These scripts run front-end tests

See the section about [testing](https://create-react-app.dev/docs/running-tests) for more information.

## Environment Variables

The app requires the following to be available at runtime:

- `REACT_APP_IBM_DISCOVERY_ENDPOINT` (AppID discovery endpoint)
- `REACT_APP_IBM_CLIENT_ID` (AppID client ID)

***Local Development***

Add these to a `.env.development` file.

***Dev/Staging/Prod environments***

These are provided at runtime of the server by executing `./envsubst.sh` which adds them to the header of `index.html` 
and makes them available through the app in the `window._env_` variable.

***Why are we doing this?***

To allow for immutable builds, the env variables need to be provided at server run-time instead of at build time, as the
app will only be built once and promoted between the environments.

## Learn More

You can learn more in the [Create React Login documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/)
