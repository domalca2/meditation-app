# Understanding the Backend Structure

The `zenenti` backend is implemented as a REST API with [expressjs](https://expressjs.com/). The REST API routes are specified in [backend.yaml](backend.yaml). When implementing API routes, please follow the specification exactly. If it is not possible to follow the specification exactly, please update the specification to reflect your changes.

The backend connects to a Microsoft SQLServer instance via the ORM [prisma](https://www.prisma.io/). It is necessary to use Microsoft SQLServer, because that is the only supported option by our backend hosting provider, Azure.

The REST API routes are divided into two main categories:
- `/public/*`: All routes that are accessible _without_ user authentication. That is, unauthorized users are allowed to use these routes.
- `/private/*`: All routes that _require_ user authentication.

User authentication is performed _automatically_ for all routes in `/private/*` (see [src/private/index.js](src/private/index.js)) and provided to the route via `req.user`. You can trust that all requests in `/private/*` are authenticated. No extra steps are required.

Schema verification is done using [express-validator](https://express-validator.github.io/docs/) and the custom middleware in [src/middleware/validate.js](src/middleware/validate.js). This ensures that all requests are well-formed and sanitized to protect against various types of bugs and attacks. Please VALIDATE ALL ROUTE PARAMETERS (params, query strings, body, etc.) using this middleware.

# Running the Backend

To run the backend, you must have the following software installed:

- Microsoft SQL Server
- (Optional) Postman or Insomnia for testing API routes.

Once Microsoft SQL Server is installed, create a `.env` file in the `zenenti-backend` directory. Inside you must place a string that tells prisma how to connect to your local instance of SQL Server. It will look something like this:

```bash
DATABASE_URL="sqlserver://${MY_PC_NAME};database=zenenti;integratedSecurity=true;encrypt=true;trustServerCertificate=true;"
```

For more information please see: [Microsoft SQL Server](https://www.prisma.io/docs/orm/overview/databases/sql-server).

Next, you must run `npm install` inside of `zenenti-backend` to install all dependencies and create the prisma client. 

Then, you must run `npm run db:reset` to create and seed your local database.

Now you can run `npm run dev` to start the backend, and your frontend instance should connect automatically. 

# Backend Components

| Component      | Description                                                                            | Modeled (DB) | Specified | Implemented |
|----------------|----------------------------------------------------------------------------------------|--------------|-----------|-------------|
| Registration   | Service to create new user accounts.                                                   | Yes          | Yes       | Partly      |
| Authentication | Service to authenticate users and provide a user context to `private` routes.          | Yes          | Yes       | Yes         |
| Favorite       | Service to save, delete and retrieve favorites based on authenticated user.            | Yes          | Yes       | No          |
| User           | Service to retrieve and save information about user.                                   | Yes          | Yes       | Partly      |
| Practice       | Service to retrieve information on practices.                                          | Yes          | Yes       | Yes         |      
| Practice Log   | Service to record when a user completes a practice.                                    | Yes          | Yes       | No          |
| Category       | Service to retrieve information on categories.                                         | Yes          | Yes       | Yes         |
| Practice Type  | Service to retrieve information on types of practice                                   | Yes          | Yes       | Yes         |
| Streak         | Service to retrieve all of the days on which the user completed at least one practice. | Yes          | Yes       | No          |
