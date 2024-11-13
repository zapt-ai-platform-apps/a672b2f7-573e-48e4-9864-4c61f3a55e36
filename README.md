# Football Subs

Football Subs is an app designed to help coaches manage substitutions for kids' football teams. It ensures that each player gets a fair amount of game time while keeping all players engaged and involved. The app allows coaches to monitor player playtimes and make informed substitution decisions in real-time.

## Features

- **Accurate Playtime Tracking with Real-Time Updates**: Player playtimes are accurately calculated based on when they start and stop playing. Playtimes update every second during the game, ensuring coaches have up-to-the-second information.
- **Playtime Increases Only When Game Is Running**: Player playtimes only increase when the game is running. When the game is paused, playtimes are paused as well, ensuring accurate tracking of actual playtime.
- **Accurate Game Time Calculation**: The total game time is calculated by recording each interval the game is running, summing up the total elapsed time, and updating every second. This ensures precise tracking of the total game duration, even when the game is paused and resumed.
- **Real-Time Tracking**: The game clock and player playtimes update every second during the game, allowing for precise management.
- **Delete Players**: Coaches can delete players from the player list, allowing for better management and organization.
- **Select Players for Substitution by Clicking**: Both the player to sub off and the player to sub on are selected by clicking on them directly from the respective lists. This intuitive method streamlines the substitution process.
- **Consistent Selection Method**: The app uses the same method for selecting both players to sub on and sub off, enhancing the user experience.
- **Made on ZAPT Link**: A "Made on ZAPT" link is displayed on all screens, providing quick access to the ZAPT website.
- **Improved Game Management Screen Design**: The Game Management screen has improved padding around the entire screen and enhanced layout, providing a more user-friendly and visually appealing interface.
- **Full Screen Display**: The app utilizes 'min-h-screen' for all screens, ensuring it occupies the full viewport height and provides a consistent experience across devices.
- **Progressive Web App (PWA)**: Football Subs is a Progressive Web App, allowing you to install it on your device for a native app-like experience. You can use the app offline, and it integrates seamlessly with your device.
- **Persistent Player List**: Stores players so they are available for every game. Player lists are saved locally on your device.
- **All Players Unticked by Default**: When starting a new game, all players are unticked in the list of starting players, ensuring a fresh selection each time.
- **Add Players During Game**: Allows the coach to add new players even after the game has started. New players are given the same total current playtime as the player with the least playtime who is not the current goalkeeper when they are added.
- **Goalkeeper Management with Confirmation**: Allows the coach to assign and reassign the goalkeeper at any time without affecting substitutions. When the goalkeeper is changed, the app asks for confirmation before making the change. The previous goalkeeper's total playtime is adjusted accordingly when they become an outfield player. The goalkeeper's playing time is not counted while they are in goal.
- **Game Setup**: Input the list of players and number of players on the field at a time.
- **Select Starting Line-up**: Choose which players will start on the field by checking the box next to their name. The checkboxes and other controls have been made larger and easier to use, especially on mobile devices.
- **Substitution Management**: Coaches can manage substitutions seamlessly, with the substitution interface always available. Players off the field are ordered by ascending total playtime, helping coaches identify who needs more time on the field.
- **Player Ordering**: Players are ordered by their total playing time, with those who have played the least time at the top.
- **Pause Functionality**: Ability to pause the game clock during stoppages like half-time.
- **Responsive Design**: The app is responsive and user-friendly on all screen sizes. The layout has been improved for mobile devices, with larger controls and improved spacing to enhance usability.
- **Confirmation Before Ending Game**: When the coach clicks the "End Game" button, the app asks for confirmation to prevent accidental termination of the game.
- **Large, Easy-to-Press Buttons and Controls**: All buttons, checkboxes, and inputs have been made larger and easier to press, enhancing usability on mobile devices.
- **No Default Selection for Substitutions**: Coaches must now choose which players to substitute by clicking on them in the lists, ensuring deliberate decisions and avoiding unintended substitutions.
- **Vercel Analytics Integration**: The app now includes Vercel Analytics to collect analytics data about app usage, helping understand app performance and user engagement.

## User Journeys

### 1. Accessing the App

1. **Open the App**:
   - Visit the Football Subs app URL in your browser.
   - You are greeted with a visually engaging landing page featuring dynamic images and a modern layout.
2. **Installing the PWA (Optional)**:
   - On compatible browsers, you will see an option to "Install" the app.
   - Click "Install" to add Football Subs to your device's home screen for easy access and a native app-like experience.
3. **Landing Page**:
   - The app's logo is prominently displayed.
   - Click the "Get Started" button to proceed to the game setup.
   - **Made on ZAPT Link**: At the bottom of the screen, there's a link labeled "Made on ZAPT" that directs you to [www.zapt.ai](https://www.zapt.ai).

### 2. Setting Up the Game

1. **Game Setup Screen**: After clicking "Get Started," you are taken to the Game Setup screen.
2. **Made on ZAPT Link**: At the bottom of the screen, you will see the "Made on ZAPT" link.
3. **Player List Persistence**:
   - The app loads the saved list of players from previous sessions.
   - **All Players Unticked**: All players are unticked in the list of starting players when the Game Setup screen loads, regardless of previous selections.
   - If no players have been added yet, you can add new players.
