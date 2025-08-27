import mongoose, { Schema, Document } from "mongoose";

interface IInformation extends Document {
  name: string;
  description: string;
  location: string;
  howToReach: string;
}

const tripNavigatorSchema = new Schema<IInformation>({
  name: String,
  description: String,
  location: String,
  howToReach: String,
});

export default mongoose.model<IInformation>("TripNavigator", tripNavigatorSchema);
