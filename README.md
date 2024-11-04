# Football Subs

Football Subs is an app designed to help coaches manage substitutions for kids' football teams. It ensures that each player gets a fair amount of game time while keeping all players engaged and involved. The app prioritizes star players to give them more playing time in a 3:2 ratio over non-star players.

## Features

- **Persistent Player List**: Stores players so they are available for every game. Player lists are saved locally on your device.
- **Star Players Management**: Mark players as star players during the game setup. Star players are indicated by a filled star icon (★), while non-star players have an outlined star icon (☆). An explanation is provided about the effect of being a star player.
- **Goalkeeper Management**: Allows the coach to assign and reassign the goalkeeper at any time without affecting substitutions. The goalkeeper's playing time is not counted while they are in goal.
- **Game Setup**: Input the list of players, number of players on the field at a time, and match length.
- **Select Starting Line-up**: Choose which players will start on the field.
- **Substitution Management**: Advises when to make substitutions and who to substitute while respecting star player rules and playtime ratios.
- **Next Substitutions Display**: Clearly shows which player is next to come off and who is next to come on.
- **Real-Time Tracking**: Records how long each player has played during the match, excluding the goalkeeper's time in goal.
- **Analytics**: Provides visual analytics on each player's playing time.
- **Pause Functionality**: Ability to pause the game clock during stoppages like half-time.

## User Journeys

### 1. Setting Up the App

1. **Open the App**: Launch the Football Subs app on your device.
2. **Player List Persistence**:
   - The app loads the saved list of players and star players from previous sessions.
   - If no players have been added yet, you can add new players.
3. **Add Players**:
   - Enter the name of a player in the input field.
   - Click the "Add" button to add the player to the list.
   - Repeat this process until all players are added.
4. **Mark Star Players**:
   - In the player list, click the outlined star icon (☆) next to players you want to designate as star players.
   - The star icon will fill in (★) to indicate the player is now a star player.
   - An explanation about the effect of being a star player is provided below the player list.
5. **Set Number of Players on Field**:
   - Enter the number of players that can play at one time (e.g., 5 for 5-a-side).
6. **Set Match Length**:
   - Enter the total duration of the match in minutes.
7. **Select Starting Line-up**:
   - From the list of added players, select the players who will start on the field by checking the box next to their name.
   - You can select up to the number of players allowed on the field.
8. **Start Game**:
   - Click the "Start Game" button.
   - If the number of players added is less than the number of players on the field, or if you haven't selected enough starting players, you'll be prompted accordingly.

### 2. Managing the Game

1. **Game Management Screen**: Once the game starts, you're taken to the Game Management screen.
2. **Starting the Timer**:
   - Click the "Start" button to begin the game clock.
3. **Assigning the Goalkeeper**:
   - Click the "Assign GK" or "Change GK" button next to a player's name to assign or reassign the goalkeeper.
   - The goalkeeper's playtime will not be counted while they are in goal.
4. **Viewing Next Substitutions**:
   - The app displays the next player to be substituted off and the next player to come on.
   - The substitution logic ensures that star players get more playing time in a 3:2 ratio over non-star players.
   - Non-star players are substituted off first to maximize star players' time on the field.
5. **Making Substitutions**:
   - Click the "Substitute" button when you want to make a substitution.
   - The app suggests the next player to sub out and the player to sub in, ensuring the 3:2 playtime ratio and respecting the star player constraint.
   - Substitutions do not affect the goalkeeper assignment.
6. **Highlighting Next Player to Come On**:
   - The player next to come on is highlighted in the substitution queue for easy identification.
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
  - Use the analytics to review and ensure that each player received appropriate playtime according to the 3:2 ratio.

## External APIs and Services

This app does not utilize any external APIs. All data is managed locally within the app during the session.

## Environment Variables

No external environment variables are required for this app.

## Notes

- The app is responsive and works on various screen sizes.
- No authentication is required to use the app.
- Player lists and star player selections are persisted between sessions using localStorage.
- The goalkeeper's playing time is not counted while they are in goal.
- Substitution logic ensures that star players receive more playing time in a 3:2 ratio over non-star players.
- Non-star players are substituted off first to maximize the time star players spend on the field.
- When adding a player, the star button now has an outlined star icon (☆) by default. Clicking the star fills it in (★), indicating the player is a star player.
- An explanation about the effect of being a star player is provided in the game setup screen.