4. **Add Players**:
   - Enter the name of a player in the input field.
   - Click the "Add" button to add the player to the list.
   - Repeat this process until all players are added.
   - **Delete Players**:
     - Next to each player's name, there's a "Delete" button (trash bin icon).
     - Click the "Delete" button to remove a player from the list.
     - A confirmation dialog appears asking if you're sure you want to delete the player.
     - Click "Yes" to confirm and delete the player.
     - Click "No" to cancel the action.
5. **Set Number of Players on Field**:
   - Enter the number of players that can play at one time (e.g., 5 for 5-a-side).
6. **Select Starting Line-up**:
   - From the list of added players, select the players who will start on the field by checking the box next to their name.
   - You must select exactly the number of players allowed on the field.
   - **Larger Checkboxes**: The checkboxes have been made larger for easier selection, especially on mobile devices.
7. **Assign Goalkeeper**:
   - Once you've selected the starting lineup, select a player from the starting lineup as the goalkeeper using the dropdown menu.
8. **Start Game**:
   - Click the "Start Game" button.
   - If the number of players added is less than the number of players on the field, or if you haven't selected enough starting players, you'll be prompted accordingly.

### 3. Managing the Game

1. **Game Management Screen**: Once the game starts, you're taken to the Game Management screen, which now features improved design with padding around the entire screen and enhanced layout. The app now uses 'min-h-screen' for all screens, ensuring it occupies the full viewport height.
2. **Made on ZAPT Link**: At the bottom of the screen, the "Made on ZAPT" link is displayed.
3. **Starting the Timer**:
   - Click the "Start" button to begin the game clock.
   - **Real-Time Updates**: The game clock and player playtimes update every second during the game.
   - **Playtime Increases Only When Game Is Running**: Player playtimes only increase when the game is running. When the game is paused, playtimes are paused as well.
   - **Accurate Game Time Calculation**: The total game time is calculated by recording each interval the game is running, summing up the total elapsed time, and updating every second.
4. **Viewing Player Status**:
   - The app displays each player's total playing time, updating every second.
   - Players are ordered by their total playing time, with those who have played the least time at the top.
   - **Accurate Playtime Tracking**: Players' playing times are calculated based on actual playing intervals, providing accurate playtimes even if the app is minimized or the device is locked.
5. **Making Substitutions**:
   - **Substitution Interface Always Available**:
     - The substitution options are always visible, allowing for quick and easy substitutions.
   - **Select Player to Sub Off**:
     - Click directly on a player in the "Players on Field" list to select them as the player to substitute off.
     - The clickable area is larger, making it easier to select players.
     - The selected player is highlighted.
   - **Select Player to Sub On**:
     - Click directly on a player in the "Players Off Field" list to select them as the player to substitute on.
     - The selected player is highlighted.
   - **Make Substitution**:
     - Click the "Make Substitution" button to execute the substitution.
     - The button is disabled until both a player to sub off and a player to sub on have been selected.
     - The substitution lists update accordingly.
     - **Note**: If the game is paused when you make a substitution, the playtime for the player coming on will not increase until the game is resumed.
6. **Adding a New Player During the Game**:
   - **Add New Player**:
     - In the "Add New Player" section, enter the name of the player who has just arrived.
     - Click the "Add" button.
     - The new player is added to the list with the same total playtime as the player with the least playtime who is not the current goalkeeper at the moment they are added.
   - **Manage the New Player**:
     - The new player appears in the "Players Off Field" list and can be substituted into the game as needed.
7. **Changing the Goalkeeper (Optional)**:
   - Click the "Change Goalkeeper" button.
   - A modal appears listing the players currently on the field.
   - **Select New Goalkeeper**:
     - Click on the player you wish to assign as the new goalkeeper.
     - A confirmation dialog appears asking if you're sure you want to change the goalkeeper to the selected player.
     - Click "Yes" to confirm and assign the new goalkeeper.
     - Click "No" to cancel and return to the player selection.
   - **Previous Goalkeeper's Playtime Adjustment**:
     - When the goalkeeper is changed and the previous goalkeeper becomes an outfield player, their play intervals are adjusted to reflect their time as an outfield player.
     - **Note**: The playtime for the new goalkeeper will not increase while they are in goal.
8. **Pause/Resume the Timer**:
   - Click the "Pause" button to pause the game clock during stoppages like half-time.
   - Click "Start" again to resume the game.
   - **Playtime Paused**: When the game is paused, the players' playtimes do not increase.
   - **Improved Layout on Mobile**:
     - The "Pause" and "End Game" buttons are better spaced and larger, especially on mobile devices, to prevent accidental clicks.
9. **Ending the Game**:
   - Click the "End Game" button when you are ready to finish the game.
   - **Confirmation Prompt**:
     - A confirmation dialog appears asking if you are sure you want to end the game.
     - Click "Yes" to confirm and end the game.
     - Click "No" or outside the dialog to cancel and continue the game.

