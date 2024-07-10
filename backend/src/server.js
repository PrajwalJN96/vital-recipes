import express from "express";
import { connectToDb, db } from "./db.js";
import cors from 'cors';
import homeRoutes from "./routes/homeRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import createOwnRecipeRoutes from "./routes/createOwnRecipeRoutes.js";
import myRecipeRoutes from "./routes/myRecipeRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import planRoutes from "./routes/planRoutes.js";

import "dotenv/config";
// import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync("./credentials.json"));

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// // Middleware to validate authentication token
// const validateToken = async (req, res, next) => {
//   const idToken = req.headers.authorization;

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.uid = decodedToken.uid; // Extract UID from decoded token
//     next(); // Proceed to next middleware or route handler
//   } catch (error) {
//     console.error('Error validating token:', error);
//     res.status(401).send('Unauthorized'); // Respond with 401 Unauthorized if token is invalid
//   }
// };

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"../build")))

app.get(/\/api/, async (req, res) => {
  res.sendFile(path.join(__dirname,"../build/index.html"));
});

app.use("/api/home", homeRoutes);
app.use("/api/createOwnRecipe", createOwnRecipeRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/myrecipe", myRecipeRoutes);
app.use("/api/apirecipe", recipeRoutes);
app.use("/api/plan", planRoutes);

const PORT = process.env.PORT || 8000;

connectToDb(() => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log("server running on Port ");
  });
});