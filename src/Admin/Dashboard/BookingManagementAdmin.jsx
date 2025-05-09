// // // // import { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // import { Button } from "@/components/ui/button";
// // // // import {
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableHead,
// // // //   TableHeader,
// // // //   TableRow,
// // // // } from "@/components/ui/table";
// // // // import {
// // // //   Dialog,
// // // //   DialogContent,
// // // //   DialogDescription,
// // // //   DialogFooter,
// // // //   DialogHeader,
// // // //   DialogTitle,
// // // // } from "@/components/ui/dialog";
// // // // import { Alert, AlertDescription } from "@/components/ui/alert";
// // // // import { Eye, Trash } from "lucide-react";

// // // // export default function BookingManagementAdmin() {
// // // //   const [bookings, setBookings] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");
// // // //   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
// // // //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// // // //   const [currentBooking, setCurrentBooking] = useState(null);

// // // //   useEffect(() => {
// // // //     fetchBookings();
// // // //   }, []);

// // // //   const fetchBookings = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const response = await axios.get("https://mahalaxmisite-backend.onrender.com/bookings");
// // // //       setBookings(response.data);
// // // //       setError("");
// // // //     } catch (error) {
// // // //       console.error("Error fetching bookings:", error);
// // // //       setError("Failed to load bookings. Please try again.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleDelete = async () => {
// // // //     try {
// // // //       await axios.delete(
// // // //         `https://mahalaxmisite-backend.onrender.com/bookings/${currentBooking._id}`
// // // //       );
// // // //       fetchBookings();
// // // //       setIsDeleteModalOpen(false);
// // // //       setCurrentBooking(null);
// // // //     } catch (error) {
// // // //       console.error("Error deleting booking:", error);
// // // //       setError("Failed to delete booking. Please try again.");
// // // //     }
// // // //   };

// // // //   const openViewModal = (booking) => {
// // // //     setCurrentBooking(booking);
// // // //     setIsViewModalOpen(true);
// // // //   };

// // // //   const openDeleteModal = (booking) => {
// // // //     setCurrentBooking(booking);
// // // //     setIsDeleteModalOpen(true);
// // // //   };

// // // //   const formatDate = (dateString) => {
// // // //     return new Date(dateString).toLocaleString();
// // // //   };

// // // //   return (
// // // //     <Card>
// // // //       <CardHeader className="flex flex-row items-center justify-between">
// // // //         <CardTitle>Bookings Management</CardTitle>
// // // //         <Button onClick={fetchBookings} variant="outline">
// // // //           Refresh
// // // //         </Button>
// // // //       </CardHeader>
// // // //       <CardContent>
// // // //         {error && (
// // // //           <Alert variant="destructive" className="mb-4">
// // // //             <AlertDescription>{error}</AlertDescription>
// // // //           </Alert>
// // // //         )}

// // // //         {loading ? (
// // // //           <div className="text-center p-6">Loading bookings...</div>
// // // //         ) : bookings.length === 0 ? (
// // // //           <div className="text-center p-10">
// // // //             <p className="text-lg text-gray-600">No bookings found</p>
// // // //           </div>
// // // //         ) : (
// // // //           <Table>
// // // //             <TableHeader>
// // // //               <TableRow>
// // // //                 <TableHead>Name</TableHead>
// // // //                 <TableHead>Phone</TableHead>
// // // //                 <TableHead>Date</TableHead>
// // // //                 <TableHead>Time</TableHead>
// // // //                 <TableHead className="text-right">Actions</TableHead>
// // // //               </TableRow>
// // // //             </TableHeader>
// // // //             <TableBody>
// // // //               {bookings.map((booking) => (
// // // //                 <TableRow key={booking._id}>
// // // //                   <TableCell>{booking.name}</TableCell>
// // // //                   <TableCell>{booking.phone}</TableCell>
// // // //                   <TableCell>{formatDate(booking.bookingDateTime)}</TableCell>
// // // //                   <TableCell>{booking.time}</TableCell>
// // // //                   <TableCell className="text-right">
// // // //                     <Button
// // // //                       variant="outline"
// // // //                       size="icon"
// // // //                       className="mr-2"
// // // //                       onClick={() => openViewModal(booking)}
// // // //                     >
// // // //                       <Eye className="h-4 w-4" />
// // // //                     </Button>
// // // //                     <Button
// // // //                       variant="outline"
// // // //                       size="icon"
// // // //                       onClick={() => openDeleteModal(booking)}
// // // //                     >
// // // //                       <Trash className="h-4 w-4" />
// // // //                     </Button>
// // // //                   </TableCell>
// // // //                 </TableRow>
// // // //               ))}
// // // //             </TableBody>
// // // //           </Table>
// // // //         )}
// // // //       </CardContent>

