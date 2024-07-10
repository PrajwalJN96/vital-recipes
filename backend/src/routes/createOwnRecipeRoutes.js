import createOwnRecipeController from "../controller/createOwnRecipeController.js";
import express  from  "express";

const router = express.Router();

router.post("/recipe", createOwnRecipeController.createRecipe);

export default router;