# Football Subs

Football Subs is an app designed to help coaches manage substitutions and track game events for kids' football teams. It ensures that each player gets a fair amount of game time while keeping all players engaged and involved. The app allows coaches to monitor player playtimes, manage substitutions, track scores, record goal events, and review detailed game summaries in real-time. Additionally, the app now allows coaches to share the match summary directly from the app once the match has ended.

## Features

- **Simplified Substitution Process**: Instead of a separate substitution section, coaches can now initiate substitutions directly from the player lists. Simply select a player from "Players on Field" to sub off and a player from "Players Off Field" to sub on. A confirmation modal will appear to confirm the substitution.
- **Clear Instructions**: Messages are displayed above the "Players on Field" and "Players Off Field" lists to guide coaches on how to make substitutions.
- **Updated Goal Summary**: At the end of the game, the summary shows how many goals each player on your team scored instead of when each goal was scored. This provides a quick overview of player performance without focusing on specific goal times.
- **Share Match Summary**: Coaches can share the match summary directly from the app, including the final score, the number of goals each player on your team scored, and player playtimes.
- **Improved Goal Scorer Selection Modal**: When recording a goal for your team, the modal listing the players is now taller and scrollable, making it easier to select the correct player quickly.
- **Players Ordered by Total Playtime in Summary**: In the final match summary page, players are ordered by their total time played in descending order.
- **Centered Title on Mobile**: The "Football Subs" title on the landing page is centered when viewed on mobile devices.
- **Fixed Duplicate Cancel Button**: Resolved the issue where two cancel buttons appeared when recording a goal and selecting a player.
- **Score Display**: The current score is displayed at the top of the screen during the game.
- **Goal Recording**: A "Goal Scored" button allows coaches to record when a goal is scored, specifying if it was by their team or the opponent, and selecting the player who scored if applicable.
- **Comprehensive Game Summary**: At the end of the game, a detailed summary is displayed, showing each player's total playtime, the overall score, and the number of goals each player on your team scored. You can share this summary directly from the app.
- **Accurate Playtime Tracking with Real-Time Updates**: Player playtimes are accurately calculated based on when they start and stop playing, updating every second during the game.
- **Playtime Increases Only When Game Is Running**: Player playtimes increase only when the game is running.
- **Accurate Game Time Calculation**: The total game time is precisely tracked, even when the game is paused and resumed.
- **Real-Time Tracking**: The game clock and player playtimes update every second during the game.
- **Delete Players**: Coaches can delete players from the player list.
- **Consistent Selection Method**: The app uses a consistent method for selecting players for substitutions.
- **Made on ZAPT Link and Contact Email**: A "Made on ZAPT" link and a contact email address (footballsubs@zapt.ai) are displayed as a footer on all screens.
- **Improved Game Management Screen Design**: The Game Management screen has enhanced layout and improved padding.
- **Footer Enhancement**: The footer design has been updated to fit seamlessly with the rest of the app.
- **Full Screen Display**: The app utilizes 'min-h-screen' for all screens.
- **Progressive Web App (PWA)**: Football Subs is a PWA, allowing you to install it on your device.
- **Persistent Player List**: Stores players so they are available for every game.
- **All Players Unticked by Default**: When starting a new game, all players are unticked in the list of starting players.
- **Add Players During Game**: Allows the coach to add new players even after the game has started.
- **Goalkeeper Management with Confirmation**: Allows the coach to assign and reassign the goalkeeper at any time with confirmation prompts.
- **Game Setup**: Input the list of players and number of players on the field at a time.
- **Select Starting Line-up**: Choose which players will start on the field by checking the box next to their name.
- **Pause Functionality**: Ability to pause the game clock during stoppages like half-time.
- **Responsive Design**: The app is responsive and user-friendly on all screen sizes.
- **Confirmation Before Ending Game**: When the coach clicks the "End Game" button, the app asks for confirmation.
- **Large, Easy-to-Press Buttons and Controls**: Enhanced usability on mobile devices.
- **Umami Analytics Integration**: The app includes Umami Analytics to collect analytics data about app usage.

## User Journeys

### 1. Accessing the App

1. **Open the App**:
   - Visit the Football Subs app URL in your browser.
   - You are greeted with a visually engaging landing page featuring dynamic images and a modern layout.
   - On mobile devices, the "Football Subs" title is centered for better readability.
