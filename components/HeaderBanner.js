import React from 'react';
import { Flex, Image, Box, Divider } from '@chakra-ui/react';

const HeaderBanner = () => {
    return (
        <Box position="fixed" top={0} left={0} right={0} zIndex="banner">
          <Flex
            justifyContent="center"
            alignItems="center"
            bg="white"
            color="white"
            py={2}
          >
            <Image
              src="https://logotyp.us/file/cgi.svg"
              alt="Logo"
              mr={2}
              maxHeight="75px"
            />
          </Flex>
          <Divider orientation='horizontal' />
        </Box>
      );
    };
    
export default HeaderBanner;