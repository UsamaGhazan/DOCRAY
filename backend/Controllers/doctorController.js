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
      gender: doctor.gender,
      specialization: doctor.specialization,
      degree: doctor.specialization,
      charges: doctor.charges,
      category: doctor.category,
      experience: doctor.experience,
      areaname: doctor.areaname,
      clinicName: doctor.clinicname,
      image: doctor.image,
      patientsChecked: doctor.patientsChecked,
      satisfiedPatients: doctor.satisfied,
      unsatisfiedPatients: doctor.unsatisfied,

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
      email: doctor.email,
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

// doctorController.js
const profileViewCount = asyncHandler(async (req, res) => {
  const { doctorId } = req.body;
  const doctor = await Doctor.findById(doctorId);

  if (doctor) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset the time to 00:00:00

    // Find if a view entry for today already exists in profileViewsHistory
    const existingView = doctor.profileViewsHistory.find(
      (entry) => entry.date.getTime() === today.getTime()
    );

    if (existingView) {
      // If a view entry for today already exists, increment the views
      existingView.views += 1;
    } else {
      // If no view entry for today exists, create a new entry
      doctor.profileViewsHistory.push({
        date: today,
        views: 1,
      });
    }

    // Limit the profileViewsHistory array to the last 7 days
    doctor.profileViewsHistory = doctor.profileViewsHistory.slice(-7);

    // Increment the total profile views
    doctor.profileViews += 1;

    await doctor.save();
    res.status(201).json({ message: 'Profile view added' });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

export {
  getAllDoctors,
  getSingleDoctor,
  createDoctorReview,
  registerDoctor,
  authDoctor,
  profileViewCount,
};
