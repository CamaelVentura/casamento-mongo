import mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    expected_adults: {
      type: Number,
      required: true,
      default: 0
    },
    expected_kids: {
      type: Number,
      required: true,
      default: 0
    },
    confirmed_adults: {
      type: Number,
      required: true,
      default: 0
    },
    confirmed_kids: {
      type: Number,
      required: true,
      default: 0
    },
    confirmed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('Guest', GuestSchema);
