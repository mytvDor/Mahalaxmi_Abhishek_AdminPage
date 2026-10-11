
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BookingsManagement from "./Admin/Dashboard/BookingManagementAdmin";

const API_URL = "https://mahalaxmisite-backend.onrender.com";
const AUTH_KEY = "mahalaxmi_booking_auth";
const AUTH_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function ProtectedBookingWrapper() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Restore login after refresh, but only for 24 hours.
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_KEY);

      if (savedAuth) {
        const auth = JSON.parse(savedAuth);

        if (
          auth?.authenticated === true &&
          typeof auth.expiresAt === "number" &&
          Date.now() < auth.expiresAt
        ) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(AUTH_KEY);
        }
      }
    } catch (err) {
      console.error("Could not restore login:", err);
      localStorage.removeItem(AUTH_KEY);
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/verify-booking-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Incorrect password. Please try again.");
        return;
      }

      const expiresAt = Date.now() + AUTH_DURATION;

      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          authenticated: true,
          expiresAt,
        })
      );

      setIsAuthenticated(true);
      setPassword("");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPassword("");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking login...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div>
        

        <BookingsManagement />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-lg font-semibold mb-4">
          Enter Password to Continue
        </h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-3"
          placeholder="Enter password"
          autoComplete="current-password"
          required
        />

        {error && (
          <p role="alert" className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Login"}
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Login remains active for 24 hours.
        </p>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedBookingWrapper />} />
        <Route path="/booking" element={<ProtectedBookingWrapper />} />
        <Route path="/admin" element={<ProtectedBookingWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
