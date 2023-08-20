import mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import { Viewport } from './shared';

type TemplateDoc = mongoose.Document & {
  _id: ObjectID;
  userId: ObjectID;
  name: string;
  viewports: Viewport[];
  quality: number;
};

const collectionName = 'templates';

const templateSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    userId: { type: mongoose.Types.ObjectId, index: 1 },
    name: String,
    viewports: [
      {
        width: Number,
        height: Number,
      },
    ],
    quality: Number,
  },
  { collection: collectionName, versionKey: false },
);

export default mongoose.model<TemplateDoc>(collectionName, templateSchema, collectionName);
export { TemplateDoc };
