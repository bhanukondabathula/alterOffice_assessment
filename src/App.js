import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import ProfileSinglePage from "./pages/ProfileSinglePage";
import { FirebaseProvider } from "./services/firebase"; // Make sure the FirebaseProvider is imported here

const App = () => {
  return (
    <FirebaseProvider> {/* Wrap your app with FirebaseProvider to give context */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile/:userId" element={<ProfileSinglePage />} />
        </Routes>
      </Router>
    </FirebaseProvider>
  );
};

export default App;
