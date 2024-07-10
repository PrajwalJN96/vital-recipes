import { db } from "../db.js";

const signupCtrl = {
    signup :async (req, res) => {
        try{
        const { name, email, phoneNumber} = req.body;
        const result = await db.collection("userDetails").insertOne({
          name,
          email,
          phoneNumber,
        });
        if (result) {
          res.json({"message":"Signup successful"});
        } else {
          res.json({"message":"error"});
        } }catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    }};

export default signupCtrl;