// // // //       {/* View Modal */}
// // // //       <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
// // // //         <DialogContent>
// // // //           <DialogHeader>
// // // //             <DialogTitle>Booking Details</DialogTitle>
// // // //           </DialogHeader>
// // // //           {currentBooking && (
// // // //             <div>
// // // //               <p>
// // // //                 <strong>Name:</strong> {currentBooking.name}
// // // //               </p>
// // // //               <p>
// // // //                 <strong>Phone:</strong> {currentBooking.phone}
// // // //               </p>
// // // //               <p>
// // // //                 <strong>Date & Time:</strong> {currentBooking.bookingDateTime}
// // // //               </p>
// // // //             </div>
// // // //           )}
// // // //           <DialogFooter>
// // // //             <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
// // // //           </DialogFooter>
// // // //         </DialogContent>
// // // //       </Dialog>

// // // //       {/* Delete Confirmation Modal */}
// // // //       <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
// // // //         <DialogContent>
// // // //           <DialogHeader>
// // // //             <DialogTitle>Confirm Deletion</DialogTitle>
// // // //           </DialogHeader>
// // // //           <DialogDescription>
// // // //             Are you sure you want to delete this booking? This action cannot be
// // // //             undone.
// // // //           </DialogDescription>
// // // //           <DialogFooter>
// // // //             <Button variant="destructive" onClick={handleDelete}>
// // // //               Delete
// // // //             </Button>
// // // //             <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
// // // //           </DialogFooter>
// // // //         </DialogContent>
// // // //       </Dialog>
// // // //     </Card>
// // // //   );
// // // // }

// // // import { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableHead,
// // //   TableHeader,
// // //   TableRow,
// // // } from "@/components/ui/table";
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogDescription,
// // //   DialogFooter,
// // //   DialogHeader,
// // //   DialogTitle,
// // // } from "@/components/ui/dialog";
// // // import { Alert, AlertDescription } from "@/components/ui/alert";
// // // import { Eye, Trash, Edit } from "lucide-react";

// // // export default function BookingsManagement() {
// // //   const [bookings, setBookings] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
// // //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // //   const [currentBooking, setCurrentBooking] = useState(null);
// // //   const [editedBooking, setEditedBooking] = useState({});

// // //   useEffect(() => {
// // //     fetchBookings();
// // //   }, []);

// // //   const fetchBookings = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await axios.get("https://mahalaxmisite-backend.onrender.com/bookings");
// // //       setBookings(response.data);
// // //       setError("");
// // //     } catch (error) {
// // //       console.error("Error fetching bookings:", error);
// // //       setError("Failed to load bookings. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDelete = async () => {
// // //     try {
// // //       await axios.delete(
// // //         `https://mahalaxmisite-backend.onrender.com/bookings/${currentBooking._id}`
// // //       );
// // //       fetchBookings();
// // //       setIsDeleteModalOpen(false);
// // //       setCurrentBooking(null);
// // //     } catch (error) {
// // //       console.error("Error deleting booking:", error);
// // //       setError("Failed to delete booking. Please try again.");
// // //     }
// // //   };

// // //   const handleEdit = async () => {
// // //     try {
// // //       await axios.put(
// // //         `https://mahalaxmisite-backend.onrender.com/bookings/${currentBooking._id}`,
// // //         editedBooking
// // //       );
// // //       fetchBookings();
// // //       setIsEditModalOpen(false);
// // //       setCurrentBooking(null);
// // //     } catch (error) {
// // //       console.error("Error updating booking:", error);
// // //       setError("Failed to update booking. Please try again.");
// // //     }
// // //   };

// // //   const openViewModal = (booking) => {
// // //     setCurrentBooking(booking);
// // //     setIsViewModalOpen(true);
// // //   };

// // //   const openDeleteModal = (booking) => {
// // //     setCurrentBooking(booking);
// // //     setIsDeleteModalOpen(true);
// // //   };

// // //   const openEditModal = (booking) => {
// // //     setCurrentBooking(booking);
// // //     setEditedBooking(booking);
// // //     setIsEditModalOpen(true);
// // //   };

// // //   const formatDate = (dateString) => {
// // //     return new Date(dateString).toLocaleString();
// // //   };

// // //   return (
// // //     <Card>
// // //       <CardHeader className="flex flex-row items-center justify-between">
// // //         <CardTitle>Bookings Management</CardTitle>
// // //         <Button onClick={fetchBookings} variant="outline">
// // //           Refresh
// // //         </Button>
// // //       </CardHeader>
// // //       <CardContent>
// // //         {error && (
// // //           <Alert variant="destructive" className="mb-4">
// // //             <AlertDescription>{error}</AlertDescription>
// // //           </Alert>
// // //         )}

