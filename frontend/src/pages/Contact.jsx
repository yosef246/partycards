import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <div className={styles.middle}>
      <h1>נשמח לשמוע ממך</h1>

      <section className={styles.section1}>
        <h2>? יש לך שאלה</h2>
        <p>
          אנחנו כאן כדי לעזור! בין אם אתה יחצן מתחיל, שותף פוטנציאלי או פשוט
          סקרן לדעת עוד – נשמח לתת מענה.
        </p>
      </section>

      <hr className={styles.sectiondivider} />

      <section className={styles.section2}>
        <h2>? איך אפשר לפנות אלינו</h2>
        <ul>
          <li>
            <strong>מייל:</strong> support@yourpartysite.co.il
          </li>
          <li>
            <strong>טלפון:</strong> 050-123-4567 (ימים א'-ה', 9:00-18:00)
          </li>
          <li>
            <strong>אינסטגרם:</strong>{" "}
            <a
              href="https://instagram.com/yourpartysite"
              target="_blank"
              rel="noopener noreferrer"
            >
              @yourpartysite
            </a>
          </li>
        </ul>
      </section>

      <hr className={styles.sectiondivider} />

      <section className={styles.section3}>
        <h2>? רוצה לשתף אותנו</h2>
        <p>
          אם אתה בעל מועדון, מפיק מסיבות, או יש לך רעיון יצירתי לשיתוף פעולה –
          דבר איתנו ונשמח לשמוע.
        </p>
      </section>

      <hr className={styles.sectiondivider} />

      <div className={styles.cta}>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=support@yourpartysite.co.il"
          target="_blank"
          rel="noopener noreferrer"
        >
          שלח לנו מייל
        </a>
      </div>
    </div>
  );
}
