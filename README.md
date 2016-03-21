# auth
Webtoken based user administration and authorisation API

Install dependencies with
```bash
npm install --save
```

Server and database URLs and ports: edit *config.js* accordingly.

###Endpoints and their methods

#### User endpoints

##### POST /api/user/register

Allows user to create new account. Expects payload to contain a valid *string* type property *email* and a *string* type property *password* (3 to 30 characters). Checks if user exists in the database. If not, encrypts password and adds the *roles* property (type *string array*)containing *user*. Returns user database entry.

##### POST /api/user/login

Allows user to log in. Valid *email* and *password* are expected in the payload. If user is properly authenticated a *token* is returned in response (*object* type with property *token*).

##### DELETE /api/user

Allows user to delete own account. Expects a query *token* to be added containing a valid web token which was returned at login time. Returns *true* if successful.

#### Token endpoints

##### GET /api/token/validate

Validate an existing token. If valid and not expired (expires after 24 hours) returns *true*, else, returns *false*.

##### GET /api/token/decode

Decode an existing token. If not expired, returns token payload data (*string* type user *email*, *string array* type *roles* and *Date* type *expireDate* properties*).

#### Administration endpoints

The following endpoints expect a *token* query containing a valid token which has in its payload the *roles* property containing the string *admin*.

##### GET /api/tokens

Returns all tokens in the token database.

##### GET /api/user

Returns all users in the user database.

##### DELETE /api/user/{id}

Deletes a user with email {id}. Returns *true* if successful.
