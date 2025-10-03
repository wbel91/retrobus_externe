import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Box, Container, Heading, Text, VStack, Button, Badge, HStack, 
  Spinner, Center, Alert, AlertIcon 
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Événements de fallback pour le développement
const fallbackEvents = [
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
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/public/events`);
        if (!response.ok) {
          throw new Error('Impossible de charger les événements');
        }
        
        const data = await response.json();
        
        // Filtrer seulement les événements publiés
        const publishedEvents = data.filter(event => event.status === 'PUBLISHED');
        
        // Normaliser les dates
        const normalizedEvents = publishedEvents.map(event => ({
          ...event,
          date: (typeof event.date === 'string') ? event.date.substring(0, 10) : event.date
        }));
        
        setEvents(normalizedEvents);
      } catch (e) {
        console.warn('Fallback événements (raison:', e.message, ')');
        setError(e.message);
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

        {loading ? (
          <Center py={16}>
            <Spinner size="xl" />
          </Center>
        ) : error && events === fallbackEvents ? (
          <Alert status="warning" mb={6}>
            <AlertIcon />
            Utilisation des données de démonstration (API non disponible)
          </Alert>
        ) : null}

        <VStack spacing={10} align="stretch">
          {events && events.length === 0 ? (
            <Box p={8} textAlign="center" bg="gray.50" borderRadius="lg">
              <Text fontSize="lg" color="gray.600">
                Aucun événement programmé pour le moment.
              </Text>
              <Text fontSize="md" color="gray.500" mt={2}>
                Revenez bientôt pour découvrir nos prochaines sorties !
              </Text>
            </Box>
          ) : (
            events?.map(event => (
              <Box key={event.id} p={8} bg="orange.50" borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="lg" color="orange.700" mb={2}>
                  {event.title}
                </Heading>
                <HStack spacing={4} mb={2}>
                  <Badge colorScheme="orange">{event.date}</Badge>
                  {event.time && <Badge colorScheme="blue">{event.time}</Badge>}
                </HStack>
                {event.location && (
                  <Text fontSize="md" color="gray.700" mb={2}>
                    📍 {event.location}
                  </Text>
                )}
                {event.description && (
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    {event.description}
                  </Text>
                )}
                <HStack spacing={8} mb={4}>
                  {event.adultPrice !== undefined && event.adultPrice !== null && (
                    <Text fontWeight="bold" color="green.700">
                      Adulte : {event.adultPrice}€
                    </Text>
                  )}
                  {event.childPrice !== undefined && event.childPrice !== null && (
                    <Text fontWeight="bold" color="green.700">
                      Enfant (-12 ans) : {event.childPrice}€
                    </Text>
                  )}
                </HStack>
                
                {event.helloAssoUrl ? (
                  <Button
                    as="a"
                    href={event.helloAssoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    colorScheme="orange"
                    size="lg"
                  >
                    S'inscrire sur HelloAsso
                  </Button>
                ) : (
                  <Button
                    as={RouterLink}
                    to={`/evenement/${event.id}/inscription?title=${encodeURIComponent(event.title)}&date=${event.date}&time=${event.time || ''}&location=${encodeURIComponent(event.location || '')}&adultPrice=${event.adultPrice ?? ''}&childPrice=${event.childPrice ?? ''}`}
                    colorScheme="orange"
                    size="lg"
                  >
                    S'inscrire
                  </Button>
                )}
              </Box>
            ))
          )}
        </VStack>
      </Container>
    </>
  );
}
