import { Box, Button, Flex, Spacer, Text, Link, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Navbar({isLoggedIn, onLogin, onLogout}) {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.300", "gray.700");
  const token = localStorage.getItem('token') || '';
 // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const linkStyles = {
    textDecoration: "none",
    color: textColor,
    fontWeight: "medium",
    fontSize: "sm",
    _hover: {
      textDecoration: "underline",
    },
  };

  return (
    <Box bg={bgColor} py={4} borderBottom={`1px solid ${borderColor}`}>
      <Flex align="center" maxW="container.xl" mx="auto">
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          My Notes App
        </Text>
        <Spacer />
        <Link as={RouterLink} to='/' style={linkStyles} mx={2}>
          Home
        </Link>
        {isLoggedIn  ? (
          <>
            <Link as={RouterLink} to={'/create'} style={linkStyles} mx={2}>
              Create Notes
            </Link>
            <Link as={RouterLink} to="/user" style={linkStyles} mx={2}>
              Your Notes
            </Link>
            <Button colorScheme="teal" variant="solid" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) :(
            <>
              <Link as={RouterLink} to="/login" style={linkStyles} mx={2}>
                Login
              </Link>
              <Link as={RouterLink} to="/signup" style={linkStyles} mx={2}>
                Register
              </Link>
            </>
          )}
        </Flex>
      </Box>
  );
}

export default Navbar;
