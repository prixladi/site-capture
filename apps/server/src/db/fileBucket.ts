import { Db, GridFSBucket } from 'mongodb';

const createBucket = (db: Db, bucketName: string): GridFSBucket => {
  return new GridFSBucket(db, { bucketName: bucketName });
};

export default createBucket;
