import { Box, Button, Container, Input, Textarea, Text, Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Create() {
  const [note, setNote] = useState({ title: "", body: "" });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const token = localStorage.getItem('token') || '';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://clever-frog-earmuffs.cyclic.cloud/notes/create`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        body:JSON.stringify(note)
    }).then((res)=>res.json())
    .then((res)=>{
        console.log(res);
        setShowSuccessAlert(true);
        setNote({ title: "", body: "" });
    }).catch((err)=>{
        console.log(err);
    });
  };

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showSuccessAlert]);

  return (
    <Container maxW="md">
      <Box p={6} shadow="md" borderWidth="1px" borderRadius="md">
        <Text fontSize='50px' color='tomato' textAlign='center'>
          Create Your Note
        </Text>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleInputChange}
            mb={4}
          />
          <Textarea
            name="body"
            placeholder="Note Body"
            value={note.body}
            onChange={handleInputChange}
            resize="vertical"
            minHeight="120px"
            mb={4}
          />
          <Button colorScheme="teal" type="submit">
            Create Note
          </Button>
          {showSuccessAlert && (
            <Alert mt={4} status="success" variant="subtle">
              <AlertIcon />
              Note created successfully!
            </Alert>
          )}
        </form>
      </Box>
    </Container>
  );
}

export default Create;
