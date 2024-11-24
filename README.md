# Football Subs

Football Subs is an app designed to help coaches manage substitutions and track game events for kids' football teams. It ensures that each player gets a fair amount of game time while keeping all players engaged and involved. The app allows coaches to monitor player playtimes, manage substitutions, track scores, record goal events, and review detailed game summaries in real-time. Additionally, the app now allows coaches to share the match summary directly from the app once the match has ended.

## Features

- **Updated Goal Summary**: At the end of the game, the summary now shows how many goals each player on your team scored instead of when each goal was scored. This provides a quick overview of player performance without focusing on specific goal times.
- **Share Match Summary**: At the end of the game, you can now share the match summary directly from the app. The summary includes the final score, the number of goals each player on your team scored, opponent team's total goals, and player playtimes. Use the "Share Summary" button on the Game Summary screen to share via supported apps on your device.
- **Improved Goal Scorer Selection Modal**: When recording a goal for your team, the modal listing the players is now much taller and scrollable. A scrollbar appears when the list exceeds the available space, making it obvious that you can scroll down if the names don't fit. This enhancement makes it easier for coaches to select the correct player quickly, especially when managing teams with many players.
- **Players Ordered by Total Playtime in Summary**: In the final match summary page, players are ordered by their total time played in descending order. This allows coaches to easily see which players had the most playtime during the game.
- **Centered Title on Mobile**: The "Football Subs" title on the landing page is centered when viewed on mobile devices, providing a better user experience.
- **Fixed Duplicate Cancel Button**: Resolved the issue where two cancel buttons appeared when recording a goal and selecting a player. Now, only one cancel button is displayed, ensuring a cleaner interface.
- **Score Display**: The current score is displayed at the top of the screen during the game, allowing coaches to keep track of both teams' scores easily.
- **Goal Recording**: A "Goal Scored" button allows coaches to record when a goal is scored. Coaches can specify if the goal was scored by their team or the opponent and select the player who scored if it was their team.
- **Comprehensive Game Summary**: At the end of the game, a detailed summary is displayed, showing each player's total playtime, the overall score, the number of goals each player on your team scored, and opponent team's total goals. You can now share this summary directly from the app.
- **Accurate Playtime Tracking with Real-Time Updates**: Player playtimes are accurately calculated based on when they start and stop playing. Playtimes update every second during the game, ensuring coaches have up-to-the-second information.
- **Playtime Increases Only When Game Is Running**: Player playtimes only increase when the game is running. When the game is paused, playtimes are paused as well, ensuring accurate tracking of actual playtime.
- **Accurate Game Time Calculation**: The total game time is calculated by recording each interval the game is running, summing up the total elapsed time, and updating every second. This ensures precise tracking of the total game duration, even when the game is paused and resumed.
- **Real-Time Tracking**: The game clock and player playtimes update every second during the game, allowing for precise management.
- **Delete Players**: Coaches can delete players from the player list, allowing for better management and organization.
- **Select Players for Substitution by Clicking**: Both the player to sub off and the player to sub on are selected by clicking on them directly from the respective lists. This intuitive method streamlines the substitution process.
- **Consistent Selection Method**: The app uses the same method for selecting both players to sub on and sub off, enhancing the user experience.
- **Made on ZAPT Link and Contact Email**: A "Made on ZAPT" link and a contact email address (footballsubs@zapt.ai) are displayed as a footer on all screens, providing quick access to the ZAPT website and easy communication.
- **Improved Game Management Screen Design**: The Game Management screen has improved padding around the entire screen and enhanced layout, providing a more user-friendly and visually appealing interface.
- **Footer Enhancement**: The footer design has been updated to fit seamlessly with the rest of the app. It now has appropriate spacing and is positioned at the bottom of the screen, enhancing the overall layout.
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
- **Umami Analytics Integration**: The app now includes Umami Analytics to collect analytics data about app usage, helping understand app performance and user engagement without compromising user privacy.

## User Journeys

### 1. Accessing the App

1. **Open the App**:
   - Visit the Football Subs app URL in your browser.
   - You are greeted with a visually engaging landing page featuring dynamic images and a modern layout.
   - On mobile devices, the "Football Subs" title is centered for better readability.
2. **Installing the PWA (Optional)**:
   - On compatible browsers, you will see an option to "Install" the app.
   - Click "Install" to add Football Subs to your device's home screen for easy access and a native app-like experience.