// // //         {loading ? (
// // //           <div className="text-center p-6">Loading bookings...</div>
// // //         ) : bookings.length === 0 ? (
// // //           <div className="text-center p-10">
// // //             <p className="text-lg text-gray-600">No bookings found</p>
// // //           </div>
// // //         ) : (
// // //           <Table>
// // //             <TableHeader>
// // //               <TableRow>
// // //                 <TableHead className="text-left">Name</TableHead>
// // //                 <TableHead className="text-left">Phone</TableHead>
// // //                 <TableHead className="text-left">Date</TableHead>
// // //                 <TableHead className="text-left">Time</TableHead>
// // //                 <TableHead className="text-right">Actions</TableHead>
// // //               </TableRow>
// // //             </TableHeader>
// // //             <TableBody>
// // //               {bookings.map((booking) => (
// // //                 <TableRow key={booking._id}>
// // //                   <TableCell className="text-left">{booking.name}</TableCell>
// // //                   <TableCell className="text-left">{booking.phone}</TableCell>
// // //                   <TableCell className="text-left">
// // //                     {formatDate(booking.bookingDateTime)}
// // //                   </TableCell>
// // //                   <TableCell className="text-left">{booking.time}</TableCell>
// // //                   <TableCell className="text-right">
// // //                     <Button
// // //                       variant="outline"
// // //                       size="icon"
// // //                       className="mr-2"
// // //                       onClick={() => openViewModal(booking)}
// // //                     >
// // //                       <Eye className="h-4 w-4" />
// // //                     </Button>
// // //                     <Button
// // //                       variant="outline"
// // //                       size="icon"
// // //                       className="mr-2"
// // //                       onClick={() => openEditModal(booking)}
// // //                     >
// // //                       <Edit className="h-4 w-4" />
// // //                     </Button>
// // //                     <Button
// // //                       variant="outline"
// // //                       size="icon"
// // //                       onClick={() => openDeleteModal(booking)}
// // //                     >
// // //                       <Trash className="h-4 w-4" />
// // //                     </Button>
// // //                   </TableCell>
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         )}
// // //       </CardContent>

// // //       {/* Edit Booking Modal */}
// // //       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
// // //         <DialogContent>
// // //           <DialogHeader>
// // //             <DialogTitle>Edit Booking</DialogTitle>
// // //           </DialogHeader>
// // //           <input
// // //             type="text"
// // //             className="border p-2 w-full"
// // //             value={editedBooking.name || ""}
// // //             onChange={(e) =>
// // //               setEditedBooking({ ...editedBooking, name: e.target.value })
// // //             }
// // //           />
// // //           <input
// // //             type="text"
// // //             className="border p-2 w-full"
// // //             value={editedBooking.phone || ""}
// // //             onChange={(e) =>
// // //               setEditedBooking({ ...editedBooking, phone: e.target.value })
// // //             }
// // //           />
// // //           <DialogFooter>
// // //             <Button onClick={handleEdit}>Save</Button>
// // //           </DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>
// // //     </Card>
// // //   );
// // // }
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogClose,
// // } from "@/components/ui/dialog";
// // import { Alert, AlertDescription } from "@/components/ui/alert";
// // import { Eye, Trash, Edit, RefreshCw } from "lucide-react";

// // export default function BookingsManagement() {
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");
// //   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [currentBooking, setCurrentBooking] = useState(null);
// //   const [editedBooking, setEditedBooking] = useState({
// //     name: "",
// //     phone: "",
// //     bookingDateTime: "",
// //     time: "",
// //   });

// //   useEffect(() => {
// //     fetchBookings();
// //   }, []);

// //   const fetchBookings = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");
// //       const response = await axios.get("https://mahalaxmisite-backend.onrender.com/bookings");
// //       setBookings(response.data);
// //     } catch (error) {
// //       console.error("Error fetching bookings:", error);
// //       setError("Failed to load bookings. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     try {
// //       setError("");
// //       await axios.delete(
// //         `https://mahalaxmisite-backend.onrender.com/bookings/${currentBooking._id}`
// //       );
// //       setSuccess("Booking deleted successfully!");
// //       fetchBookings();
// //       setIsDeleteModalOpen(false);
// //       setCurrentBooking(null);

// //       // Clear success message after 3 seconds
// //       setTimeout(() => setSuccess(""), 3000);
// //     } catch (error) {
// //       console.error("Error deleting booking:", error);
// //       setError("Failed to delete booking. Please try again.");
// //     }
// //   };

// //   const handleEdit = async () => {
// //     try {
// //       setError("");
// //       await axios.put(
// //         `https://mahalaxmisite-backend.onrender.com/bookings/${currentBooking._id}`,
// //         editedBooking
// //       );
// //       setSuccess("Booking updated successfully!");
// //       fetchBookings();
// //       setIsEditModalOpen(false);
// //       setCurrentBooking(null);

// //       // Clear success message after 3 seconds
// //       setTimeout(() => setSuccess(""), 3000);
// //     } catch (error) {
// //       console.error("Error updating booking:", error);
// //       setError("Failed to update booking. Please try again.");
// //     }
// //   };

