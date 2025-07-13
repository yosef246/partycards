import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import purify from "../../utils/sanitize.js";
import { loginValitation, registerValitation } from "../../valitations/user.js";
import NewUser from "../models/user.js";
import { generateToken } from "../../utils/token.js";

const router = Router();

router.post("/register", async (req, res) => {
  //עובר לי גם על שם פרטי שם משפחה וגם על אימייל שלא נכנס אליהם קוד זדוני
  Object.keys(req.body).forEach((key) => {
    req.body[key] = purify.sanitize(req.body[key]); //מנקה לך את הקוד שנכנס מקטעי קוד או סקריפטים זדוניים
  });

  const { error } = registerValitation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //בודק האם האימייל קיים כבר במערכת
  const checkEmail = await NewUser.findOne({ email: req.body.email });
  if (checkEmail)
    return res.status(400).send({ message: "Email already exist!" });

  const salt = await bcrypt.genSalt(10); //יוצר לך רצף גיבריש שמצטרף לסיסמא כדי לאבטח אותה
  console.log("salt:", salt);

  req.body.password = await bcrypt.hash(req.body.password, salt); //הופך את הסיסמא ממספרים לגיבריש ומוסיף את הרצף שיצרנו מקודם לסיסמא
  console.log("password:", req.body.password);

  try {
    const newUser = await NewUser.create(req.body);

    //יצירת טוקאן
    const tokenProps = {
      id: newUser._id,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    };
    const token = generateToken(tokenProps);
    //יצירת טוקאן

    res
      .cookie("access_token", token, { httpOnly: true, secure: true }) //יצירת קוקיז לטוקאן
      .status(201)
      .send(newUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Somthing went wrong with creating New User !" });
  }
});

router.post("/forgot-password", async (req, res) => {
  Object.keys(req.body).forEach((key) => {
    req.body[key] = purify.sanitize(req.body[key]);
  });

  const user = await NewUser.findOne({ email: req.body.email });
  if (!user) return res.status(200).send({ message: "Check your Email" });

  const salt = await bcrypt.genSalt(10); //יוצר לך רצף גיבריש שמצטרף לסיסמא כדי לאבטח אותה
  console.log("salt:", salt);

  user.password = await bcrypt.hash(req.body.password, salt); //הופך את הסיסמא ממספרים לגיבריש ומוסיף את הרצף שיצרנו מקודם לסיסמא
  console.log("password:", user.password);

  try {
    await user.save(); // עוד דרך לשמור מידע שהשתנה
    res
      .status(201)
      .send({ message: "Your password is cheange seccessfully", data: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Somthing went wrong with creating New User !" });
  }
});

router.post("/login", async (req, res) => {
  //עובר לי גם על שם פרטי שם משפחה וגם על אימייל שלא נכנס אליהם קוד זדוני
  Object.keys(req.body).forEach((key) => {
    req.body[key] = purify.sanitize(req.body[key]); //מנקה לך את הקוד שנכנס מקטעי קוד או סקריפטים זדוניים
  });

  const { error } = loginValitation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await NewUser.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send({ message: "אמייל או סיסמא שגויים" });

    //משווה לי את הסיסמא שהכנסתי לסיסמא שקיימת כבר למשתמש הזה
    const validPassword = await bcrypt.compare(
      req.body.password, //הסיסמא שהכנסתי
      user.password //הסיסמא הקיימת
    );
    if (!validPassword)
      return res.status(400).send({ message: "אמייל או סיסמא שגויים" });

    //יצירת טוקאן
    const tokenProps = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = generateToken(tokenProps);
    //יצירת טוקאן

    res
      .cookie("access_token", token, { httpOnly: true, secure: true }) //יצירת קוקיז לטוקאן
      .status(200)
      .send({ message: "login seccessfuly !", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Somthing went wrong with login User !" });
  }
});

router.get("/check-auth", (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: "אין לך הרשאת גישה" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: decoded });
    console.log(decoded, "you have a token now");
  } catch (err) {
    return res.status(403).json({ message: "אין לך משתמש" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).send({ message: "התנתקת בהצלחה" });
  } catch (error) {
    res.status(500).send({ message: "שגיאה בהתנתקות" });
  }
});
export default router;
