import { createId } from '@paralleldrive/cuid2';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';

export class MulterConfig {
  static storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dirr = './public/module/file';
      if (!fs.existsSync(dirr)) {
        fs.mkdirSync(dirr, { recursive: true });
      }

      cb(null, dirr);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}-${createId()}${ext}`;
      cb(null, filename);
    },
  });
}
