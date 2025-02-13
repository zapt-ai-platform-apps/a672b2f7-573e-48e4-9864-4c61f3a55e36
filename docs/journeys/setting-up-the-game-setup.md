# Setting Up the Game Setup

## Step-by-Step Instructions

1. **Navigate to Participant Selection**:
   - From the Squad Management screen, click "Proceed to Game Setup"
   - You'll be taken to `/setup/participants` to select match participants

2. **Select Match Participants**:
   - Check players from your squad who will participate in this match
   - At least 1 player must be selected
   - Click "Continue to Setup" to proceed to `/setup/configuration`

3. **Configure Starting Lineup**:
   - From selected participants, choose who will start on the field
   - Select number of starting players based on your formation
   - Use toggle buttons to mark starters

4. **Assign Goalkeeper**:
   - Choose goalkeeper from starting players using dropdown
   - Set whether to include goalkeeper time in totals

5. **Finalize Setup**:
   - Review all selections
   - Click "Start Game" to begin match tracking
   - You'll be redirected to `/manage` for live game management

## Important Information

- **Two-Step Process**: Clear separation between participant selection (step 1) and lineup configuration (step 2)
- **Route Structure**: 
  - Participant selection: `/setup/participants`
  - Lineup configuration: `/setup/configuration`
- **Data Flow**: Selected participants persist between steps through global state
- **Error Handling**: System prevents progressing with invalid configurations
- **Navigation**: Use browser back button or in-app back buttons to adjust selections