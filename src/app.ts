import express from 'express';
import cors from 'cors'

import { uploadFiles } from './middlewares/uploadFiles'

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/upload',
  uploadFiles,
  async (request, response) => {
    console.log(request.file)

    return response.json({ ok: true })
  }
)

export default app;