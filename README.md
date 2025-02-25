# Football Subs

Football Subs is an application designed to help football coaches and team managers track player substitutions, playing time, and team performance during matches.

## User Journeys

1. [Accessing the App](docs/journeys/accessing-the-app.md) - How to get started with Football Subs
2. [Setting Up a Game](docs/journeys/setting-up-the-game.md) - Create a new game session
3. [Setting Up Game Info](docs/journeys/setting-up-the-game-info.md) - Configure basic game information
4. [Setting Up Game Participants](docs/journeys/setting-up-the-game-setup.md) - Select players for the match
5. [Managing the Game](docs/journeys/managing-the-game.md) - Track substitutions and game events
6. [Player Positions](docs/journeys/player-positions/step-by-step-instructions.md) - Understand how to assign and manage player positions
7. [Visualizing Players on the Pitch](docs/journeys/visualizing-players-on-the-pitch.md) - See your team formation in real-time
8. [Reviewing Game Summary and Sharing](docs/journeys/reviewing-game-summary-and-sharing.md) - Analyze game data and share results
9. [Switching Between Light and Dark Mode](docs/journeys/switching-between-light-and-dark-mode.md) - Customize your app appearance
10. [Running Tests](docs/journeys/running-tests.md) - How to run and extend the test suite

## Development

### Running the App

```bash
npm install
npm run dev
```

### Testing

Football Subs includes a comprehensive test suite to validate functionality:

```bash
npm run test       # Run tests
npm run test:watch # Run tests in watch mode
```

The tests are organized in the `tests` directory, mirroring the structure of the source code.

### Building for Production

```bash
npm run build
npm run preview
```

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Supabase for authentication
- CockroachDB with Drizzle ORM for database
- Vitest and React Testing Library for testing

Made on [ZAPT](https://www.zapt.ai)