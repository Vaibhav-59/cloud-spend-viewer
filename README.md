# K&Co. Cloud Spend Viewer

A simple MERN skeleton to explore cloud cost data with filters and summaries.

## Project Structure

```
cloud-spend-viewer/
  client/   # React (Vite)
  server/   # Node + Express
```

## Tech Stack

- React (Vite) — client
- Node.js + Express — server
- MERN architecture (Mongo not used yet; placeholder for future persistence)

## Objective

Build K&Co. Cloud Spend Viewer, a dashboard that shows:
- Cloud cost data from JSON
- Filters: cloud provider, team, env, month
- Summary: total spend & spend by provider

This skeleton includes a clean, beginner-friendly UI layout in the client and a minimal Express API starter with a health route.

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### 1) Install dependencies

Client:
```
cd client
npm install
```

Server:
```
cd server
npm install
```

### 2) Run the apps

Client (Vite dev server):
```
npm run dev
```
This prints a local URL (e.g. http://localhost:5173). Open it in your browser.

Server (Express):
```
nodemon index.js
```
Server starts at http://localhost:5000

