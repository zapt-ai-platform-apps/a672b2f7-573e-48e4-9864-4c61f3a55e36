# Football Subs

Football Subs is an app designed to help coaches manage substitutions for kids' football teams. It ensures that each player gets a fair amount of game time while keeping all players engaged and involved. The app allows coaches to monitor player playtimes and make informed substitution decisions in real-time.

## Features

- **Landing Page**: A welcoming landing page that introduces the app and its purpose, with a "Get Started" button to begin setting up a game.
- **Persistent Player List**: Stores players so they are available for every game. Player lists are saved locally on your device.
- **Add Players During Game**: Allows the coach to add new players even after the game has started. New players are given the same total current playtime as the player with the least playtime who is not the current goalkeeper when they are added.
- **Goalkeeper Management with Confirmation**: Allows the coach to assign and reassign the goalkeeper at any time without affecting substitutions. When the goalkeeper is changed, the app asks for confirmation before making the change. The previous goalkeeper's total playtime is set to match the player with the least playtime at that moment when they become an outfield player. The goalkeeper's playing time is not counted while they are in goal.
- **Game Setup**: Input the list of players and number of players on the field at a time.
- **Select Starting Line-up**: Choose which players will start on the field by checking the box next to their name.
- **Substitution Management**: Coaches can manage substitutions seamlessly, with the substitution interface always available. Players off the field are ordered by ascending total playtime, helping coaches identify who needs more time on the field.
- **Real-Time Tracking**: Players' playing times update every second during the game, providing accurate and up-to-date information.
- **Player Ordering**: Players are ordered by their total playing time, with those who have played the least time at the top.
- **Pause Functionality**: Ability to pause the game clock during stoppages like half-time.
- **Responsive Design**: The app is responsive and user-friendly on all screen sizes. The layout has been improved for mobile devices, especially the positioning of the "Pause" and "End Game" buttons to prevent accidental clicks.
- **Confirmation Before Ending Game**: When the coach clicks the "End Game" button, the app asks for confirmation to prevent accidental termination of the game.

## User Journeys

### 1. Accessing the App

1. **Open the App**: Launch the Football Subs app on your device.
2. **Landing Page**:
   - You are greeted with a welcoming landing page featuring the app's logo and a brief description.
   - Click the "Get Started" button to proceed to the game setup.

### 2. Setting Up the Game

1. **Game Setup Screen**: After clicking "Get Started," you are taken to the Game Setup screen.
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

### 3. Managing the Game

1. **Game Management Screen**: Once the game starts, you're taken to the Game Management screen.
2. **Starting the Timer**:
   - Click the "Start" button to begin the game clock.
3. **Viewing Player Status**:
   - The app displays each player's total playing time in seconds.
   - Players are ordered by their total playing time, with those who have played the least time at the top.
   - **Real-Time Updates**: Players' playing times update every second, providing real-time tracking.
4. **Making Substitutions**:
   - **Substitution Interface Always Available**:
     - The substitution options are always visible, allowing for quick and easy substitutions.
   - **Select Player to Sub Off**:
     - Click directly on a player in the "Players on Field" list to select them as the player to substitute off.
   - **Select Player to Sub On**:
     - The player off-field with the least total playtime is automatically selected as the player to substitute on.
     - You can change this selection if desired.
   - **Make Substitution**:
     - Click the "Make Substitution" button to execute the substitution.
     - The substitution lists update accordingly.
5. **Adding a New Player During the Game**:
   - **Add New Player**:
     - In the "Add New Player" section, enter the name of the player who has just arrived.
     - Click the "Add" button.
     - The new player is added to the list with the same total playtime as the player with the least playtime who is not the current goalkeeper at the moment they are added.
   - **Manage the New Player**:
     - The new player appears in the "Players Off Field" list and can be substituted into the game as needed.
6. **Changing the Goalkeeper (Optional)**:
   - Click the "Change Goalkeeper" button.
   - A modal appears listing the players currently on the field.
   - **Select New Goalkeeper**:
     - Click on the player you wish to assign as the new goalkeeper.
     - A confirmation dialog appears asking if you're sure you want to change the goalkeeper to the selected player.
     - Click "Yes" to confirm and assign the new goalkeeper.
     - Click "No" to cancel and return to the player selection.
   - **Previous Goalkeeper's Playtime Adjustment**:
     - When the goalkeeper is changed and the previous goalkeeper becomes an outfield player, their total playtime is set to match the player with the least playtime at that moment.
7. **Pause/Resume the Timer**:
   - Click the "Pause" button to pause the game clock during stoppages like half-time.
   - Click "Start" again to resume the game.
   - **Improved Layout on Mobile**:
     - The "Pause" and "End Game" buttons are better spaced, especially on mobile devices, to prevent accidental clicks.
8. **Ending the Game**:
   - Click the "End Game" button when you are ready to finish the game.
   - **Confirmation Prompt**:
     - A confirmation dialog appears asking if you are sure you want to end the game.
     - Click "Yes" to confirm and end the game.
     - Click "No" or outside the dialog to cancel and continue the game.

### 4. Reviewing Player Playtimes

- After ending the game, review each player's playtime to ensure that every player received equitable playtime.

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
- When the goalkeeper is changed and the previous goalkeeper becomes an outfield player, their total playtime is set to match the player with the least playtime at that moment.
- **Confirmation Before Changing Goalkeeper**: The app asks for confirmation when you select a new goalkeeper to prevent accidental changes.
- Substitution logic allows coaches to select which players to substitute without disruptions.
- The substitution interface is always visible during the match, allowing for seamless substitutions.
- Players' playing times update every second, providing real-time data for decision-making.
- **Important**: Ensure that you select exactly the number of starting players required before starting the game. If you do not select the starting lineup or have insufficient players, the "Start Game" button will alert you accordingly.
- **Adding Players During Game**: Coaches can add new players even after the game has started. New players are assigned the same total playtime as the player with the least playtime who is not the current goalkeeper at the moment they are added.
- **Confirmation Before Ending Game**: The app asks for confirmation when you click the "End Game" button to prevent accidental termination of the game.
- **Improved Mobile Layout**: The layout has been optimized for mobile devices, especially the positioning and spacing of the "Pause" and "End Game" buttons to ensure they are not too close together.