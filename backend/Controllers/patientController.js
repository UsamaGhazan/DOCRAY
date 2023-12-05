import asyncHandler from 'express-async-handler';
import Patient from '../Models/patientModel.js';
import Appointment from '../Models/appointmentModel.js';
import Doctor from '../Models/doctorModel.js';
import generateToken from '../utils/generateToken.js';
import Admin from '../Models/adminModel.js';
const getAllPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({});
  res.json(patients);
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const patient = await Patient.findOne({ email });
  // const admin=await Admin.findOne({email})
  if (patient && (await patient.matchPassword(password))) {
    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      dob: patient.dateOfBirth,
      image: patient.image,
      token: generateToken(patient._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, gender, contact, dob, image } = req.body;
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
    image,
  });

  // logging in the user right after registration
  if (patient) {
    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      image: patient.image,
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
  console.log('startTime ', startTime);
  console.log('startDate ', date);

  // Parsing the startTime components
  const [time, meridiem] = startTime.split(' ');
  const [hours, minutes] = time.split(':');

  // Parsing the date components
  const [month, day, year] = date.split('/'); //interchanged day and month(if error occurs in future refer to this)

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

  // Formatting the date to ISO format
  const formattedDate = dateObj.toISOString();
  const doctor = await Doctor.findById(doctorID);
  const patient = await Patient.findOne({ email });
  if (!doctor) {
    res.status(401);
    throw new Error('Doctor does not exist');
  }
  const bookedAppointment = await Appointment.create({
    doctorId: doctorID,
    patientId: patient._id,
    doctorName: doctor.name,
    patientName: patient.name,
    startTime: formattedDate,
    patientimage: patient.image,
    doctorimage: doctor.image,
  });
  await doctor.save();
  await bookedAppointment.save();
  if (bookedAppointment) {
    res.status(201).json({
      success: true,
      startTime: formattedDate,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const getUpcommingAppointments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.find({ patientId: id });
  if (appointments) {
    res.json(appointments);
  } else {
    res.status(404).json({ message: 'No new appointments' });
  }
});

const symptomChecker = asyncHandler(async (req, res) => {
  console.log('Inside symptom checker');
  const pneumoniaResponses = req.body.pneumoniaResponses;
  const tbResponses = req.body.tbResponses;
  console.log(pneumoniaResponses);
  console.log(tbResponses);
  // Linear regression model weights and intercept for pneumonia
  const pneumoniaWeights = [0.1, -0.2, 0.3, -0.1, 0.2];
  const pneumoniaIntercept = 0.1;

  // Linear regression model weights and intercept for tuberculosis
  const tbWeights = [0.05, -0.1, 0.15, -0.05, 0.1, 0.2, 0.3];
  const tbIntercept = 0.05;

  if (
    pneumoniaResponses.length !== pneumoniaWeights.length ||
    tbResponses.length !== tbWeights.length
  ) {
    return res.status(400).json({ error: 'Invalid input length' });
  }

  // Calculate probability for pneumonia
  const pneumoniaSum = pneumoniaResponses.reduce(
    (acc, response, index) => acc + response * pneumoniaWeights[index],
    0
  );
  const pneumoniaProbability =
    1 / (1 + Math.exp(-(pneumoniaSum + pneumoniaIntercept)));

  // Calculate probability for tuberculosis
  const tbSum = tbResponses.reduce(
    (acc, response, index) => acc + response * tbWeights[index],
    0
  );
  const tbProbability = 1 / (1 + Math.exp(-(tbSum + tbIntercept)));

  console.log(pneumoniaProbability);
  console.log(tbProbability);

  res.json({ pneumoniaProbability, tbProbability });
});

export {
  authUser,
  getPatientProfile,
  registerUser,
  bookAppointment,
  getUpcommingAppointments,
  symptomChecker,
  getAllPatients,
};
