# Football Subs

Football Subs is an app designed to help coaches manage substitutions for kids' football teams. It ensures that each player gets a similar amount of game time, keeping all players engaged and involved.

## Features

- **Persistent Player List**: Stores players so they are available for every game. Player lists are saved locally on your device.
- **Goalkeeper Management**: Allows the coach to assign and reassign the goalkeeper at any time without affecting substitutions. The goalkeeper's playing time is not counted while they are in goal.
- **Game Setup**: Input the list of players (persisted between sessions), number of players on the field at a time, and match length.
- **Select Starting Line-up**: Choose which players will start on the field.
- **Substitution Management**: Advises when to make substitutions and who to substitute.
- **Real-Time Tracking**: Records how long each player has played during the match, excluding the goalkeeper's time in goal.
- **Analytics**: Provides visual analytics on each player's playing time.
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
   - From the list of added players, select the players who will start on the field.
   - You can select up to the number of players allowed on the field.
7. **Start Game**:
   - Click the "Start Game" button.
   - If the number of players added is less than the number of players on the field, or if you haven't selected enough starting players, you'll be prompted accordingly.

### 2. Managing the Game

1. **Game Management Screen**: Once the game starts, you're taken to the Game Management screen.
2. **Starting the Timer**:
   - Click the "Start" button to begin the game clock.
3. **Assigning the Goalkeeper**:
   - Click the "Assign Goalkeeper" button.
   - Select the player to be the goalkeeper.
   - The goalkeeper's playtime will not be counted while they are in goal.
4. **Changing the Goalkeeper**:
   - You can reassign the goalkeeper at any time by selecting another player.
   - Changing the goalkeeper does not require a substitution and does not affect on-field/off-field status of any player.
5. **Viewing On-Field Players**:
   - View the list of players currently on the field.
6. **Making Substitutions**:
   - Click the "Substitute" button when you want to make a substitution.
   - The app suggests the next player to sub out and the player to sub in, ensuring equal playtime.
   - Substitutions do not affect the goalkeeper assignment.
7. **Pausing the Timer**:
   - Click the "Pause" button to pause the game clock during stoppages like half-time.
   - Click "Start" again to resume the game.
8. **Viewing Player Data**:
   - Monitor each player's total playtime in real-time.
   - The playtime updates every second for players on the field, excluding the goalkeeper.
9. **Viewing Analytics**:
   - Click the "View Analytics" button to see a graphical representation of each player's playtime.
   - The analytics display a bar chart comparing playtimes.

### 3. Ending the Game

- **Game Completion**:
  - Once the match duration is reached, you can stop making substitutions.
  - Use the analytics to review and ensure that each player received appropriate playtime.

## External APIs and Services

This app does not utilize any external APIs. All data is managed locally within the app during the session.

## Environment Variables

No external environment variables are required for this app.

## Notes

- The app is responsive and works on various screen sizes.
- No authentication is required to use the app.
- Player lists are persisted between sessions using localStorage.
- The goalkeeper's playing time is not counted while they are in goal.
