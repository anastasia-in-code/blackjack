'use client'
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
        localStorage.setItem("deckId", newDeckId);
        dispatch({
          type: StateActions.SET_DECK_ID,
          payload: newDeckId,
        });
      } catch (error) {
        console.error(error);
      }
    };

    const storedDeckId = localStorage.getItem("deckId");
    if (storedDeckId) {
      dispatch({
        type: StateActions.SET_DECK_ID,
        payload: storedDeckId,
      });
    } else {
      fetchDeck();
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchPiles = async (deckId: string): Promise<void> => {
      try {
        const houseCards = await cardsAPI.getPile(deckId, "house");
        const playerCards = await cardsAPI.getPile(deckId, "player");
        dispatch({
          type: StateActions.ADD_HOUSE_CARDS,
          payload: houseCards,
        });
        dispatch({
          type: StateActions.ADD_PLAYER_CARDS,
          payload: playerCards,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (cards.deckId) {
      fetchPiles(cards.deckId);
    }
  }, [cards.deckId, dispatch]);

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
  }, [cards.playerCards, dispatch]);

  useEffect(() => {
    const houseScore = calculateScore(cards.houseCards);
    dispatch({
      type: StateActions.SET_HOUSE_SCORE,
      payload: houseScore,
    });
  }, [cards.houseCards, dispatch]);

  return (
    <div className={styles.container}>
      <Player
        cards={cards.houseCards}
        isHouse={true}
        score={cards.houseScore}
      />
      <Actions />
      <Player
        cards={cards.playerCards}
        isHouse={false}
        score={cards.playerScore}
      />
    </div>
  );
};

export default BlackjackBoard;
