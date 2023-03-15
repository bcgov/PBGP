We need the following for the database:
1. A Docker image - An off-the-shelf developer image was used.    Postgres with Emphemeral storage (stored limited to the pod that isn't permenant).
2. A complete set of setup scripts - This is handled by TypeORM.    Essentially, when the server is started up, the database is created.  
 