2. **Installing the PWA (Optional)**:
   - On compatible browsers, you will see an option to "Install" the app.
   - Click "Install" to add Football Subs to your device's home screen.
3. **Landing Page**:
   - The app's logo is prominently displayed.
   - Click the "Get Started" button to proceed to the game setup.
   - **Footer**:
     - Contains a "Made on ZAPT" link to [www.zapt.ai](https://www.zapt.ai) and contact email [footballsubs@zapt.ai](mailto:footballsubs@zapt.ai).

### 2. Setting Up the Game

1. **Game Setup Screen**: After clicking "Get Started," you are taken to the Game Setup screen.
2. **Footer**: The footer remains at the bottom, providing consistent navigation and contact options.
3. **Player List Persistence**:
   - The app loads the saved list of players from previous sessions.
   - **All Players Unticked**: All players are unticked when the Game Setup screen loads.
4. **Add Players**:
   - Enter the name of a player in the input field.
   - Click "Add" to add the player to the list.
5. **Delete Players**:
   - Click the "Delete" button next to a player's name to remove them.
   - A confirmation dialog appears before deletion.
6. **Set Number of Players on Field**:
   - Enter the number of players that can play at one time.
7. **Select Starting Line-up**:
   - Select the players who will start on the field by checking the box next to their name.
   - **Larger Checkboxes**: Enhanced for easier selection on mobile devices.
8. **Assign Goalkeeper**:
   - Select a player from the starting lineup as the goalkeeper.
9. **Start Game**:
   - Click "Start Game" to proceed.

### 3. Managing the Game

1. **Game Management Screen**: After starting the game, you are taken to the Game Management screen.
2. **Time and Score Display**:
   - The game clock and current score are displayed prominently.
3. **Control Buttons**:
   - **Start/Pause**: Control the game clock.
   - **End Game**: Ends the game with a confirmation prompt.
4. **Player Lists**:
   - **Players on Field**:
     - Lists the players currently on the field.
     - Players are sorted by ascending total playtime.
     - The goalkeeper is indicated with a "(GK)" tag.
     - **Instruction Message**: "Select a player to sub off" is displayed above the list.
     - Clicking on a player selects them for substitution.
   - **Players Off Field**:
     - Lists the players off the field.
     - Players are sorted by ascending total playtime.
     - **Instruction Message**: "Select a player to sub on" is displayed above the list.
     - Clicking on a player selects them for substitution.
5. **Making a Substitution**:
   - Select a player from "Players on Field" to sub off.
   - Select a player from "Players Off Field" to sub on.
   - A confirmation modal appears asking if you want to substitute the selected players.
   - Confirming executes the substitution; cancelling resets the selection.
6. **Recording Goals**:
   - Click "Goal Scored" and follow prompts to record goals.
7. **Change Goalkeeper**:
   - Click "Change Goalkeeper" to reassign the goalkeeper.
8. **Add Players During Game**:
   - Use "Add New Player" to add players during the game.

### 4. Reviewing Game Summary and Sharing

1. **Game Summary Screen**: Presented after ending the game.
2. **Final Score**: Displays the overall game score.
3. **Goals by Our Team**: Shows how many goals each player scored.
4. **Player Playtimes**: Lists players by total playtime in descending order.
5. **Share Match Summary**:
   - Click "Share Summary" to share via supported apps.
6. **Navigation Options**:
   - Click "Back to Home" to start a new game.

# How to Use the App

1. **Set Up the Game**:
   - Add players and set the number of players on the field.
   - Select your starting lineup and assign a goalkeeper.
2. **Manage the Game**:
   - Use the player lists to manage substitutions.
   - Record goals and change the goalkeeper as needed.
   - Add new players during the game.
3. **Review and Share Game Summary**:
   - Review player playtimes, final score, and goals scored.
   - Share the summary directly from the app.

Enjoy a smoother coaching experience with Football Subs!

## Contact

For inquiries or support, contact us at [footballsubs@zapt.ai](mailto:footballsubs@zapt.ai).

## External Services

### Umami Analytics

The app uses **Umami Analytics** to collect analytics data about app usage, helping understand app performance and user engagement without compromising user privacy.