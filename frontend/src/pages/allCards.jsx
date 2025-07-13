import { useState, useEffect } from "react";
import styles from "./allCards.module.css";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/cardItem";

export default function AllCards() {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  //בדיקה שיש טוקאן
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3003/api/auth/check-auth", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        console.log("המשתמש מחובר:", data);
      } catch (err) {
        console.log("עליך להתחבר כדי לגשת לדף");
        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  //ייבוא כל הכרטיסים שקיימים במערכת
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3003/api/post/");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "upload failed");
        } else {
          console.log("כל הכרטיסים", data);
          setCards(data);
        }
      } catch (err) {
        console.log("ייבוא הכרטיסים נכשל", err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading . . .</p>;
  }

  return cards.length > 0 ? (
    <div className={styles.middle}>
      <div className={styles.cardsContainer}>
        {cards.map((card) => (
          <CardItem
            id={card._id}
            key={card._id}
            title={card.title}
            location={card.location}
            date={card.date}
            body={card.body}
            imageUrl={card.imageUrl}
          />
        ))}
      </div>
    </div>
  ) : (
    <p className={styles.loading}>No cards available</p>
  );
}
