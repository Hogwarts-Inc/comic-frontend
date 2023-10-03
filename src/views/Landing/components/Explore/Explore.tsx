import React from 'react';

import { Button } from '@components/Button/Button';

import styles from './explore.module.css';

export const Explore = (): JSX.Element => (
  <div className={styles.box}>
    <div className={styles.exploreWrapper}>
      <div className={styles.explore}>
        <div className={styles.title}>
          <p className={styles.description}>Empeza a explorar otros capitulos y crear tus propias historias</p>
          <Button property1="default" />
        </div>
      </div>
    </div>
  </div>
);
