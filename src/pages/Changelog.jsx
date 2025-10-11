import React from "react";
import { Box, Container, Heading, VStack, HStack, Text, Badge, List, ListItem, Divider } from "@chakra-ui/react";
import changelogData from "../data/changelog.json";

export default function Changelog() {
  return (
    <Box py={10} minH="60vh">
      <Container maxW="6xl">
        <Heading as="h1" size="xl" mb={6}>📝 Changelog</Heading>
        <Text mb={4} color="gray.600">
          Toutes les mises à jour récentes du site et de l'API. Les entrées sont classées du plus récent au plus ancien.
        </Text>

        <VStack spacing={6} align="stretch">
          {changelogData && changelogData.length > 0 ? (
            changelogData.map((entry) => (
              <Box key={entry.version} bg="whiteAlpha.800" borderRadius="md" boxShadow="sm" p={4}>
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
                    <ListItem key={i}>
                      <Text as="span" color="gray.700">{c}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))
          ) : (
            <Text color="gray.500">Aucune mise à jour disponible pour le moment.</Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
}