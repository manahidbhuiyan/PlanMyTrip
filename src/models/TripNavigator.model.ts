import mongoose, { Schema, Document } from "mongoose";

interface IHowToReach {
  mode: string;
  time: string;
  details: string;
}

interface IPlace {
  name: string;
  description: string;
  entryFee?: string;
  bestTimeToVisit?: string;
}

interface IActivity {
  name: string;
  description: string;
  category?: string; // e.g. Adventure / Cultural / Food / Relaxation
}

interface IHotel {
  name: string;
  type: string; // Budget / Luxury / Resort
  priceRange: string;
  location: string;
}

interface IFood {
  localSpecialties: string[];
  famousRestaurants: string[];
}

interface ITravelTips {
  bestSeason: string;
  safetyTips: string;
  currency: string;
  language: string;
}

interface INearbyAttraction {
  name: string;
  distance: string;
}

export interface IInformation extends Document {
  name: string;
  country: string;
  description: string;
  location: string;
  howToReach: {
    fromCapital: IHowToReach[];
    nearestAirport?: string;
    nearestRailStation?: string;
  };
  placesToSee: IPlace[];
  thingsToDo: IActivity[];
  hotels: IHotel[];
  foods: IFood;
  travelTips: ITravelTips;
  nearbyAttractions: INearbyAttraction[];
}

const hotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    priceRange: { type: String, required: true },
    location: { type: String, required: true },
  },
  { _id: false } // subdocuments এর জন্য
);

const tripNavigatorSchema = new Schema<IInformation>(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },

    howToReach: {
      fromCapital: [
        {
          mode: String,
          time: String,
          details: String,
        },
      ],
      nearestAirport: String,
      nearestRailStation: { type: String, default: null }
    },

    placesToSee: [
      {
        name: String,
        description: String,
        entryFee: String,
        bestTimeToVisit: String,
      },
    ],

    thingsToDo: [
      {
        name: String,
        description: String,
        category: String,
      },
    ],

    hotels: [hotelSchema],

    foods: {
      localSpecialties: [String],
      famousRestaurants: [String],
    },

    travelTips: {
      bestSeason: String,
      safetyTips: String,
      currency: String,
      language: String,
    },

    nearbyAttractions: [
      {
        name: String,
        distance: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IInformation>(
  "TripNavigator",
  tripNavigatorSchema
);
