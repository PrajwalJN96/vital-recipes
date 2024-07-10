import { db } from "../db.js";

const myRecipeController = {
  allRecipe: async (req, res) => {
    try {
      const recipes = await db.collection("recipeDetails").find().toArray();
      // if (recipes.length > 0) {
      //   const recipesWithDiet = recipes.map(recipe => {
      //     return {
      //       recipe
      //     };
      //   });
        res.json(recipes);
      // } else {
      //   res.status(404).send("No recipes found");
      // }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      res.status(500).json({ error: err.message });
    }
  },
  searchRecipe: async (req, res) => {
    try {
      const recipeName = req.params.name;
      const recipe = await db.collection("recipeDetails").findOne({ recipeName });
      // if (recipe) {
      //   const recipeWithDiet = {
      //     recipe
      //   };
        res.json(recipe);
      // } else {
      //   res.status(404).json({ error: "Recipe not found" });
      // }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  likeRecipe: async (req, res) => {
    try {
      const name = req.params.name;
      const recipeName = req.params.recipeName;
      const result = await db
        .collection("userRecipes")
        .updateOne({ name: name }, { $unset: { likes: 1 } });
      res.json({ message: "Recipe liked successfully" });
    } catch (error) {
      console.error("Error liking recipe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  dislikeRecipe: async (req, res) => {
    try {
      const recipeName = req.params.name;
      const result = await db
        .collection("recipeDetails")
        .updateOne({ name: recipeName }, { $inc: { dislikes: 1 } });
      res.json({ message: "Recipe disliked successfully" });
    } catch (error) {
      console.error("Error disliking recipe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default myRecipeController;