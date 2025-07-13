import styles from "./home.module.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>הדרך שלך להרוויח ממסיבות מתחילה כאן</h1>
        <p>
          שתף קישורים לאירועים, הרווח עמלה על כל כרטיס שנמכר — בלי ניסיון, בלי
          ראיונות.
        </p>
        <Link to="/register" className={styles.cta}>
          היכנס עכשיו
        </Link>
      </section>

      {/* How It Works */}
      <section className={styles.steps}>
        <h2>איך זה עובד?</h2>
        <div className={styles.stepList}>
          <div className={styles.step}>נרשמים</div>
          <div className={styles.step}>בוחרים מסיבה</div>
          <div className={styles.step}>משתפים קישור אישי</div>
          <div className={styles.step}>מרוויחים עמלה</div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className={styles.whyUs}>
        <h2>למה להצטרף אלינו?</h2>
        <ul>
          <li>פתוח לכולם – לא משנה איפה גרים או בני כמה</li>
          <li>ללא ראיון או ניסיון</li>
          <li>עמלות אמיתיות על כל מכירה</li>
          <li>מערכת שקופה למעקב אחרי ההכנסות</li>
          <li>תשלום בהעברה בנקאית</li>
        </ul>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <Link to="/register" className={styles.ctaLarge}>
          רוצה להתחיל ? הירשם עכשיו!
        </Link>
      </section>
    </div>
  );
}
