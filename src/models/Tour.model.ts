import mongoose, { Schema, Document, Types } from "mongoose";

interface IDayPlan {
  day: number;
  activities: string;
  accommodation?: string;
}

interface IHotelInfo {
  name: string;
  location: string;
  nights: number;
}

export interface ITour extends Document {
  title: string;
  description: string;
  locations?: string[];        // optional array of main locations
  itinerary?: IDayPlan[];      // optional day-wise plan
  startDates: Date[];          // multiple start dates
  endDates: Date[];            // multiple end dates
  pricePerPerson: number;      // required
  currency?: string;           // optional, e.g. "BDT" or "USD"
  airfareIncluded?: boolean;   // optional
  hotels?: IHotelInfo[];       // optional
  packageIncludes?: string[];  // optional
  packageExcludes?: string[];  // optional
  coupons?: string[];          // optional
}

const dayPlanSchema = new Schema<IDayPlan>({
  day: { type: Number, required: true },
  activities: { type: String, required: true },
  accommodation: String,
});

const hotelSchema = new Schema<IHotelInfo>({
  name: { type: String, required: true },
  location: String,
  nights: { type: Number, required: true },
});

const tourSchema = new Schema<ITour>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  locations: [String],
  itinerary: [dayPlanSchema],
  startDates: { type: [Date], required: true },
  endDates: { type: [Date], required: true },
  pricePerPerson: { type: Number, required: true },
  currency: { type: String, default: "BDT" },
  airfareIncluded: { type: Boolean, default: false },
  hotels: [hotelSchema],
  packageIncludes: [String],
  packageExcludes: [String],
  coupons: [String],
}, { timestamps: true });

export default mongoose.model<ITour>("Tours", tourSchema);