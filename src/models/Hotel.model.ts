import mongoose, { Schema, Document } from "mongoose";

interface IRoom extends Document {
  roomType: string;
  roomNo: number;
  description: string;
  pricePerNight: number;
  view: boolean;
  available: boolean;
}

interface IHotel extends Document {
  name: string;
  location: string;
  description: string;
  amenities: string[];
  images: string[];
  rating: number;
  rooms: IRoom[];
  coupons: string[];
  totalRooms: number;
  availableRooms: number;
  createdAt: Date;
}

const roomSchema = new Schema<IRoom>({
  roomType: { type: String, required: true },
  roomNo: { type: Number, required: true },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  view: { type: Boolean, required: true },
  available: { type: Boolean, required: true },
});

const hotelSchema = new Schema<IHotel>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  amenities: [String],
  images: [String],
  rooms: [roomSchema],
  coupons: [String],
  totalRooms: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IHotel>("Hotels", hotelSchema);
