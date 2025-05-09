// // import { useState } from "react";
// // import axios from "axios";
// // import { Calendar } from "@/components/ui/calendar";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// // export default function AbhishekBooking() {
// //   const [name, setName] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [date, setDate] = useState(null);
// //   const [time, setTime] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [transactionId, setTransactionId] = useState("");

// //   const today = new Date();
// //   today.setHours(0, 0, 0, 0);

// //   const timeSlots = [
// //     { value: "5:00 AM", label: "5:00 AM" },
// //     { value: "7:00 AM", label: "7:00 AM" },
// //     { value: "10:00 AM", label: "10:00 AM" },
// //   ];

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!name || !phone || !date || !time) return;

// //     setLoading(true);

// //     try {
// //       const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
// //       const bookingDateTime = `${formattedDate}T${time
// //         .replace(/:/g, "%3A")
// //         .replace(/ /g, "%20")}`;

// //       console.log(bookingDateTime);

// //       const response = await axios.post("https://mahalaxmisite-backend.onrender.com/bookings", {
// //         name,
// //         phone,
// //         bookingDateTime,
// //         transactionId,
// //       });

// //       console.log("Success:", response.data);

// //       setName("");
// //       setPhone("");
// //       setDate(null);
// //       setTime("");
// //       setTransactionId("");
// //     } catch (error) {
// //       //   console.error("Error:", error.response?.data || error.message);
// //       console.log(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="w-full max-w-md mx-auto">
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Book Your Appointment</CardTitle>
// //           <CardDescription>
// //             Please fill in your details to schedule your appointment.
// //           </CardDescription>
// //         </CardHeader>
// //         <form onSubmit={handleSubmit}>
// //           <CardContent className="space-y-4">
// //             <div className="space-y-2">
// //               <Label htmlFor="name">Full Name</Label>
// //               <Input
// //                 id="name"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 placeholder="Enter your full name"
// //                 required
// //               />
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="phone">Phone Number</Label>
// //               <Input
// //                 id="phone"
// //                 value={phone}
// //                 onChange={(e) => setPhone(e.target.value)}
// //                 placeholder="Enter your phone number"
// //                 required
// //               />
// //             </div>

// //             <div className="space-y-2">
// //               <Label>Select Date</Label>
// //               <Calendar
// //                 mode="single"
// //                 selected={date}
// //                 onSelect={setDate}
// //                 disabled={(date) => date < today}
// //                 className="rounded-md border"
// //               />
// //             </div>

// //             <div className="space-y-2">
// //               <Label>Select Time</Label>
// //               <RadioGroup value={time} onValueChange={setTime}>
// //                 {timeSlots.map((slot) => (
// //                   <div key={slot.value} className="flex items-center space-x-2">
// //                     <RadioGroupItem value={slot.value} id={slot.value} />
// //                     <Label htmlFor={slot.value}>{slot.label}</Label>
// //                   </div>
// //                 ))}
// //               </RadioGroup>
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="transactionID">Transaction ID</Label>
// //               <Input
// //                 id="transactionID"
// //                 value={transactionId}
// //                 onChange={(e) => setTransactionId(e.target.value)}
// //                 placeholder="Enter your Transaction ID"
// //                 required
// //               />
// //             </div>
// //           </CardContent>

// //           <CardFooter>
// //             <Button type="submit" className="w-full" disabled={loading}>
// //               {loading ? "Processing..." : "Confirm Booking"}
// //             </Button>
// //           </CardFooter>
// //         </form>
// //       </Card>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import axios from "axios";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import { toast } from "@/components/ui/use-toast";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// export default function AbhishekBooking() {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [date, setDate] = useState(null);
//   const [time, setTime] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [transactionId, setTransactionId] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const timeSlots = [
//     { value: "05:00", label: "5:00 AM" },
//     { value: "07:00", label: "7:00 AM" },
//     { value: "10:00", label: "10:00 AM" },
//   ];

//   const validatePhone = (phoneNumber) => {
//     // Basic validation for a 10-digit phone number
//     return /^\d{10}$/.test(phoneNumber);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess(false);

