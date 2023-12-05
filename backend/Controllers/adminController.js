import asyncHandler from 'express-async-handler';
import Patient from '../Models/patientModel.js';
import Appointment from '../Models/appointmentModel.js';
import Doctor from '../Models/doctorModel.js';
import generateToken from '../utils/generateToken.js';
import Admin from '../Models/adminModel.js';

const authAdmin = asyncHandler(async (req, res) => {
  console.log('Inside loginAdmin');
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  // const admin=await Admin.findOne({email})
  console.log(admin);
  if (admin && admin.password == password) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    await doctor.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (patient) {
    await patient.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({});
  res.json(appointments);
});
const totalDocAndPat = asyncHandler(async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    res.json({ totalDoctors, totalPatients, totalAppointments });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export {
  authAdmin,
  deleteDoctor,
  deletePatient,
  getAllAppointments,
  totalDocAndPat,
};
