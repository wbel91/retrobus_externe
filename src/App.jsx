import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import "./styles.css";

// Import des pages
import Home from "./pages/Home.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import VehicleDetails from "./pages/VehicleDetails.jsx";
import Events from "./pages/Events";
import EventRegistration from "./pages/EventRegistration";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Photos from "./pages/Photos.jsx";
import Donate from "./pages/Donate.jsx";
import Newsletter from "./pages/Newsletter"; // ← already present

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/events" element={<Events />} />
          <Route
            path="/event-registration"
            element={<div>DEBUG EVENT REGISTRATION</div>}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/donate" element={<Donate />} />

          {/* Before: used <ProtectedRoute> which isn't defined in this app */}
          {/* After: expose the newsletter page directly (or delete this route if not needed) */}
          <Route path="/newsletter" element={<Newsletter />} />

          {/* Route de debug */}
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
