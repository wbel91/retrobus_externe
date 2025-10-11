﻿import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Heading,
  Text,
  Box,
  Image,
  SimpleGrid,
  Button,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import vehicleImage1 from "../assets/920_pres.jpg";

const API_BASE = import.meta.env.VITE_API_URL || 'https://attractive-kindness-rbe-serveurs.up.railway.app';

// Images par défaut pour les véhicules
const defaultImages = {
  "920": [vehicleImage1],
};

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/public/vehicles`);
      if (!response.ok) {
        throw new Error('Impossible de charger les véhicules');
      }
      const data = await response.json();
      setVehicles(data);
    } catch (err) {
      console.error('Erreur chargement véhicules:', err);
      setError(err.message);
      // fallback statique
      setVehicles([
        {
          parc: "920",
          immat: "FG-920-RE",
          modele: "Mercedes-Benz Citaro",
          type: "Bus",
          etat: "Préservé",
          miseEnCirculation: "2001-07-01"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxW="6xl" py={{ base: 6, md: 10 }} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Chargement des véhicules...</Text>
      </Container>
    );
  }

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

        {error && (
          <Alert status="warning" mb={6}>
            <AlertIcon />
            Données en mode hors ligne. {error}
          </Alert>
        )}

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {vehicles.map((vehicle) => (
            <Box
              key={vehicle.parc}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              overflow="hidden"
              p={4}
              bg="white"
              shadow="sm"
              _hover={{ shadow: "md" }}
              transition="all 0.2s"
            >
              <Image
                src={defaultImages[vehicle.parc]?.[0] || vehicleImage1}
                alt={vehicle.modele}
                objectFit="cover"
                w="100%"
                h="200px"
                mb={4}
                borderRadius="md"
              />
              
              <Heading as="h2" size="md" mb={2}>
                {vehicle.modele}
              </Heading>
              
              <Text color="gray.600" fontSize="sm" mb={1}>
                <strong>Parc:</strong> {vehicle.parc}
              </Text>
              
              <Text color="gray.600" fontSize="sm" mb={1}>
                <strong>Immatriculation:</strong> {vehicle.immat || "Non renseignée"}
              </Text>
              
              <Text color="gray.600" fontSize="sm" mb={1}>
                <strong>État:</strong> {vehicle.etat}
              </Text>
              
              {vehicle.miseEnCirculation && (
                <Text color="gray.600" fontSize="sm" mb={4}>
                  <strong>Mise en circulation:</strong> {new Date(vehicle.miseEnCirculation).getFullYear()}
                </Text>
              )}

              <Link to={`/vehicles/${vehicle.parc}`}>
                <Button colorScheme="teal" size="sm">
                  Voir les détails
                </Button>
              </Link>
              
              {vehicle.synced_from === 'intranet' && (
                <Text fontSize="xs" color="green.500" mt={2}>
                  🔄 Synchronisé depuis l'intranet
                </Text>
              )}
            </Box>
          ))}
        </SimpleGrid>

        {vehicles.length === 0 && !loading && (
          <Text textAlign="center" color="gray.500" py={8}>
            Aucun véhicule disponible pour le moment.
          </Text>
        )}
      </Container>
    </>
  );
}
