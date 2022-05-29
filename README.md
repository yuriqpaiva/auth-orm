# Auth-ORM &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![language](https://img.shields.io/badge/language-javascript-yellow) ![storage](https://img.shields.io/badge/storage-redis-red)

## 💡 Introduction

Project created aiming a basic structure of a authentication API system:

- Login with JWT Tokens
- Refresh Tokens
- Logout with a Blacklist using Redis
- Secure API routes
- Expire tokens
- Verification Mail on user register

<br/>

## 🖥 Pre-requisites:

- NodeJS
- Redis
- SQL Database compatible with Sequelize

<br/>

## 📑 API Documentation

After installation, while project is running, access API Documentation on path:

`/api-docs`

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
  npm start
```

### Using Yarn:

```
  yarn start
```

<br/>

## ⚙️ Environment Variables

That's how your `.env` file should look like:

```js
APP_PORT = 3000;
BASE_URL = 'localhost:3000';

JWT_SECRET = 'secret-password';

DB_USERNAME = 'postgres';
DB_PASSWORD = 'postgres';
DB_HOST = 'localhost';
DB_DIALECT = 'postgresql';

NODE_ENV = 'development';

EMAIL_HOST = 'smtp.gmail.com';
EMAIL_NAME = 'test@email.com';
EMAIL_PASSWORD = 'test';
```

<br/>

### 🔑 Generate secure JWT Secret

```js
node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"
```

<br/>


## © License

MIT License © Yuri Paiva
