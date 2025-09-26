import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Badge,
  Button,
  VStack,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiArrowLeft } from "react-icons/fi";

// Import des images
import back920 from "../assets/photos/back920.jpg";
import pres920 from "../assets/photos/920_pres.jpg";
import side920 from "../assets/photos/920_side.jpg";
import backImg920 from "../assets/photos/920_back.jpg";

const vehicles = [
  {
    id: "920",
    title: "Mercedes‑Benz Citaro",
    subtitle: "Citaro 1 | € II | ❄️ | ♿",
    make: "Mercedes Benz",
    model: "Citaro",
    year: "2001",
    registration: "FG-920-RE",
    miseEnService: "juillet 2001",
    longueur: "11,95 m",
    places: "96 places (32 assises + 64 debout + 1 UFR)",
    moteur: "Mercedes-Benz OM906hLA - 279 ch",
    puissance: "279 ch",
    transmission: "ZF5HP-502C",
    carburant: "Diesel",
    description:
      "Ce véhicule est un exemple emblématique de la gamme Citaro de première génération. Mis en service commercial en juillet 2001, il représente l'évolution technologique des transports urbains du début des années 2000. Équipé d'une climatisation complète et accessible aux personnes à mobilité réduite.",
    history:
      "Le Mercedes-Benz Citaro est un autobus urbain produit par Daimler AG depuis 1997. Ce modèle a révolutionné les transports publics européens avec son design moderne et ses innovations techniques. Notre exemplaire FG-920-RE a été commandé par Cars Bridet à Wissous pour le réseau du Palladin et mis en service en juillet 2001. Au cours de sa carrière, il a porté successivement les numéros 592, 720, X, puis 920. Il a assuré la desserte Le Palladin jusqu'en août 2014. Après plusieurs années de service fidèle, il est passé brièvement par Brétigny en 2018, puis a rejoint Transdev STRAV à Limeil-Brévannes, avant d'être exploité par Cars Sœur. En mai 2025, ce véhicule historique a trouvé sa place au sein de la collection de l'association RétroBus Essonne, où il témoigne de l'évolution du transport public francilien au début du XXIe siècle.",
    caracteristiques: [
      { label: "Numéros de flotte", value: "592 / 720 / X / 920" },
      { label: "Constructeur", value: "Mercedes-Benz" },
      { label: "Modèle", value: "Citaro ♿" },
      { label: "Immatriculation", value: "FG-920-RE" },
      { label: "Mise en circulation", value: "juillet 2001" },
      { label: "Longueur", value: "11,95 m" },
      { label: "Places assises", value: "32" },
      { label: "Places debout", value: "64" },
      { label: "UFR", value: "1" },
      { label: "Statut", value: "Préservé" },
      { label: "Préservé par", value: "Association RétroBus Essonne" },
      { label: "Énergie", value: "Diesel" },
      { label: "Norme Euro", value: "Euro II" },
      { label: "Moteur", value: "Mercedes-Benz OM906hLA - 279 ch" },
      { label: "Boîte de vitesses", value: "Automatique ZF5HP-502C" },
      { label: "Nombre de portes", value: "2" },
      { label: "Livrée", value: "Grise" },
      { label: "Girouette", value: "Duhamel LED Oranges + Pastilles Vertes" },
      { label: "Climatisation", value: "Complète" },
    ],
    gallery: [
      back920,
      pres920,
      side920,
      backImg920,
    ],
  },
];

