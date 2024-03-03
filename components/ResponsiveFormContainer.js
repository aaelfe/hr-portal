import React from 'react';
import { Container, useBreakpointValue, VStack, Box } from '@chakra-ui/react';

const ResponsiveFormContainer = ({ children }) => {
    // Adjust the padding based on the breakpoint
    const paddingValue = useBreakpointValue({ base: '4', md: '8' });

    // Adjust the width of the container based on the breakpoint
    const widthValue = useBreakpointValue({ 
        base: "100%", // 0px
        sm: "100%", // ~480px. em is a relative unit and is dependant on the font size.
        md: "100%", // ~768px
        lg: "100%", // ~992px
        xl: "100%", // ~1280px
        "2xl": "75%", 
    });

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={paddingValue}
            width={widthValue}
            mx="auto" // Center the box horizontally
        >
            <Box width="full" px={paddingValue}>
                {children}
            </Box>
        </Box>
    );
};

export default ResponsiveFormContainer;