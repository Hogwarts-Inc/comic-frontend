import React from 'react';

import { Button } from '@mui/material';

import styles from './explore.module.css';

const texts = {
  description: 'Empeza a explorar otros capitulos y crear tus propias historias',
  button: 'Lorem',
};

export const Explore = (): JSX.Element => (
  <div className={styles.box}>
    <div className={styles.placeholder} />
    <div className={styles.content}>
      <p className={styles.description}>{texts.description}</p>
      <Button size="large" variant="contained">
        {texts.button}
      </Button>
    </div>
  </div>
);