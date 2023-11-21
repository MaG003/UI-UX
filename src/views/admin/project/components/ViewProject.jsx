/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Avatar,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Box,
  Heading,
  Stack,
  List,
  ListItem,
  ListIcon,
  Badge,
  Button,
} from "@chakra-ui/react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
// Custom components
import React, { useMemo, useEffect, useState  } from "react";

export default function ViewProject(props) {
  const { columnsData, tableData } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpened, setModalOpened] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    if (!modalOpened) {
      onOpen();
      setModalOpened(true);
    }
  }, [modalOpened, onOpen]);
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>Project Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box>
                  <Flex gap='20px'>
                    <Heading size='xs' textTransform='uppercase'>
                     NAME
                   </Heading>
                   <Heading size='xs' >
                     UI/UX
                   </Heading>
                  </Flex>
                </Box>
               
                <Box pt='2.5'>
                  <Heading size='xs' textTransform='uppercase'>
                    List Task
                  </Heading>
                  <List spacing={1} size='sm' fontSize='14px' padding='5px 0 0 0'>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                         Thiết kế giao diện
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                         Vẽ biểu đồ tương tác
                      </ListItem>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                         Code giao diện
                      </ListItem>
                  </List>
                </Box>
                
                <Box pt='2.5'>
                  <Flex gap='140px'>
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        LEADER
                      </Heading>
                      <Flex gap='5px' padding='5px 0 0 0'>
                         <Avatar w='25px' h='25px' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                      </Flex>
                    </Box>
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        MEMBER
                      </Heading>
                      <Flex gap='5px' marginTop='5px'>
                         <Avatar w='25px' h='25px' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                         <Avatar w='25px' h='25px' name='Dan Abrahmov' src='https://bit.ly/ryan-florence' />
                         <Avatar w='25px' h='25px' name='Dan Abrahmov' src='https://bit.ly/kent-c-dodds' />
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
               
                <Box pt='2.5'>
                  <Flex gap='120px'>
                    <Box>
                       <Heading size='xs' textTransform='uppercase'>
                         End Date
                       </Heading>
                       <Text fontSize='sm'>
                          27/06/2023
                       </Text>
                       
                    </Box>
                     <Box>
                       <Heading size='xs' textTransform='uppercase'>
                         PROGRESS
                       </Heading>
                       <Flex align='center'>
                             <Text
                               me='10px'
                               color={textColor}
                               fontSize='sm'
                               fontWeight='700'>
                               {25}%
                             </Text>
                             <Progress
                               variant='table'
                               colorScheme='brandScheme'
                               h='8px'
                               w='63px'
                               value={25.5}
                             />
                      </Flex>
                    </Box>                      
                  </Flex>
                </Box>
               
                <Box paddingTop='10px'>
                  <Heading size='xs' textTransform='uppercase'>
                    priority
                  </Heading>
                  <Badge variant='solid' colorScheme='green'>High</Badge>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
          </ModalContent>
          </Modal>
    </>
  );
}
