import React from "react";
import Image from "next/image";
import styles from './logo.module.css'

const Logo = () => {
  return (
    <div>
      <div className={styles.container}>
        <Image src="/logo.png" alt="logo" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" width={200} height={120} />
      </div>
    </div>
  );
};

export default Logo
