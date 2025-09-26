import "../styles.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  Box, 
  Tooltip, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody,
  useDisclosure,
  VStack,
  Text,
  Heading,
  Button,
  HStack
} from "@chakra-ui/react";
import bg from "../assets/rbe_920.jpg";
import logoDefault from "../assets/rbe_logo.svg";
import Navbar from "./Navbar.jsx";

// Icône main avec cœur au-dessus
const HandHeartIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cœur au-dessus */}
    <path
      d="M12 6.5c1.4-1.5 3.5-1.5 4.9 0C18.3 7.9 18.3 10.1 17 11.4L12 16.5L7 11.4C5.7 10.1 5.7 7.9 7.1 6.5c1.4-1.5 3.5-1.5 4.9 0z"
      fill="white"
    />
    {/* Main ouverte en dessous */}
    <path
      d="M4 14h2v6H4v-6zm3-2h2v8H7v-8zm3-1h2v9h-2v-9zm3 2h2v7h-2v-7zm3 1h2v6h-2v-6z"
      fill="white"
      opacity="0.9"
    />
    <path
      d="M3 21h18v1H3v-1z"
      fill="white"
      opacity="0.7"
    />
  </svg>
);

export default function Header() {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  let logo = logoDefault;
  if (pathname.startsWith("/retromerch")) logo = logoDefault;

  return (
    <>
      <header className="site-header">
        <div
          className="header-bg"
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden="true"
        />
        <div className="header-inner">
          <img src={logo} alt="RétroBus Essonne" className="header-logo" />

          {/* Icône de don en haut à droite */}
          <Box
            position="absolute"
            top="24px"
            right="24px"
            zIndex={10}
          >
            <Tooltip
              label="Soutenir l'association"
              placement="bottom"
              bg="blackAlpha.800"
              color="white"
              fontSize="sm"
            >
              <Box
                onClick={onOpen}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.15)",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                }}
                _active={{
                  transform: "scale(1.05)"
                }}
                aria-label="Faire un don"
              >
                <HandHeartIcon />
              </Box>
            </Tooltip>
          </Box>
        </div>
      </header>

      {/* Modal HelloAsso optimisée */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent maxW="500px" bg="white" borderRadius="lg">
          <ModalHeader bg="var(--rbe-red)" color="white" borderTopRadius="lg" py={4}>
            <Heading size="md">💝 Soutenir RétroBus Essonne</Heading>
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody p={0}>
            {/* Widget HelloAsso intégré - COMPACT */}
            <Box p={4}>
              <iframe
                src="https://www.helloasso.com/associations/association-retrobus-essonne/formulaires/3/widget"
                style={{
                  width: "100%",
                  height: "400px",
                  border: "none",
                  borderRadius: "8px"
                }}
                title="Don HelloAsso"
                loading="lazy"
              />
            </Box>

            {/* Footer simplifié */}
            <Box p={4} bg="gray.50" borderBottomRadius="lg">
              <VStack spacing={2}>
                <Text fontSize="xs" color="gray.600" textAlign="center">
                  🏛️ 66% déductible des impôts • 🔒 Paiement sécurisé
                </Text>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  color="gray.500"
                  onClick={onClose}
                  fontSize="xs"
                >
                  Fermer
                </Button>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Navbar rendered immediately after header */}
      <Navbar />
    </>
  );
}