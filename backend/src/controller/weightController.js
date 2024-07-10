import { db } from "../db.js";

const weightCtrl = {
  saveWeight: async (req, res) => {
    try {
      const { weight } = req.body;
      
      // Access the weights collection from the database
      const weightsCollection = db.collection("weight");

      // Insert the weight data into the weights collection
      const result = await weightsCollection.insertOne({ weight });

      // Send a response with the inserted document ID
      res.status(201).json({ message: "Weight saved successfully", insertedId: result.insertedId });
    } catch (err) {
      console.error("Error saving weight:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default weightCtrl;
