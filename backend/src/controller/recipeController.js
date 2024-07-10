import axios from 'axios';
import "dotenv/config";

const recipeController = {
  display :async (req, res) => {
        try{
         const recipeName = req.params.query;
        const apiKey = process.env.APIKEY;
        const query = `${recipeName}`
        const number = 10;
    
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=${number}&fillIngredients=true&addRecipeInformation=true`;
    
        const response = await axios.get(apiUrl);
        const data = response.data;
        if (data) {
          res.json(data.results);
        } else {
          res.json({"message":"invalid user"});
        }
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      }};

export default recipeController;