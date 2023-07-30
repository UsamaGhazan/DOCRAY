import asyncHandler from 'express-async-handler';
import Patient from '../Models/patientModel.js';
import Appointment from '../Models/appointmentModel.js';
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
  // Combining the date and time strings into a single string
  const dateTimeString = `${date} ${startTime}`;
  console.log(dateTimeString);
  // Parsing the dateTimeString into Javascript Date object
  const dateObj = new Date(dateTimeString);
  console.log(dateObj);
  // Checking if the dateObj is valid object
  if (isNaN(dateObj)) {
    res.status(400).json({ error: 'Invalid date or time format' });
  }
  const iso8601DateTime = dateObj.toISOString();
  console.log(iso8601DateTime);
  res.json({ iso8601DateTime });
});

export { authUser, getPatientProfile, registerUser, bookAppointment };
