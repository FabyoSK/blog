import styles from './header.module.scss';
import Link from 'next/link';

export function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">
          <h1>FabyoSK Blog</h1>
        </Link>
      </nav>
    </header>
  );
}
