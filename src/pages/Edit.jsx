import { Box, Button, ButtonGroup, FocusLock, FormControl, FormLabel, IconButton, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"
import { EditIcon } from "@chakra-ui/icons";
const TextInput = React.forwardRef((props, ref) => {
    //console.log(props.change);
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} onChange={props.onChange}/>
      </FormControl>
    )
  })
const Form = ({ firstFieldRef, onCancel , item ,flag,setFlag}) => {
    const token = localStorage.getItem('token') || '';
    const [state,setstate] = useState({
        body:item.body,
        title:item.title
    })
    function handleupdate(e,id){
        e.preventDefault()
        fetch(`https://clever-frog-earmuffs.cyclic.cloud/notes/update/${id}`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body:JSON.stringify(state)
              
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            onCancel()
            setFlag(!flag)
            //console.log(flag,setFlag);
        })
    }
    
    //console.log(state)
    return (
      <Stack spacing={4}>
        <TextInput
          label='Title'
          id='first-name'
          ref={firstFieldRef}
          defaultValue={item.body}
          onChange={(e) => setstate({ ...state, body: e.target.value })}
          //onClick={(e)=>handleupdate(e,item._id)}
        />
        <TextInput label='Body' id='last-name' defaultValue={item.title} onChange={(e) => setstate({ ...state, title: e.target.value })} />
        <ButtonGroup display='flex' justifyContent='flex-end'>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button  onClick={(e)=>handleupdate(e,item._id)} colorScheme='teal'>
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    )
  }
const Edit = ({item,flag,setFlag}) => {
    //console.log(flag,setFlag);
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)
  
    return (
      
        <Popover
          isOpen={isOpen}
          initialFocusRef={firstFieldRef}
          onOpen={onOpen}
          onClose={onClose}
          placement='right'
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <IconButton size='sm' icon={<EditIcon />} />
          </PopoverTrigger>
          <PopoverContent p={5}>
            <FocusLock returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverCloseButton />
              <Form firstFieldRef={firstFieldRef} flag={flag} setFlag={setFlag} item={item} onCancel={onClose} />
            </FocusLock>
          </PopoverContent>
        </Popover>
      
    )
  }
  export default Edit