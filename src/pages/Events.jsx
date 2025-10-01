import { Helmet } from "react-helmet-async";
import { Box, Container, Heading, Text, VStack, Button, Badge, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const eventsList = [
  {
    id: "halloween2025",
    title: "RétroWouh ! Halloween",
    date: "2025-10-31",
    time: "20:00",
    location: "Salle des Fêtes de Villebon",
    adultPrice: 15,
    childPrice: 8,
    description: "Soirée spéciale Halloween avec animations, musique et surprises !",
  },
];

export default function Events() {
  console.log("eventData", eventsList);
  
  return (
    <>
      <Helmet>
        <title>Événements - Association RétroBus Essonne</title>
        <meta name="description" content="Découvrez les prochains événements, sorties et expositions de l'association RétroBus Essonne." />
      </Helmet>

      <Container maxW="container.lg" py={10}>
        <VStack spacing={4} mb={12} textAlign="center">
          <Heading as="h1" size="2xl">
            Nos Événements
          </Heading>
          <Text fontSize="lg" color="gray.600">
            L'agenda de nos prochaines sorties et manifestations.
          </Text>
        </VStack>

        <VStack spacing={10} align="stretch">
          {eventsList.length === 0 ? (
            <Box p={8} textAlign="center" bg="gray.50" borderRadius="lg">
              <Text fontSize="lg" color="gray.600">
                Aucun événement programmé pour le moment.
              </Text>
              <Text fontSize="md" color="gray.500" mt={2}>
                Revenez bientôt pour découvrir nos prochaines sorties !
              </Text>
            </Box>
          ) : (
            eventsList.map(event => (
              <Box key={event.id} p={8} bg="orange.50" borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="lg" color="orange.700" mb={2}>
                  {event.title}
                </Heading>
                <HStack spacing={4} mb={2}>
                  <Badge colorScheme="orange">{event.date}</Badge>
                  <Badge colorScheme="blue">{event.time}</Badge>
                </HStack>
                <Text fontSize="md" color="gray.700" mb={2}>
                  📍 {event.location}
                </Text>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  {event.description}
                </Text>
                <HStack spacing={8} mb={4}>
                  <Text fontWeight="bold" color="green.700">
                    Adulte : {event.adultPrice}€
                  </Text>
                  <Text fontWeight="bold" color="green.700">
                    Enfant (-12 ans) : {event.childPrice}€
                  </Text>
                </HStack>
                <Button
                  as={RouterLink}
                  to={`/evenement/${event.id}/inscription?title=${encodeURIComponent(event.title)}&date=${event.date}&time=${event.time}&location=${encodeURIComponent(event.location)}&adultPrice=${event.adultPrice}&childPrice=${event.childPrice}`}
                  colorScheme="orange"
                  size="lg"
                >
                  S'inscrire
                </Button>
              </Box>
            ))
          )}
        </VStack>
      </Container>
    </>
  );
}
