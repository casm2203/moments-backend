import { Router } from "express";
import {
  getMoments,
  getMoment,
  addMoment,
  updateMoment,
  deleteMoment,
  releaseMoment,
} from "../controllers/moment.controller.js";

const router = Router();

router.get("/moments", getMoments);

router.get("/moments/:id", getMoment);

router.post("/moments", addMoment);

router.put("/moments/:id", updateMoment);

router.delete("/moments/:id", deleteMoment);

router.patch("/moments/:id", releaseMoment);

export default router;
