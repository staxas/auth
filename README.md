# auth
Webtoken based user administration and authorisation system

Install dependencies with
```bash
npm install --save
```

Server and database URLs and ports: edit *config.js* accordingly.

###Endpoints and their methods

#### Administration endpoints

##### GET /api/tokens

##### GET /api/user

##### DELETE /api/user/{id}

#### User endpoints

##### POST /api/user/register

##### POST /api/user/login

##### DELETE /api/user

#### Token endpoints

##### GET /api/token/validate

##### GET /api/token/decode

