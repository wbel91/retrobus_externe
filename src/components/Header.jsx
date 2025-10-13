import "../styles.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  useDisclosure, VStack, Text, Heading, Button, Input, FormControl, FormLabel, HStack, Image
} from "@chakra-ui/react";
import bg from "../assets/_MG_0969.jpg";
import logoDefault from "../assets/RétroBouh2025.svg";
import Navbar from "./Navbar.jsx";
import CompatImg from "./CompatImg.jsx";

// Icônes (remplies en rouge rétrobus)
const HandHeartIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--rbe-red)" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6.5c1.4-1.5 3.5-1.5 4.9 0C18.3 7.9 18.3 10.1 17 11.4L12 16.5 7 11.4C5.7 10.1 5.7 7.9 7.1 6.5c1.4-1.5 3.5-1.5 4.9 0z"/>
    <path d="M4 14h2v6H4v-6Zm3-2h2v8H7v-8Zm3-1h2v9h-2v-9Zm3 2h2v7h-2v-7Zm3 1h2v6h-2v-6Z" opacity=".9"/>
    <path d="M3 21h18v1H3z" opacity=".6"/>
  </svg>
);

const EnvelopeIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--rbe-red)" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v.4L12 12 3 6.4V6Zm0 2.8V18c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.8l-9.3 5.7a1 1 0 0 1-1.05 0L3 8.8Z"/>
  </svg>
);

const LOGO_PATH = "/assets/rbe_logo.svg";
const HEADER_BG = "/assets/fallback/_MG_1006.jpg";

export default function Header() {
  const { isOpen: isDonateOpen, onOpen: onDonateOpen, onClose: onDonateClose } = useDisclosure();
  const { isOpen: isNewsletterOpen, onOpen: onNewsletterOpen, onClose: onNewsletterClose } = useDisclosure();
  
  const [donateAmount, setDonateAmount] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  
  const location = useLocation();

  // Fonction pour ouvrir HelloAsso
  const handleDonateClick = () => {
    window.open('https://www.helloasso.com/associations/retrobus-essonne', '_blank');
  };

  return (
    <>
      <header className="site-header">
        {/* Background */}
        <div
          className="header-bg"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        />
        
        {/* Content */}
        <div className="header-inner">
          <CompatImg 
            className="header-logo" 
            path={LOGO_PATH}
            alt="Logo RBE"
            fallback={logoDefault}
          />
        </div>
      </header>

      <Navbar
        donateIcon={<HandHeartIcon />}
        newsletterIcon={<EnvelopeIcon />}
        onDonateClick={handleDonateClick}
        onNewsletterClick={onNewsletterOpen}
      />

      {/* Modal Newsletter */}
      <Modal isOpen={isNewsletterOpen} onClose={onNewsletterClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack spacing={2}>
              <EnvelopeIcon size={24} />
              <Text>Newsletter RBE</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4} color="gray.600">
              Restez informé de nos actualités, événements et nouveautés !
            </Text>
            
            <FormControl mb={4}>
              <FormLabel>Adresse email</FormLabel>
              <Input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="votre@email.com"
              />
            </FormControl>
            
            <Button
              colorScheme="red"
              width="100%"
              onClick={() => {
                // Logique d'inscription newsletter
                console.log('Newsletter:', newsletterEmail);
                onNewsletterClose();
              }}
            >
              S'inscrire à la newsletter
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}