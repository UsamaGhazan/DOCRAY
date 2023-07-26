import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorDetails } from '../../Features/DoctorFeature/doctorDetailSlice';
import Rating from '../../Components/Rating';
import { Link as RouterLink } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  HStack,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  VStack,
  Heading,
  Text,
  Spinner,
  Image,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  List,
  ListItem,
  Flex,
} from '@chakra-ui/react';
import { createDoctorReview } from '../../Features/DoctorFeature/doctorReviewSlice';
import { DOCTOR_REVIEW_RESET } from '../../Features/DoctorFeature/doctorReviewSlice';
import { AiOutlineVideoCamera } from 'react-icons/ai';
const DoctorDetailScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const doctorId = params.id;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { doctor, loading, error } = useSelector(store => store.doctorDetails);
  const { patientInfo } = useSelector(store => store.patientLogin);
  console.log(doctor);
  const { success: successDoctorReview, error: errorDoctorReview } =
    useSelector(store => store.doctorReview);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(createDoctorReview({ doctorId, review: { rating, comment } }));
  };
  useEffect(() => {
    if (successDoctorReview) {
      setRating(0);
      setComment('');
      dispatch(DOCTOR_REVIEW_RESET);
    }
    dispatch(getDoctorDetails(doctorId));
  }, [dispatch, doctorId, successDoctorReview, patientInfo]);

  return (
    <section className="doctorDetailScreen ">
      <VStack align="flex-start">
        {loading ? (
          <div className="spinner-container">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            <Card
              w="1123px"
              h="290px"
              backgroundColor="#fff"
              mt="100px"
              ml="50px"
              border="none"
            >
              <HStack align="flex-start">
                <Box ml="32px">
                  <Avatar
                    name="Dr Jane Smith"
                    src="/images/doctor2.jpg"
                    size="2xl"
                  />
                </Box>
                <VStack align="flex-start" className="cardText" spacing="30px">
                  <Box>
                    <Text fontSize="26px" fontWeight={600}>
                      {doctor.name}
                    </Text>
                    <Text fontSize="16px" lineHeight="21px" fontWeight="400">
                      {doctor.specialization} (Cardiology)
                    </Text>
                    <Text fontSize="16px" lineHeight="21px" fontWeight="400">
                      {doctor.degree}
                    </Text>
                  </Box>
                  <HStack mt="10px" spacing="50px">
                    <VStack>
                      <Text fontSize="16px" color="#8c9196">
                        Experience
                      </Text>
                      <Text fontSize="18px" fontWeight="600">
                        {doctor.experience} years
                      </Text>
                    </VStack>
                    <VStack>
                      <Text fontSize="16px" color="#8c9196">
                        Satisfied Patients
                      </Text>
                      <Text fontSize="18px" fontWeight="600">
                        {Math.round(
                          (doctor.satisfied / doctor.patientsChecked) * 100
                        )}
                        % ({doctor.satisfied})
                      </Text>
                    </VStack>
                    <VStack>
                      <Text fontSize="16px" color="#8c9196">
                        Area Name
                      </Text>
                      <Text fontSize="18px" fontWeight="600">
                        {doctor.areaname}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
                <Box
                  w="378px"
                  h="280px"
                  boxShadow="md"
                  p="20px"
                  borderRadius="lg"
                  position="absolute"
                  right="-50px" // Make sure to add "px" to the right position value
                >
                  {/* Video Icon and Heading */}
                  <Flex align="center" mb="20px">
                    {/* You can replace the video icon with the appropriate icon component */}
                    <Box as="span" mr="10px">
                      <AiOutlineVideoCamera />
                    </Box>
                    <Heading as="h2" fontSize="20px" fontWeight="bold">
                      docRay Care Video Consultation
                    </Heading>
                  </Flex>

                  {/* Fee and Address Columns */}
                  <HStack align="flex-start" spacing="10px" mb="20px">
                    {/* Fee */}
                    <Text fontSize="18px" fontWeight="bold">
                      Fee:
                    </Text>
                    <Text fontSize="16px">${doctor.charges}</Text>
                  </HStack>

                  <HStack align="flex-start" spacing="10px">
                    {/* Address */}
                    <Text fontSize="18px" fontWeight="bold">
                      Address:
                    </Text>
                    <Text fontSize="16px">Use phone/laptop for video call</Text>
                  </HStack>

                  {/* Book Video Consultation Button */}
                  <Button
                    as={RouterLink}
                    to="/register"
                    size="lg"
                    width="100%"
                    mt="20px"
                    className="goldbtn"
                  >
                    Book Video Consultation
                  </Button>
                </Box>
              </HStack>
            </Card>
            <VStack align="flex-start" className="reviews">
              <Heading size="md">Reviews</Heading>

              <Box>
                {doctor.reviews.length === 0 && (
                  <Alert status="info">
                    <AlertIcon />
                    <AlertDescription>No Reviews available</AlertDescription>
                  </Alert>
                )}
                <List variant="flush">
                  {doctor.reviews.map(review => (
                    <ListItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <Text>{review.createdAt.substring(0, 10)}</Text>
                      <Text>{review.comment}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box>
                <Heading size="lg">Write a Review</Heading>
                {errorDoctorReview && (
                  <Alert status="error" mt={4}>
                    <AlertIcon />
                    {errorDoctorReview}
                  </Alert>
                )}
                {patientInfo ? (
                  <VStack as="form" onSubmit={submitHandler} mt={4} spacing={4}>
                    <FormControl id="rating" isRequired>
                      <FormLabel>Rating</FormLabel>
                      <Select
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                        placeholder="Select..."
                      >
                        <option value="1">1-Poor</option>
                        <option value="2">2-Fair</option>
                        <option value="3">3-Good</option>
                        <option value="4">4-Very Good</option>
                        <option value="5">5-Excellent</option>
                      </Select>
                    </FormControl>
                    <FormControl id="comment" isRequired>
                      <FormLabel>Comment</FormLabel>
                      <Textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows={3}
                        w="400px" // Set a fixed width of 400 pixels
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="blue">
                      Submit
                    </Button>
                  </VStack>
                ) : (
                  <Box mt={4}>
                    Please <Link to="/login">sign in</Link> to write a review
                  </Box>
                )}
              </Box>
            </VStack>
          </>
        )}
      </VStack>
    </section>
  );
};

export default DoctorDetailScreen;
