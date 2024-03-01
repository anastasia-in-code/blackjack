## Blackjack App ♠️❤️
This is a simple Blackjack game app built with TS, React and Next.js. The game follows standard Blackjack rules where the goal is to get as close to 21 points without going over. Face cards (Jack, Queen, King) are worth 10 points, numbered cards are worth their face value, and Aces are worth either 1 or 11 points, whichever is more favorable. For example: 
1. If the player has a Jack and a Queen, and then draws an Ace, the Ace will be worth 1 point to add up to 21
2. If the player has a Queen and an Ace, the Ace will be worth 11 points to add up to 21
3. If the player has a 2 and an Ace, the Ace will be worth 11 points to get closer to 21
4. If the player has a 2 and a 5, and then draws an Ace, the Ace will be worth 11 points to get closer to 21. If the player then draws a 10, the Ace will now be worth 1 point

# You Win if:
1. The House’s total is > 21 and your total is < 21 (for the purposes of this project, you can ignore this condition, since the House will only have two cards and cannot get a total > 21)
2. Your current total is < 21 but higher than the House’s total
3. Your current total is 21 and the House’s total is not 21
# You lose if:
1. Your current total totals over 21 (don’t forget to factor in the different edge cases of the Ace card!)
2. You current total is < 21 but lower than the House’s total
3. You tie with the House

# TBD:
1. Improve error handling and logging
2. User-friendly error representation
3. Component testing

# Possible Improvements
1. Implementing betting: Allow players to place bets before each round.
2. Implementing authorization: Store user data and game statistics.
3. Enhancing user interface: Improve the visual design and user experience of the game.
4. Multiplayer functionality: Enable players to compete against each other online.

# Available Scripts
dev: Start the development server.
build: Build the production-ready app.
start: Start the production server.
lint: Lint the codebase for consistency.
test: Run unit tests using Jest.


# Unit Tests
The app includes unit tests for the calculateScore function, ensuring that card values are calculated correctly according to the game rules.

Feel free to fork and contribute to this project!