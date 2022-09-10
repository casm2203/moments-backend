import { Router } from "express";
import {
  updloadFileAws,
  getFilesAws,
  getFileURLAws,
  downloadFileAws,
} from "../controllers/upload.controller.js";

const router = Router();

router.post("/upload", updloadFileAws);

router.get("/getfiles", getFilesAws);

router.get("/getfileurl/:fileName", getFileURLAws);

router.get("/downloadfile/:fileName", downloadFileAws);

export default router;
