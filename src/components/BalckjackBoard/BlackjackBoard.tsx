"use client";
import React, { useEffect } from "react";
import styles from "./blackjackBoard.module.css";
import {
  useCardsState,
  useCardsDispatch,
  StateActions,
} from "@/app/context/CardContext";
import { calculateScore } from "@/utils/utils";
import Player from "@/components/Player/Player";
import Actions from "@/components/Actions/Actions";
import cardsAPI from "@/api/cardsAPI";

const BlackjackBoard: React.FC = () => {
  const cards = useCardsState();
  const dispatch = useCardsDispatch();

  useEffect(() => {
    const fetchDeck = async (): Promise<void> => {
      try {
        const newDeckId = await cardsAPI.getNewDeck();
        const cards = await cardsAPI.drawCards(newDeckId, 4);
        await cardsAPI.addToPile(newDeckId, "house", cards.slice(0, 2));
        await cardsAPI.addToPile(newDeckId, "player", cards.slice(2));

        dispatch({
          type: StateActions.SET_DECK_ID,
          payload: newDeckId,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeck();
  }, []);

  useEffect(() => {
    const playerScore = calculateScore(cards.playerCards);
    if (playerScore === 21) {
      dispatch({
        type: StateActions.CHANGE_GAME_STATUS,
        payload: "victory",
      });
    } else if (playerScore > 21) {
      dispatch({
        type: StateActions.CHANGE_GAME_STATUS,
        payload: "loss",
      });
    }
    dispatch({
      type: StateActions.SET_PLAYER_SCORE,
      payload: playerScore,
    });
  }, [cards.playerCards]);

  useEffect(() => {
    const houseScore = calculateScore(cards.houseCards);
    dispatch({
      type: StateActions.SET_HOUSE_SCORE,
      payload: houseScore,
    });
  }, [cards.houseCards]);

  return (
    <div className={styles.container}>
      {cards.gameStatus !== "not started" && (
        <Player
          cards={cards.houseCards}
          isHouse={true}
          score={cards.houseScore}
        />
      )}
      <Actions />
      {cards.gameStatus !== "not started" && (
        <Player
          cards={cards.playerCards}
          isHouse={false}
          score={cards.playerScore}
        />
      )}
    </div>
  );
};

export default BlackjackBoard;
