import * as fs from 'fs';

export const deleteFileDir = (fileName: string) => {
  const dir = `public/module/file/${fileName}`;
  if (fs.existsSync(dir)) {
    fs.unlinkSync(dir);
  }
};
