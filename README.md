# Football Tracker

<<<<<<< ours
A simple Next.js app for tracking football matches and stats.

## Requirements

- Node.js 18+
- yarn
=======
Football Tracker is a simple Next.js app for checking match schedules, live games, and basic stats. It focuses on a clean list view with quick filters so you can scan fixtures and jump into a match or league when you need more detail.

The app pulls fixture data by date, lets you narrow results by league or status, and provides pages for live matches, league tables, and individual match details.

## Pages

- Home (/): Today’s matches with filters for status, league, and search.
- Fixtures (/fixtures/[date]): Matches for a specific date with the same filter controls.
- Live (/live): Live match list that refreshes from the live fixtures endpoint.
- League (/league/[id]): League overview with standings and upcoming fixtures.
- Match (/match/[id]): Match detail view with scoreline, timeline events, lineups, and stats tabs.

## Requirements

- Node.js 18+
- npm or yarn
>>>>>>> theirs

## Setup

Install dependencies:

```bash
npm install
# or
yarn install
```

## Run the app
<<<<<<< ours

Start the development server:

=======

Start the development server:

>>>>>>> theirs
```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

## Build for production

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```
