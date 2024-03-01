import { useState } from "react";
import Image from "next/image";
import styles from "./actions.module.css";
import {
  useCardsDispatch,
  useCardsState,
  StateActions,
} from "@/app/context/CardContext";
import cardsAPI from "@/api/cardsAPI";
import Button from "@/components/Button/Button";
import Result from "@/components/Actions/Result/Result";

const Actions: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { deckId, houseScore, playerScore, gameStatus } = useCardsState();
  const dispatch = useCardsDispatch();

  const drawCard = async () => {
    setIsLoading(true);
    try {
      const [newCard] = await cardsAPI.drawCards(deckId, 1);
      await cardsAPI.addToPile(deckId, "player", [newCard]);
      dispatch({
        type: StateActions.ADD_PLAYER_CARDS,
        payload: [newCard],
      });
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const endRound = async () => {
    setIsLoading(true);
    try {
      if (playerScore > 21 || playerScore <= houseScore) {
        dispatch({
          type: StateActions.CHANGE_GAME_STATUS,
          payload: "loss",
        });
      } else {
        dispatch({
          type: StateActions.CHANGE_GAME_STATUS,
          payload: "victory",
        });
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      {gameStatus === "in progress" ? (
        <>
          <Button disabled={isLoading} onClick={drawCard}>
            Hit
          </Button>
          <div className={styles.coverContainer}>
            <Image
              src="https://deckofcardsapi.com/static/img/back.png"
              alt="cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              width={110}
              height={150}
              className={styles.img}
            />
          </div>
          <Button disabled={isLoading} onClick={endRound}>
            Stand
          </Button>
        </>
      ) : (
        <Result />
      )}
    </div>
  );
};

export default Actions;
