# Football Tracker

Football Tracker is a small Next.js app for checking match schedules, live games, and basic stats. It keeps things lightweight with a clear list view and filters so you can scan fixtures quickly and jump into a match or league when you want more detail.

The app loads fixtures by date, lets you narrow results by league or status, and links out to pages for live matches, league tables, and match details.

## Pages

- Home (/): Today’s matches with filters for status, league, and search.
- Fixtures (/fixtures/[date]): Matches for a selected date with the same filter controls.
- Live (/live): Live match list that refreshes with current scores.
- League (/league/[id]): League overview with standings and upcoming fixtures.
- Match (/match/[id]): Match detail view with scoreline, events, lineups, and stats.

## Requirements

- Node.js 18+
- npm or yarn

## Setup

Install dependencies:

```bash
npm install
# or
yarn install
```

## Run the app

Start the development server:
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
