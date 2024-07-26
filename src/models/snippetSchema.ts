import mongoose, { Document } from "mongoose";
import { Model } from "mongoose";

interface ISnippet extends Document {
  title: string;
  description: string;
  code: string;
  favourite: boolean;
  language: string;
}

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  favourite: { type: Boolean, default: false },
  language: { type: String, required: true, default: "javascript" },
});

const Snippet: Model<ISnippet> =
  mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", snippetSchema);

export default Snippet;
