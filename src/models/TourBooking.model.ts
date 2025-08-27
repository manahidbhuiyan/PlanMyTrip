import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITourBooking extends Document {
  userId: Types.ObjectId;
  tourId: Types.ObjectId;
  numberOfPeople: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

const tourBookingSchema = new Schema<ITourBooking>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tourId: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
  numberOfPeople: { type: Number, required: true },
  totalPrice: Number,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITourBooking>("TourBooking", tourBookingSchema)
