import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReview extends Document {
  userId: Types.ObjectId;  
  entityId: Types.ObjectId;
  entityType: "Hotel" | "Tour";
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  entityId: { type: Schema.Types.ObjectId, required: true }, // এখানে Hotel বা Tour এর ObjectId থাকবে
  entityType: { type: String, enum: ["Hotel", "Tour"], required: true }, // কোনটা review হচ্ছে
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>("Review", reviewSchema)
