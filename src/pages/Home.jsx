import { Helmet } from "react-helmet-async";
import {
  Box, Button, Container, Heading, SimpleGrid, Stack, Text, Image, VStack
} from "@chakra-ui/react";
import pageBg from "../assets/logo_arriere_plan.svg";
import heroImg from "../assets/photos/ma-photo-hero.jpg";

const photos = [
  "/assets/photos/p1.jpg",
  "/assets/photos/p2.jpg",
  "/assets/photos/p3.jpg",
  "/assets/photos/p4.jpg",
  "/assets/photos/p5.jpg",
  "/assets/photos/p6.jpg",
  "/assets/photos/p7.jpg",
  "/assets/photos/p8.jpg",
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Association RétroBus Essonne - Patrimoine Transport Francilien | Accueil</title>
        <meta
          name="description"
          content="Association RétroBus Essonne : préservation, restauration et mise en valeur des autobus historiques franciliens. Découvrez notre collection, nos sorties et notre passion pour le patrimoine des transports RATP."
        />
        <meta 
          name="keywords" 
          content="RétroBus Essonne, patrimoine transport, autobus historique, RATP vintage, Mercedes Citaro, transport francilien, restauration véhicules, sorties patrimoine, association 1901, bus collection"
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Association RétroBus Essonne - Patrimoine Transport Francilien" />
        <meta property="og:description" content="Préservation et restauration des autobus historiques franciliens. Découvrez notre collection et rejoignez nos sorties patrimoine." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://retrobus-essonne.fr" />
        <meta property="og:image" content="https://retrobus-essonne.fr/assets/photos/ma-photo-hero.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Association RétroBus Essonne - Patrimoine Transport" />
        <meta name="twitter:description" content="Préservation des autobus historiques franciliens. Collection, restauration et sorties patrimoine." />
        <meta name="twitter:image" content="https://retrobus-essonne.fr/assets/photos/ma-photo-hero.jpg" />
        
        {/* Schema.org pour la page d'accueil */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Accueil - Association RétroBus Essonne",
              "description": "Association de préservation du patrimoine des transports en commun franciliens",
              "url": "https://retrobus-essonne.fr",
              "mainEntity": {
                "@type": "Organization",
                "name": "Association RétroBus Essonne",
                "foundingDate": "1998",
                "description": "Préservation, restauration et mise en valeur des autobus historiques franciliens",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Services de l'association",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Restauration de véhicules historiques",
                        "description": "Restauration complète d'autobus vintage"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Sorties patrimoine",
                        "description": "Balades et expositions avec nos véhicules historiques"
                      }
                    }
                  ]
                }
              }
            }
          `}
        </script>
      </Helmet>

      <Box
        className="page-with-mark home-landing"   // ← ajout de la classe home-landing
        style={{
          "--page-mark": `url(${pageBg})`,
          "--mark-size": "560px",
          "--mark-opacity": "0.06",
          "--mark-blend": "normal",
        }}
        data-pos-x="left"
        data-pos-y="bottom"
      >
        {/* HERO: full-width with optional dev image picker (visible in dev) */}
        <Box
          as="section"
          className="full-bleed hero"
          style={{
            backgroundImage: `url(${heroImg})`,
            '--hero-pos-y': '0%',
          }}
        >
          <div className="hero-content">
            <div className="hero-box">
              <Heading as="h1" size="2xl" lineHeight="1.05">
                Préserver & partager le patrimoine autobus en Essonne
              </Heading>
              <Text mt={4} fontSize="lg" color="whiteAlpha.800">
                RétroBus Essonne restaure des autobus emblématiques, organise des sorties et des
                animations pour faire découvrir l'histoire des transports.
              </Text>
              <Stack 
                direction="column"
                spacing={4} 
                mt={6} 
                alignItems="flex-end"
              >
                <Button 
                  as="a" 
                  href="/parc" 
                  size="lg" 
                  bg="var(--rbe-red)"
                  color="white"
                  _hover={{ opacity: 0.9 }}
                >
                  Découvrir nos véhicules
                </Button>
                <Button 
                  as="a" 
                  href="/contact"
                  size="lg" 
                  variant="outline" 
                  color="white" 
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  Nous contacter
                </Button>
              </Stack>
            </div>
          </div>
        </Box>

        <Container maxW="7xl" py={10}>
          {/* QUI SOMMES-NOUS */}
          <section id="a-propos">
            <Heading as="h2" size="xl" mb={6} textAlign="center">Qui sommes-nous ?</Heading>
            <VStack spacing={6} align="stretch">
              <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="center">
                <strong>L'Association RétroBus Essonne</strong> est une association à but non lucratif régie par la loi 1901, 
                créée par des passionnés de transport en commun et du patrimoine roulant historique.
              </Text>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={8}>
                <Box p={6} bg="gray.50" borderRadius="lg" borderLeft="4px solid" borderLeftColor="var(--rbe-red)">
                  <Heading as="h3" size="md" mb={4} color="var(--rbe-red)">🎯 Notre mission</Heading>
                  <Text>
                    Préserver, restaurer et faire revivre le patrimoine des transports publics franciliens. 
                    Nous collectionnons et remettons en état des véhicules emblématiques qui ont marqué 
                    l'histoire des transports en Île-de-France.
                  </Text>
                </Box>
                
                <Box p={6} bg="gray.50" borderRadius="lg" borderLeft="4px solid" borderLeftColor="var(--rbe-red)">
                  <Heading as="h3" size="md" mb={4} color="var(--rbe-red)">🚍 Notre passion</Heading>
                  <Text>
                    Depuis notre création, nous nous attachons à sauvegarder des autobus et autocars 
                    qui ont servi les voyageurs franciliens. Chaque véhicule raconte une histoire 
                    et témoigne de l'évolution technologique du transport public.
                  </Text>
                </Box>
                
                <Box p={6} bg="gray.50" borderRadius="lg" borderLeft="4px solid" borderLeftColor="var(--rbe-red)">
                  <Heading as="h3" size="md" mb={4} color="var(--rbe-red)">👥 Notre équipe</Heading>
                  <Text>
                    Une équipe de bénévoles passionnés : mécaniciens, carrossiers, électriciens, 
                    historiens et amateurs éclairés. Ensemble, nous redonnons vie à ces témoins 
                    du patrimoine roulant avec le souci du détail et de l'authenticité.
                  </Text>
                </Box>
                
                <Box p={6} bg="gray.50" borderRadius="lg" borderLeft="4px solid" borderLeftColor="var(--rbe-red)">
                  <Heading as="h3" size="md" mb={4} color="var(--rbe-red)">🌟 Notre engagement</Heading>
                  <Text>
                    Transmettre la mémoire des transports aux nouvelles générations à travers 
                    des sorties, des expositions et des animations. Nous croyons que ce patrimoine 
                    doit être vivant et accessible à tous.
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>
          </section>

          {/* NOS ACTIVITÉS */}
          <section style={{ marginTop: "60px" }}>
            <Heading as="h2" size="xl" textAlign="center" mb={6}>Nos activités</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <Box p={6} border="1px solid" borderColor="blackAlpha.200" borderRadius="xl" bg="white" boxShadow="sm">
                <Heading as="h3" size="md" mb={3} color="var(--rbe-red)">🚍 Préservation</Heading>
                <Text>Restauration complète, entretien régulier et documentation historique de véhicules emblématiques du transport francilien.</Text>
              </Box>
              <Box p={6} border="1px solid" borderColor="blackAlpha.200" borderRadius="xl" bg="white" boxShadow="sm">
                <Heading as="h3" size="md" mb={3} color="var(--rbe-red)">🚌 Sorties & événements</Heading>
                <Text>Balades touristiques, expositions publiques, journées du patrimoine et animations pour faire découvrir notre collection.</Text>
              </Box>
              <Box p={6} border="1px solid" borderColor="blackAlpha.200" borderRadius="xl" bg="white" boxShadow="sm">
                <Heading as="h3" size="md" mb={3} color="var(--rbe-red)">📚 Archives & mémoire</Heading>
                <Text>Constitution d'une photothèque, collecte de témoignages et sauvegarde des documents techniques d'époque.</Text>
              </Box>
            </SimpleGrid>
          </section>

          {/* NOS VÉHICULES (GALERIE SIMPLE) */}
          <section style={{ marginTop: "60px" }}>
            <Heading as="h2" size="xl" textAlign="center" mb={4}>Nos véhicules</Heading>
            <Text textAlign="center" color="gray.600" mb={8} fontSize="lg">
              Un aperçu de notre collection (découvrez la liste complète dans la rubrique Parc).
            </Text>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              {photos.map((src, i) => (
                <Box
                  key={i}
                  border="1px solid"
                  borderColor="blackAlpha.200"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="blackAlpha.50"
                  transition="all 0.3s ease"
                  _hover={{ 
                    transform: "translateY(-4px)", 
                    boxShadow: "lg",
                    borderColor: "var(--rbe-red)"
                  }}
                >
                  <Image
                    src={src}
                    alt={`Bus RétroBus Essonne ${i + 1} - Collection patrimoine transport`}
                    w="100%"
                    h={{ base: "100px", md: "140px" }}
                    objectFit="cover"
                    loading="lazy"
                  />
                </Box>
              ))}
            </SimpleGrid>
            
            <Box textAlign="center" mt={8}>
              <Button 
                as="a" 
                href="/parc" 
                size="lg" 
                bg="var(--rbe-red)" 
                color="white"
                _hover={{ opacity: 0.9 }}
              >
                Voir tous nos véhicules
              </Button>
            </Box>
          </section>
        </Container>
      </Box>
    </>
  );
}
