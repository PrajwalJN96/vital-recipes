import homeController from "../controller/homeController.js";
import express  from  "express";

const router = express.Router();

router.get("/compareWeight", homeController.compareWeight);
// router.get("/favoriteRecipes/:recipe", homeController.userRecipes);

export default router;