export default function VehicleDetails() {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id);
  const [selectedImage, setSelectedImage] = useState(1); // Commence à la 2e image (920_pres.jpg)
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!vehicle) {
    return (
      <Box
        position="relative"
        width="100vw"
        height="calc(100vh - var(--header-h) - var(--nav-h))"
        marginLeft="calc(-50vw + 50%)"
        marginRight="calc(-50vw + 50%)"
        backgroundImage="url('/assets/photos/back920.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box bg="blackAlpha.700" borderRadius="lg" p={8} textAlign="center">
          <Button as={Link} to="/vehicles" leftIcon={<FiArrowLeft />} mb={6} colorScheme="white" variant="outline">
            Retour aux véhicules
          </Button>
          <Heading as="h1" size="2xl" mb={6} color="white">
            Véhicule non trouvé
          </Heading>
          <Text fontSize="lg" color="white">Le véhicule demandé n'existe pas dans notre collection.</Text>
        </Box>
      </Box>
    );
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % (vehicle.gallery.length - 1));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + (vehicle.gallery.length - 1)) % (vehicle.gallery.length - 1));
  };

  // Images de la galerie (sans la première qui sert de fond)
  const galleryImages = vehicle.gallery.slice(1);

  return (
    <Box
      position="relative"
      width="100vw"
      minHeight="calc(100vh - var(--header-h) - var(--nav-h))"
      marginLeft="calc(-50vw + 50%)"
      marginRight="calc(-50vw + 50%)"
      backgroundImage={`url('${vehicle.gallery[0]}')`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      overflow="hidden"
    >
      {/* Overlay sombre pour améliorer la lisibilité */}
      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.600"
        zIndex={1}
      />

      {/* Contenu */}
      <Box position="relative" zIndex={2} py={8}>
        <Container maxW="7xl">
          {/* Navigation */}
          <Button 
            as={Link} 
            to="/vehicles" 
            leftIcon={<FiArrowLeft />} 
            mb={6} 
            colorScheme="whiteAlpha" 
            variant="solid"
            bg="whiteAlpha.200"
            _hover={{ bg: "whiteAlpha.300" }}
            color="white"
          >
            Retour aux véhicules
          </Button>

          {/* En-tête directement sur l'image de fond */}
          <VStack align="start" spacing={4} mb={6}>
            <HStack>
              <Badge colorScheme="blue" fontSize="md" px={3} py={1} bg="blue.500" color="white">
                {vehicle.year}
              </Badge>
              <Badge colorScheme="green" fontSize="md" px={3} py={1} bg="green.500" color="white">
                {vehicle.registration}
              </Badge>
            </HStack>
            <Heading as="h1" size="2xl" color="white" textShadow="2px 2px 4px rgba(0,0,0,0.8)">
              {vehicle.title}
            </Heading>
            <Text fontSize="xl" color="white" fontWeight="medium" textShadow="1px 1px 2px rgba(0,0,0,0.8)">
              {vehicle.subtitle}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
            {/* Galerie photos compacte */}
            <Box>
              <Heading as="h2" size="lg" mb={4} color="white" textShadow="2px 2px 4px rgba(0,0,0,0.8)">
                Photos
              </Heading>
              
              {/* Image principale réduite */}
              <Box position="relative" mb={3}>
                <Image
                  src={galleryImages[selectedImage]}
                  alt={`${vehicle.title} - Photo ${selectedImage + 1}`}
                  borderRadius="md"
                  width="100%"
                  height="200px"
                  objectFit="cover"
                  cursor="pointer"
                  onClick={onOpen}
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.02)" }}
                  border="2px solid white"
                />
                
                {/* Navigation des images */}
                <IconButton
                  position="absolute"
                  left={2}
                  top="50%"
                  transform="translateY(-50%)"
                  icon={<FiChevronLeft />}
                  onClick={prevImage}
                  bg="blackAlpha.600"
                  color="white"
                  _hover={{ bg: "blackAlpha.800" }}
                  size="sm"
                />
                <IconButton
                  position="absolute"
                  right={2}
                  top="50%"
                  transform="translateY(-50%)"
                  icon={<FiChevronRight />}
                  onClick={nextImage}
                  bg="blackAlpha.600"
                  color="white"
                  _hover={{ bg: "blackAlpha.800" }}
                  size="sm"
                />
              </Box>

              {/* Miniatures compactes */}
              <SimpleGrid columns={3} spacing={1}>
                {galleryImages.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Miniature ${index + 1}`}
                    borderRadius="md"
                    height="40px"
                    objectFit="cover"
                    cursor="pointer"
                    border={selectedImage === index ? "2px solid" : "1px solid"}
                    borderColor={selectedImage === index ? "blue.300" : "white"}
                    onClick={() => setSelectedImage(index)}
                    transition="all 0.2s"
                    _hover={{ borderColor: "blue.300" }}
                  />
                ))}
              </SimpleGrid>
            </Box>

            {/* Caractéristiques techniques - plus d'espace */}
            <Box gridColumn={{ base: "1", lg: "2 / 4" }}>
              <Heading as="h2" size="lg" mb={4} color="white" textShadow="2px 2px 4px rgba(0,0,0,0.8)">
                Caractéristiques techniques
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                {vehicle.caracteristiques.map((carac, index) => (
                  <Flex key={index} justify="space-between" py={2} bg="blackAlpha.300" px={4} borderRadius="md">
                    <Text fontWeight="medium" color="white" textShadow="1px 1px 2px rgba(0,0,0,0.8)" fontSize="sm">
                      {carac.label}
                    </Text>
                    <Text color="white" fontWeight="semibold" textShadow="1px 1px 2px rgba(0,0,0,0.8)" fontSize="sm">
                      {carac.value}
                    </Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>
          </SimpleGrid>

          {/* Description et histoire en dessous */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mt={8}>
            <Box>
              <Heading as="h2" size="lg" mb={4} color="white" textShadow="2px 2px 4px rgba(0,0,0,0.8)">
                Description
              </Heading>
              <Box bg="blackAlpha.300" p={6} borderRadius="md">
                <Text fontSize="md" lineHeight="tall" color="white" textShadow="1px 1px 2px rgba(0,0,0,0.8)">
                  {vehicle.description}
                </Text>
              </Box>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="white" textShadow="2px 2px 4px rgba(0,0,0,0.8)">
                Histoire
              </Heading>
              <Box bg="blackAlpha.300" p={6} borderRadius="md">
                <Text fontSize="md" lineHeight="tall" color="white" textShadow="1px 1px 2px rgba(0,0,0,0.8)">
                  {vehicle.history}
                </Text>
              </Box>
            </Box>
          </SimpleGrid>

          {/* Modal pour affichage plein écran */}
          <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent bg="transparent" shadow="none">
              <ModalCloseButton color="white" size="lg" />
              <ModalBody p={0}>
                <Image
                  src={galleryImages[selectedImage]}
                  alt={`${vehicle.title} - Photo ${selectedImage + 1}`}
                  width="100%"
                  height="auto"
                  maxH="90vh"
                  objectFit="contain"
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Box>
    </Box>
  );
}