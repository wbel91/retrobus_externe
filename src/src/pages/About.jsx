import { Helmet } from "react-helmet-async";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function About(){
  return (
    <>
      <Helmet><title>A propos & Contact â€” RBE</title></Helmet>
      <Heading as="h1">A propos & Contact</Heading>
      <Box className="card" mt={6}>
        <Text mb={3}>Association loi 1901 basee en Essonne.</Text>
        <Text>Email : contact@retrobus-essonne.fr</Text>
        <Text>Instagram : @tc_essonnes</Text>
      </Box>
    </>
  );
}
