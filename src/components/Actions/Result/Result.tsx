"use client";
import React, { useState } from "react";
import {
  useCardsState,
  useCardsDispatch,
  StateActions,
} from "@/app/context/CardContext";
import { ICard } from "@/models/card.interface";
import cardsAPI from "@/api/cardsAPI";
import styles from "./result.module.css";
import Button from "@/components/Button/Button";

const Result: React.FC = () => {
  const { deckId, gameStatus, playerScore, houseScore } = useCardsState();
  const dispatch = useCardsDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startAgain = async () => {
    setIsLoading(true);
    try {
      await cardsAPI.shuffleDeck(deckId);
      const cards: ICard[] = await cardsAPI.drawCards(deckId, 4);

      await cardsAPI.addToPile(deckId, "house", cards.slice(0, 2));
      await cardsAPI.addToPile(deckId, "player", cards.slice(2));

      dispatch({
        type: StateActions.UPDATE_HOUSE_CARDS,
        payload: cards.slice(0, 2),
      });

      dispatch({
        type: StateActions.UPDATE_PLAYER_CARDS,
        payload: cards.slice(2),
      });

      dispatch({
        type: StateActions.SET_HOUSE_SCORE,
        payload: 0,
      });

      dispatch({
        type: StateActions.SET_PLAYER_SCORE,
        payload: 0,
      });

      dispatch({
        type: StateActions.CHANGE_GAME_STATUS,
        payload: "in progress",
      });
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  return (
    <div className={styles.container}>
      {gameStatus === "loss" && <h1>Oh no, you lost! 😞</h1>}
      {gameStatus === "victory" && <h1>Congratulations!! You won!! 🎉</h1>}
      <div>
        <p>{`House's score: ${houseScore}`}</p>
        <p>{`Your score: ${playerScore}`}</p>
      </div>
      <Button disabled={isLoading} onClick={startAgain}>
        Start again
      </Button>
    </div>
  );
};

export default Result;
