import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
  } from '@chakra-ui/react'
import JSONForm from './JSONForm';

  function BasicUsage( {isOpen, onOpen, onClose} ) {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <JSONForm></JSONForm>
            </ModalBody>
  
            <ModalFooter>
              {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button> */}
              {/* <Button variant='ghost'>Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
export default BasicUsage;