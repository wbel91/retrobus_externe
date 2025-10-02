import React, { useEffect, useState } from "react";
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
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiArrowLeft } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

function resolve(src) {
  if (!src) return src;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return API_BASE_URL + src;
  return API_BASE_URL + '/' + src;
}

// __HERO_VERSION_ACTIVE__ - Version HERO plein écran avec overlay et background
export default function VehicleDetails() {
  console.log("__HERO_VERSION_ACTIVE__ - Version HERO chargée");
  
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let abort = false;
    setLoading(true);
    fetch(`${API_BASE_URL}/public/vehicles/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(data => {
        if (abort) return;
        setVehicle(data);
      })
      .catch(e => {
        if (!abort) setError(e.message);
      })
      .finally(() => !abort && setLoading(false));
    return () => { abort = true; };
  }, [id]);

  if (loading) {
    return <Center h="60vh"><Spinner size="xl" color="blue.400" /></Center>;
  }

  if (error || !vehicle) {
    return (
      <Box
        position="relative"
        width="100vw"
        height="calc(100vh - var(--header-h) - var(--nav-h))"
        marginLeft="calc(-50vw + 50%)"
        marginRight="calc(-50vw + 50%)"
        backgroundImage="url('/assets/photos/920_back.jpg')"
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

  // Normaliser les données du véhicule
  const gallery = Array.isArray(vehicle.gallery) && vehicle.gallery.length > 0
    ? vehicle.gallery.map(resolve)
    : [resolve('/assets/photos/920_back.jpg')];

  // Images de la galerie (sans la première qui sert de fond)
  const galleryImages = gallery.slice(1);
  const fullTitle = vehicle.marque ? `${vehicle.marque} ${vehicle.modele}` : vehicle.modele;
  const miseEnCirc = vehicle.miseEnCirculation
    ? new Date(vehicle.miseEnCirculation).getFullYear()
    : null;

  // Déterminer l'image de fond (backgroundImage ou première de la galerie)
  const backgroundImage = resolve(vehicle.backgroundImage || gallery[0]);
  const backgroundPosition = vehicle.backgroundPosition || 'center';

  const nextImage = () => {
    if (galleryImages.length === 0) return;
    setSelectedImage(i => (i + 1) % galleryImages.length);
  };

  const prevImage = () => {
    if (galleryImages.length === 0) return;
    setSelectedImage(i => (i - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <Box
      position="relative"
      width="100vw"
      minHeight="calc(100vh - var(--header-h) - var(--nav-h))"
      marginLeft="calc(-50vw + 50%)"
      marginRight="calc(-50vw + 50%)"
      backgroundImage={`url('${backgroundImage}')`}
      backgroundSize="cover"
      backgroundPosition={backgroundPosition}
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
              {miseEnCirc && (
                <Badge colorScheme="blue" fontSize="md" px={3} py={1} bg="blue.500" color="white">
                  {miseEnCirc}
                </Badge>
              )}
              {vehicle.immat && (
                <Badge colorScheme="green" fontSize="md" px={3} py={1} bg="green.500" color="white">
                  {vehicle.immat}
                </Badge>
              )}
              {vehicle.etat && (
                <Badge colorScheme="orange" fontSize="md" px={3} py={1} bg="orange.500" color="white">
                  {vehicle.etat}
                </Badge>
              )}
            </HStack>
            <Heading as="h1" size="2xl" color="white" textShadow="2px 2px 4px rgba(0,0,0,0.8)">
              {fullTitle}
            </Heading>
            {vehicle.subtitle && (
              <Text fontSize="xl" color="white" fontWeight="medium" textShadow="1px 1px 2px rgba(0,0,0,0.8)">
                {vehicle.subtitle}
              </Text>
            )}
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
            {/* Galerie photos compacte */}
            <Box>
              <Heading as="h2" size="lg" mb={4} color="white" textShadow="2px 2px 4px rgba(0,0,0,0.8)">
                Photos
              </Heading>
              
              {/* Image principale réduite */}
              {galleryImages.length > 0 && (
                <Box position="relative" mb={3}>
                  <Image
                    src={galleryImages[selectedImage]}
                    alt={`${fullTitle} - Photo ${selectedImage + 1}`}
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
                  {galleryImages.length > 1 && (
                    <>
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
                        aria-label="Image précédente"
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
                        aria-label="Image suivante"
                      />
                    </>
                  )}
                </Box>
              )}

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
                {Array.isArray(vehicle.caracteristiques) && vehicle.caracteristiques.map((carac, index) => (
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
            {vehicle.description && (
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
            )}

            {vehicle.history && (
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
            )}
          </SimpleGrid>

          {/* Modal pour affichage plein écran */}
          <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent bg="transparent" shadow="none">
              <ModalCloseButton color="white" size="lg" />
              <ModalBody p={0}>
                {galleryImages[selectedImage] && (
                  <Image
                    src={galleryImages[selectedImage]}
                    alt={`${fullTitle} - Photo agrandie`}
                    width="100%"
                    height="auto"
                    maxH="90vh"
                    objectFit="contain"
                  />
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Box>
    </Box>
  );
}