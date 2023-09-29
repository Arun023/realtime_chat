import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import {ChatProvider} from "./Context/ChatProvider";
const Render = document.getElementById("root")
ReactDOM.createRoot(Render).render(
  <ChatProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ChatProvider>
);
