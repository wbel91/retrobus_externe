// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
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
