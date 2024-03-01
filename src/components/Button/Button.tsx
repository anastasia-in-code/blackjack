'use client'
import React, { ReactNode } from "react";
import styles from "./button.module.css";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};


const Button: React.FC<Props> = ({onClick, disabled, children }: Props) => {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;
