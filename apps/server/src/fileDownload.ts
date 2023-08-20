import { objIdRegex } from './constants';
import { ObjectID } from 'mongodb';
import { GridFSBucket } from 'mongodb';
import { Request, Response } from 'express';

type GridFSObject = {
  _id: ObjectID;
  length: number;
  chunkSize: number;
  uploadDate: Date;
  md5: string;
  filename: string;
};

type Handler = (req: Request<{ fileId: string }>, res: Response) => Promise<Response<void>>;

const createFileDownloadHandler = (fileBucket: GridFSBucket): Handler => async (req: Request<{ fileId: string }>, res: Response) => {
  const { fileId } = req.params;
  if (!fileId || !fileId.match(objIdRegex)) {
    return res.sendStatus(404);
  }

  const objId = new ObjectID(fileId);

  const files = await fileBucket.find({ _id: objId }).toArray();
  if (files.length == 0) {
    return res.sendStatus(404);
  }
  const file = files[0] as GridFSObject;

  res.set({
    'Content-Disposition': `attachment; filename=${file.filename}`,
    'Content-Type': 'application/octet-stream',
    'Content-Length': file.length,
  });

  return fileBucket.openDownloadStream(new ObjectID(fileId)).pipe(res);
};

export default createFileDownloadHandler;
