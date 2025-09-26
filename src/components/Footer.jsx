import { Container, SimpleGrid, Text, Link as CLink, Image } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="site-footer" style={{ marginTop: "60px" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} style={{ flex: 1 }}>
            <div>
              {/* Association (désormais en premier) */}
              <Text fontWeight={700} color="white">
                Association RétroBus Essonne
              </Text>
              <Text fontSize="sm" opacity={0.8} color="white">
                Patrimoine des transports en Essonne.
              </Text>

              {/* Bloc nos soutiens déplacé sous l'association */}
              <div style={{ marginTop: "18px" }}>
                <Text
                  fontWeight={700}
                  fontSize="sm"
                  color="white"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                >
                  Nos soutiens
                </Text>
                <CLink
                  href="https://www.cars-soeur.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Cars Soeur – Mobilité éco-responsable"
                  display="inline-block"
                >
                  <Image
                    src="/supporters/cars-soeur.png"
                    alt="Cars Soeur – soutien"
                    maxH="48px"
                    maxW="200px"
                    loading="lazy"
                    decoding="async"
                    style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.4))" }}
                    fallback={<Text fontSize="xs" color="whiteAlpha.700">Cars Soeur</Text>}
                  />
                </CLink>
              </div>
            </div>

            <div>
              <Text fontWeight={700} color="white">
                Liens utiles
              </Text>
              <CLink href="/statuts.pdf" color="white">
                Statuts
              </CLink>
              <br />
              <CLink href="/rgpd.pdf" color="white">
                Mentions légales & RGPD
              </CLink>
            </div>

            <div>
              <Text fontWeight={700} color="white">
                Contact
              </Text>
              <Text fontSize="sm" color="white">
                association.rbe@gmail.com
              </Text>
            </div>
          </SimpleGrid>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/AssociationRBE/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{ transform: "translateY(20px) translateX(40px)" }}
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/asso.rbe/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ transform: "translateY(20px) translateX(40px)" }}
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@asso_rbe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              style={{ transform: "translateY(20px) translateX(40px)" }}
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        <Text mt={6} fontSize="xs" opacity={0.6} textAlign="center" color="white">
          &copy; {new Date().getFullYear()} RetroBus Essonne - Tous droits réservés.
        </Text>
      </Container>
    </footer>
  );
}
