import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Heading,
  Text,
  Box,
  Image,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import vehicleImage1 from "../assets/920_pres.jpg";
import vehicleImage2 from "../assets/920_side.jpg";
import vehicleImage3 from "../assets/920_back.jpg";

const vehicles = [
  {
    id: "920",
    title: "Mercedes‑Benz Citaro",
    subtitle: "Citaro 1 €2",
    make: "Mercedes Benz",
    model: "Citaro 1 €2",
    year: "juillet 2001",
    registration: "FG-920-RE",
    description:
      "Mise en service commerciale en juillet 2001. Ce véhicule est un exemple emblématique de la gamme Citaro.",
    history:
      "Le Mercedes-Benz Citaro est un autobus urbain produit par Daimler AG. Introduit en 1997, il est devenu un standard dans les transports publics européens. Ce modèle, mis en service en juillet 2001, a servi dans plusieurs villes avant d'être préservé par l'association RétroBus Essonne.",
    gallery: [vehicleImage1, vehicleImage2, vehicleImage3],
  },
];

export default function Vehicles() {
  return (
    <>
      <Helmet>
        <title>Véhicules — RétroBus Essonne</title>
        <meta name="description" content="Liste des véhicules de RétroBus Essonne" />
      </Helmet>

      <Container maxW="6xl" py={{ base: 6, md: 10 }}>
        <Heading as="h1" size="2xl" mb={6}>
          Nos Véhicules
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {vehicles.map((vehicle) => (
            <Box
              key={vehicle.id}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              overflow="hidden"
              p={4}
            >
              <Image
                src={vehicle.gallery[0]}
                alt={vehicle.title}
                objectFit="cover"
                mb={4}
              />
              <Heading as="h2" size="md" mb={2}>
                {vehicle.title}
              </Heading>
              <Text color="gray.600" mb={4}>
                {vehicle.subtitle}
              </Text>
              {console.log(`/vehicles/${vehicle.id}`)}
              <Link to={`/vehicles/${vehicle.id}`}>
                <Button colorScheme="teal">Voir les détails</Button>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