// //   const openViewModal = (booking) => {
// //     setCurrentBooking(booking);
// //     setIsViewModalOpen(true);
// //   };

// //   const openDeleteModal = (booking) => {
// //     setCurrentBooking(booking);
// //     setIsDeleteModalOpen(true);
// //   };

// //   const openEditModal = (booking) => {
// //     setCurrentBooking(booking);
// //     const bookingDate = new Date(booking.bookingDateTime);

// //     // Format date for datetime-local input
// //     const formattedDate = bookingDate.toISOString().slice(0, 16);

// //     setEditedBooking({
// //       ...booking,
// //       bookingDateTime: formattedDate,
// //     });
// //     setIsEditModalOpen(true);
// //   };

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString() + " " + date.toLocaleTimeString();
// //   };

// //   return (
// //     <Card className="w-full">
// //       <CardHeader className="flex flex-row items-center justify-between">
// //         <CardTitle>Bookings Management</CardTitle>
// //         <Button
// //           onClick={fetchBookings}
// //           variant="outline"
// //           className="flex items-center gap-2"
// //         >
// //           <RefreshCw className="h-4 w-4" />
// //           Refresh
// //         </Button>
// //       </CardHeader>
// //       <CardContent>
// //         {error && (
// //           <Alert variant="destructive" className="mb-4">
// //             <AlertDescription>{error}</AlertDescription>
// //           </Alert>
// //         )}

// //         {success && (
// //           <Alert
// //             variant="default"
// //             className="mb-4 bg-green-50 text-green-800 border-green-200"
// //           >
// //             <AlertDescription>{success}</AlertDescription>
// //           </Alert>
// //         )}

// //         {loading ? (
// //           <div className="text-center p-6">Loading bookings...</div>
// //         ) : bookings.length === 0 ? (
// //           <div className="text-center p-10">
// //             <p className="text-lg text-gray-600">No bookings found</p>
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <Table>
// //               <TableHeader>
// //                 <TableRow>
// //                   <TableHead className="w-[200px]">Name</TableHead>
// //                   <TableHead className="w-[150px]">Phone</TableHead>
// //                   <TableHead className="w-[200px]">Date & Time</TableHead>
// //                   <TableHead className="w-[100px] text-right">
// //                     Actions
// //                   </TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {bookings.map((booking) => (
// //                   <TableRow key={booking._id}>
// //                     <TableCell className="font-medium">
// //                       {booking.name}
// //                     </TableCell>
// //                     <TableCell>{booking.phone}</TableCell>
// //                     <TableCell>{formatDate(booking.bookingDateTime)}</TableCell>
// //                     <TableCell className="text-right">
// //                       <div className="flex justify-end gap-2">
// //                         <Button
// //                           variant="outline"
// //                           size="icon"
// //                           onClick={() => openViewModal(booking)}
// //                           title="View Details"
// //                         >
// //                           <Eye className="h-4 w-4" />
// //                         </Button>
// //                         <Button
// //                           variant="outline"
// //                           size="icon"
// //                           onClick={() => openEditModal(booking)}
// //                           title="Edit Booking"
// //                         >
// //                           <Edit className="h-4 w-4" />
// //                         </Button>
// //                         <Button
// //                           variant="outline"
// //                           size="icon"
// //                           onClick={() => openDeleteModal(booking)}
// //                           title="Delete Booking"
// //                           className="text-red-500 hover:bg-red-50"
// //                         >
// //                           <Trash className="h-4 w-4" />
// //                         </Button>
// //                       </div>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </div>
// //         )}
// //       </CardContent>

// //       {/* View Booking Modal */}
// //       <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
// //         <DialogContent className="max-w-md">
// //           <DialogHeader>
// //             <DialogTitle>Booking Details</DialogTitle>
// //           </DialogHeader>
// //           {currentBooking && (
// //             <div className="space-y-4">
// //               <div className="grid grid-cols-3 gap-2">
// //                 <div className="font-semibold">Name:</div>
// //                 <div className="col-span-2">{currentBooking.name}</div>
// //               </div>
// //               <div className="grid grid-cols-3 gap-2">
// //                 <div className="font-semibold">Phone:</div>
// //                 <div className="col-span-2">{currentBooking.phone}</div>
// //               </div>
// //               <div className="grid grid-cols-3 gap-2">
// //                 <div className="font-semibold">Date & Time:</div>
// //                 <div className="col-span-2">
// //                   {formatDate(currentBooking.bookingDateTime)}
// //                 </div>
// //               </div>
// //               {currentBooking.transactionId && (
// //                 <div className="grid grid-cols-3 gap-2">
// //                   <div className="font-semibold">Transaction ID:</div>
// //                   <div className="col-span-2">
// //                     {currentBooking.transactionId}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //           <DialogFooter>
// //             <DialogClose asChild>
// //               <Button variant="outline">Close</Button>
// //             </DialogClose>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>

