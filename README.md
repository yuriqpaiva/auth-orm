# Auth-ORM &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![language](https://img.shields.io/badge/language-javascript-yellow)

## 💡 Introduction

Project created aiming a basic structure of a authentication API system:

- Login with JWT Tokens
- Logout with a Blacklist using Redis
- Secure API routes
- Expire tokens

<br/>

## 🖥 Pre-requisites:

- NodeJS
- Redis
- SQL database

<br/>

## 💾 How to Install Dependencies?

### Using NPM:

```
  npm install
```

### Using Yarn:

```
  yarn
```

<br/>

## 🚀 How to Run it?

### Using NPM:

```
  npm run dev
```

### Using Yarn:

```
  yarn run dev
```

<br/>

## Environment Variables
That's how your ```.env```  file should look like:
```js
APP_PORT=3000
JWT_SECRET="jwt-password"
DB_USERNAME="postgres"
DB_PASSWORD="postgres"
DB_HOST="localhost"
DB_DIALECT="postgresql"
```
<br/>

### 🔑 Generate secure JWT Secret

```js
node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"
```
