import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Items from "./pages/Items";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      {token && <Navbar onLogout={handleLogout} />}
      <Routes>
        {!token ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/items" element={<Items token={token} />} />
            <Route path="/cart" element={<Cart token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="*" element={<Navigate to="/items" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
