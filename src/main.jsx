import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDS4A9RsyKzANqh5GJXfepO4BtlUszzvc8",
  authDomain: "whattodo-4205f.firebaseapp.com",
  projectId: "whattodo-4205f",
  storageBucket: "whattodo-4205f.appspot.com",
  messagingSenderId: "581647499759",
  appId: "1:581647499759:web:18e5be2a1f9b2710e3f61a",
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
