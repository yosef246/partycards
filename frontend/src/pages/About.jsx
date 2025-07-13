import styles from "./about.module.css";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className={styles.middle}>
      <h1>ברוכים הבאים למועדון היחצנים</h1>

      <section className={styles.section1}>
        <h2>מי אנחנו?</h2>
        <p>
          אנחנו פלטפורמה חדשנית שנותנת לכל אחד – לא משנה מאיפה הוא בארץ, ובאיזה
          גיל – להפוך ליחצן של מסיבות ואירועים, לשתף קישורים ולהרוויח עמלה על כל
          כרטיס שנמכר דרכו.
        </p>
      </section>

      <section className={styles.section2}>
        <h2>למה הקמנו את זה?</h2>
        <p>
          כי נמאס לנו לראות את עולם חיי הלילה נשלט על ידי בודדים. רצינו לפתוח את
          הדלת לכולם – חובבי מסיבות, חברים, משפיענים או סתם כאלה שיודעים להפיץ.
        </p>
      </section>

      <section className={styles.section3}>
        <h2>איך זה עובד?</h2>
        <p>
          נרשמים בקלות → בוחרים אירועים שתרצו לשווק → משתפים את הקישור האישי
          שלכם → מרוויחים 10% על כל מכירה.
          <br /> הכל נעשה בצורה פשוטה, שקופה ומהירה.
        </p>
      </section>

      <section className={styles.section4}>
        <h2>מה מייחד אותנו?</h2>
        <ul>
          <li>אין צורך בניסיון קודם או ראיונות.</li>
          <li>כל אחד יכול להצטרף, מכל מקום בארץ.</li>
          <li>מעקב מלא אחרי המכירות שלכם.</li>
          <li>עמלות מועברות בהעברה בנקאית.</li>
        </ul>
      </section>

      <div className={styles.cta}>
        <Link to="/register">הצטרפו עכשיו והתחילו להרוויח!</Link>
      </div>
    </div>
  );
}
