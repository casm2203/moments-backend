import { downloadFile, getFiles, uploadFile, getFileURL } from "../utils/s3.js";

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
