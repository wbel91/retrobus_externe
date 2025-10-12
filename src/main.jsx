// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, Center, Spinner, Box, Heading, Text, Image } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import system from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider theme={system}>
        <App />
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
