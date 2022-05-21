# Auth ORM
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

### 🔑 Generate secure JWT Secret

```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"
```
