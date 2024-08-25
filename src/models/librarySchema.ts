import mongoose, { Document, Schema } from "mongoose";
import { Model } from "mongoose";

interface ILibrarySchema extends Document {
  title: string;
  content: Schema.Types.ObjectId[];
  user: string;
}

const librarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [{ type: Schema.Types.ObjectId, ref: "Snippet", required: false }],
  user: { type: String, required: true },
});

const Library: Model<ILibrarySchema> =
  mongoose.models.Library ||
  mongoose.model<ILibrarySchema>("Library", librarySchema);

export default Library;
