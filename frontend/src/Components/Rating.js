import { Box } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ value, text }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starColor = i <= value ? 'yellow.400' : 'gray.300';
      stars.push(
        <Box key={i} as={FaStar} color={starColor} boxSize={6} mr={1} />
      );
    }
    return stars;
  };

  return (
    <Box display="flex" alignItems="center">
      {renderStars()}
      <Box ml={2}>{text}</Box>
    </Box>
  );
};

export default StarRating;
