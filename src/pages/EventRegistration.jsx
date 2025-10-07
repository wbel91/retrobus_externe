import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  Image,
  HStack,
  Badge,
  useToast,
  Alert,
  AlertIcon,
  Divider,
  Icon,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid
} from "@chakra-ui/react";
import { FiArrowLeft, FiCalendar, FiMapPin, FiUsers, FiGift, FiExternalLink, FiMail, FiUser } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function EventRegistration() {
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'processing', 'success'
  const [registrationId, setRegistrationId] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [formData, setFormData] = useState({
    participantName: '',
    participantEmail: '',
    adultTickets: 1,
    childTickets: 0
  });
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  // Récupération des détails de l'événement
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        console.log(`🔍 Fetching event details for ID: ${eventId}`);
        
        const response = await fetch(`${API_BASE_URL}/public/events/${eventId}`);
        if (!response.ok) {
          throw new Error(`Événement non trouvé (${response.status})`);
        }
        
        const eventData = await response.json();
        console.log('📅 Event details:', eventData);
        
        // Vérifier si l'événement est accessible publiquement
        const extras = eventData.extras ? JSON.parse(eventData.extras) : {};
        if (!extras.isVisible) {
          throw new Error('Cet événement n\'est pas accessible publiquement');
        }
        
        setEvent(eventData);
      } catch (e) {
        console.error('❌ Error fetching event:', e);
        setError(e.message);
        
        // Fallback avec les paramètres URL
        if (searchParams.get('title')) {
          console.log('📝 Using URL parameters as fallback');
          setEvent({
            id: eventId,
            title: searchParams.get('title'),
            date: searchParams.get('date'),
            time: searchParams.get('time'),
            location: searchParams.get('location'),
            adultPrice: parseFloat(searchParams.get('adultPrice')) || null,
            childPrice: parseFloat(searchParams.get('childPrice')) || null,
            description: 'Détails non disponibles',
            extras: JSON.stringify({
              isVisible: true,
              requiresRegistration: true,
              allowPublicRegistration: true,
              isFree: false
            })
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId, searchParams]);

  // Vérification périodique du statut de l'inscription
  useEffect(() => {
    if (registrationId && registrationStep === 'processing') {
      const checkStatus = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/registrations/${registrationId}/status`);
          if (response.ok) {
            const status = await response.json();
            console.log('📊 Registration status:', status);
            
            if (status.status === 'VALIDATED' && status.ticketSent) {
              setTicketData(status);
              setRegistrationStep('success');
            }
          }
        } catch (e) {
          console.error('Erreur vérification statut:', e);
        }
      };

      // Vérifier toutes les 5 secondes
      const interval = setInterval(checkStatus, 5000);
      
      // Vérification initiale après 2 secondes
      setTimeout(checkStatus, 2000);

      return () => clearInterval(interval);
    }
  }, [registrationId, registrationStep]);

  const getEventTypeInfo = (event) => {
    try {
      const extras = event.extras ? JSON.parse(event.extras) : {};
      return {
        isVisible: extras.isVisible !== false,
        requiresRegistration: extras.requiresRegistration || false,
        allowPublicRegistration: extras.allowPublicRegistration || false,
        isFree: extras.isFree || (!event.adultPrice && !event.childPrice),
        registrationMethod: extras.registrationMethod || 'internal'
      };
    } catch (e) {
      return {
        isVisible: true,
        requiresRegistration: true,
        allowPublicRegistration: true,
        isFree: !event.adultPrice && !event.childPrice,
        registrationMethod: 'internal'
      };
    }
  };

  const calculateTotal = () => {
    if (!event) return 0;
    const adultPrice = event.adultPrice || 0;
    const childPrice = event.childPrice || 0;
    return (adultPrice * formData.adultTickets) + (childPrice * formData.childTickets);
  };

  const handleSubmitRegistration = async () => {
    if (!formData.participantName.trim() || !formData.participantEmail.trim()) {
      toast({
        status: "error",
        title: "Champs obligatoires",
        description: "Veuillez remplir votre nom et email."
      });
      return;
    }

    if (formData.adultTickets + formData.childTickets === 0) {
      toast({
        status: "error",
        title: "Nombre de billets",
        description: "Veuillez sélectionner au moins un billet."
      });
      return;
    }

    try {
      setSubmitting(true);
      const eventInfo = getEventTypeInfo(event);
      
      const registrationData = {
        eventId: event.id,
        participantName: formData.participantName,
        participantEmail: formData.participantEmail,
        adultTickets: formData.adultTickets,
        childTickets: formData.childTickets,
        paymentMethod: eventInfo.isFree ? 'free' : 
                      (eventInfo.registrationMethod === 'helloasso' ? 'helloasso' : 'internal')
      };

      console.log('📝 Submitting registration:', registrationData);

      const response = await fetch(`${API_BASE_URL}/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'inscription (${response.status})`);
      }

      const result = await response.json();
      console.log('✅ Registration created:', result);

      setRegistrationId(result.registrationId);

      // Si HelloAsso, rediriger vers la plateforme
      if (result.helloAssoUrl && registrationData.paymentMethod === 'helloasso') {
        console.log('🔗 Redirecting to HelloAsso:', result.helloAssoUrl);
        setRegistrationStep('processing');
        
        toast({
          status: "info",
          title: "Redirection vers HelloAsso",
          description: "Vous allez être redirigé pour finaliser le paiement.",
          duration: 3000
        });
        
        // Rediriger après un court délai
        setTimeout(() => {
          window.open(result.helloAssoUrl, '_blank', 'noopener,noreferrer');
        }, 1000);
        
      } else {
        // Inscription gratuite ou interne - passage direct au succès
        setRegistrationStep('processing');
        
        // Simuler un court délai pour la génération du billet
        setTimeout(() => {
          setTicketData({
            id: result.registrationId,
            status: 'VALIDATED',
            ticketSent: true,
            event: event,
            qrCode: JSON.stringify({
              registrationId: result.registrationId,
              validationCode: `RBE-${Date.now()}`
            })
          });
          setRegistrationStep('success');
        }, 2000);
      }

    } catch (e) {
      console.error('❌ Registration error:', e);
      toast({
        status: "error",
        title: "Erreur d'inscription",
        description: e.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  const generateQRCodeUrl = (data) => {
    const encodedData = encodeURIComponent(data);
    return `https://api.qrserver.com/v1/create-qr-code/?size=512x512&format=png&data=${encodedData}`;
  };

  if (loading) {
    return (
      <Container maxW="container.md" py={10}>
        <VStack spacing={4}>
          <Spinner size="xl" />
          <Text>Chargement des détails de l'événement...</Text>
        </VStack>
      </Container>
    );
  }

  if (error && !event) {
    return (
      <Container maxW="container.md" py={10}>
        <VStack spacing={4}>
          <Alert status="error">
            <AlertIcon />
            <VStack align="start">
              <Text fontWeight="bold">Événement non accessible</Text>
              <Text fontSize="sm">{error}</Text>
            </VStack>
          </Alert>
          <Button as={Link} to="/events" leftIcon={<FiArrowLeft />} colorScheme="blue">
            Retour aux événements
          </Button>
        </VStack>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxW="container.md" py={10}>
        <VStack spacing={4}>
          <Text fontSize="lg" color="gray.600">Événement non trouvé.</Text>
          <Button as={Link} to="/events" leftIcon={<FiArrowLeft />} colorScheme="blue">
            Retour aux événements
          </Button>
        </VStack>
      </Container>
    );
  }

  const eventInfo = getEventTypeInfo(event);

  return (
    <>
      <Helmet>
        <title>Inscription : {event.title}</title>
        <meta name="description" content={`Inscription pour ${event.title} - ${event.date}`} />
      </Helmet>

      <Container maxW="container.md" py={10}>
        {/* Navigation */}
        <Button 
          as={Link} 
          to="/events" 
          leftIcon={<FiArrowLeft />} 
          mb={6} 
          variant="outline"
          colorScheme="gray"
        >
          Retour aux événements
        </Button>

        {/* En-tête de l'événement */}
        <VStack spacing={6} textAlign="center" mb={8}>
          <Heading as="h1" size="xl" color="var(--rbe-red)">
            {event.title}
          </Heading>
          
          <HStack spacing={4} justify="center" wrap="wrap">
            <HStack>
              <Icon as={FiCalendar} color="var(--rbe-red)" />
              <Badge colorScheme="orange" fontSize="md" px={3} py={1}>
                {event.date}
              </Badge>
            </HStack>
            {event.time && (
              <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                {event.time}
              </Badge>
            )}
          </HStack>
          
          {event.location && (
            <HStack>
              <Icon as={FiMapPin} color="var(--rbe-red)" />
              <Text fontSize="lg" color="gray.600">
                {event.location}
              </Text>
            </HStack>
          )}
        </VStack>

        {registrationStep === 'form' && (
          <>
            {/* Description */}
            {event.description && (
              <Box mb={8} p={6} borderWidth="1px" borderRadius="lg" bg="gray.50">
                <Heading size="md" mb={4} color="var(--rbe-red)">
                  📝 Description
                </Heading>
                <Text lineHeight="1.7" color="gray.700">
                  {event.description}
                </Text>
              </Box>
            )}

            {/* Formulaire d'inscription */}
            <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" mb={6}>
              <Heading size="md" mb={6} color="var(--rbe-red)">
                <Icon as={FiUsers} mr={2} />
                Inscription
              </Heading>

              <VStack spacing={6}>
                {/* Informations personnelles */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                  <FormControl isRequired>
                    <FormLabel>
                      <Icon as={FiUser} mr={2} />
                      Nom complet
                    </FormLabel>
                    <Input
                      value={formData.participantName}
                      onChange={(e) => setFormData(prev => ({ ...prev, participantName: e.target.value }))}
                      placeholder="Votre nom et prénom"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>
                      <Icon as={FiMail} mr={2} />
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      value={formData.participantEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, participantEmail: e.target.value }))}
                      placeholder="votre@email.com"
                    />
                  </FormControl>
                </SimpleGrid>

                {/* Sélection des billets */}
                <Box w="100%">
                  <Heading size="sm" mb={4}>🎫 Nombre de billets</Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {(event.adultPrice !== null && event.adultPrice !== undefined) || eventInfo.isFree ? (
                      <FormControl>
                        <FormLabel>
                          Adultes 
                          {eventInfo.isFree ? (
                            <Badge ml={2} colorScheme="green">Gratuit</Badge>
                          ) : (
                            <Badge ml={2} colorScheme="blue">{event.adultPrice}€</Badge>
                          )}
                        </FormLabel>
                        <NumberInput
                          value={formData.adultTickets}
                          onChange={(value) => setFormData(prev => ({ ...prev, adultTickets: parseInt(value) || 0 }))}
                          min={0}
                          max={10}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    ) : null}

                    {(event.childPrice !== null && event.childPrice !== undefined) || eventInfo.isFree ? (
                      <FormControl>
                        <FormLabel>
                          Enfants (-12 ans)
                          {eventInfo.isFree ? (
                            <Badge ml={2} colorScheme="green">Gratuit</Badge>
                          ) : (
                            <Badge ml={2} colorScheme="blue">{event.childPrice}€</Badge>
                          )}
                        </FormLabel>
                        <NumberInput
                          value={formData.childTickets}
                          onChange={(value) => setFormData(prev => ({ ...prev, childTickets: parseInt(value) || 0 }))}
                          min={0}
                          max={10}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    ) : null}
                  </SimpleGrid>
                </Box>

                {/* Total */}
                <Box w="100%" p={4} bg="gray.50" borderRadius="md">
                  <HStack justify="space-between">
                    <Text fontWeight="bold">Total :</Text>
                    <Text fontSize="xl" fontWeight="bold" color="var(--rbe-red)">
                      {eventInfo.isFree ? 'Gratuit' : `${calculateTotal()}€`}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    {formData.adultTickets} adulte(s) + {formData.childTickets} enfant(s)
                  </Text>
                </Box>

                {/* Bouton d'inscription */}
                <Button
                  size="lg"
                  colorScheme="red"
                  bg="var(--rbe-red)"
                  _hover={{ bg: "var(--rbe-accent)" }}
                  onClick={handleSubmitRegistration}
                  isLoading={submitting}
                  loadingText="Inscription en cours..."
                  w="100%"
                  leftIcon={eventInfo.registrationMethod === 'helloasso' ? <FiExternalLink /> : <FiUsers />}
                >
                  {eventInfo.registrationMethod === 'helloasso' 
                    ? 'S\'inscrire via HelloAsso' 
                    : eventInfo.isFree 
                      ? 'Confirmer ma participation' 
                      : 'S\'inscrire et payer'
                  }
                </Button>

                {eventInfo.registrationMethod === 'helloasso' && (
                  <Alert status="info" borderRadius="md">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Vous serez redirigé vers HelloAsso pour finaliser votre inscription et le paiement sécurisé.
                    </Text>
                  </Alert>
                )}
              </VStack>
            </Box>
          </>
        )}

        {registrationStep === 'processing' && (
          <VStack spacing={6} p={8} borderWidth="1px" borderRadius="lg" bg="blue.50">
            <Spinner size="xl" color="var(--rbe-red)" />
            <Heading size="lg" color="blue.700">
              {eventInfo.registrationMethod === 'helloasso' 
                ? 'En attente du paiement HelloAsso...'
                : 'Traitement de votre inscription...'
              }
            </Heading>
            <Text textAlign="center" color="blue.600">
              {eventInfo.registrationMethod === 'helloasso' 
                ? 'Finalisez votre paiement sur HelloAsso. Votre billet sera automatiquement généré et envoyé par email une fois le paiement validé.'
                : 'Nous générons votre billet électronique...'
              }
            </Text>
          </VStack>
        )}

        {registrationStep === 'success' && ticketData && (
          <VStack spacing={6} p={8} borderWidth="1px" borderRadius="lg" boxShadow="xl" bg="green.50">
            <Heading size="lg" color="green.700">✅ Inscription confirmée !</Heading>

            <Box p={4} bg="white" borderRadius="md" w="100%" border="1px solid" borderColor="green.200">
              <Text fontWeight="600" mb={2}>Détails de votre inscription</Text>
              <Text fontSize="sm">N° de réservation : {ticketData.id}</Text>
              <Text fontSize="sm">Événement : {event.title}</Text>
              <Text fontSize="sm">Date : {event.date} {event.time && `• ${event.time}`}</Text>
              <Text fontSize="sm">Lieu : {event.location}</Text>
              <Text fontSize="sm">Billets : {formData.adultTickets} adulte(s) + {formData.childTickets} enfant(s)</Text>
              {!eventInfo.isFree && (
                <Text fontSize="sm">Montant : {calculateTotal()}€</Text>
              )}
            </Box>

            <Divider />

            <Text fontWeight="600">🎫 Votre billet électronique</Text>
            {ticketData.qrCode && (
              <Image
                src={generateQRCodeUrl(ticketData.qrCode)}
                alt="QR Code de votre billet"
                boxSize="256px"
                border="2px solid"
                borderColor="var(--rbe-red)"
                borderRadius="md"
              />
            )}

            <Alert status="success" borderRadius="md">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">📧 Billet envoyé par email</Text>
                <Text fontSize="sm">
                  Un email de confirmation avec votre billet électronique a été envoyé à : {formData.participantEmail}
                </Text>
                <Text fontSize="xs" color="green.600" mt={2}>
                  Présentez ce QR Code à l'entrée de l'événement.
                </Text>
              </VStack>
            </Alert>
          </VStack>
      </Container>
    </>/Container>
  );</>
} );
}