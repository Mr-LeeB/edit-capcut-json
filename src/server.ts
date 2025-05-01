import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { runWithOptions } from '.';
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Import hàm chính của bạn
app.post('/generate', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { SUB_FILE, ROOT_VIDEO_DIRECTORY, PATH_DRAFF_JSON } = req.body;

  if (!SUB_FILE || !ROOT_VIDEO_DIRECTORY || !PATH_DRAFF_JSON) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const result = await runWithOptions({
      SUB_FILE,
      ROOT_VIDEO_DIRECTORY,
      PATH_DRAFF_JSON
    });

    res.json({ message: '✅ Xử lý thành công!', output: result });
    console.log('✅ Xử lý thành công!');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Lỗi trong quá trình xử lý.' });
  }
}));

function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
}

app.listen(port, () => {
  console.log(`🚀 Server chạy tại http://localhost:${port}`);
});
