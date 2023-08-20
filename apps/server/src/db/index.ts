import mongoose from 'mongoose';
import { devEnvironment, mongoConfig } from '../configs';
import siteModel from './site';
import templateModel from './template';
import jobModel from './job';
import { ObjectID } from 'mongodb';
import { GridFSBucket } from 'mongodb';
import createBucket from './fileBucket';

type DB = {
  siteModel: typeof siteModel;
  templateModel: typeof templateModel;
  jobModel: typeof jobModel;
  fileBucket: GridFSBucket;
};

type RawDoc<Doc extends mongoose.Document> = Omit<Doc, keyof mongoose.Document> & { _id: ObjectID };

const connect = async (): Promise<DB> => {
  const url = new URL(mongoConfig.databaseName, mongoConfig.url).href;

  mongoose.connection.on('connecting', function () {
    console.log('Connecting to MongoDB...');
  });

  mongoose.connection.on('connected', function () {
    console.log(`Connected to MongoDB ('${url}').`);
  });

  mongoose.set('debug', devEnvironment);

  for (;;) {
    try {
      await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      });

      mongoose.connection.on('error', function (err) {
        console.error('Mongoose connection error: ', err);
      });

      mongoose.connection.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
      });

      break;
    } catch (err) {
      console.error(err);
    }
  }

  const fileBucket = createBucket(mongoose.connection.db, 'results');

  return {
    siteModel,
    templateModel,
    jobModel,
    fileBucket,
  };
};

const disconnect = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error while disconnecting from MongoDB:', err);
  }
};

export { DB, RawDoc };
export { connect, disconnect };
