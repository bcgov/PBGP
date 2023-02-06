[![img](https://img.shields.io/badge/Lifecycle-Experimental-339999)]

# Programs Branch Grant Programs (PBGP)

<application description>
## Prerequisites


- <a href='https://nodejs.org/en/download/' target='_blank'> Node.JS </a> version 14 or newer 
- <a href='https://www.docker.com/products/docker-desktop/' target='_blank' > Docker </a>

## Mandatory Dependencies

- IDIR service account with access to LDAP service

## Local Development

### Configuration

Use the following steps to configure the local development environment

1. Clone the repository

   ```
   git clone https://github.com/bcgov/PBGP.git

   ```
2. Configure the React development settings

   - Create the `client/.env` file and add the following content

   ```
   NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000
   NEXT_PUBLIC_KC_AUTH_URL=https://dev.loginproxy.gov.bc.ca/auth
   NEXT_PUBLIC_KC_AUTH_REALM=standard
   NEXT_PUBLIC_KC_AUTH_CLIENT_ID=ed-9154-dev-4226
   NEXT_PUBLIC_SERVER_URL=http://localhost:8080/api/v1
   ```
- Create the `server/.env` file and add the following content

   ```
    KC_AUTH_URL=https://dev.loginproxy.gov.bc.ca/auth
    KC_AUTH_REALM=standard
    KC_AUTH_CLIENT_ID=ed-9154-dev-4226
    CHEFS_FORM_IDS=["4b19eee6-f42d-481f-8279-cbc28ab68cf0"]
    POSTGRES_USERNAME=db2inst1
    POSTGRES_PASSWORD=development
    POSTGRES_DATABASE=testdb
    ```
   - Replace the placeholder values

   ### Run

Use the following steps to run the local development environment

1. Install the Server dependencies

   - F5 in Visual Studio
   - Or from console

   ```
   cd server
   npm install
   yarn install

   ```

2. Install the React frontend dependencies
   ```
   cd client
   npm install
   yarn install
   
   ```
There could be 2 ways to run the application,

3(a) To run Application in Docker 
    cd root folder
    ```
    make run-local
    ```
3(b) To run Application using yarn 
    cd server
    ```
    yarn run dev
    ```
    
    cd client
    ```
    yarn run dev
    ```
