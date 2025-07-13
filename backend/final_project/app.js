import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import newUserRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import tagRouter from "./routes/tag.js";
import connectToMongoDB from "../utils/conectDB.js";
const app = express();
const port = 3003;

//מונע בעיית כורס
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//env מאפשר לי להשתמש בערכים שנמצאים בקובץ
dotenv.config();

//middleware - לייבוא המידע שנכנס
app.use(express.json());

//מפרש את הקוקיז שמגיע מהלקוח
app.use(cookieParser());

//מתחבר למונגו שלי
connectToMongoDB();

app.use("/api/auth/", newUserRouter);
app.use("/api/post/", postRouter);
app.use("/api/tag/", tagRouter);

app.listen(port, () => {
  console.log(`Example run on port ${port}!`);
});
