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
