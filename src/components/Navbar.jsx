import React, { useState } from "react";
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
  useDisclosure,
  useBreakpointValue
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const items = [
    { to: "/", label: "Accueil" },
    { to: "/parc", label: "Parc de Véhicules" },
    { to: "/evenements", label: "Événements" },
    { to: "/retromerch", label: "RétroMerch" },
    { to: "/contact", label: "Contact" },
    { to: "/donate", label: "💝 Nous faire un don", special: true }, // Ajout du don
  ];

  // Version Desktop (original)
  if (!isMobile) {
    return (
      <nav className="site-nav" aria-label="Navigation principale">
        <div className="site-nav__inner">
          {items.filter(item => !item.special).map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={`nav-btn ${pathname === it.to ? "active" : ""}`}
              aria-current={pathname === it.to ? "page" : undefined}
            >
              {it.label}
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  // Version Mobile
  return (
    <>
      {/* Menu Hamburger à DROITE */}
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

      {/* Drawer Mobile depuis la DROITE */}
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
                    color={pathname === item.to ? "white" : item.special ? "var(--rbe-red)" : "gray.700"}
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    _hover={{ bg: item.special ? "red.50" : "gray.50" }}
                    transition="all 0.2s"
                    fontWeight={item.special ? "700" : "600"}
                    fontSize={item.special ? "lg" : "md"}
                  >
                    {item.label}
                  </Box>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
