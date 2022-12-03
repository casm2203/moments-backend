import { downloadFile, getFiles, uploadFile, getFileURL } from "../utils/s3.js";
import fs from "fs-extra";

export const updloadFileAws = async (req, res) => {
  const result = await uploadFile(req.files.img);
  res.json({ result });
};

export const getFilesAws = async (req, res) => {
  const result = await getFiles();
  res.json({ ok: "Archivos obtenidos", result });
};

export const getFileURLAws = async (req, res) => {
  const result = await getFileURL(req.params.fileName);
  res.json({ url: result });
};

export const downloadFileAws = async (req, res) => {
  await downloadFile(req.params.fileName);
  res.json({ result: "Archivo descargado" });
};

export const uploadImg = async (req) => {
  await uploadFile(req.files.url_img);
  const url_img = await getFileURL(req.files.url_img.name);
  await fs.remove(req.files.url_img.tempFilePath);
  return url_img;
};