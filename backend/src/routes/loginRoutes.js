import loginController from '../controller/loginController.js';
import express  from  "express";

const router = express.Router();

router.post("/login", loginController.loggingin);

export default router;