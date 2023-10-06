import React from 'react';

import { Button } from '@mui/material';

import styles from './explore.module.css';

export const Explore = (): JSX.Element => (
  <div className={styles.box}>
    <div className={styles.placeholder} />
    <div className={styles.content}>
      <p className={styles.description}>Empeza a explorar otros capitulos y crear tus propias historias</p>
      <Button size="large" variant="contained">
        Lorem
      </Button>
    </div>
  </div>
);