import { Link } from "react-router-dom";
import styles from "./cardItem.module.css";

export default function CardItem({
  id,
  title,
  location,
  date,
  body,
  imageUrl,
}) {
  return (
    <Link to={`/card-details/${id}`}>
      <div className={styles.card}>
        <img src={imageUrl} alt={title} className={styles.image} />
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>
            <strong>מיקום:</strong> {location}
          </p>
          <p>
            <strong>תאריך:</strong> {new Date(date).toLocaleDateString()}
          </p>
          <p>
            <strong>תיאור:</strong> {body}
          </p>
        </div>
      </div>
    </Link>
  );
}
