import asyncHandler from 'express-async-handler';
import Doctor from '../Models/doctorModel.js';

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

export { getAllDoctors, getSingleDoctor, createDoctorReview };
