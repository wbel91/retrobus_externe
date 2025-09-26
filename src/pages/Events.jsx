import { Helmet } from "react-helmet-async";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

const eventsList = [];

export default function Events() {
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
          <Box p={8} textAlign="center" bg="gray.50" borderRadius="lg">
            <Text fontSize="lg" color="gray.600">
              Aucun événement programmé pour le moment.
            </Text>
            <Text fontSize="md" color="gray.500" mt={2}>
              Revenez bientôt pour découvrir nos prochaines sorties !
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