### 4. Reviewing Player Playtimes

- After ending the game, review each player's playtime to ensure that every player received equitable playtime.

## External APIs and Services

This app uses:

- **Progressier** for adding Progressive Web App (PWA) functionality. Progressier simplifies the process of making the app installable and offline-capable.
- **Sentry** for error tracking and performance monitoring. Sentry helps in identifying and fixing errors in the application by providing real-time error reports.
- **Vercel Analytics** for collecting analytics data about app usage. Vercel Analytics helps in understanding app performance and user engagement.

## Environment Variables

The following environment variables are required:

- **VITE_PUBLIC_SENTRY_DSN**: Your Sentry Data Source Name.
- **VITE_PUBLIC_APP_ENV**: The environment in which the app is running (e.g., development, production).
- **VITE_PUBLIC_APP_ID**: The ID of the app for tagging purposes and for Progressier PWA integration.

These variables should be defined in a `.env` file at the root of your project.

## Notes

- The app is responsive and works on various screen sizes.
- No authentication is required to use the app.
- Player lists are persisted between sessions using localStorage.
- **PWA Installation**: You can install the app on your device for offline use and a more native experience.
- The goalkeeper's playing time is not counted while they are in goal.
- When the goalkeeper is changed and the previous goalkeeper becomes an outfield player, their play intervals are adjusted to reflect their time as an outfield player.
- **Confirmation Before Changing Goalkeeper**: The app asks for confirmation when you select a new goalkeeper to prevent accidental changes.
- Substitution logic allows coaches to select which players to substitute without disruptions.
- **Consistent Player Selection**: Coaches can now select both players to sub off and players to sub on by clicking on them directly from the respective lists. This change enhances usability and provides a consistent method for player selection.
- Players' playing times are calculated based on when they start and stop playing, ensuring accuracy even if the app is minimized or the device is locked.
- **Real-Time Updates**: Playtimes are updated every second during the game, providing real-time information to the coach.
- **Accurate Game Time Calculation**: The total game time is calculated by recording each interval the game is running, summing up the total elapsed time, and updating every second. This provides precise tracking of the total game duration, even when the game is paused and resumed.
- **Important**: Ensure that you select exactly the number of starting players required before starting the game. If you do not select the starting lineup or have insufficient players, the "Start Game" button will alert you accordingly.
- **Adding Players During Game**: Coaches can add new players even after the game has started. New players are assigned the same total playtime as the player with the least playtime who is not the current goalkeeper at the moment they are added.
- **Confirmation Before Ending Game**: The app asks for confirmation when you click the "End Game" button to prevent accidental termination of the game.
- **Improved Mobile Layout**: The layout has been optimized for mobile devices, especially the positioning and spacing of the "Pause" and "End Game" buttons to ensure they are not too close together.
- **Improved Design**: The Game Management screen now features improved padding and layout enhancements to provide a more user-friendly experience.
- **Made on ZAPT Link**: A "Made on ZAPT" link is present on all screens, allowing users to visit [www.zapt.ai](https://www.zapt.ai).
- **All Players Unticked by Default**: When starting a new game, all players are unticked in the list of starting players, ensuring a fresh selection each time.
- **Delete Players**: Coaches can delete players from the player list in the Game Setup screen. When a player is deleted, they are removed from the list and from local storage.
- **Large, Easy-to-Press Buttons and Controls**: All buttons, checkboxes, and inputs have been made larger and easier to press, enhancing usability on mobile devices.
- **No Default Selection for Substitutions**: There is no longer a default selection for players during substitutions. Coaches must actively select players by clicking on them in the lists, ensuring deliberate and accurate substitutions.
- **Vercel Analytics Integration**: The app includes Vercel Analytics to collect analytics data about app usage, helping understand app performance and user engagement.

## Known Issues and Solutions

- **Playtime and Game Time Not Updating in Real-Time**:
  - **Issue**: Previously, player playtimes and the total game time only updated when the game was paused.
  - **Solution**: The app has been updated to refresh player playtimes and the game time every second during the game. The time elapsed for the match is calculated by recording each start and end time the game is running, summing up the total time, and showing the updated time every second.
- **Playtime Increments During Game Pause Fixed**:
  - **Issue**: Previously, when a player was substituted onto the field, their playtime would increase even when the game was paused.
  - **Solution**: The app has been updated to ensure that players' playtimes only increase when the game is running. When the game is paused, players' playtimes do not increment.

# How to Use the App

1. **Set Up the Game**:
   - Add your players and select the number of players on the field.
   - Choose your starting lineup and assign a goalkeeper.
2. **Manage the Game**:
   - Start the game and monitor player playtimes and the total game time, which update in real-time.
   - Make substitutions by clicking on players in the lists.
   - Change the goalkeeper if necessary, with playtime adjustments.
3. **End the Game**:
   - When the game is over, end the game to finalize playtimes.
   - Review the playtimes to ensure fair play for all players.

Enjoy a smoother coaching experience with Football Subs!