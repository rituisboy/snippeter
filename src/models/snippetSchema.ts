import mongoose, { Document, Schema } from "mongoose";
import { Model } from "mongoose";

interface ISnippet extends Document {
  title: string;
  description: string;
  code: string;
  favourite: boolean;
  language: string;
  user: string;
}

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  favourite: { type: Boolean, default: false },
  language: { type: String, required: true, default: "javascript" },
  user: { type: String, required: true },
});

const Snippet: Model<ISnippet> =
  mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", snippetSchema);

export default Snippet;
