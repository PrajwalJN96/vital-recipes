import { db } from "../db.js";

const homeCtrl = {
  compareWeight: async (req, res) => {
    try {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1; // getMonth() is zero-based, so we add 1
      
      let previousYear = currentYear;
      let previousMonth = currentMonth - 1;
      
      if (previousMonth === 0) {
        previousMonth = 12; // December
        previousYear = currentYear - 1;
      }
      
      // Fetch records for current month and previous month
      const currentRecord = await db.collection("weight").findOne({ year: currentYear, month: currentMonth });
      const previousRecord = await db.collection("weight").findOne({ year: previousYear, month: previousMonth });
      
      let message;
      if (currentRecord && previousRecord) {
        if (currentRecord.weight <= previousRecord.weight) {
          message = "Keep it up";
        } else {
          message = "Eat more healthy.";
        }
      } else {
        message = "Insufficient data to compare.";
      }
      
      res.json({ message });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  userNameFavorites: async (req, res) => {
    try {
      const { name } = req.params;
      const userDetails = await db.collection("userRecipes").findOne({ name });
      if (userDetails) {
        res.json(userDetails);
      } else {
        res.json({ message: "invalid user" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  userRecipes: async (req, res) => {
    try {
      const { recipe } = req.params;
      const recipeDetails = await db
        .collection("recipeDetails")
        .findOne({ recipeName: recipe });
      if (recipeDetails) {
        res.json(recipeDetails);
      } else {
        res.json({ message: "recipe not found" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default homeCtrl;