// //       {/* Edit Booking Modal */}
// //       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
// //         <DialogContent className="max-w-md">
// //           <DialogHeader>
// //             <DialogTitle>Edit Booking</DialogTitle>
// //             <DialogDescription>
// //               Make changes to the booking information below.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <div className="grid gap-4 py-4">
// //             <div className="grid gap-2">
// //               <Label htmlFor="name">Name</Label>
// //               <Input
// //                 id="name"
// //                 value={editedBooking.name || ""}
// //                 onChange={(e) =>
// //                   setEditedBooking({ ...editedBooking, name: e.target.value })
// //                 }
// //               />
// //             </div>
// //             <div className="grid gap-2">
// //               <Label htmlFor="phone">Phone</Label>
// //               <Input
// //                 id="phone"
// //                 value={editedBooking.phone || ""}
// //                 onChange={(e) =>
// //                   setEditedBooking({ ...editedBooking, phone: e.target.value })
// //                 }
// //               />
// //             </div>
// //             <div className="grid gap-2">
// //               <Label htmlFor="bookingDateTime">Date & Time</Label>
// //               <Input
// //                 id="bookingDateTime"
// //                 type="datetime-local"
// //                 value={editedBooking.bookingDateTime || ""}
// //                 onChange={(e) =>
// //                   setEditedBooking({
// //                     ...editedBooking,
// //                     bookingDateTime: e.target.value,
// //                   })
// //                 }
// //               />
// //             </div>
// //           </div>
// //           <DialogFooter>
// //             <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
// //               Cancel
// //             </Button>
// //             <Button onClick={handleEdit}>Save Changes</Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>

// //       {/* Delete Confirmation Modal */}
// //       <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
// //         <DialogContent className="max-w-md">
// //           <DialogHeader>
// //             <DialogTitle>Confirm Deletion</DialogTitle>
// //             <DialogDescription>
// //               Are you sure you want to delete this booking? This action cannot
// //               be undone.
// //             </DialogDescription>
// //           </DialogHeader>
// //           {currentBooking && (
// //             <div className="py-3 border-t border-b my-4">
// //               <p>
// //                 <span className="font-medium">Name:</span> {currentBooking.name}
// //               </p>
// //               <p>
// //                 <span className="font-medium">Phone:</span>{" "}
// //                 {currentBooking.phone}
// //               </p>
// //               <p>
// //                 <span className="font-medium">Date:</span>{" "}
// //                 {formatDate(currentBooking.bookingDateTime)}
// //               </p>
// //             </div>
// //           )}
// //           <DialogFooter>
// //             <Button
// //               variant="outline"
// //               onClick={() => setIsDeleteModalOpen(false)}
// //             >
// //               Cancel
// //             </Button>
// //             <Button variant="destructive" onClick={handleDelete}>
// //               Delete
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </Card>
// //   );
// // }

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Eye, Trash, Edit, RefreshCw } from "lucide-react";

// export default function BookingsManagement() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [editedBooking, setEditedBooking] = useState({
//     name: "",
//     phone: "",
//     bookingDate: "",
//     time: "",
//   });

//   // Available time slots
//   const timeOptions = ["5 AM", "7 AM", "10 AM"];

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const response = await axios.get("https://mahalaxmisite-backend.onrender.com/bookings");
//       setBookings(response.data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       setError("Failed to load bookings. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       setError("");
//       await axios.delete(
//         `https://mahalaxmisite-backend.onrender.com/bookings/${currentBooking._id}`
//       );
//       setSuccess("Booking deleted successfully!");
//       fetchBookings();
//       setIsDeleteModalOpen(false);
//       setCurrentBooking(null);

//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (error) {
//       console.error("Error deleting booking:", error);
//       setError("Failed to delete booking. Please try again.");
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       setError("");

//       // Create a new Date object from the selected date
//       const bookingDate = new Date(editedBooking.bookingDate);

//       // Extract the time from the selected time slot
//       const timeStr = editedBooking.time;
//       const hour = timeStr === "5 AM" ? 5 : timeStr === "7 AM" ? 7 : 10;

//       // Set the hours on the booking date
//       bookingDate.setHours(hour, 0, 0, 0);

//       // Create the payload with the combined date and time
//       const payload = {
//         ...editedBooking,
//         bookingDateTime: bookingDate.toISOString(),
//         time: timeStr,
//       };

//       await axios.put(
//         `https://mahalaxmisite-backend.onrender.com/bookings/${currentBooking._id}`,
//         payload
//       );

//       setSuccess("Booking updated successfully!");
//       fetchBookings();
//       setIsEditModalOpen(false);
//       setCurrentBooking(null);

//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (error) {
//       console.error("Error updating booking:", error);
//       setError("Failed to update booking. Please try again.");
//     }
//   };

