# K&Co. Cloud Spend Viewer

A simple MERN skeleton to explore cloud cost data with filters and summaries.

## Live Demo

Deployed on Vercel: https://cloud-spend-viewer-1gql.vercel.app/

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

## Screenshots

Place screenshot images in `client/public/screenshots/` so they can be served statically. Suggested filenames are provided below—replace them with your own if needed.

### Summary View
![Summary View](<img width="1896" height="842" alt="Screenshot 2025-12-02 181350" src="https://github.com/user-attachments/assets/b2598d80-04f2-415e-99d5-06ba1da3db7e" />
)

### Data Table
![Data Table](<img width="1890" height="855" alt="Screenshot 2025-12-02 181447" src="https://github.com/user-attachments/assets/69e833f6-626b-4eb2-b80f-602b139ae305" />
)

### Cost Allocation Chart
![Cost Allocation Chart](<img width="1894" height="871" alt="Screenshot 2025-12-02 181437" src="https://github.com/user-attachments/assets/dfa68d82-a00a-4f99-8cd9-00346eebf987" />
)
