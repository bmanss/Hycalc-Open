import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.scss";
import Profile from "./components/Profile.jsx";
import { cacheHypixelData } from "./lib/Util.jsx";
import { ProfileProvider } from "./context/ProfileContext.jsx";

const CACHE_DURATION = 60 * 60 * 168 * 1000; // 7 days in milliseconds

const setupApp = async () => {
  // Check if HypixelData is already stored in localStorage
  if (localStorage.getItem("HypixelData") === null || localStorage.getItem("lastLoad") === null) {
    try {
      await cacheHypixelData();
    } catch (error) {
      console.error("Unable to cache Hypixel data.", error);
    }
  }
  // Check if last cache load is longer than an hour
  else if (localStorage.getItem("lastLoad") && Date.now() - Number(localStorage.getItem("lastLoad")) >= CACHE_DURATION) {
    try {
      localStorage.removeItem("HypixelData");
      await cacheHypixelData();
    } catch (error) {
      console.error("Unable to cache Hypixel data.", error);
    }
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <BrowserRouter>
      <ProfileProvider>
        <Routes>
          <Route path='/profile/:profileName?' element={<Profile />} />
          <Route path='/' element={<Profile />} />
          <Route path='/*' element={<Navigate to='/' replace />} />
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  );
};

setupApp();
