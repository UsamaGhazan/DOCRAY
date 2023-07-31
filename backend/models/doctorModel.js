import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    //user ko refer kar rahy ta k aik hi user dobara review na dy saky
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patient',
    },
  },
  {
    timestamps: true,
  }
);

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
});

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
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    patientsChecked: {
      type: Number,
      default: 0,
    },
    isBooked: {
      type: Boolean,
    },
    category: {
      type: String,
      required: true,
    },
    satisfied: {
      type: Number,
      default: 0,
    },
    unsatisfied: {
      type: Number,
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
    clinicname: {
      type: String,
      required: true,
    },
    areaname: {
      type: String,
      required: true,
    },
    availableTimeSlots: {
      type: [timeSlotSchema],
      required: true,
    },
  },
  {
    timestamps: true, //createdAt, //updatedAt
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
