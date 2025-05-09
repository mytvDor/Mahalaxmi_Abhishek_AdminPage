// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// export default function SareeGallery() {
//   const [sarees, setSarees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchSarees();
//   }, []);

//   const fetchSarees = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("https://mahalaxmisite-backend.onrender.com/sarees");
//       setSarees(response.data);
//       setError("");
//     } catch (error) {
//       console.error("Error fetching sarees:", error);
//       setError("Failed to load sarees. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to format price in Indian Rupees
//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   // Function to format date
//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-6">Saree Collection</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <Card key={item} className="overflow-hidden">
//               <div className="w-full h-64 bg-gray-200">
//                 <Skeleton className="h-full w-full" />
//               </div>
//               <CardHeader>
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-4 w-1/2" />
//               </CardHeader>
//               <CardContent>
//                 <Skeleton className="h-4 w-full mb-2" />
//                 <Skeleton className="h-4 w-3/4" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-4">
//         <Alert variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//         <Button onClick={fetchSarees} className="mt-4">
//           Try Again
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Saree Collection</h2>
//         <Button onClick={fetchSarees} variant="outline" size="sm">
//           Refresh
//         </Button>
//       </div>

//       {sarees.length === 0 ? (
//         <div className="text-center p-10 border rounded-lg">
//           <p className="text-lg text-gray-600">
//             No sarees found in the collection.
//           </p>
//           <p className="mt-2">Add some sarees to see them here.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {sarees.map((saree) => (
//             <Card key={saree._id} className="flex flex-col overflow-hidden">
//               <div className="w-full h-64 overflow-hidden">
//                 <img
//                   src={saree.image}
//                   alt={saree.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/api/placeholder/400/320";
//                   }}
//                 />
//               </div>
//               <CardHeader>
//                 <div className="flex justify-between items-start">
//                   <CardTitle className="mr-2">{saree.name}</CardTitle>
//                   <Badge variant="secondary" className="ml-auto">
//                     {formatPrice(saree.price)}
//                   </Badge>
//                 </div>
//                 <CardDescription>
//                   Added on {formatDate(saree.date)}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="flex-grow">
//                 <p className="text-sm text-gray-600">{saree.description}</p>
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <Button variant="outline" size="sm">
//                   View Details
//                 </Button>
//                 <Button size="sm">Buy Now</Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";

export default function SareeGallery() {
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedSaree, setSelectedSaree] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  useEffect(() => {
    fetchSarees();
  }, []);

  const fetchSarees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://mahalaxmisite-backend.onrender.com/sarees"
      );
      setSarees(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching sarees:", error);
      setError("Failed to load sarees. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle opening the update dialog and setting form values
  const handleOpenUpdateDialog = (saree) => {
    setSelectedSaree(saree);
    setEditForm({
      name: saree.name,
      price: saree.price,
      description: saree.description,
      image: saree.image,
    });
    setUpdateError("");
    setUpdateSuccess(false);
    setIsUpdateDialogOpen(true);
  };

  // Function to close the update dialog
  const handleCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  // Function to handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  // Function to update saree
  const handleUpdateSaree = async () => {
    if (!selectedSaree) return;

    // Validation
    if (
      !editForm.name ||
      !editForm.price ||
      !editForm.description ||
      !editForm.image
    ) {
      setUpdateError("All fields are required");
      return;
    }

    if (isNaN(editForm.price) || Number(editForm.price) <= 0) {
      setUpdateError("Please enter a valid price");
      return;
    }

    setUpdateLoading(true);
    setUpdateError("");
    setUpdateSuccess(false);

    try {
      const response = await axios.put(
        `https://mahalaxmisite-backend.onrender.com/sarees/${selectedSaree._id}`,
        editForm
      );

      // Update the saree in the state
      setSarees((prevSarees) =>
        prevSarees.map((s) =>
          s._id === selectedSaree._id ? { ...response.data } : s
        )
      );

      setUpdateSuccess(true);
      setTimeout(() => {
        handleCloseUpdateDialog();
        setUpdateSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Error updating saree:", error);
      setUpdateError(
        error.response?.data?.error ||
          "Failed to update saree. Please try again."
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  // Function to delete saree
  const handleDeleteSaree = async (sareeId) => {
    setDeleteLoading(true);
    setDeleteError("");
    setDeleteSuccess(false);

    try {
      await axios.delete(
        `https://mahalaxmisite-backend.onrender.com/sarees/${sareeId}`
      );

      // Remove the saree from the state
      setSarees((prevSarees) => prevSarees.filter((s) => s._id !== sareeId));

      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Error deleting saree:", error);
      setDeleteError(
        error.response?.data?.error ||
          "Failed to delete saree. Please try again."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // Function to format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Saree Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="w-full h-64 bg-gray-200">
                <Skeleton className="h-full w-full" />
              </div>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={fetchSarees} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {deleteSuccess && (
        <Alert className="mb-4">
          <AlertDescription>Saree deleted successfully!</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Saree Collection</h2>
        <Button onClick={fetchSarees} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {sarees.length === 0 ? (
        <div className="text-center p-10 border rounded-lg">
          <p className="text-lg text-gray-600">
            No sarees found in the collection.
          </p>
          <p className="mt-2">Add some sarees to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sarees.map((saree) => (
            <Card key={saree._id} className="flex flex-col overflow-hidden">
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={saree.image}
                  alt={saree.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/api/placeholder/400/320";
                  }}
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="mr-2">{saree.name}</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    {formatPrice(saree.price)}
                  </Badge>
                </div>
                <CardDescription>
                  Added on {formatDate(saree.date)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600">{saree.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenUpdateDialog(saree)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Saree</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{saree.name}"? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      {deleteError && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertDescription>{deleteError}</AlertDescription>
                        </Alert>
                      )}
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteSaree(saree._id)}
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <Button size="sm">Buy Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Saree</DialogTitle>
            <DialogDescription>
              Update the details of this saree. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          {updateError && (
            <Alert variant="destructive">
              <AlertDescription>{updateError}</AlertDescription>
            </Alert>
          )}

          {updateSuccess && (
            <Alert>
              <AlertDescription>Saree updated successfully!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Saree Name</Label>
              <Input
                id="name"
                name="name"
                value={editForm.name}
                onChange={handleFormChange}
                placeholder="Enter saree name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="1"
                value={editForm.price}
                onChange={handleFormChange}
                placeholder="Enter price in rupees"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={editForm.description}
                onChange={handleFormChange}
                placeholder="Enter saree description, material, etc."
                required
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={editForm.image}
                onChange={handleFormChange}
                placeholder="Enter image URL"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseUpdateDialog}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSaree} disabled={updateLoading}>
              {updateLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
