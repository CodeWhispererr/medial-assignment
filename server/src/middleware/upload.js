import multer from 'multer';
import path from 'path';

const upload = multer({ dest: path.join(process.cwd(), 'uploads/') });

export default upload;