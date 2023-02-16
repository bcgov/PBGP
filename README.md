[![img](https://img.shields.io/badge/Lifecycle-Experimental-339999)]

# Programs Branch Grant Programs (PBGP)


### Prerequisites


- <a href='https://nodejs.org/en/download/' target='_blank'> Node.js </a> version 16.18.1 
- <a href='https://reactjs.org/docs/getting-started.html' target='_blank' > React </a> version 18.1.0
- <a href='https://nextjs.org/' target='_blank' > Next.js </a> version 12.3.1 
- <a href='https://nestjs.com/' target='_blank' > Nest.js </a> version 8.2.3
- <a href='https://typeorm.io/' target='_blank' >TypeORM </a> version 0.2.41
- <a href='https://tailwindcss.com/docs/installation' target='_blank' >TailwindCSS </a> version 3.2.4
- <a href='https://www.docker.com/products/docker-desktop/' target='_blank' > Docker </a>  - for local development in place of Openshift 
- <a href='https://www.postgresql.org/download/' target='_blank' >PostgreSQL </a> - version 12.12
   

## Mandatory Dependencies

- IDIR service account with access to LDAP service

## Local Development

### Configuration

Use the following steps to configure the local development environment

1. Clone the repository

   ```
   git clone https://github.com/bcgov/PBGP.git

   ```
2. Configure the development settings

   - Create the `client/.env` file and add the following content

   ```
      NEXT_PUBLIC_REDIRECT_URI= http://localhost:3000
      NEXT_PUBLIC_KC_AUTH_URL= https://dev.loginproxy.gov.bc.ca/auth
      NEXT_PUBLIC_KC_AUTH_REALM=standard
      NEXT_PUBLIC_KC_AUTH_CLIENT_ID=pbgp-4412
      NEXT_PUBLIC_SERVER_URL= http://localhost:8080/api/v1
      NEXT_PUBLIC_LARGE_PROJECT=
      NEXT_PUBLIC_SMALL_PROJECT=bb0871ca-516f-42ed-91e6-3f8175d18448
      NEXT_PUBLIC_ENVIRONMENT_PLANNING=
      NEXT_PUBLIC_DEVELOPMENT_PLANNING=b723cb59-334d-4372-9a8c-212d55b3cdc3![image](https://user-images.githubusercontent.com/124090609/217051524-fb5ebaa2-1465-480d-8dd8-8ddfe547d90a.png)

   ```
   - Create the `server/.env` file and add the following content

   ```
      KC_AUTH_URL= https://dev.loginproxy.gov.bc.ca/auth
      KC_AUTH_REALM=standard
      KC_AUTH_CLIENT_ID=pbgp-4412
      CHEFS_FORM_IDS=["4b19eee6-f42d-481f-8279-cbc28ab68cf0","98e9d187-9285-49ca-8c66-24b9dca1e6f7","d202bc41-dee3-4c5d-bb56-53213f4d095a"]
      LARGE_PROJECT=
      SMALL_PROJECT=bb0871ca-516f-42ed-91e6-3f8175d18448
      ENVIRONMENT_PLANNING=
      DEVELOPMENT_PLANNING=b723cb59-334d-4372-9a8c-212d55b3cdc3![image](https://user-images.githubusercontent.com/124090609/217051615-1a4f78c1-88e4-40c1-8e20-244cf333f01c.png)

    ```
### Run

3. local development environment

   Windows `make` is required.   It can be located here: https://gnuwin32.sourceforge.net/packages/make.htm   Please add the `<make_home>\bin` directory to the Windows path.

   To run Application in Docker 
       cd root folder

     ```
         make run-local
         
     ```
