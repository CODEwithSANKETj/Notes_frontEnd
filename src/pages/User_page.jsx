import { Box, Button, Center, Container, Flex, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Edit from "./Edit";

function User_page() {
  const token = localStorage.getItem('token') || '';
  const [notes, setNotes] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    fetch('https://clever-frog-earmuffs.cyclic.cloud/notes/', {
      method: "GET",
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setNotes(res.note);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [flag]);

  function handleDelete(id) {
    fetch(`https://clever-frog-earmuffs.cyclic.cloud/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setFlag(!flag); // Refresh the data
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {notes.length === 0 && <h1>NO Notes found</h1>}
      {notes.map((item, index) => (
        <Container key={index} maxW="lg" py={6} bg="white" borderRadius="md" boxShadow="md">
          <Box key={index} p={4} bg="gray.200" borderRadius="md" mb={4}>
            <h2 fontSize="xl" fontWeight="semibold" mb={2}>
              {item.title}
            </h2>
            <p>{item.body}</p>
            <Flex alignItems='center' justifyContent='center' gap='50px'>
            <Edit item={item} flag={flag} setFlag={setFlag}/>
            
            <Button onClick={() => handleDelete(item._id)} colorScheme="red" size="sm">
              Delete
            </Button>
          </Flex>
          </Box>
        </Container>
      ))}
    </div>
  );
}

export default User_page;
