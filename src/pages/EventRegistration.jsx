import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

export default function EventRegistration() {
  const [searchParams] = useSearchParams();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [helloAssoData, setHelloAssoData] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [emailStatus, setEmailStatus] = useState("pending");

  // Récupération des paramètres de l'URL
  const eventData = {
    id: searchParams.get('event'),
    title: searchParams.get('title'),
    date: searchParams.get('date'),
    time: searchParams.get('time'),
    location: searchParams.get('location'),
    adultPrice: parseInt(searchParams.get('adultPrice')) || 15,
    childPrice: parseInt(searchParams.get('childPrice')) || 8,
  };

  const generateQRCodeUrl = (data) => {
    const encodedData = encodeURIComponent(data);
    return `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodedData}`;
  };

  useEffect(() => {
    if (helloAssoData && qrCodeUrl) {
      const sendTicketEmail = async () => {
        setEmailStatus("sending");

        const emailData = {
          orderNumber: helloAssoData.orderNumber,
          payerEmail: helloAssoData.payerEmail,
          payerName: helloAssoData.payerName,
          amount: helloAssoData.amount,
          eventId: eventData.id,
          eventTitle: eventData.title,
          eventDate: eventData.date,
          qrCodeImageUrl: qrCodeUrl,
          qrCodeData: helloAssoData.qrCodeData,
        };

        console.log("📧 Envoi email billetterie avec données HelloAsso :", emailData);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        setEmailStatus("sent");
      };

      sendTicketEmail();
    }
  }, [helloAssoData, qrCodeUrl, eventData]);

  const handleSimulatePayment = () => {
    console.log("🔄 Simulation du processus HelloAsso...");

    const simulatedHelloAssoResponse = {
      orderNumber: `HELLO-${Date.now()}`,
      transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      payerEmail: "association.rbe@gmail.com",
      payerName: "Association RétroBus Essonne",
      amount: `${eventData.adultPrice}.00`,
      currency: "EUR",
      status: "VALIDATED",
      paymentDate: new Date().toISOString(),
      eventId: eventData.id,
      eventTitle: eventData.title,
    };

    const qrCodeData = JSON.stringify({
      orderNumber: simulatedHelloAssoResponse.orderNumber,
      transactionId: simulatedHelloAssoResponse.transactionId,
      eventId: eventData.id,
      eventTitle: eventData.title,
      eventDate: eventData.date,
      participantName: simulatedHelloAssoResponse.payerName,
      participantEmail: simulatedHelloAssoResponse.payerEmail,
      paymentValidated: true,
      issueDate: new Date().toISOString(),
    });

    const qrUrl = generateQRCodeUrl(qrCodeData);

    setHelloAssoData({
      ...simulatedHelloAssoResponse,
      qrCodeData: qrCodeData,
    });
    setQrCodeUrl(qrUrl);
    setPaymentSuccess(true);
  };

  if (!eventData.id || !eventData.title) {
    return (
      <Container py={10}>
        <VStack spacing={4}>
          <Text fontSize="lg" color="gray.600">Événement non trouvé ou paramètres manquants.</Text>
          <Button as={Link} to="/events" leftIcon={<FiArrowLeft />} colorScheme="blue">
            Retour aux événements
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Inscription : {eventData.title}</title>
        <meta name="description" content={`Réservation pour ${eventData.title} - ${eventData.date}`} />
      </Helmet>

      <Container maxW="container.md" py={10}>
        {/* Navigation */}
        <Button 
          as={Link} 
          to="/events" 
          leftIcon={<FiArrowLeft />} 
          mb={6} 
          variant="outline"
        >
          Retour aux événements
        </Button>

        <VStack spacing={6} textAlign="center">
          <Heading as="h1" size="xl">
            Réservation événement
          </Heading>
          <Text fontSize="2xl" fontWeight="600" color="var(--rbe-red)">
            {eventData.title}
          </Text>
          <HStack spacing={4} justify="center">
            <Badge colorScheme="orange" fontSize="md" px={3} py={1}>
              {eventData.date}
            </Badge>
            <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
              {eventData.time}
            </Badge>
          </HStack>
          <Text fontSize="lg" color="gray.600">
            📍 {eventData.location}
          </Text>
        </VStack>

        <Box mt={10} p={6} borderWidth="1px" borderRadius="lg" bg="gray.50">
          <Heading size="lg" mb={4} color="var(--rbe-red)">
            Tarifs
          </Heading>

          <VStack spacing={4} align="stretch">
            <HStack justify="space-between" p={4} bg="white" borderRadius="md">
              <Text fontWeight="600">Adulte</Text>
              <Text fontSize="lg" fontWeight="bold" color="green.600">
                {eventData.adultPrice}€
              </Text>
            </HStack>
            <HStack justify="space-between" p={4} bg="white" borderRadius="md">
              <Text fontWeight="600">Enfant (-12 ans)</Text>
              <Text fontSize="lg" fontWeight="bold" color="green.600">
                {eventData.childPrice}€
              </Text>
            </HStack>
          </VStack>
        </Box>

        {paymentSuccess ? (
          <VStack spacing={6} mt={10} p={8} borderWidth="1px" borderRadius="lg" boxShadow="xl" bg="green.50">
            <Heading size="lg" color="green.700">✅ Réservation confirmée !</Heading>

            <Box p={4} bg="white" borderRadius="md" w="100%" border="1px solid" borderColor="green.200">
              <Text fontWeight="600" mb={2}>Détails de la réservation</Text>
              <Text fontSize="sm">N° de commande : {helloAssoData?.orderNumber}</Text>
              <Text fontSize="sm">Transaction : {helloAssoData?.transactionId}</Text>
              <Text fontSize="sm">Montant : {helloAssoData?.amount}€</Text>
              <Text fontSize="sm">Événement : {eventData.title}</Text>
              <Text fontSize="sm">Date : {eventData.date} • {eventData.time}</Text>
            </Box>

            <Text fontWeight="600">🎫 Votre billet électronique</Text>
            {qrCodeUrl ? (
              <Image
                src={qrCodeUrl}
                alt="QR Code de votre billet"
                boxSize="256px"
                border="2px solid"
                borderColor="orange.400"
                borderRadius="md"
              />
            ) : (
              <Spinner size="xl" />
            )}

            {emailStatus === "sending" && (
              <Box p={4} bg="blue.50" borderRadius="md" borderLeft="4px solid" borderColor="blue.400" w="100%">
                <Text color="blue.700">📧 Envoi du billet par email en cours...</Text>
                <Text fontSize="sm" color="blue.600">Destination : {helloAssoData?.payerEmail}</Text>
              </Box>
            )}

            {emailStatus === "sent" && (
              <Box p={4} bg="green.100" borderRadius="md" borderLeft="4px solid" borderColor="green.400" w="100%">
                <Text color="green.700">✅ Billet envoyé avec succès !</Text>
                <Text fontSize="sm" color="green.600">
                  Un email billetterie a été envoyé à : {helloAssoData?.payerEmail}
                </Text>
                <Text fontSize="xs" color="green.500" mt={2}>
                  Le QR Code de ce billet sera scanné à l'entrée de l'événement.
                </Text>
              </Box>
            )}
          </VStack>
        ) : (
          <VStack spacing={6} mt={10}>
            <Box w="100%" p={8} bg="orange.50" borderRadius="md" borderLeft="4px solid" borderColor="orange.400">
              <Heading size="md" mb={4} color="orange.700">🎃 Réservation RétroWouh ! Halloween</Heading>
              <Text mb={4} color="orange.800">
                Réservez votre place pour cette soirée spéciale Halloween ! 
                Après validation du paiement via HelloAsso, un billet électronique avec QR Code sera automatiquement généré et envoyé par email.
              </Text>
              <Text fontSize="sm" color="orange.600">
                Le processus : Paiement HelloAsso → Validation → Génération QR Code → Email automatique
              </Text>
            </Box>

            <Box p={4} bg="yellow.50" borderRadius="md" borderLeft="4px solid" borderColor="yellow.400">
              <Text fontSize="sm" fontWeight="600" mb={2}>🛠️ Mode développement</Text>
              <Button
                colorScheme="orange"
                size="lg"
                onClick={handleSimulatePayment}
                bg="orange.500"
                _hover={{ bg: "orange.600" }}
              >
                🎫 Simuler réservation HelloAsso
              </Button>
              <Text fontSize="xs" color="gray.500" mt={2}>
                Ce bouton simule la réception des données HelloAsso après un paiement réussi.
              </Text>
            </Box>
          </VStack>
        )}
      </Container>
    </>
  );
}