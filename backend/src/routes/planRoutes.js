import planController from '../controller/planController.js';
import express  from  "express";

const router = express.Router();

router.post("/weight", planController.saveWeight);
router.get("/showWeight/:year", planController.showWeight);
router.get("/show5yearWeight/:year", planController.show5YearsWeight);

export default router;