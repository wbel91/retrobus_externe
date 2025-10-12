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

export default function Header() {
  const { pathname } = useLocation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal don
  const {
    isOpen: isDonateOpen,
    onOpen: onDonateOpen,
    onClose: onDonateClose
  } = useDisclosure();

  // Modal newsletter
  const {
    isOpen: isNewsOpen,
    onOpen: onNewsOpen,
    onClose: onNewsClose
  } = useDisclosure();

  const API_URL = import.meta.env.VITE_API_URL || 'https://attractive-kindness-rbe-serveurs.up.railway.app';

  // Fetch public site-config for dynamic header/logo
  const [cfg, setCfg] = useState(null);
  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const r = await fetch(`${API_URL}/public/site-config`, { cache: 'no-store' });
        const j = r.ok ? await r.json() : null;
        if (!stop) setCfg(j);
      } catch {
        if (!stop) setCfg(null);
      }
    })();
    return () => { stop = true; };
  }, [API_URL]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const headerImg = isMobile
    ? (cfg?.headerImageMobile || cfg?.headerImageDesktop || bg)
    : (cfg?.headerImageDesktop || cfg?.headerImageMobile || bg);
  const headerPos = isMobile
    ? (cfg?.headerPositionMobile || 'center')
    : (cfg?.headerPositionDesktop || 'center');

  let logo = logoDefault;
  if (cfg?.logoMain) logo = cfg.logoMain;
  if (pathname.startsWith("/retromerch")) logo = logoDefault; // keep brand override if needed

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      setNewsletterStatus("error");
      return;
    }
    setIsSubmitting(true);
    setNewsletterStatus(null);
    try {
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail.trim() })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      setNewsletterStatus("ok");
      setNewsletterEmail("");
      setTimeout(() => setNewsletterStatus(null), 3000);
    } catch (e) {
      setNewsletterStatus("error");
      setTimeout(() => setNewsletterStatus(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="site-header">
        <div
          className="header-bg"
          style={{
            backgroundImage: `url("${headerImg}")`,
            backgroundPosition: headerPos
          }}
          aria-hidden="true"
        />
        <div className="header-inner">
          <img src={logo} alt="RétroBus Essonne" className="header-logo" />
        </div>
      </header>

      {/* Navbar avec icônes à droite */}
      <Navbar
        donateIcon={<HandHeartIcon size={26} />}
        newsletterIcon={<EnvelopeIcon size={26} />}
        onDonateClick={onDonateOpen}
        onNewsletterClick={onNewsOpen}
      />

      {/* Modal DON (inchangé sauf déplacement) */}
      <Modal isOpen={isDonateOpen} onClose={onDonateClose} size="lg" isCentered>
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent maxW="500px" bg="white" borderRadius="lg">
          <ModalHeader bg="var(--rbe-red)" color="white" borderTopRadius="lg" py={4}>
            <Heading size="md">💝 Soutenir RétroBus Essonne</Heading>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={0}>
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
            <Box p={4} bg="gray.50" borderBottomRadius="lg">
              <VStack spacing={2}>
                <Text fontSize="xs" color="gray.600" textAlign="center">
                  🏛️ 66% déductible des impôts • 🔒 Paiement sécurisé
                </Text>
                <Button
                  size="sm"
                  variant="ghost"
                  color="gray.500"
                  onClick={onDonateClose}
                  fontSize="xs"
                >
                  Fermer
                </Button>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal NEWSLETTER */}
      <Modal isOpen={isNewsOpen} onClose={() => { onNewsClose(); setNewsletterStatus(null); }} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="var(--rbe-red)" color="white">📬 Inscription Newsletter</ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody pb={6} pt={4}>
              <VStack align="stretch" spacing={4}>
                <Text fontSize="sm" color="gray.600">
                  Recevez les actualités, événements et infos du parc directement par email.
                </Text>
                <form onSubmit={handleNewsletterSubmit}>
                  <VStack align="stretch" spacing={3}>
                    <FormControl>
                      <FormLabel fontSize="sm" mb={1}>Votre email</FormLabel>
                      <Input
                        type="email"
                        placeholder="vous@example.com"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                        bg="white"
                      />
                    </FormControl>
                    {newsletterStatus === "ok" && (
                      <Text fontSize="sm" color="green.600">✅ Inscription enregistrée !</Text>
                    )}
                    {newsletterStatus === "error" && (
                      <Text fontSize="sm" color="red.500">❌ Email invalide ou erreur. Réessayez.</Text>
                    )}
                    <HStack justify="flex-end" pt={2}>
                      <Button variant="ghost" onClick={onNewsClose}>
                        Annuler
                      </Button>
                      <Button
                        type="submit"
                        colorScheme="red"
                        bg="var(--rbe-red)"
                        isLoading={isSubmitting}
                      >
                        S'inscrire
                      </Button>
                    </HStack>
                  </VStack>
                </form>
                <Text fontSize="xs" color="gray.500" textAlign="center">
                  Vous pourrez vous désinscrire à tout moment.
                </Text>
              </VStack>
            </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}