//     // Validation
//     if (!name || !phone || !date || !time || !transactionId) {
//       setError("All fields are required");
//       return;
//     }

//     if (!validatePhone(phone)) {
//       setError("Please enter a valid 10-digit phone number");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Format the date and time correctly for the API
//       // Create a new date object with the selected date and time
//       const selectedDate = new Date(date);
//       const [hours, minutes] = time.split(":");
//       selectedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

//       // Format as ISO string for the backend
//       const bookingDateTime = selectedDate.toISOString();

//       const response = await axios.post("https://mahalaxmisite-backend.onrender.com/bookings", {
//         name,
//         phone,
//         bookingDateTime,
//         transactionId,
//       });

//       console.log("Booking successful:", response.data);
//       setSuccess(true);

//       // Clear form after successful submission
//       setName("");
//       setPhone("");
//       setDate(null);
//       setTime("");
//       setTransactionId("");
//     } catch (error) {
//       console.error("Error:", error);
//       setError(
//         error.response?.data?.error ||
//           "Failed to book appointment. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       <Card>
//         <CardHeader>
//           <CardTitle>Book Your Appointment</CardTitle>
//           <CardDescription>
//             Please fill in your details to schedule your appointment.
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             {success && (
//               <Alert>
//                 <AlertDescription>
//                   Your appointment has been booked successfully!
//                 </AlertDescription>
//               </Alert>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
//                 placeholder="Enter your 10-digit phone number"
//                 maxLength={10}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Select Date</Label>
//               <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={setDate}
//                 disabled={(date) => date < today}
//                 className="rounded-md border"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Select Time</Label>
//               <RadioGroup value={time} onValueChange={setTime} required>
//                 {timeSlots.map((slot) => (
//                   <div key={slot.value} className="flex items-center space-x-2">
//                     <RadioGroupItem value={slot.value} id={slot.value} />
//                     <Label htmlFor={slot.value}>{slot.label}</Label>
//                   </div>
//                 ))}
//               </RadioGroup>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="transactionID">Transaction ID</Label>
//               <Input
//                 id="transactionID"
//                 value={transactionId}
//                 onChange={(e) => setTransactionId(e.target.value)}
//                 placeholder="Enter your Transaction ID"
//                 required
//               />
//             </div>
//           </CardContent>

//           <CardFooter>
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Processing..." : "Confirm Booking"}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AbhishekBooking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeSlots = [
    { value: "05:00", label: "5:00 AM" },
    { value: "07:00", label: "7:00 AM" },
    { value: "10:00", label: "10:00 AM" },
  ];

  const validatePhone = (phoneNumber) => {
    // Basic validation for a 10-digit phone number
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!name || !phone || !date || !time || !transactionId) {
      setError("All fields are required");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      // Format the date and time correctly for the API
      // Create a new date object with the selected date and time
      const selectedDate = new Date(date);
      const [hours, minutes] = time.split(":");
      selectedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Format as ISO string for the backend
      const bookingDateTime = selectedDate.toISOString();

      const response = await axios.post(
        "https://mahalaxmisite-backend.onrender.com/bookings",
        {
          name,
          phone,
          bookingDateTime,
          transactionId,
        }
      );

      console.log("Booking successful:", response.data);
      setSuccess(true);

      // Clear form after successful submission
      setName("");
      setPhone("");
      setDate(null);
      setTime("");
      setTransactionId("");
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.response?.data?.error ||
          "Failed to book appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-extrabold text-4xl">
            Book Your Abhisheck
          </CardTitle>
          <CardDescription className=" text-lg">
            Please fill in your details to schedule your appointment.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertDescription>
                  Your appointment has been booked successfully!
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter your 10-digit phone number"
                maxLength={10}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < today}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Select Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="qr">Scan and pay</Label>

              <img
                className="mt-3"
                src="https://th.bing.com/th/id/OIP.NDKNbQ-I9ApLLVp-E6HSPwHaHa?w=196&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="myimage"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionID">Transaction ID</Label>
              <Input
                id="transactionID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your Transaction ID"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="mt-5">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Confirm Booking"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
