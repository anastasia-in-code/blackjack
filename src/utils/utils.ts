// A card contains a value equivalent to it’s number (the 3 of club is worth 3 points...the 9 of spades is worth 9 points...etc etc).
// Face cards (Jack, Queen, King) are worth TEN points,
// and the Ace card is either worth 1 or 11, whichever is most helpful for the player’s hand. For example:
// If the player has a Jack and a Queen, and then draws an Ace, the Ace will be worth 1 point to add up to 21
// If the player has a Queen and an Ace, the Ace will be worth 11 points to add up to 21
// If the player has a 2 and an Ace, the Ace will be worth 11 points to get closer to 21
// If the player has a 2 and a 5, and then draws an Ace, the Ace will be worth 11 points to get closer to 21. If the player then draws a 10, the Ace will now be worth 1 point
import { ICard } from "@/models/card.interface";

export const calculateScore = (cards: ICard[]): number => {
  let score = 0; // total score
  let hasQUEEN = false; // track if player has Queen
  let hasJACK = false; // track if player has Jack
  let hasACE = false; // track if player has Ace
  let has2 = false; // track if player has 2
  let has5 = false; // track if player has 5
  let previousAce = false; // track if previous case was with Ace, 2 and 5 (minus 10points if next card has value 10)

  // Calculate the score for each card
  for (let i = 0; i < cards.length; i++) {
    const value = cards[i].value;

    if (value === "10" && previousAce) {
      previousAce = false;
      continue;
    }

    previousAce = false;
    switch (value) {
      case "2":
        score += 2;
        has2 = true;
        break;
      case "5":
        score += 5;
        has5 = true;
        break;
      case "JACK":
        hasJACK = true;
        score += 10;
        break;
      case "QUEEN":
        hasQUEEN = true;
        score += 10;
        break;
      case "KING":
        score += 10;
        break;
      case "ACE":
        if (21 - score >= 11 && (hasQUEEN || has2) && hasACE) {
          // if player needs 11 or more, has Ace and (Queen or 5)
          score += 11;
        } else if (21 - score >= 11 && has2 && has5) {
          // if player needs 11 or more, has 1 and 5
          score += 11;
          previousAce = true; // track this case, if next user draws 10 - it's not counted
        } else if (hasJACK && hasQUEEN) {
          // if user needs less than 11 or doesn't have previous combinations
          score += 1;
        }

        hasACE = true;
        break;
      default:
        score += +value;
    }
  }

  return score;
};
