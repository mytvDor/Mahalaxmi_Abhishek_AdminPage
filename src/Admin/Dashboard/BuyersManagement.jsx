// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
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
// } from "@/components/ui/dialog";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Badge } from "@/components/ui/badge";
// import { Eye, Trash } from "lucide-react";

// export default function BuyersManagement() {
//   const [buyers, setBuyers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [currentBuyer, setCurrentBuyer] = useState(null);

//   useEffect(() => {
//     fetchBuyers();
//   }, []);

//   const fetchBuyers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("https://mahalaxmisite-backend.onrender.com/buyers");
//       setBuyers(response.data);
//       setError("");
//     } catch (error) {
//       console.error("Error fetching buyers:", error);
//       setError("Failed to load buyers. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`https://mahalaxmisite-backend.onrender.com/buyers/${currentBuyer._id}`);
//       fetchBuyers();
//       setIsDeleteModalOpen(false);
//       setCurrentBuyer(null);
//     } catch (error) {
//       console.error("Error deleting buyer:", error);
//       setError("Failed to delete buyer. Please try again.");
//     }
//   };

//   const openViewModal = (buyer) => {
//     setCurrentBuyer(buyer);
//     setIsViewModalOpen(true);
//   };

//   const openDeleteModal = (buyer) => {
//     setCurrentBuyer(buyer);
//     setIsDeleteModalOpen(true);
//   };

//   const formatDate = (dateString) => {
//     const options = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle>Buyers Management</CardTitle>
//         <Button onClick={fetchBuyers} variant="outline">
//           Refresh
//         </Button>
//       </CardHeader>
//       <CardContent>
//         {error && (
//           <Alert variant="destructive" className="mb-4">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         {loading ? (
//           <div className="text-center p-6">Loading buyers...</div>
//         ) : buyers.length === 0 ? (
//           <div className="text-center p-10">
//             <p className="text-lg text-gray-600">No buyers found</p>
//             <p className="text-sm text-gray-500 mt-2">
//               Buyers will appear here when customers make purchases
//             </p>
//           </div>
//         ) : (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Contact</TableHead>
//                 <TableHead>Purchased Item</TableHead>
//                 <TableHead>Purchase Date</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {buyers.map((buyer) => (
//                 <TableRow key={buyer._id}>
//                   <TableCell>
//                     <div className="font-medium">{buyer.name}</div>
//                     <div className="text-sm text-gray-500">
//                       {buyer.transactionId && (
//                         <span>TX: {buyer.transactionId}</span>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div>{buyer.phone}</div>
//                     <div className="text-sm text-gray-500">{buyer.email}</div>
//                   </TableCell>
//                   <TableCell>
//                     {buyer.sareeId && typeof buyer.sareeId === "object" ? (
//                       <div>
//                         <div className="font-medium">{buyer.sareeId.name}</div>
//                         <Badge variant="outline">
//                           {formatPrice(buyer.sareeId.price)}
//                         </Badge>
//                       </div>
//                     ) : (
//                       <span className="text-gray-500">Unknown Item</span>
//                     )}
//                   </TableCell>
//                   <TableCell>{formatDate(buyer.time)}</TableCell>
//                   <TableCell className="text-right">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="mr-2"
//                       onClick={() => openViewModal(buyer)}
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => openDeleteModal(buyer)}
//                     >
//                       <Trash className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//       </CardContent>

//       {/* View Buyer Modal */}
//       <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Buyer Details</DialogTitle>
//           </DialogHeader>
//           {currentBuyer && (
//             <div>
//               <p>
//                 <strong>Name:</strong> {currentBuyer.name}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {currentBuyer.phone}
//               </p>
//               <p>
//                 <strong>Email:</strong> {currentBuyer.email}
//               </p>
//               <p>
//                 <strong>Purchased Item:</strong>{" "}
//                 {currentBuyer.sareeId?.name || "Unknown"}
//               </p>
//               <p>
//                 <strong>Price:</strong>{" "}
//                 {formatPrice(currentBuyer.sareeId?.price)}
//               </p>
//               <p>
//                 <strong>Transaction ID:</strong>{" "}
//                 {currentBuyer.transactionId || "N/A"}
//               </p>
//               <p>
//                 <strong>Purchase Date:</strong> {formatDate(currentBuyer.time)}
//               </p>
//             </div>
//           )}
//           <DialogFooter>
//             <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Modal */}
//       <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Delete</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this buyer?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="destructive" onClick={handleDelete}>
//               Delete
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => setIsDeleteModalOpen(false)}
//             >
//               Cancel
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
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Trash, Edit } from "lucide-react";

