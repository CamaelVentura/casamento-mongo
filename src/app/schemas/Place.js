import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    phone: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Place', PlaceSchema);
