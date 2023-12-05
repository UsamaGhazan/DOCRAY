import mongoose from 'mongoose';

const recordSchema = mongoose.Schema(
  {
    newDoctorsHistory: [
      {
        date: {
          type: Date,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
    ],
    newPatientHistory: [
      {
        date: {
          type: Date,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.model('Record', recordSchema);

export default Record;
