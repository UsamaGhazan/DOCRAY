import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctors from './data/doctors.js';
import patients from './data/patients.js';
import Patient from './Models/patientModel.js';
import Doctor from './models/doctorModel.js';
import connectDb from './config/db.js';
import Appointment from './Models/appointmentModel.js';
dotenv.config();
connectDb();

const importData = async () => {
  try {
    for (const doctor of doctors) {
      const existingDoctor = await Doctor.findOne({ email: doctor.email });

      if (existingDoctor) {
        // If a doctor with the same email already exists, update the existing document
        await Doctor.updateOne({ email: doctor.email }, doctor);
      } else {
        // Insert a new doctor document
        await Doctor.create(doctor);
      }
    }

    for (const patient of patients) {
      const existingPatient = await Patient.findOne({ email: patient.email });

      if (existingPatient) {
        // If a patient with the same email already exists, update the existing document
        await Patient.updateOne({ email: patient.email }, patient);
      } else {
        // Insert a new patient document
        await Patient.create(patient);
      }
    }
    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Doctor.deleteMany();
    await Patient.deleteMany();
    await Appointment.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
