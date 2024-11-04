# Football Subs

Football Subs is an app designed to help coaches manage substitutions for kids' football teams. It ensures that each player gets a fair amount of game time while keeping all players engaged and involved. The app allows coaches to monitor player playtimes and make informed substitution decisions.

## Features

- **Persistent Player List**: Stores players so they are available for every game. Player lists are saved locally on your device.
- **Goalkeeper Management**: Allows the coach to assign and reassign the goalkeeper at any time without affecting substitutions. The goalkeeper's playing time is not counted while they are in goal.
- **Game Setup**: Input the list of players and number of players on the field at a time.
- **Select Starting Line-up**: Choose which players will start on the field by checking the box next to their name.
- **Substitution Management**: Coaches can select which players to substitute by simply clicking on them, making informed decisions to ensure equitable playtime.
- **Real-Time Tracking**: Records how long each player has played during the match, excluding the goalkeeper's time in goal.
- **Player Ordering**: Players are ordered by their total playing time, helping coaches identify who needs more time on the field.
- **Pause Functionality**: Ability to pause the game clock during stoppages like half-time.
- **Simplified Goalkeeper Assignment**: Goalkeeper assignment has been moved to a separate section to reduce clutter during gameplay.
- **Optimized Substitutions**:
  - **Players Off Field Ordered**: Players off the field are ordered by descending total playtime.
  - **Default Substitute On**: The player off-field with the least playtime is automatically selected to come on.
  - **Click-to-Select Substitution**: Click on a player on the field to select them as the player to substitute off.

## User Journeys

### 1. Setting Up the App

1. **Open the App**: Launch the Football Subs app on your device.
2. **Player List Persistence**:
   - The app loads the saved list of players from previous sessions.
   - If no players have been added yet, you can add new players.
3. **Add Players**:
   - Enter the name of a player in the input field.
   - Click the "Add" button to add the player to the list.
   - Repeat this process until all players are added.
4. **Set Number of Players on Field**:
   - Enter the number of players that can play at one time (e.g., 5 for 5-a-side).
5. **Select Starting Line-up**:
   - From the list of added players, select the players who will start on the field by checking the box next to their name.
   - You must select exactly the number of players allowed on the field.
6. **Assign Goalkeeper**:
   - Use the dropdown to select a player from the starting lineup as the goalkeeper.
7. **Start Game**:
   - Click the "Start Game" button.
   - If the number of players added is less than the number of players on the field, or if you haven't selected enough starting players, you'll be prompted accordingly.

### 2. Managing the Game

1. **Game Management Screen**: Once the game starts, you're taken to the Game Management screen.
2. **Starting the Timer**:
   - Click the "Start" button to begin the game clock.
3. **Viewing Player Status**:
   - The app displays each player's total playing time in seconds.
   - Players are ordered by their total playing time, with those who have played the least time at the top.
   - Players currently on the field have their playtime increment every second (excluding the goalkeeper).
4. **Making Substitutions**:
   - **Select Player to Sub Off**:
     - Click directly on a player in the "Players on Field" list to select them as the player to substitute off.
   - **Select Player to Sub On**:
     - The player off-field with the least total playtime is automatically selected as the player to substitute on.
     - You can change this selection if desired.
   - **Confirm Substitution**:
     - Click the "Confirm Substitution" button to make the substitution.
     - The substitution lists update accordingly.
5. **Changing the Goalkeeper (Optional)**:
   - Click the "Change Goalkeeper" button.
   - Select a different player to assign as the goalkeeper.
6. **Pause/Resume the Timer**:
   - Click the "Pause" button to pause the game clock during stoppages like half-time.
   - Click "Start" again to resume the game.

### 3. Ending the Game

- **Game Completion**:
  - When you decide to end the game, click the "End Game" button.
  - Review each player's playtime to ensure that every player received equitable playtime.

## External APIs and Services

This app uses **Sentry** for error tracking and performance monitoring. Sentry helps in identifying and fixing errors in the application by providing real-time error reports.

## Environment Variables

The following environment variables are required for Sentry integration:

- **VITE_PUBLIC_SENTRY_DSN**: Your Sentry Data Source Name.
- **VITE_PUBLIC_APP_ENV**: The environment in which the app is running (e.g., development, production).
- **VITE_PUBLIC_APP_ID**: The ID of the app for tagging purposes.

These variables should be defined in a `.env` file at the root of your project.

## Notes

- The app is responsive and works on various screen sizes.
- No authentication is required to use the app.
- Player lists are persisted between sessions using localStorage.
- The goalkeeper's playing time is not counted while they are in goal.
- Substitution logic allows coaches to select which players to substitute without disruptions.
- The substitution interface lists remain stable during the match, preventing selection issues.
- **Important**: Ensure that you select exactly the number of starting players required before starting the game. If you do not select the starting lineup or have insufficient players, the "Start Game" button will alert you accordingly.