3. **Landing Page**:
   - The app's logo is prominently displayed.
   - Click the "Get Started" button to proceed to the game setup.
   - **Footer**:
     - At the bottom of the screen, there's a footer containing:
       - A link labeled "Made on ZAPT" that directs you to [www.zapt.ai](https://www.zapt.ai).
       - A contact email address [footballsubs@zapt.ai](mailto:footballsubs@zapt.ai) for any inquiries or support.
     - The footer is styled consistently with the rest of the app and is fixed at the bottom of the screen with appropriate spacing.

### 2. Setting Up the Game

1. **Game Setup Screen**: After clicking "Get Started," you are taken to the Game Setup screen.
2. **Footer**: The footer remains at the bottom of the screen, providing consistent navigation and contact options.
3. **Player List Persistence**:
   - The app loads the saved list of players from previous sessions.
   - **All Players Unticked**: All players are unticked in the list of starting players when the Game Setup screen loads, ensuring a fresh selection.
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

1. **Game Management Screen**: After starting the game, you are taken to the Game Management screen.
2. **Time and Score Display**:
   - The game clock displays the elapsed game time.
   - The current score is displayed prominently.
3. **Control Buttons**:
   - **Start/Pause Button**: Starts or pauses the game clock.
   - **End Game Button**: Ends the game and takes you to the Game Summary screen after confirmation.
4. **Player Lists**:
   - **Players on Field**:
     - Displays the list of players currently on the field.
     - Players are sorted by ascending total playtime.
     - The goalkeeper is indicated with a "(GK)" tag.
     - Clicking on a player selects them for substitution.
   - **Players Off Field**:
     - Shows the list of players off the field.
     - Players are sorted by ascending total playtime.
     - Clicking on a player selects them to come onto the field.
5. **Substitutions**:
   - Select a player to sub off from the "Players on Field" list.
   - Select a player to sub on from the "Players Off Field" list.
   - Click the "Make Substitution" button to execute the substitution.
   - Players' playtimes adjust accordingly.
6. **Change Goalkeeper**:
   - Click the "Change Goalkeeper" button.
   - Select a new goalkeeper from the list of on-field players.
   - Confirm the change when prompted.
   - The previous goalkeeper's playtime adjusts as they become an outfield player.
7. **Add Players During Game**:
   - Use the "Add New Player" section to add players during the game.
   - Enter the player's name and click "Add."
   - New players start with the minimum playtime among current outfield players.
8. **Recording Goals**:
   - Click the "Goal Scored" button at the bottom of the screen.
   - **Select Team**:
     - A modal appears asking which team scored.
     - Click "Our Team" if your team scored.
     - Click "Opponent Team" if the opposing team scored.
   - **Select Scorer (If Our Team)**:
     - If you selected "Our Team," a larger modal appears, now much taller and scrollable.
     - A scrollbar is visible if the list of players exceeds the available space, making it obvious that you can scroll down.
     - Click on the player who scored the goal.
     - The goal is recorded with the scorer's name.
   - **Updating Score**:
     - The score displayed at the top of the screen updates automatically to reflect the new score.

### 4. Reviewing Game Summary and Sharing

1. **Game Summary Screen**: After ending the game, you are presented with a comprehensive game summary.
2. **Final Score**:
   - The final score is displayed prominently.
   - Shows the number of goals scored by your team and the opponent.
3. **Goals by Our Team**:
   - A list showing how many goals each player on your team scored is displayed.
   - For each player who scored, their name and the total number of goals are shown.
4. **Goals by Opponent Team**:
   - Displays the total number of goals the opponent team scored.
5. **Player Playtimes**:
   - A list of all players with their total playtimes is displayed.
   - Players are ordered by their total playtime in descending order, with those who played the most at the top.
   - Playtimes are shown in minutes and seconds.
6. **Share Match Summary**:
   - Click the "Share Summary" button to open your device's share options.
   - Select the app or method you wish to use to share the match summary.
   - The summary includes the final score, the number of goals each player on your team scored, opponent team's total goals, and player playtimes.
   - **Note**: Sharing functionality depends on your device and browser capabilities.
7. **Navigation Options**:
   - Click "Back to Home" to return to the landing page and start a new game.

# How to Use the App

1. **Set Up the Game**:
   - Add your players and select the number of players on the field.
   - Choose your starting lineup and assign a goalkeeper.
2. **Manage the Game**:
   - Start the game and monitor player playtimes and the total game time, which update in real-time.
   - Make substitutions by clicking on players in the lists.
   - Record goals using the "Goal Scored" button, specifying the scoring team and player.
   - Change the goalkeeper if necessary, with playtime adjustments.
   - Add new players during the game as needed.
3. **Review and Share Game Summary**:
   - After ending the game, review the game summary to see player playtimes (ordered by total playtime), the overall score, the number of goals each player on your team scored, and opponent team's total goals.
   - Share the match summary using the "Share Summary" button.
   - Return to the home screen to start a new game.

Enjoy a smoother coaching experience with Football Subs!

## Contact

For any inquiries or support, please contact us at [footballsubs@zapt.ai](mailto:footballsubs@zapt.ai).

## External Services

### Umami Analytics

The app uses **Umami Analytics** to collect analytics data about app usage, helping understand app performance and user engagement without compromising user privacy.