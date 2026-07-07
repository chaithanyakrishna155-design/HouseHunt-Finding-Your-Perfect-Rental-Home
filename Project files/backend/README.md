# Backend Setup

## Install dependencies

```bash
cd "Project files/backend"
npm install
```

## Create environment file

Copy `.env.example` to `.env` and set your MongoDB URI:

```bash
cd "Project files/backend"
copy .env.example .env
```

Then edit `.env`:

```env
MONGO_DB=mongodb://localhost:27017/househunt
```

## Start the backend

```bash
cd "Project files/backend"
node index.js
```

If you use nodemon:

```bash
npm run dev
```
