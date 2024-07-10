app.put("/api/favorites/:name/:favoriteRecipe", async (req, res) => {
    const { name, favoriteRecipe } = req.params;
  
    const result = await db.collection("userRecipes").findOne({ name });
    
    if (result) {
      let favoriteRecipes = result.favoriteRecipes || [];
    
      const index = favoriteRecipes.indexOf(favoriteRecipe);
      
      if (index === -1) {
        favoriteRecipes.push(favoriteRecipe);
      } else {
        favoriteRecipes.splice(index, 1);
      }
      
      await db.collection("userRecipes").updateOne({ name }, { $set: { favoriteRecipes } });
      
      res.json({ success: true, favoriteRecipes });
    } else {
      res.status(404).send("User not found");
    }
  });
  
  
  
  
  app.post("/api/profile/:name/save", async (req, res) => {
    const { name, age, weight, gender, dailyStepCount, bmi } = req.body;
    let regName = await db.collection("userDetails").findOne({ name });
    if (regName) {
      const result = await db.collection("userProfile").insertOne({
        name,
        age,
        weight,
        gender,
        dailyStepCount,
        bmi,
      });
      res.send(result);
    } else {
      res.status(500).send("Failed to create recipe");
    }
  });
  
  app.get("/api/profile/:name", async (req, res) => {
    const {name} = req.params;
    const result = await db.collection("userProfile").findOne({ name });
    if (result) {
      res.send(result);
    } else {
      res.status(500).send("Failed to create recipe");
    }
  });
  
  app.delete("/api/profile/:name/delete", async (req, res) => {
    const name = req.params.name;
   
      const result = await db.collection("userProfile").deleteOne({ name });
   
      if (result) {
        res.status(200).send("Profile deleted successfully");
      } else {
        res.status(404).send("Profile not found");
      }
    });  
  