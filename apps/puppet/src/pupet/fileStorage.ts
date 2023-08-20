import AdmZip from 'adm-zip';
import { ObjectID } from 'mongodb';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';
import { logOperation } from '../logger';
import Stopwatch from '../stopwatch';

type StorageConfig = {
  zip: AdmZip;
  fileBucket: GridFSBucket;
  folderName: string;
  filename: string;
};

type GridFSObject = {
  _id: ObjectID;
  length: number;
  chunkSize: number;
  uploadDate: Date;
  md5: string;
  filename: string;
};

const zipAndStore = async ({ fileBucket, folderName, filename, zip }: StorageConfig): Promise<ObjectID> => {
  const stopwatch = new Stopwatch();
  zip.addLocalFolder(folderName);

  const buffer = zip.toBuffer();
  const stream = Readable.from(buffer);

  const result = await new Promise<GridFSObject>((resolve, reject) =>
    stream.pipe(
      fileBucket
        .openUploadStream(filename)
        .on('error', async (err) => {
          reject(err);
        })
        .on('finish', async (item: GridFSObject) => {
          resolve(item);
        }),
    ),
  );

  logOperation('Commpression and file upload', stopwatch);

  return result._id;
};

export type { StorageConfig };
export default zipAndStore;
