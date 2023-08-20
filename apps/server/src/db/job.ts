import mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import { Viewport } from './shared';

type ProgressItem = {
  url: string;
  status: boolean;
  errorMessage?: string;
};

type JobDoc = mongoose.Document & {
  _id: ObjectID;
  userId?: ObjectID;
  url: string;
  subsites: string[];
  viewports: Viewport[];
  quality: number;
  aquired: boolean;
  status: boolean;
  progress: number;
  errorMessage?: string;
  zipFileId?: ObjectID;
  items?: ProgressItem[];
};

const collectionName = 'jobs';

const jobSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    userId: { type: mongoose.Types.ObjectId, required: false },
    url: String,
    subsites: [String],
    viewports: [
      {
        width: Number,
        height: Number,
      },
    ],
    quality: Number,
    aquired: { type: Boolean, index: 'hashed' },
    status: Boolean,
    progress: Number,
    errorMessage: { type: String, required: false },
    zipFileId: mongoose.Types.ObjectId,
    items: [
      {
        url: String,
        status: Boolean,
        errorMessage: { type: String, required: false },
      },
    ],
  },
  { collection: collectionName, versionKey: false, timestamps: true },
);

export default mongoose.model<JobDoc>(collectionName, jobSchema, collectionName);
export { Viewport, JobDoc, ProgressItem };
