import multer from 'multer';
import path from 'path';
import fs from 'fs';

export function uploadTo(subfolder: string) {
  const uploadDir = path.resolve('uploads', subfolder);
  fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${path.extname(file.originalname)}`);
    }
  });

  return multer({ storage });
}
