import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import "./styles.css";

// Pages
import Home from "./pages/Home.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import VehicleDetails from "./pages/VehicleDetails.jsx";
import Events from "./pages/Events.jsx";
import EventRegistration from "./pages/EventRegistration.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Photos from "./pages/Photos.jsx";
import Donate from "./pages/Donate.jsx";
import RetroMerch from "./pages/RetroMerch.jsx";
import Changelog from "./pages/Changelog.jsx";
import Newsletter from "./pages/Newsletter";

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Parc / Vehicles */}
          <Route path="/parc" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          {/* Alias: old English paths redirect to FR */}
          <Route path="/vehicles" element={<Navigate to="/parc" replace />} />

          {/* Events */}
          <Route path="/evenements" element={<Events />} />
          <Route path="/evenement/:eventId/inscription" element={<EventRegistration />} />
          {/* Alias: English to FR */}
          <Route path="/events" element={<Navigate to="/evenements" replace />} />
          <Route path="/event-registration" element={<Navigate to="/evenements" replace />} />

          {/* Other pages */}
          <Route path="/retromerch" element={<RetroMerch />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/newsletter" element={<Newsletter />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div style={{ padding: "20px" }}>
                <h1>Page non trouvée</h1>
                <p>Route actuelle : {window.location.pathname}</p>
                <p>Paramètres URL : {window.location.search}</p>
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}
