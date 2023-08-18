import { Box, Center, Container, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Home() {
    
  return (
    <Box py={12}>
      <Container maxW="container.lg" textAlign='center'>
        <Center textAlign='center'>
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to My Notes App
          </Heading>
        </Center>
        <Text fontSize="xl" >
          Manage and organize your notes easily with our user-friendly app.
        </Text>
      </Container>
    </Box>
  );
}

export default Home;
