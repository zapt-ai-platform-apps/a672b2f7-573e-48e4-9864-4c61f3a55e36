# Football Subs

Football Subs is an app designed to help coaches manage substitutions for kids' football teams. It ensures that each player gets a fair amount of game time while keeping all players engaged and involved. The app allows coaches to monitor player playtimes and make informed substitution decisions.

## Features

- **Persistent Player List**: Stores players so they are available for every game. Player lists are saved locally on your device.
- **Goalkeeper Management**: Allows the coach to assign and reassign the goalkeeper at any time without affecting substitutions. The goalkeeper's playing time is not counted while they are in goal.
- **Game Setup**: Input the list of players, number of players on the field at a time, and match length.
- **Select Starting Line-up**: Choose which players will start on the field by checking the box next to their name.
- **Substitution Management**: Coaches can select which players to substitute, making informed decisions to ensure equitable playtime.
- **Real-Time Tracking**: Records how long each player has played during the match, excluding the goalkeeper's time in goal.
- **Pause Functionality**: Ability to pause the game clock during stoppages like half-time.

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
5. **Set Match Length**:
   - Enter the total duration of the match in minutes.
6. **Select Starting Line-up**:
   - From the list of added players, select the players who will start on the field by checking the box next to their name.
   - You must select exactly the number of players allowed on the field.
7. **Start Game**:
   - Click the "Start Game" button.
   - If the number of players added is less than the number of players on the field, or if you haven't selected enough starting players, you'll be prompted accordingly.

### 2. Managing the Game

1. **Game Management Screen**: Once the game starts, you're taken to the Game Management screen.
2. **Starting the Timer**:
   - Click the "Start" button to begin the game clock.
3. **Assigning the Goalkeeper**:
   - Click the "Assign GK" or "Remove GK" button next to a player's name to assign or unassign the goalkeeper.
   - The goalkeeper's playtime will not be counted while they are in goal.
4. **Viewing Player Status**:
   - The app displays each player's total playing time in seconds.
   - Players currently on the field have their playtime increment every second (excluding the goalkeeper).
5. **Making Substitutions**:
   - Click the "Substitute" button when you want to make a substitution.
   - A substitution interface appears, showing:
     - **Players on Field**: A list of players currently on the field, along with their total playtimes.
     - **Players Off Field**: A list of players currently off the field, along with their total playtimes.
   - The players are ordered by total playtime, with the player who has played the most at the top.
   - **Selecting Players**:
     - Choose the player you wish to substitute off from the "Players on Field" list.
     - Choose the player you wish to substitute on from the "Players Off Field" list.
     - The app suggests substituting off the player with the most playtime and substituting on the player with the least playtime, but you can select any player.
   - Click the "Confirm Substitution" button to make the substitution.
6. **Pause/Resume the Timer**:
   - Click the "Pause" button to pause the game clock during stoppages like half-time.
   - Click "Start" again to resume the game.

### 3. Ending the Game

- **Game Completion**:
  - Once the match duration is reached, you can stop making substitutions.
  - Review each player's playtime to ensure that every player received equitable playtime.

## External APIs and Services

This app does not utilize any external APIs. All data is managed locally within the app during the session.

## Environment Variables

No external environment variables are required for this app.

## Notes

- The app is responsive and works on various screen sizes.
- No authentication is required to use the app.
- Player lists are persisted between sessions using localStorage.
- The goalkeeper's playing time is not counted while they are in goal.
- Substitution logic allows coaches to select which players to substitute, with suggestions based on total playtime.
- Players are ordered by total playtime in the substitution interface, aiding in making equitable substitution decisions.
- **Important**: Ensure that you select exactly the number of starting players required before starting the game. If you do not select the starting lineup or have insufficient players, the "Start Game" button will alert you accordingly.
