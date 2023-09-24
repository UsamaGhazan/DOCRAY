import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to the Doctor model
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to the Patient model
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },

  feePayed: {
    type: Boolean,
    default: false,
  },
  patientimage: {
    type: String,
  },
  doctorimage: {
    type: String,
  },
  roomId: {
    type: String,
    default: uuidv4, // Using uuidv4 to generate a random ID by default
    unique: true,
    required: true,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
