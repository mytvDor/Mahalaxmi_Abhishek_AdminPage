// // // import { useState } from "react";
// // // import reactLogo from "./assets/react.svg";
// // // import viteLogo from "/vite.svg";
// // // import "./App.css";
// // // import AbhishekBooking from "./userComponents/AbhishekBooking";
// // // import SareeUpload from "./Admin/SareeUpload";
// // // import AdminDashboard from "./Admin/AdminDashboard";
// // // import BuySareeForm from "./userComponents/BuySareeForm";
// // // import SareeGalleryUser from "./userComponents/SareeGalleryUser";
// // // // import "./userComponents/AbhishekBooking";

// // // function App() {
// // //   const [count, setCount] = useState(0);

// // //   return (
// // //     <>
// // //       <AbhishekBooking />
// // //       <SareeUpload />
// // //       <SareeGalleryUser></SareeGalleryUser>
// // //       <AdminDashboard />
// // //     </>
// // //   );
// // // }

// // // export default App;
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import "./App.css";
// // import AbhishekBooking from "./userComponents/AbhishekBooking";
// // import SareeUpload from "./Admin/SareeUpload";
// // import AdminDashboard from "./Admin/AdminDashboard";
// // import SareeGalleryUser from "./userComponents/SareeGalleryUser";
// // import Home from "./Home"; // Create a simple Home page (optional)
// // import Navbar from "./Navbar"; // Optional: Create a navigation bar
// // import BookingsManagement from "./Admin/Dashboard/BookingManagementAdmin";

// // function App() {
// //   return (
// //     <Router>
// //       {/* <Navbar /> */}
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/booking" element={<AbhishekBooking />} />
// //         {/* <Route path="/saree" element={<SareeGalleryUser />} />

// //                   <Route path="upload-saree" element={<SareeUpload />} />
// // */}

// //         <Route path="/admin">
// //           <Route path="dashboard" element={<BookingsManagement />} />
// //         </Route>
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// // userComponents/ProtectedBooking.js
// import { useState } from "react";
// import AbhishekBooking from "./AbhishekBooking";

// function ProtectedBooking() {
//   const [password, setPassword] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/verify-booking-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ password }),
//     });

//     const data = await response.json();
//     if (data.success) {
//       setIsAuthenticated(true);
//     } else {
//       setError("Incorrect password");
//     }
//   };

//   if (isAuthenticated) {
//     return <AbhishekBooking />;
//   }

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-lg font-semibold mb-4">Enter Password to Book</h2>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border px-3 py-2 w-full mb-3"
//           placeholder="Enter password"
//           required
//         />
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ProtectedBooking;
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import AbhishekBooking from "./userComponents/AbhishekBooking";
// import SareeUpload from "./Admin/SareeUpload";
// import AdminDashboard from "./Admin/AdminDashboard";
// import SareeGalleryUser from "./userComponents/SareeGalleryUser";
import Home from "./Home";
import BookingsManagement from "./Admin/Dashboard/BookingManagementAdmin";

function ProtectedBookingWrapper() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://mahalaxmisite-backend.onrender.com/api/verify-booking-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await response.json();
    if (data.success) {
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  if (isAuthenticated) {
    return <BookingsManagement />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-lg font-semibold mb-4">Enter Password to Book</h2>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 w-full mb-3"
          placeholder="Enter password"
          required
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Submit
        </button>
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
