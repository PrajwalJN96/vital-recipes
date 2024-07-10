import { db } from "../db.js";

const profileCtrl = {
  display :async (req, res) => {
        try{
        const { email, password } = req.body;
      
        const userDetail = await db.collection("userDetails").findOne({ email, password });
        if (userDetail) {
          res.json(userDetail);
        } else {
          res.json({"message":"invalid user"});
        }
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      }};

export default profileCtrl;