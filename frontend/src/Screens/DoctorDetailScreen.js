import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorDetails } from '../Features/DoctorFeature/doctorDetailSlice';
import Rating from '../Components/Rating';

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
} from '@chakra-ui/react';

const DoctorDetailScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const doctorId = params.id;
  const { doctor, loading, error } = useSelector(store => store.doctorDetails);
  const { patientInfo } = useSelector(store => store.patientLogin);
  console.log(doctor);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(getDoctorDetails(doctorId));
  }, [dispatch, doctorId]);

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
            >
              <HStack spacing="50px">
                <Box ml="32px">
                  <Avatar
                    name="Dr Jane Smith"
                    src="/images/doctor2.jpg"
                    size="2xl"
                  />
                </Box>
                <VStack align="flex-start" className="cardText" spacing="30px">
                  <Box>
                    <Text fontSize="26px" fontWeight={600} mt="21px">
                      {doctor.name}
                    </Text>
                    <Text fontSize="16px" lineHeight="21px" fontWeight="400">
                      {doctor.specialization}
                      (Cardiology)
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
                  <VStack>Hello</VStack>
                </VStack>
              </HStack>
            </Card>
            <VStack align="flex-start">
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
                <Heading size="lg">Write a Customer Review</Heading>
                {errorProductReview && (
                  <Box color="red.500" mt={4}>
                    {errorProductReview}
                  </Box>
                )}
                {userInfo ? (
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
