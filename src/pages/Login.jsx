import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = ({onLogin,onLogout}) => {
  const token = localStorage.getItem('token') || '';
  
  const [user,setuser] = useState({
    email:'',
    pass:'',
    })
  const navigate = useNavigate()
  
function chklogin(e){
  e.preventDefault()
  fetch(`https://clever-frog-earmuffs.cyclic.cloud/users/login`,{
    method:"POST",
    headers:{
      "Content-type":'application/json'
    },
    body:JSON.stringify(user)
  })
  .then((res)=>{
    return res.json()
  })
  .then((res)=>{
    localStorage.setItem('token', res.token);
    onLogin(); // Update the isLoggedIn state
    navigate('/'); // Redirect to home page
  }).catch((err)=>{
    console.log(err);
  })
}
//console.log(user);
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" value={user.email}
                  onChange={(e)=>setuser((prev)=>{
                    return {...prev,email:e.target.value}
                  })}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={"password"}
                    value={user.pass}
                    onChange={(e)=>setuser((prev)=>{
                      return {...prev,pass:e.target.value}
                    })}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" >
                   
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
              onClick={chklogin}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