//   const openViewModal = (booking) => {
//     setCurrentBooking(booking);
//     setIsViewModalOpen(true);
//   };

//   const openDeleteModal = (booking) => {
//     setCurrentBooking(booking);
//     setIsDeleteModalOpen(true);
//   };

//   const openEditModal = (booking) => {
//     setCurrentBooking(booking);

//     // Extract date and time from booking
//     const bookingDate = new Date(booking.bookingDateTime);
//     const year = bookingDate.getFullYear();
//     const month = String(bookingDate.getMonth() + 1).padStart(2, "0");
//     const day = String(bookingDate.getDate()).padStart(2, "0");
//     const formattedDate = `${year}-${month}-${day}`;

//     let timeSlot = "5 AM";
//     const hours = bookingDate.getHours();
//     if (hours === 7) timeSlot = "7 AM";
//     else if (hours === 10) timeSlot = "10 AM";

//     setEditedBooking({
//       ...booking,
//       bookingDate: formattedDate,
//       time: booking.time || timeSlot,
//     });

//     setIsEditModalOpen(true);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     const hours = date.getHours();

//     if (hours === 5) return "5 AM";
//     if (hours === 7) return "7 AM";
//     if (hours === 10) return "10 AM";

//     // If time doesn't match our predefined slots, return the regular time
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle>Bookings Management</CardTitle>
//         <Button
//           onClick={fetchBookings}
//           variant="outline"
//           className="flex items-center gap-2"
//         >
//           <RefreshCw className="h-4 w-4" />
//           Refresh
//         </Button>
//       </CardHeader>
//       <CardContent>
//         {error && (
//           <Alert variant="destructive" className="mb-4">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         {success && (
//           <Alert
//             variant="default"
//             className="mb-4 bg-green-50 text-green-800 border-green-200"
//           >
//             <AlertDescription>{success}</AlertDescription>
//           </Alert>
//         )}

//         {loading ? (
//           <div className="text-center p-6">Loading bookings...</div>
//         ) : bookings.length === 0 ? (
//           <div className="text-center p-10">
//             <p className="text-lg text-gray-600">No bookings found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[200px]">Name</TableHead>
//                   <TableHead className="w-[150px]">Phone</TableHead>
//                   <TableHead className="w-[120px]">Date</TableHead>
//                   <TableHead className="w-[80px]">Time</TableHead>
//                   <TableHead className="w-[100px] text-right">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {bookings.map((booking) => (
//                   <TableRow key={booking._id}>
//                     <TableCell className="font-medium">
//                       {booking.name}
//                     </TableCell>
//                     <TableCell>{booking.phone}</TableCell>
//                     <TableCell>{formatDate(booking.bookingDateTime)}</TableCell>
//                     <TableCell>
//                       {booking.time || formatTime(booking.bookingDateTime)}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex justify-end gap-2">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           onClick={() => openViewModal(booking)}
//                           title="View Details"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           onClick={() => openEditModal(booking)}
//                           title="Edit Booking"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           onClick={() => openDeleteModal(booking)}
//                           title="Delete Booking"
//                           className="text-red-500 hover:bg-red-50"
//                         >
//                           <Trash className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </CardContent>

