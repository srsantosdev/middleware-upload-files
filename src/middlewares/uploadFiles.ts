import { NextFunction, Request, Response } from "express";

import path from 'path'
import fs from 'fs'
import Busboy from 'busboy'

export async function uploadFiles(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const busboy = new Busboy({ headers: request.headers })

  const fileData = {}

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const directory = path.resolve(__dirname, '..', '..', 'tmp')
    const saveTo = path.join(directory, path.basename(filename))
    
    file.on('data', () => {
      file.pipe(fs.createWriteStream(saveTo))
    });

    file.on('end', () => {
      Object.assign(fileData, { fieldname, file: saveTo, filename, encoding, mimetype })
    });
  });

  request.pipe(busboy);

  busboy.on('finish', () => {
    request.file = fileData

    next()
  });
}