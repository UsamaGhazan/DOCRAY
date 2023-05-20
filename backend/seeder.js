//This file is separate from server
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctors from './data/doctors.js';
import Doctor from './models/doctorModel.js';
import connectDb from './config/db.js';
dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Doctor.deleteMany(); //will delete everything

    const createdDoctors = await Doctor.insertMany(doctors);
    // const adminUser = createdUsers[0]._id; //id from first item of Users data

    const sampleDoctors = doctors.map((doctor) => {
      return { ...doctor }; //addition of user in products
    });

    await Doctor.insertMany(sampleDoctors);
    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  //becareful with it... might delete this function later
  try {
    await Doctor.deleteMany(); //will delete everything

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
