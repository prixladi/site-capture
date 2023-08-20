import mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import { Viewport } from './shared';

type SiteDoc = mongoose.Document & {
  _id: ObjectID;
  userId: ObjectID;
  name: string;
  url: string;
  subsites: string[];
  viewports: Viewport[];
  quality: number;
  latestJobId?: ObjectID;
};

const collectionName = 'sites';

const siteSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    userId: { type: mongoose.Types.ObjectId, index: 1 },
    name: String,
    url: String,
    subsites: [String],
    viewports: [
      {
        width: Number,
        height: Number,
      },
    ],
    quality: Number,
    latestJobId: { type: mongoose.Types.ObjectId, required: false },
  },
  { collection: collectionName, versionKey: false },
);

export default mongoose.model<SiteDoc>(collectionName, siteSchema, collectionName);
export { SiteDoc };
