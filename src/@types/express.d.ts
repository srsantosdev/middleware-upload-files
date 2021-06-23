declare namespace Express {
  export interface Request {
    file: {
      fieldname?: string;
      file?: string;
      filename?: string;
      encoding?: string;
      mimetype?: string;
    };
  }
}
