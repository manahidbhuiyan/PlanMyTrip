import mongoose, { Schema, Document, Types } from "mongoose";

export interface IHotelBooking extends Document {
  userId: Types.ObjectId;
  hotelId: Types.ObjectId;
  roomType: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfRooms: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

const hotelBookingSchema = new Schema<IHotelBooking>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
  roomType: { type: String, required: true },
  checkInDate: Date,
  checkOutDate: Date,
  numberOfRooms: Number,
  totalPrice: Number,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IHotelBooking>("HotelBooking", hotelBookingSchema);
