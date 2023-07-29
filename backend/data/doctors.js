import bcrypt from 'bcryptjs';

const doctors = [
  {
    name: 'Dr John Smith',
    password: bcrypt.hashSync('12345', 10),
    image: '/images/doctor1.jpg',
    specialization: 'Dermatologist, Cosmetologist',
    email: 'johnsmith@yahoo.com',
    charges: 89.99,
    rating: 4.5,
    numReviews: 12,
    patientsChecked: 10,
    isBooked: false,
    category: 'pneumonia',
    satisfied: 10,
    degree: 'M.B.B.S., F.C.P.S. (Dermatology)',
    unsatisfied: 2,
    experience: 10,
    gender: 'male',
    clinicname: 'Iqra Medical complex',
    areaname: 'Johr Town',
    reviews: {
      name: 'John Doe',
      rating: 5,
      comment: 'Great service!',
      user: '64af4e4e3c3e296bc6a5e0c0',
    },
    availableTimeSlots: [
      {
        startTime: '2024-01-02T10:00:00.000Z',
        endTime: '2024-01-02T11:30:00.000Z',
      },
      {
        startTime: '2024-01-02T14:00:00.000Z',
        endTime: '2024-01-02T15:30:00.000Z',
      },
      {
        startTime: '2024-01-02T16:00:00.000Z',
        endTime: '2024-01-02T17:30:00.000Z',
      },
      {
        startTime: '2024-01-03T09:00:00.000Z',
        endTime: '2024-01-03T10:30:00.000Z',
      },
      {
        startTime: '2024-01-03T11:00:00.000Z',
        endTime: '2024-01-03T12:30:00.000Z',
      },
      {
        startTime: '2024-01-03T14:00:00.000Z',
        endTime: '2024-01-03T15:30:00.000Z',
      },
      {
        startTime: '2024-01-03T16:00:00.000Z',
        endTime: '2024-01-03T17:30:00.000Z',
      },
      {
        startTime: '2024-01-04T10:00:00.000Z',
        endTime: '2024-01-04T11:30:00.000Z',
      },
    ],
  },
  {
    name: 'Dr Jane Smith',
    password: bcrypt.hashSync('12345', 10),
    image: '/images/doctor2.jpg',
    specialization: 'Cardiologist M.B.B.S, M.D (Cardiology)',
    email: 'janesmith@yahoo.com',
    charges: 99.99,
    rating: 4.8,
    numReviews: 8,
    patientsChecked: 20,
    isBooked: false,
    category: 'Tb',
    satisfied: 10,
    unsatisfied: 2,
    experience: 10,
    degree: 'M.B.B.S., F.C.P.S. (Dermatology)',
    gender: 'male',
    clinicname: 'Iqra Medical complex',
    areaname: 'Johr Town',
    availableTimeSlots: [
      {
        startTime: '2024-01-02T10:00:00.000Z',
        endTime: '2024-01-02T11:30:00.000Z',
      },
      {
        startTime: '2024-01-02T14:00:00.000Z',
        endTime: '2024-01-02T15:30:00.000Z',
      },
      {
        startTime: '2024-01-02T16:00:00.000Z',
        endTime: '2024-01-02T17:30:00.000Z',
      },
      {
        startTime: '2024-07-29T10:00:00.000Z',
        endTime: '2024-07-29T11:30:00.000Z',
      },
      {
        startTime: '2024-07-29T14:00:00.000Z',
        endTime: '2024-07-29T15:30:00.000Z',
      },
      {
        startTime: '2024-07-30T09:00:00.000Z',
        endTime: '2024-07-30T10:30:00.000Z',
      },
      {
        startTime: '2024-07-30T13:00:00.000Z',
        endTime: '2024-07-30T14:30:00.000Z',
      },
      {
        startTime: '2024-07-30T16:00:00.000Z',
        endTime: '2024-07-30T17:30:00.000Z',
      },
    ],
  },
  {
    name: 'Dr David Johnson',
    password: bcrypt.hashSync('12345', 10),
    image: '/images/doctor3.jpg',
    specialization: 'Orthopedic Surgeon M.B.B.S, D.Ortho, M.S (Ortho)',
    email: 'davidjohnson@yahoo.com',
    charges: 79.99,
    rating: 4.3,
    numReviews: 15,
    patientsChecked: 5,
    isBooked: false,
    category: 'pneumonia',
    satisfied: 10,
    unsatisfied: 2,
    experience: 10,
    degree: 'M.B.B.S., F.C.P.S. (Dermatology)',
    gender: 'male',
    clinicname: 'Iqra Medical complex',
    areaname: 'Johr Town',
    availableTimeSlots: [
      {
        startTime: '2024-01-02T10:00:00.000Z',
        endTime: '2024-01-02T11:30:00.000Z',
      },
      {
        startTime: '2024-01-02T14:00:00.000Z',
        endTime: '2024-01-02T15:30:00.000Z',
      },
      {
        startTime: '2024-01-02T16:00:00.000Z',
        endTime: '2024-01-02T17:30:00.000Z',
      },
      {
        startTime: '2023-07-29T09:00:00.000Z',
        endTime: '2023-07-29T10:30:00.000Z',
      },
      {
        startTime: '2023-07-29T10:45:00.000Z',
        endTime: '2023-07-29T12:15:00.000Z',
      },
      {
        startTime: '2023-07-30T09:30:00.000Z',
        endTime: '2023-07-30T11:00:00.000Z',
      },
      {
        startTime: '2023-07-30T11:15:00.000Z',
        endTime: '2023-07-30T12:45:00.000Z',
      },
      {
        startTime: '2023-07-31T05:00:00.000Z',
        endTime: '2023-07-31T06:30:00.000Z',
      },
      {
        startTime: '2023-07-31T06:00:00.000Z',
        endTime: '2023-07-31T07:30:00.000Z',
      },
    ],
  },
  {
    name: 'Dr Sarah Williams',
    password: bcrypt.hashSync('12345', 10),
    image: '/images/doctor4.jpg',
    specialization: 'Pediatrician M.B.B.S, D.C.H',
    email: 'sarahwilliams@yahoo.com',
    charges: 69.99,
    rating: 4.7,
    numReviews: 20,
    patientsChecked: 25,
    isBooked: false,
    category: 'Tb',
    satisfied: 10,
    unsatisfied: 2,
    experience: 10,
    degree: 'M.B.B.S., F.C.P.S. (Dermatology)',
    gender: 'female',
    clinicname: 'Iqra Medical complex',
    areaname: 'Johr Town',
    reviews: {
      name: 'John Doe',
      rating: 4.5,
      comment: 'Great service!',
      user: '64af4e4e3c3e296bc6a5e0c0',
    },
    availableTimeSlots: [
      {
        startTime: '2024-01-02T10:00:00.000Z',
        endTime: '2024-01-02T11:30:00.000Z',
      },
      {
        startTime: '2024-01-02T14:00:00.000Z',
        endTime: '2024-01-02T15:30:00.000Z',
      },
      {
        startTime: '2024-01-02T16:00:00.000Z',
        endTime: '2024-01-02T17:30:00.000Z',
      },
    ],
  },
  {
    name: 'Dr Michael Davis',
    password: bcrypt.hashSync('12345', 10),
    image: '/images/doctor5.jpg',
    specialization: 'Neurologist M.B.B.S, D.M (Neurology)',
    email: 'michaeldavis@yahoo.com',
    charges: 109.99,
    rating: 4.6,
    numReviews: 10,
    patientsChecked: 18,
    isBooked: false,
    category: 'pneumonia',
    satisfied: 10,
    experience: 10,
    unsatisfied: 2,
    degree: 'M.B.B.S., F.C.P.S. (Dermatology)',
    gender: 'female',
    clinicname: 'Iqra Medical complex',
    areaname: 'Johr Town',
    availableTimeSlots: [
      {
        startTime: '2024-01-02T10:00:00.000Z',
        endTime: '2024-01-02T11:30:00.000Z',
      },
      {
        startTime: '2024-01-02T14:00:00.000Z',
        endTime: '2024-01-02T15:30:00.000Z',
      },
      {
        startTime: '2024-01-02T16:00:00.000Z',
        endTime: '2024-01-02T17:30:00.000Z',
      },
      {
        startTime: '2024-01-03T09:00:00.000Z',
        endTime: '2024-01-03T10:30:00.000Z',
      },
      {
        startTime: '2024-01-03T11:00:00.000Z',
        endTime: '2024-01-03T12:30:00.000Z',
      },
      {
        startTime: '2024-01-03T14:00:00.000Z',
        endTime: '2024-01-03T15:30:00.000Z',
      },
      {
        startTime: '2024-01-03T16:00:00.000Z',
        endTime: '2024-01-03T17:30:00.000Z',
      },
      {
        startTime: '2024-01-04T10:00:00.000Z',
        endTime: '2024-01-04T11:30:00.000Z',
      },
    ],
  },
];

export default doctors;
