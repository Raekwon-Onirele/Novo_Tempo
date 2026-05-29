// import CSS
import "./App.css";

// import React Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import pages
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Services from "./pages/Services/Services";
import WoWeAre from "./pages/WoWeAre/WoWeAre";
import Contact from "./pages/Contact/Contact"
import Simulator from "./pages/Simulator/Simulator"

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/woweare" element={<WoWeAre />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/simulator" element={<Simulator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
