import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  HStack,
  Tooltip,
  useDisclosure,
  useBreakpointValue
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Navbar({ donateIcon, newsletterIcon, onDonateClick, onNewsletterClick }) {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const items = [
    { to: "/", label: "Accueil" },
    { to: "/parc", label: "Parc de Véhicules" },
    { to: "/evenements", label: "Événements" },
    { to: "/retromerch", label: "RétroMerch" },
    { to: "/contact", label: "Contact" },
  ];

  if (!isMobile) {
    return (
      <nav className="site-nav" aria-label="Navigation principale" style={{ position: 'relative' }}>
        {/* Contenu navigation centré */}
        <Box
            className="site-nav__inner"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={4}
            gap={8}
        >
          <HStack gap={2}>
            {items.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                className={`nav-btn ${pathname === it.to ? "active" : ""}`}
                aria-current={pathname === it.to ? "page" : undefined}
              >
                {it.label}
              </Link>
            ))}
          </HStack>
        </Box>

        {/* Icônes complètement à droite (hors flux) */}
        <HStack
          spacing={5}
          position="absolute"
          right="12px"
          top="50%"
          transform="translateY(-50%)"
          pr={{ base: 2, lg: 4 }}
        >
          <Tooltip label="Soutenir l'association" hasArrow placement="bottom">
            <Box
              as="button"
              onClick={onDonateClick}
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all .25s"
              _hover={{ transform: "scale(1.15)" }}
              _active={{ transform: "scale(1.05)" }}
              aria-label="Faire un don"
            >
              {donateIcon}
            </Box>
          </Tooltip>
          <Tooltip label="S'inscrire à la newsletter" hasArrow placement="bottom">
            <Box
              as="button"
              onClick={onNewsletterClick}
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all .25s"
              _hover={{ transform: "scale(1.15)" }}
              _active={{ transform: "scale(1.05)" }}
              aria-label="Inscription newsletter"
            >
              {newsletterIcon}
            </Box>
          </Tooltip>
        </HStack>
      </nav>
    );
  }

  // Mobile
  return (
    <>
      <Box
        position="fixed"
        top="20px"
        right="20px"
        zIndex={1000}
        display={{ base: "block", md: "none" }}
      >
        <IconButton
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="solid"
          bg="whiteAlpha.900"
          color="var(--rbe-red)"
          size="lg"
          borderRadius="full"
          boxShadow="lg"
          _hover={{ bg: "var(--rbe-red)", color: "white" }}
          aria-label="Menu de navigation"
        />
      </Box>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="var(--rbe-red)" color="white">
            Association RétroBus Essonne
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack spacing={0} align="stretch">
              {items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    p={4}
                    bg={pathname === item.to ? "var(--rbe-red)" : "white"}
                    color={pathname === item.to ? "white" : "gray.700"}
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    _hover={{ bg: "gray.50" }}
                    transition="all 0.2s"
                    fontWeight="600"
                  >
                    {item.label}
                  </Box>
                </Link>
              ))}

              <Box
                p={4}
                display="flex"
                gap={6}
                justifyContent="center"
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Box
                  as="button"
                  onClick={() => { onDonateClick(); onClose(); }}
                  aria-label="Faire un don"
                >
                  {donateIcon}
                </Box>
                <Box
                  as="button"
                  onClick={() => { onNewsletterClick(); onClose(); }}
                  aria-label="Inscription newsletter"
                >
                  {newsletterIcon}
                </Box>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const handleNewsletterSubmit = async (e) => {
  e.preventDefault();
  if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
    setNewsletterStatus('error');
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
    if (!res.ok) throw new Error('Erreur serveur');
    const json = await res.json();
    if (json.duplicated) {
      setNewsletterStatus('ok'); // On considère OK même si déjà inscrit
    } else {
      setNewsletterStatus('ok');
    }
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus(null), 3000);
  } catch (e) {
    console.error('Newsletter subscribe error:', e);
    setNewsletterStatus('error');
    setTimeout(() => setNewsletterStatus(null), 4000);
  } finally {
    setIsSubmitting(false);
  }
};
