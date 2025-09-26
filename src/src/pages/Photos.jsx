import { Helmet } from "react-helmet-async";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

export default function Photos(){
  return (
    <>
      <Helmet><title>Photos â€” RBE</title></Helmet>
      <Heading as="h1">Photos</Heading>
      <SimpleGrid columns={{ base:2, md:4 }} spacing={6} mt={6}>
        {[1,2,3,4,5,6,7,8].map(i => (
          <Box key={i} className="card" p={0}>
            <img src={`/assets/photos/p${i}.jpg`} alt={`Photo ${i}`} style={{ width:"100%", display:"block", borderRadius:12 }} />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
