import React, { useEffect, useState } from "react";
import { Box, Container, Heading, VStack, HStack, Text, Badge, List, ListItem, Divider, Center, Spinner } from "@chakra-ui/react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://attractive-kindness-rbe-serveurs.up.railway.app';

export default function Changelog() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const r = await fetch(`${API_BASE_URL}/public/changelog`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message);
        setItems([]);
      }
    })();
  }, []);

  if (!items) return <Center py={12}><Spinner /></Center>;

  return (
    <Box py={10} minH="60vh">
      <Container maxW="6xl">
        <Heading as="h1" size="xl" mb={6}>📝 Changelog</Heading>
        {error && <Text color="red.500" mb={4}>Erreur: {error}</Text>}
        <VStack spacing={6} align="stretch">
          {items.length > 0 ? items.map(entry => (
            <Box key={`${entry.version}-${entry.date}`} bg="whiteAlpha.800" borderRadius="md" boxShadow="sm" p={4}>
              <HStack justify="space-between" mb={2} alignItems="center">
                <HStack spacing={3}>
                  <Heading size="md">{entry.title}</Heading>
                  <Badge colorScheme="blue">{entry.version}</Badge>
                </HStack>
                <Text fontSize="sm" color="gray.500">{entry.date}</Text>
              </HStack>
              <Divider mb={3} />
              <List spacing={2} pl={4} styleType="disc">
                {(entry.changes || []).map((c, i) => (
                  <ListItem key={i}><Text as="span" color="gray.700">{c}</Text></ListItem>
                ))}
              </List>
            </Box>
          )) : <Text color="gray.500">Aucune mise à jour disponible pour le moment.</Text>}
        </VStack>
      </Container>
    </Box>
  );
}