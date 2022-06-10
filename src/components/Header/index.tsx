import React from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import { SingInButton } from '../SingInButton/index';

export function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">
          <h1>FabyoSK Blog</h1>
        </Link>
        <SingInButton />
      </nav>
    </header>
  );
}
