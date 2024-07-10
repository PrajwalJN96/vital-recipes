import { db } from "../db.js";

const createOwnRecipeCtrl = {
    createRecipe:  async (req, res) => {
        try{
        const { recipeName, ingredients, serves, procedure, diet } = req.body;
        const result = await db.collection("recipeDetails").insertOne({
          recipeName,
          ingredients,
          serves,
          procedure,
          diet 
        })
        if (result) {
          res.json(result);
        } else {
          res.status(500).send("Failed to create recipe");
        }
      }catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    }
}

export default createOwnRecipeCtrl;