'use client';

import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  VStack,
  Text
} from '@chakra-ui/react'

const LanguageToModal = ({ languages, onSelectLanguage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedLanguage, setSelectedLanguage] = React.useState('Japanese')

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language)
    onSelectLanguage(language) // Call the parent callback function
  }

  return (
    <>
      <button className="bg-gray-300 px-12 py-2 rounded-lg w-48" onClick={onOpen}>{selectedLanguage}</button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Translate to</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              spacing={3}
              align="stretch"
              maxH="200px"
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#CBD5E0',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#A0AEC0',
                },
              }}
            >
              {languages.map((language) => (
                <Text
                  key={language}
                  onClick={() => handleLanguageClick(language)}
                  cursor="pointer"
                  fontWeight={selectedLanguage === language ? 'bold' : 'normal'}
                  textAlign="center"
                  width="100%"
                  padding="8px"
                  borderBottom="1px solid #e2e8f0"
                  bg={selectedLanguage === language ? 'gray.100' : 'white'}
                  _hover={{ bg: 'gray.50' }}
                >
                  {language}
                </Text>
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <button className='btn-speak text-white px-4 py-2 rounded-lg my-3' style={{backgroundColor: "#202939"}} onClick={onClose} width="100%">
              Submit
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LanguageToModal
