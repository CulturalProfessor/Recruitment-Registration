import React from "react";
import ReactDOM from "react-dom/client";
import FrontForm from "./components/FrontForm";
import Redirect from "./components/Redirect";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Redirect/>} /> */}
        <Route path="/" element={<App/>} />
        {/* <Route path="/redirect" element={<Redirect />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
