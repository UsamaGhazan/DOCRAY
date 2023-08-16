import jwt from 'jsonwebtoken';
import asynHandler from 'express-async-handler';
import Patient from '../Models/patientModel.js';
import Doctor from '../Models/doctorModel.js';

const protect = asynHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      const patient = await Patient.findById(verify.id).select('-password');
      const doctor = await Doctor.findById(verify.id).select('-password');
      if (patient) {
        req.user = patient;
      }
      if (doctor) {
        req.user = doctor;
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
});

export { protect };
