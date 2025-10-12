// src/main.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, Center, Spinner, Box, Heading, Text, Image } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import system from "./theme";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
// removed old Nav import (now handled by Header -> Navbar)
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import VehicleDetails from "./pages/VehicleDetails.jsx";
import RetroMerch from "./pages/RetroMerch.jsx";
import Contact from "./pages/Contact.jsx";
import Events from "./pages/Events.jsx";
import EventRegistration from "./pages/EventRegistration.jsx";
import Changelog from "./pages/Changelog.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://attractive-kindness-rbe-serveurs.up.railway.app';

function Boot() {
  const [cfg, setCfg] = useState(null);
  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const r = await fetch(`${API_BASE_URL}/public/site-config`);
        const j = r.ok ? await r.json() : { maintenanceEnabled:false };
        if (!stop) setCfg(j);
      } catch {
        if (!stop) setCfg({ maintenanceEnabled:false });
      }
    })();
    return () => { stop = true; };
  }, []);

  if (!cfg) return <Center h="60vh"><Spinner /></Center>;

  if (cfg.maintenanceEnabled) {
    return (
      <Box minH="100vh" bg="gray.900" color="white" display="flex" alignItems="center" justifyContent="center" p={6}>
        <Box textAlign="center" maxW="800px">
          {cfg.maintenanceImage && (
            <Image src={cfg.maintenanceImage} alt="Maintenance" maxH="50vh" mx="auto" mb={6} objectFit="contain" />
          )}
          <Heading mb={4}>Site en maintenance</Heading>
          <Text fontSize="lg" opacity={0.9}>{cfg.maintenanceMessage || "Nous revenons très vite !"}</Text>
        </Box>
      </Box>
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider value={system}>
        <BrowserRouter>
          {/* Header includes the Navbar (ex: Header renders <Navbar />) */}
          <Header />

          {/* Main content area (site-wide container) */}
          <main className="site-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/parc" element={<Vehicles />} />
              <Route path="/vehicles/:id" element={<VehicleDetails />} />
              <Route path="/changelog" element={<Changelog />} />
              <Route path="/retromerch" element={<RetroMerch />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/evenements" element={<Events />} />
              <Route path="/evenement/:eventId/inscription" element={<EventRegistration />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