export default function BuyersManagement() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBuyer, setCurrentBuyer] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
    email: "",
    transactionId: "",
    address: "",
  });

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://mahalaxmisite-backend.onrender.com/buyers"
      );
      setBuyers(response.data);
      console.log(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching buyers:", error);
      setError("Failed to load buyers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://mahalaxmisite-backend.onrender.com/buyers/${currentBuyer._id}`
      );
      fetchBuyers();
      setIsDeleteModalOpen(false);
      setCurrentBuyer(null);
    } catch (error) {
      console.error("Error deleting buyer:", error);
      setError("Failed to delete buyer. Please try again.");
    }
  };

  const openViewModal = (buyer) => {
    setCurrentBuyer(buyer);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (buyer) => {
    setCurrentBuyer(buyer);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (buyer) => {
    setCurrentBuyer(buyer);
    setEditFormData({
      name: buyer.name || "",
      phone: buyer.phone || "",
      email: buyer.email || "",
      transactionId: buyer.transactionId || "",
      address: buyer.address || "",
    });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateBuyer = async () => {
    try {
      await axios.put(
        `https://mahalaxmisite-backend.onrender.com/buyers/${currentBuyer._id}`,
        editFormData
      );
      fetchBuyers();
      setIsEditModalOpen(false);
      setCurrentBuyer(null);
    } catch (error) {
      console.error("Error updating buyer:", error);
      setError("Failed to update buyer. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Buyers Management</CardTitle>
        <Button onClick={fetchBuyers} variant="outline">
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="text-center p-6">Loading buyers...</div>
        ) : buyers.length === 0 ? (
          <div className="text-center p-10">
            <p className="text-lg text-gray-600">No buyers found</p>
            <p className="text-sm text-gray-500 mt-2">
              Buyers will appear here when customers make purchases
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Purchased Item</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buyers.map((buyer) => (
                <TableRow key={buyer._id}>
                  <TableCell>
                    <div className="font-medium">{buyer.name}</div>
                    <div className="text-sm text-gray-500">
                      {buyer.transactionId && (
                        <span>TX: {buyer.transactionId}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{buyer.phone}</div>
                    <div className="text-sm text-gray-500">{buyer.email}</div>
                  </TableCell>
                  <TableCell>
                    {buyer.sareeId && typeof buyer.sareeId === "object" ? (
                      <div>
                        <div className="font-medium">{buyer.sareeId.name}</div>
                        <Badge variant="outline">
                          {formatPrice(buyer.sareeId.price)}
                        </Badge>
                      </div>
                    ) : (
                      <span className="text-gray-500">Unknown Item</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(buyer.time)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2"
                      onClick={() => openViewModal(buyer)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2"
                      onClick={() => openEditModal(buyer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDeleteModal(buyer)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* View Buyer Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buyer Details</DialogTitle>
          </DialogHeader>
          {currentBuyer && (
            <div>
              <p>
                <strong>Name:</strong> {currentBuyer.name}
              </p>
              <p>
                <strong>Phone:</strong> {currentBuyer.phone}
              </p>
              <p>
                <strong>Email:</strong> {currentBuyer.email || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {currentBuyer.address || "N/A"}
              </p>
              <p>
                <strong>Purchased Item:</strong>{" "}
                {currentBuyer.sareeId?.name || "Unknown"}
              </p>
              <p>
                <strong>Saree ID:</strong>{" "}
                {currentBuyer.sareeId?._id || "Unknown"}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {formatPrice(currentBuyer.sareeId?.price)}
              </p>
              <p>
                <strong>Transaction ID:</strong>{" "}
                {currentBuyer.transactionId || "N/A"}
              </p>
              <p>
                <strong>Purchase Date:</strong> {formatDate(currentBuyer.time)}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Buyer Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Buyer</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editFormData.name}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="transactionId" className="text-right">
                Transaction ID
              </Label>
              <Input
                id="transactionId"
                name="transactionId"
                value={editFormData.transactionId}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={editFormData.address}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateBuyer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this buyer?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
