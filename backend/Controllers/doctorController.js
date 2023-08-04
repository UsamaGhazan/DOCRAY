import asyncHandler from 'express-async-handler';
import Doctor from '../Models/doctorModel.js';
import generateToken from '../utils/generateToken.js';

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({});
  res.json(doctors);
});

const getSingleDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});
const authDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email });
  if (doctor && (await doctor.matchPassword(password))) {
    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      token: generateToken(doctor._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
const registerDoctor = asyncHandler(async (req, res) => {
  console.log('registerDoctor');
  const {
    name,
    email,
    password,
    gender,
    specialization,
    degree,
    charges,
    category,
    experience,
    areaname,
    clinicname,
  } = req.body;
  console.log('category: ', category);
  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    res.status(400);
    throw new Error('Doctor already registered');
  }

  const doctor = await Doctor.create({
    name,
    email,
    password,
    gender,
    specialization,
    degree,
    charges,
    category,
    experience,
    areaname,
    clinicname,
    // Will change later
    image: '/images/doctor5.jpg',
  });
  if (doctor) {
    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      gender: doctor.gender,
      specialization: doctor.specialization,
      degree: doctor.specialization,
      charges: doctor.charges,
      category: doctor.category,
      experience: doctor.experience,
      areaname: doctor.areaname,
      clinicName: doctor.clinicname,
      image: doctor.image,
    });
  }
});

const createDoctorReview = asyncHandler(async (req, res) => {
  console.log(req, res);
  const { rating, comment } = req.body;
  const doctor = await Doctor.findById(req.params.id);
  //We are sending token from frontend and from that token we are identifying req.user who created the review
  // in the authMiddleware
  if (doctor) {
    const alreadyReviewed = doctor.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Doctor already reviewed');
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      if (rating >= 3) {
        doctor.satisfied = doctor.satisfied + 1;
      } else {
        doctor.unsatisfied = doctor.unsatisfied + 1;
      }
      doctor.reviews.push(review);
      doctor.numReviews = doctor.reviews.length;

      await doctor.save();
      res.status(201).json({ message: 'Review added' });
    }
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

export { getAllDoctors, getSingleDoctor, createDoctorReview, registerDoctor };
