import styles from "./player.module.css";
import {ICard} from '@/models/card.interface'
import Card from "./Card/Card";

type Props = {
  cards: ICard[]; 
  isHouse: boolean;
  score: number;
};

const Player: React.FC<Props> = ({ cards, isHouse, score }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardBox}>
          {cards.map((card) => (
            <Card imgSrc={card.image} code={card.code} key={card.code} />
          ))}
      </div>
      <div
        className={
          styles.score + " " + (isHouse ? styles.house : styles.player)
        }
      >
        {score}
      </div>
    </div>
  );
};

export default Player;
