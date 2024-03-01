import { calculateScore } from "./utils";
import { ICard } from "@/models/card.interface";

describe("calculateScore", () => {
  it("score should be 0 if there is no cards", () => {
    const cards: ICard[] = [];

    const points = calculateScore(cards);

    expect(points).toBe(0);
  });
  
  it("should correctly calculate the score for Face Cards (Jack, Queen, King)", () => {
    const cards: ICard[] = [
      {
        code: "KH",
        image: "",
        value: "KING",
        suit: "HEARTS",
      },
      {
        code: "QD",
        image: "",
        value: "QUEEN",
        suit: "DIAMONDS",
      },
      {
        code: "JS",
        image: "",
        value: "JACK",
        suit: "SPADES",
      },
    ];

    const points = calculateScore(cards);

    expect(points).toBe(30);
  });

  it("should correctly calculate the score for Numbered Cards", () => {
    const cards: ICard[] = [
      {
        code: "2H",
        image: "",
        value: "2",
        suit: "HEARTS",
      },
      {
        code: "3D",
        image: "",
        value: "3",
        suit: "DIAMONDS",
      },
      {
        code: "4S",
        image: "",
        value: "4",
        suit: "SPADES",
      },
      {
        code: "5H",
        image: "",
        value: "5",
        suit: "HEARTS",
      },
      {
        code: "6D",
        image: "",
        value: "6",
        suit: "DIAMONDS",
      },
      {
        code: "7S",
        image: "",
        value: "7",
        suit: "SPADES",
      },
      {
        code: "8H",
        image: "",
        value: "8",
        suit: "HEARTS",
      },
      {
        code: "9D",
        image: "",
        value: "9",
        suit: "DIAMONDS",
      },
      {
        code: "10S",
        image: "",
        value: "10",
        suit: "SPADES",
      },
    ];

    const points = calculateScore(cards);

    expect(points).toBe(54);
  });

  it("ACE case: should correctly calculate the score for Jack, Queen and Ace", () => {
    const cards: ICard[] = [
      {
        code: "QH",
        image: "",
        value: "QUEEN",
        suit: "HEARTS",
      },
      {
        code: "JD",
        image: "",
        value: "JACK",
        suit: "DIAMONDS",
      },
      {
        code: "AS",
        image: "",
        value: "ACE",
        suit: "SPADES",
      },
    ];

    const points = calculateScore(cards);

    expect(points).toBe(21);
  });

  it("ACE case: should correctly calculate the score for Ace, Queen and Ace", () => {
    const cards: ICard[] = [
      {
        code: "QH",
        image: "",
        value: "QUEEN",
        suit: "HEARTS",
      },
      {
        code: "AS",
        image: "",
        value: "ACE",
        suit: "SPADES",
      },
      {
        code: "AH",
        image: "",
        value: "ACE",
        suit: "HEARTS",
      },
    ];

    const points = calculateScore(cards);

    expect(points).toBe(21);
  });

  it("ACE case: should correctly calculate the score for Ace, 2 and Ace", () => {
    const cards: ICard[] = [
      {
        code: "AH",
        image: "",
        value: "ACE",
        suit: "HEARTS",
      },
      {
        code: "2S",
        image: "",
        value: "2",
        suit: "SPADES",
      },
      {
        code: "AH",
        image: "",
        value: "ACE",
        suit: "HEARTS",
      },
    ];

    const points = calculateScore(cards);

    expect(points).toBe(13);
  });

  it("ACE case: should correctly calculate the score for 5, 2 and Ace", () => {
    const cards: ICard[] = [
      {
        code: "2H",
        image: "",
        value: "2",
        suit: "HEARTS",
      },
      {
        code: "5S",
        image: "",
        value: "5",
        suit: "SPADES",
      },
      {
        code: "AH",
        image: "",
        value: "ACE",
        suit: "HEARTS",
      },
    ];

    const points = calculateScore(cards);

    expect(points).toBe(18);
  });

  it("ACE case: should correctly calculate the score for 5, 2, ACE and 10", () => {
    const cards: ICard[] = [
      {
        code: "2H",
        image: "",
        value: "2",
        suit: "HEARTS",
      },
      {
        code: "5S",
        image: "",
        value: "5",
        suit: "SPADES",
      },
      {
        code: "AH",
        image: "",
        value: "ACE",
        suit: "HEARTS",
      },
      {
        code: "10H",
        image: "",
        value: "10",
        suit: "HEARTS",
      },
    ];

    const points = calculateScore(cards);

    expect(points).toBe(18);
  });

  it("ACE case: should correctly calculate the score for 5, 2, ACE, 2 and 10", () => {
    const cards: ICard[] = [
      {
        code: "2H",
        image: "",
        value: "2",
        suit: "HEARTS",
      },
      {
        code: "5S",
        image: "",
        value: "5",
        suit: "SPADES",
      },
      {
        code: "AH",
        image: "",
        value: "ACE",
        suit: "HEARTS",
      },
      {
        code: "2S",
        image: "",
        value: "2",
        suit: "SPADES",
      },
      {
        code: "10H",
        image: "",
        value: "10",
        suit: "HEARTS",
      },
    ];

    const points = calculateScore(cards);

    expect(points).toBe(30);
  });
});
