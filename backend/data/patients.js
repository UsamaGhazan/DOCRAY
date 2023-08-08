import bcrypt from 'bcryptjs';

const patients = [
  {
    name: 'John Doe',
    password: '12345',
    image: '/images/patient1.jpg',
    dateOfBirth: new Date('1990-01-01'),
    email: 'johndoe@yahoo.com',
    gender: 'Male',
    contactNumber: '032313242342',
    feePayed: false,
  },
  {
    name: 'Jane Smith',
    password: 'password',
    image: '/images/patient2.jpg',
    dateOfBirth: new Date('1985-05-15'),
    email: 'janesmith@yahoo.com',
    gender: 'Female',
    contactNumber: '032313242343',
    feePayed: false,
  },
  {
    name: 'Michael Johnson',
    password: 'secret',
    image: '/images/patient3.jpg',
    dateOfBirth: new Date('1978-11-27'),
    email: 'michaeljohnson@yahoo.com',
    gender: 'Male',
    contactNumber: '032313242344',
    feePayed: false,
  },
  {
    name: 'Emily Davis',
    password: 'qwerty',
    image: '/images/patient4.jpg',
    dateOfBirth: new Date('1992-07-10'),
    email: 'emilydavis@yahoo.com',
    gender: 'Female',
    contactNumber: '032313242345',
    feePayed: false,
  },
  {
    name: 'William Wilson',
    password: 'pass123',
    image: '/images/patient5.jpg',
    dateOfBirth: new Date('1980-03-22'),
    email: 'williamwilson@yahoo.com',
    gender: 'Male',
    contactNumber: '032313242346',
    feePayed: false,
  },
];

export default patients;
