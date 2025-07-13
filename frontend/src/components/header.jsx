import { Link } from "react-router-dom";
import styles from "./header.module.css";

function Header({ antherBotton }) {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link className={styles.icon} to="/">
              PARTY TIKETS
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/about">
              עלינו
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/contact">
              צרו קשר
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/register">
              הרשמה
            </Link>
          </li>
          {antherBotton ? (
            <li>
              <Link className={styles.navLink} to="/party-cards">
                עריכת כרטיס
              </Link>
            </li>
          ) : null}
          <li>
            <Link className={styles.signup} to="/login">
              התחברות
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
