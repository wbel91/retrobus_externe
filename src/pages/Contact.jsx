import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import emailjs from '@emailjs/browser';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  Button,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Configuration EmailJS avec vos vraies clés
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_3io7x5o";
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "templayte";
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "GhgeaI8LyQGYubsHDmHmc";

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
    
    try {
      // Préparation des données pour le template EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'association.rbe@gmail.com',
        reply_to: formData.email
      };

      console.log('📧 Envoi email via EmailJS...', {
        service: EMAILJS_SERVICE_ID,
        template: EMAILJS_TEMPLATE_ID
      });

      // Envoi via EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('✅ Email envoyé avec succès:', result);
      setShowSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      console.error('❌ Erreur EmailJS:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "2px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "4px",
    color: "#2d3748"
  };

  return (
    <>
      <Helmet>
        <title>Contact - Association RétroBus Essonne</title>
        <meta name="description" content="Contactez l'association RétroBus Essonne pour toute question ou partenariat." />
      </Helmet>

      {/* Container PLEINE LARGEUR - IMAGE PLUS MONTÉE */}
      <Box
        position="relative"
        width="100vw"
        height="calc(100vh - var(--header-h) - var(--nav-h) + 100px)"
        marginTop="-100px"
        marginLeft="calc(-50vw + 50%)"
        backgroundImage="url('/assets/photos/p4.jpg')"
        backgroundSize="cover"
        backgroundPosition="center 60%"
        backgroundRepeat="no-repeat"
        overflow="hidden"
      >
        {/* Overlay pour améliorer la lisibilité */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundColor="rgba(0, 0, 0, 0.4)"
          zIndex={1}
        />

        {/* Contenu CENTRÉ */}
        <Box 
          position="relative" 
          zIndex={2}
          width="100%"
          height="100%"
          paddingTop="calc(100px + 1rem)"
          paddingBottom={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          
          {/* Widget formulaire RÉDUIT EN HAUTEUR */}
          <Box
            w={{ base: "90%", md: "480px", lg: "520px" }}
            maxW="520px"
            bg="white"
            borderRadius="lg"
            boxShadow="2xl"
            p={6}
            maxHeight="calc(100vh - var(--header-h) - var(--nav-h) - 4rem)"
            overflowY="auto"
          >
            <VStack spacing={4} align="stretch">
              <Box textAlign="center">
                <Heading as="h1" size="lg" color="var(--rbe-red)" mb={2}>
                  Nous contacter
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Une question ? Un projet ? Écrivez-nous !
                </Text>
              </Box>

              {showSuccess && (
                <Alert status="success" mb={4}>
                  <AlertIcon />
                  Message envoyé avec succès !
                </Alert>
              )}
              
              {showError && (
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <VStack spacing={3} align="stretch">
                  <Box>
                    <label style={labelStyle}>
                      Nom <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      required
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "var(--rbe-red)"}
                      onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </Box>

                  <Box>
                    <label style={labelStyle}>
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      required
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "var(--rbe-red)"}
                      onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </Box>

                  <Box>
                    <label style={labelStyle}>
                      Sujet <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Objet de votre message"
                      required
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "var(--rbe-red)"}
                      onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </Box>

                  <Box>
                    <label style={labelStyle}>
                      Message <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      rows={3}
                      required
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "80px"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--rbe-red)"}
                      onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </Box>

                  <Button
                    type="submit"
                    w="100%"
                    bg="var(--rbe-red)"
                    color="white"
                    size="md"
                    borderRadius="md"
                    isDisabled={isSubmitting}
                    _hover={{ bg: "red.600" }}
                    _disabled={{ bg: "gray.400", cursor: "not-allowed" }}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </VStack>
              </form>

              <Box pt={3} borderTop="1px solid" borderColor="gray.200">
                <Text fontSize="xs" color="gray.500" textAlign="center" mb={2}>
                  Ou contactez-nous directement :
                </Text>
                <VStack spacing={1}>
                  <Text fontSize="sm" fontWeight="600" color="var(--rbe-red)">
                    📧 association.rbe@gmail.com
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    📍 Essonne, France
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Box>

        </Box>
      </Box>
    </>
  );
}