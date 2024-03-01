import React from 'react'
import styles from './card.module.css'

type Props = {
    imgSrc: string;
    code: string;
}

const Card = ({imgSrc, code}: Props) => {
  return (
    <div className={styles.card}>
        <img src={imgSrc} alt={code}/>
    </div>
  )
}

export default Card