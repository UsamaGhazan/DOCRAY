import {
  Card,
  CardBody,
  Icon,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const StatCard = ({ profileViews, info, icon }) => {
  return (
    <Card
      overflow="hidden"
      variant="outline"
      bg="blackAlpha.900"
      height="150px"
      width="300px"
    >
      <CardBody>
        <Stat>
          <StatLabel color="white">
            <Icon as={icon} mr="2" />
            {info} in last 7 days
          </StatLabel>
          <StatNumber color="white">{profileViews}</StatNumber>
          <StatHelpText color="white">
            <StatArrow
              focusable="false"
              aria-hidden="true"
              type="increase"
            ></StatArrow>
            23.36%
          </StatHelpText>
        </Stat>
      </CardBody>
    </Card>
  );
};

export default StatCard;
