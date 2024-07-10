import profileController from '../controller/profileController.js';
import express  from  "express";

const router = express.Router();

router.post("/display", profileController.display);

export default router;