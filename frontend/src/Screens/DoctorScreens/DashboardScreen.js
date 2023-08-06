import React from 'react';
import { useDisclosure, Box } from '@chakra-ui/react';
import SidebarContent from '../../Components/Doctor Components/Dashboard Components/SidebarContent';
import MobileNav from '../../Components/Doctor Components/Dashboard Components/MobileNav';
import DrawerComponent from '../../Components/Doctor Components/Dashboard Components/DrawerComponent';
const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <DrawerComponent isOpen={isOpen} onClose={onClose} />
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  );
};

export default Dashboard;
