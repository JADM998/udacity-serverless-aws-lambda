# Serverless application submit

This is my submition for the project "Develop and Deploy with AWS Lambda".

This project contains all the logic required to use correctly the Todo API and is organized as follows:

Inside the `/starter/backend/src` we try to follow a hexagonal - layered like architecture in which we have the following folders:
  - auth: Used to store authentication utils.
  - businessLayer: This is the application logic, can be used to switch to other frameworks or technologies.
  - dataLayer: Database interaction layer. Inclues the class to interact with dynamodb.
  - fileStorage: S3 interaction layer.
  - lambda: Contains all the handler implementation for lambda functions.
  - models: Includes the API Gateway validation for requests (body). Only used for `DELETE` and `PATCH` operations.
  - services: Contains all utility classes.
  - utils: Contails all utility functions.

### Screenshoots

Even thought the project (or at least that I've seen) didn't require screenshoots I've provided a few. This are included in the root of the github project (inside `/screenshoots`) and are grouped in subfolder categories.

#### Functionality

Inside the folder `/screenshoots/functionality`
1. I've provided Screenshoot examples of the usage of the provided UI (inside `/UI`).
2. Also, there are examples of postman responses (inside `/Postman`).
3. Next, there is prove of multiple Accounts being used (inside `/multipleAccs`)
4. Finally, there is also unauthentication access attempt in (`/Unauthorized`)

#### Code Base

I've splitted the code into multiple layers as described in the first section. Also, used async/await for all processes.

#### Best Practices and Architecture

I've implemented monitoring throughout the application by the Winston logger, XRay wrapper and CloudWatch metrics. I have provided examples of the logs and metrics sent by the application in the folders `/logs` and `/metrics` inside `/screenshoots/monitoring`.

