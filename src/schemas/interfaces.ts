import fs from "fs";
export interface Upload {
  createReadStream: () => fs.ReadStream;
  filename: string;
  mimetype: string;
  encoding: string;
}

export interface FileResponse {
  success: boolean;
  message?: string;
  url?: string;
}
