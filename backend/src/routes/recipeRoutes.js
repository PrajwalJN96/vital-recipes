import recipeController from '../controller/recipeController.js';
import express  from  "express";

const router = express.Router();

router.get("/display/:query", recipeController.display);

export default router;