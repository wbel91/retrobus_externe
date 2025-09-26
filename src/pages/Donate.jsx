import { Helmet } from "react-helmet-async";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

export default function Donate(){
  return (
    <>
      <Helmet><title>Adhesion / Don â€” RBE</title></Helmet>
      <Heading as="h1">Adhesion / Don</Heading>
      <Box className="card" mt={6}>
        <Text>Adherer a l association ou faire un don.</Text>
        <Button as="a" href="https://www.helloasso.com/" target="_blank" rel="noreferrer" mt={4} colorScheme="yellow">HelloAsso</Button>
      </Box>
    </>
  );
}
