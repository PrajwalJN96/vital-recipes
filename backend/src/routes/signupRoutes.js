import signupController from '../controller/signupController.js';
import express  from  "express";

const router = express.Router();

router.post("/signin", signupController.signup);

export default router;