import { db } from "../db.js";

const weightCtrl = {
  saveWeight: async (req, res) => {
    try {
      const { weight, month, year } = req.body;

      // Check if a record with the same month and year exists
      const existingRecord = await db.collection("weight").findOne({ month, year });

      if (existingRecord) {
        // Update the existing record
        await db.collection("weight").updateOne(
          { month, year },
          { $set: { weight } }
        );
        res.json({ message: 'Weight updated successfully' });
      } else {
        // Insert a new record
        await db.collection("weight").insertOne({ weight, month, year });
        res.json({ message: 'Weight saved successfully' });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  showWeight: async (req, res) => {
    try {
        const { year } = req.params;
        const intYear = parseInt(year);
        const existingRecord = await db.collection("weight")
            .find({ year: intYear })
            .sort({ month: 1 }) // Sorting in ascending order of the month
            .toArray();
        res.json(existingRecord);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
},
show5YearsWeight: async (req, res) => {
  try {
      const { year } = req.params;
      const intYear = parseInt(year);
      const existingRecord = await db.collection("weight")
          .find({ 
              year: { 
                  $gte: intYear - 5, // Greater than or equal to the current year minus 5
                  $lte: intYear // Less than or equal to the current year
              } 
          })
          .sort({ year: 1, month: 1 }) // Sorting first by year and then by month
          .toArray();
      res.json(existingRecord);
  } catch (err) {
      return res.status(500).json({ msg: err.message });
  }
}
};

export default weightCtrl;
