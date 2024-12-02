# Understanding the Backend Structure

The `zenenti` backend is implemented as a REST API with [expressjs](https://expressjs.com/). The REST API routes are specified in [backend.yaml](backend.yaml). When implementing API routes, please follow the specification exactly. If it is not possible to follow the specification exactly, please update the specification to reflect your changes.

The backend connects to a Microsoft SQLServer instance via the ORM [prisma](https://www.prisma.io/). It is necessary to use Microsoft SQLServer, because that is the only supported option by our backend hosting provider, Azure.

The REST API routes are divided into two main categories:
- `/public/*`: All routes that are accessible _without_ user authentication. That is, unauthorized users are allowed to use these routes.
- `/private/*`: All routes that _require_ user authentication.

User authentication is performed _automatically_ for all routes in `/private/*` (see [src/private/index.js](src/private/index.js)) and provided to the route via `req.user`. You can trust that all requests in `/private/*` are authenticated. No extra steps are required.

Schema verification is done using [express-validator](https://express-validator.github.io/docs/) and the custom middleware in [src/middleware/validate.js](src/middleware/validate.js). This ensures that all requests are well-formed and sanitized to protect against various types of bugs and attacks. Please VALIDATE ALL ROUTE PARAMETERS (params, query strings, body, etc.) using this middleware.

# Backend Components

| Component      | Description                                                                            | Modeled (DB) | Specified | Implemented |
|----------------|----------------------------------------------------------------------------------------|--------------|-----------|-------------|
| Registration   | Service to create new user accounts.                                                   | Yes          | Yes       | No          |
| Authentication | Service to authenticate users and provide a user context to `private` routes.          | Yes          | Yes       | No          |
| Favorite       | Service to save, delete and retrieve favorites based on authenticated user.            | Yes          | Yes       | No          |
| User           | Service to retrieve and save information about user.                                   | Yes          | Yes       | No          |
| Practice       | Service to retrieve information on practices.                                          | Yes          | Yes       | No          |      
| Practice Log   | Service to record when a user completes a practice.                                    | Yes          | Yes       | No          |
| Category       | Service to retrieve information on categories.                                         | Yes          | Yes       | No          |
| Practice Type  | Service to retrieve information on types of practice                                   | Yes          | Yes       | No          |
| Streak         | Service to retrieve all of the days on which the user completed at least one practice. | Yes          | Yes       | No          |
