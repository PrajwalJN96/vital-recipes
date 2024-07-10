import myRecipeController from '../controller/myRecipeController.js';
import express  from  "express";

const router = express.Router();

router.get("/allrecipe", myRecipeController.allRecipe);
router.get("/:name", myRecipeController.searchRecipe);
router.put("/:name/:recipeName/like", myRecipeController.likeRecipe);
router.put("/:name/:recipeName/dislike", myRecipeController.dislikeRecipe);

export default router;