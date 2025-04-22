import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FlightSearch from "./pages/FlightSearch.jsx";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";
import FlightBooking from "./pages/FlightBooking.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/flight-search" element={<FlightSearch />} />
        <Route path="/flight-booking" element={<FlightBooking />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
