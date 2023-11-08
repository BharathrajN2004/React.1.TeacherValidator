import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/user";
import Auth from "layouts/auth";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<Auth />} />
      <Route path="user/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/user" replace />} />
    </Routes>
  );
};

export default App;