//       {/* View Booking Modal */}
//       <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Booking Details</DialogTitle>
//           </DialogHeader>
//           {currentBooking && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-3 gap-2">
//                 <div className="font-semibold">Name:</div>
//                 <div className="col-span-2">{currentBooking.name}</div>
//               </div>
//               <div className="grid grid-cols-3 gap-2">
//                 <div className="font-semibold">Phone:</div>
//                 <div className="col-span-2">{currentBooking.phone}</div>
//               </div>
//               <div className="grid grid-cols-3 gap-2">
//                 <div className="font-semibold">Date:</div>
//                 <div className="col-span-2">
//                   {formatDate(currentBooking.bookingDateTime)}
//                 </div>
//               </div>
//               <div className="grid grid-cols-3 gap-2">
//                 <div className="font-semibold">Time:</div>
//                 <div className="col-span-2">
//                   {currentBooking.time ||
//                     formatTime(currentBooking.bookingDateTime)}
//                 </div>
//               </div>
//               {currentBooking.transactionId && (
//                 <div className="grid grid-cols-3 gap-2">
//                   <div className="font-semibold">Transaction ID:</div>
//                   <div className="col-span-2">
//                     {currentBooking.transactionId}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Close</Button>
//             </DialogClose>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Edit Booking Modal */}
//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Edit Booking</DialogTitle>
//             <DialogDescription>
//               Make changes to the booking information below.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 value={editedBooking.name || ""}
//                 onChange={(e) =>
//                   setEditedBooking({ ...editedBooking, name: e.target.value })
//                 }
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="phone">Phone</Label>
//               <Input
//                 id="phone"
//                 value={editedBooking.phone || ""}
//                 onChange={(e) =>
//                   setEditedBooking({ ...editedBooking, phone: e.target.value })
//                 }
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="bookingDate">Date</Label>
//               <Input
//                 id="bookingDate"
//                 type="date"
//                 value={editedBooking.bookingDate || ""}
//                 onChange={(e) =>
//                   setEditedBooking({
//                     ...editedBooking,
//                     bookingDate: e.target.value,
//                   })
//                 }
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="time">Time</Label>
//               <Select
//                 value={editedBooking.time || "5 AM"}
//                 onValueChange={(value) =>
//                   setEditedBooking({ ...editedBooking, time: value })
//                 }
//               >
//                 <SelectTrigger id="time">
//                   <SelectValue placeholder="Select time" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {timeOptions.map((time) => (
//                     <SelectItem key={time} value={time}>
//                       {time}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleEdit}>Save Changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Modal */}
//       <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this booking? This action cannot
//               be undone.
//             </DialogDescription>
//           </DialogHeader>
//           {currentBooking && (
//             <div className="py-3 border-t border-b my-4">
//               <p>
//                 <span className="font-medium">Name:</span> {currentBooking.name}
//               </p>
//               <p>
//                 <span className="font-medium">Phone:</span>{" "}
//                 {currentBooking.phone}
//               </p>
//               <p>
//                 <span className="font-medium">Date:</span>{" "}
//                 {formatDate(currentBooking.bookingDateTime)}
//               </p>
//               <p>
//                 <span className="font-medium">Time:</span>{" "}
//                 {currentBooking.time ||
//                   formatTime(currentBooking.bookingDateTime)}
//               </p>
//             </div>
//           )}
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setIsDeleteModalOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDelete}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Trash, Edit, RefreshCw, Download, CalendarX } from "lucide-react";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeletePastModalOpen, setIsDeletePastModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [editedBooking, setEditedBooking] = useState({
    name: "",
    phone: "",
    bookingDate: "",
    time: "",
  });

  // Available time slots
  const timeOptions = ["5 AM", "7 AM", "10 AM"];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        "https://mahalaxmisite-backend.onrender.com/bookings"
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setError("");
      await axios.delete(
        `https://mahalaxmisite-backend.onrender.com/bookings/${currentBooking._id}`
      );
      setSuccess("Booking deleted successfully!");
      fetchBookings();
      setIsDeleteModalOpen(false);
      setCurrentBooking(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Failed to delete booking. Please try again.");
    }
  };

  const handleDeletePastBookings = async () => {
    try {
      setError("");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Send request to delete past bookings
      await axios.delete(
        `https://mahalaxmisite-backend.onrender.com/bookings/delete-past/${today.toISOString()}`
      );

      setSuccess("Past bookings deleted successfully!");
      fetchBookings();
      setIsDeletePastModalOpen(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error deleting past bookings:", error);
      setError("Failed to delete past bookings. Please try again.");
    }
  };

  const handleEdit = async () => {
    try {
      setError("");

      // Create a new Date object from the selected date
      const bookingDate = new Date(editedBooking.bookingDate);

      // Extract the time from the selected time slot
      const timeStr = editedBooking.time;
      const hour = timeStr === "5 AM" ? 5 : timeStr === "7 AM" ? 7 : 10;

      // Set the hours on the booking date
      bookingDate.setHours(hour, 0, 0, 0);

      // Create the payload with the combined date and time
      const payload = {
        ...editedBooking,
        bookingDateTime: bookingDate.toISOString(),
        time: timeStr,
      };

      await axios.put(
        `https://mahalaxmisite-backend.onrender.com/bookings/${currentBooking._id}`,
        payload
      );

      setSuccess("Booking updated successfully!");
      fetchBookings();
      setIsEditModalOpen(false);
      setCurrentBooking(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error updating booking:", error);
      setError("Failed to update booking. Please try again.");
    }
  };

  const downloadBookingsData = () => {
    try {
      // Format data for Excel
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];

      // Create header row
      let csvContent = "Name,Phone,Date,Time,Transaction ID\n";

      // Add data rows
      bookings.forEach((booking) => {
        const date = formatDate(booking.bookingDateTime);
        const time = booking.time || formatTime(booking.bookingDateTime);
        const transactionId = booking.transactionId || "";

        csvContent += `${booking.name},${booking.phone},${date},${time},${transactionId}\n`;
      });

      // Create a Blob and download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `bookings-${dateStr}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccess("Bookings data downloaded successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error downloading bookings data:", error);
      setError("Failed to download bookings data. Please try again.");
    }
  };

  const openViewModal = (booking) => {
    setCurrentBooking(booking);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (booking) => {
    setCurrentBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (booking) => {
    setCurrentBooking(booking);

    // Extract date and time from booking
    const bookingDate = new Date(booking.bookingDateTime);
    const year = bookingDate.getFullYear();
    const month = String(bookingDate.getMonth() + 1).padStart(2, "0");
    const day = String(bookingDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    let timeSlot = "5 AM";
    const hours = bookingDate.getHours();
    if (hours === 7) timeSlot = "7 AM";
    else if (hours === 10) timeSlot = "10 AM";

    setEditedBooking({
      ...booking,
      bookingDate: formattedDate,
      time: booking.time || timeSlot,
    });

    setIsEditModalOpen(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();

    if (hours === 5) return "5 AM";
    if (hours === 7) return "7 AM";
    if (hours === 10) return "10 AM";

    // If time doesn't match our predefined slots, return the regular time
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to sort bookings by date and time
  const sortBookings = (bookingsToSort) => {
    return [...bookingsToSort].sort((a, b) => {
      const dateA = new Date(a.bookingDateTime);
      const dateB = new Date(b.bookingDateTime);
      return dateA - dateB; // Ascending by date and time
    });
  };

  // Separate bookings into past and upcoming
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const pastBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.bookingDateTime);
    return bookingDate < today;
  });

  const upcomingBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.bookingDateTime);
    return bookingDate >= today;
  });

  // Sort both arrays
  const sortedPastBookings = sortBookings(pastBookings);
  const sortedUpcomingBookings = sortBookings(upcomingBookings);

  const renderBookingsTable = (bookingsToDisplay) => {
    if (bookingsToDisplay.length === 0) {
      return (
        <div className="text-center p-10">
          <p className="text-lg text-gray-600">No bookings found</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[150px]">Phone</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[80px]">Time</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingsToDisplay.map((booking) => (
              <TableRow className="text-left" key={booking._id}>
                <TableCell className="font-medium ">{booking.name}</TableCell>
                <TableCell>{booking.phone}</TableCell>
                <TableCell>{formatDate(booking.bookingDateTime)}</TableCell>
                <TableCell>
                  {booking.time || formatTime(booking.bookingDateTime)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openViewModal(booking)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditModal(booking)}
                      title="Edit Booking"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDeleteModal(booking)}
                      title="Delete Booking"
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
        <CardTitle>Bookings Management</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={downloadBookingsData}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Data
          </Button>
          <Button
            onClick={() => setIsDeletePastModalOpen(true)}
            variant="outline"
            className="flex items-center gap-2 text-red-500 hover:bg-red-50"
            disabled={pastBookings.length === 0}
          >
            <CalendarX className="h-4 w-4" />
            Delete Past Bookings
          </Button>
          <Button
            onClick={fetchBookings}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert
            variant="default"
            className="mb-4 bg-green-50 text-green-800 border-green-200"
          >
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="text-center p-6">Loading bookings...</div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">
                Upcoming Bookings ({sortedUpcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past Bookings ({sortedPastBookings.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              {renderBookingsTable(sortedUpcomingBookings)}
            </TabsContent>
            <TabsContent value="past">
              {renderBookingsTable(sortedPastBookings)}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>

      {/* View Booking Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {currentBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Name:</div>
                <div className="col-span-2">{currentBooking.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Phone:</div>
                <div className="col-span-2">{currentBooking.phone}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Date:</div>
                <div className="col-span-2">
                  {formatDate(currentBooking.bookingDateTime)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Time:</div>
                <div className="col-span-2">
                  {currentBooking.time ||
                    formatTime(currentBooking.bookingDateTime)}
                </div>
              </div>
              {currentBooking.transactionId && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-semibold">Transaction ID:</div>
                  <div className="col-span-2">
                    {currentBooking.transactionId}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Make changes to the booking information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedBooking.name || ""}
                onChange={(e) =>
                  setEditedBooking({ ...editedBooking, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editedBooking.phone || ""}
                onChange={(e) =>
                  setEditedBooking({ ...editedBooking, phone: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bookingDate">Date</Label>
              <Input
                id="bookingDate"
                type="date"
                value={editedBooking.bookingDate || ""}
                onChange={(e) =>
                  setEditedBooking({
                    ...editedBooking,
                    bookingDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Select
                value={editedBooking.time || "5 AM"}
                onValueChange={(value) =>
                  setEditedBooking({ ...editedBooking, time: value })
                }
              >
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          {currentBooking && (
            <div className="py-3 border-t border-b my-4">
              <p>
                <span className="font-medium">Name:</span> {currentBooking.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {currentBooking.phone}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {formatDate(currentBooking.bookingDateTime)}
              </p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {currentBooking.time ||
                  formatTime(currentBooking.bookingDateTime)}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Past Bookings Confirmation Modal */}
      <Dialog
        open={isDeletePastModalOpen}
        onOpenChange={setIsDeletePastModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Past Bookings</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete all bookings before today (
              {pastBookings.length} bookings)? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeletePastModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePastBookings}>
              Delete All Past Bookings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
