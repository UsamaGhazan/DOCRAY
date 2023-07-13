import mongoose from 'mongoose';
const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    charges: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    patientsChecked: {
      type: Number,
      required: true,
      default: 0,
    },
    isBooked: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    satisfied: {
      type: Number,
      required: true,
      default: 0,
    },
    unsatisfied: {
      type: Number,
      required: true,
      default: 0,
    },
    gender: {
      type: String,
      required: true,
    },
    experience: { type: Number, required: true },
    degree: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, //createdAt, //updatedAt
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
