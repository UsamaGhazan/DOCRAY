import asyncHandler from 'express-async-handler';
import Patient from '../Models/patientModel.js';
import Appointment from '../Models/appointmentModel.js';
import Doctor from '../Models/doctorModel.js';
import generateToken from '../utils/generateToken.js';
import moment from 'moment-timezone';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const patient = await Patient.findOne({ email });

  if (patient && (await patient.matchPassword(password))) {
    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      token: generateToken(patient._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password, gender, contact, dob } = req.body;

  const patientExists = await Patient.findOne({ email });

  if (patientExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const patient = await Patient.create({
    name,
    email,
    password,
    gender,
    contactNumber: contact,
    dateOfBirth: dob,
  });

  // logging in the user right after registration
  if (patient) {
    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      token: generateToken(patient._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User data');
  }
});
const getPatientProfile = asyncHandler(async (req, res) => {
  //current loggedin user

  const patient = await Patient.findById(req.user._id);
  if (patient) {
    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
    });
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

const bookAppointment = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const { startTime, date, doctorID } = req.body;

  // Separating the date components
  const [month, day, year] = date.split('/');

  // Separating the time components
  const [time, meridiem] = startTime.split(' ');
  const [hours, minutes] = time.split(':');

  // Converting hours to 24-hour format if the time is PM
  const hours24 =
    meridiem === 'AM' ? parseInt(hours, 10) : parseInt(hours, 10) + 12;

  // Creating a new Date object with the specified date and time
  const dateObj = new Date(Date.UTC(year, month - 1, day, hours24, minutes));

  // Checking if the dateObj is valid
  if (isNaN(dateObj)) {
    res.status(400).send('Invalid date or time format');
    return;
  }

  // Format the date to ISO format
  const formattedDate = dateObj.toISOString();

  const doctor = await Doctor.findById(doctorID);
  if (doctor) {
    doctor.availableTimeSlots.push({ startTime: formattedDate });
    await doctor.save();
  }

  res.send('Appointment booked successfully');
});

export { authUser, getPatientProfile, registerUser, bookAppointment };
