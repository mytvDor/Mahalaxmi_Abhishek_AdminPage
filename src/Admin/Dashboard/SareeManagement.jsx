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
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Trash, Pencil, Plus, Image } from "lucide-react";

// export default function SareeManagement() {
//   const [sarees, setSarees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [currentSaree, setCurrentSaree] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: "",
//   });

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
//       setError("Failed to load sarees. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (currentSaree) {
//         // Update existing saree
//         await axios.put(
//           `https://mahalaxmisite-backend.onrender.com/sarees/${currentSaree._id}`,
//           formData
//         );
//       } else {
//         // Create new saree
//         await axios.post("https://mahalaxmisite-backend.onrender.com/sarees", formData);
//       }
//       fetchSarees();
//       setIsModalOpen(false);
//       resetForm();
//     } catch (error) {
//       console.error("Error saving saree:", error);
//       setError("Failed to save saree. Please try again.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`https://mahalaxmisite-backend.onrender.com/sarees/${currentSaree._id}`);
//       fetchSarees();
//       setIsDeleteModalOpen(false);
//       setCurrentSaree(null);
//     } catch (error) {
//       console.error("Error deleting saree:", error);
//       setError("Failed to delete saree. Please try again.");
//     }
//   };

//   const openEditModal = (saree) => {
//     setCurrentSaree(saree);
//     setFormData({
//       name: saree.name,
//       price: saree.price,
//       description: saree.description,
//       image: saree.image,
//     });
//     setIsModalOpen(true);
//   };

//   const openAddModal = () => {
//     setCurrentSaree(null);
//     resetForm();
//     setIsModalOpen(true);
//   };

//   const openDeleteModal = (saree) => {
//     setCurrentSaree(saree);
//     setIsDeleteModalOpen(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       price: "",
//       description: "",
//       image: "",
//     });
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle>Sarees Management</CardTitle>
//         <Button onClick={openAddModal}>
//           <Plus className="mr-2 h-4 w-4" /> Add New Saree
//         </Button>
//       </CardHeader>
//       <CardContent>
//         {error && (
//           <Alert variant="destructive" className="mb-4">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         {loading ? (
//           <div className="text-center p-6">Loading sarees...</div>
//         ) : sarees.length === 0 ? (
//           <div className="text-center p-10">
//             <p className="text-lg text-gray-600">No sarees found</p>
//             <Button onClick={openAddModal} className="mt-4">
//               Add Your First Saree
//             </Button>
//           </div>
//         ) : (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Image</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Added Date</TableHead>
//                 <TableHead>sell</TableHead>

//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {sarees.map((saree) => (
//                 <TableRow key={saree._id}>
//                   <TableCell>
//                     <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
//                       {saree.image ? (
//                         <img
//                           src={saree.image}
//                           alt={saree.name}
//                           className="h-full w-full object-cover"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = "/api/placeholder/100/100";
//                           }}
//                         />
//                       ) : (
//                         <div className="h-full w-full flex items-center justify-center">
//                           <Image className="h-6 w-6 text-gray-400" />
//                         </div>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="font-medium">{saree.name}</div>
//                     <div className="text-sm text-gray-500 truncate max-w-xs">
//                       {saree.description}
//                     </div>
//                   </TableCell>
//                   <TableCell>{formatPrice(saree.price)}</TableCell>
//                   <TableCell>{formatDate(saree.date)}</TableCell>
//                   <TableCell>{saree.sell ? "Sold" : "Listed"}</TableCell>

//                   <TableCell className="text-right">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="mr-2"
//                       onClick={() => openEditModal(saree)}
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => openDeleteModal(saree)}
//                     >
//                       <Trash className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}

//         {/* Add/Edit Saree Modal */}
//         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>
//                 {currentSaree ? "Edit Saree" : "Add New Saree"}
//               </DialogTitle>
//               <DialogDescription>
//                 {currentSaree
//                   ? "Update the details of this saree"
//                   : "Fill in the details to add a new saree"}
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit}>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="name" className="text-right">
//                     Name
//                   </Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="price" className="text-right">
//                     Price (₹)
//                   </Label>
//                   <Input
//                     id="price"
//                     name="price"
//                     type="number"
//                     value={formData.price}
//                     onChange={handleChange}
//                     className="col-span-3"
//                     required
//                     min="0"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="image" className="text-right">
//                     Image URL
//                   </Label>
//                   <Input
//                     id="image"
//                     name="image"
//                     value={formData.image}
//                     onChange={handleChange}
//                     className="col-span-3"
//                     placeholder="https://example.com/image.jpg"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="description" className="text-right">
//                     Description
//                   </Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="col-span-3"
//                     rows={4}
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button type="submit">
//                   {currentSaree ? "Update Saree" : "Add Saree"}
//                 </Button>
//               </DialogFooter>
//             </form>
//           </DialogContent>
//         </Dialog>

//         {/* Delete Confirmation Modal */}
//         <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Confirm Deletion</DialogTitle>
//               <DialogDescription>
//                 Are you sure you want to delete "{currentSaree?.name}"? This
//                 action cannot be undone.
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsDeleteModalOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button variant="destructive" onClick={handleDelete}>
//                 Delete
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </CardContent>
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash, Pencil, Plus, Image } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export default function SareeManagement() {
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSaree, setCurrentSaree] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    sell: false,
  });
  const [activeTab, setActiveTab] = useState("listed");

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
      setError("Failed to load sarees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      sell: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSaree) {
        // Update existing saree
        await axios.put(
          `https://mahalaxmisite-backend.onrender.com/sarees/${currentSaree._id}`,
          formData
        );
      } else {
        // Create new saree
        await axios.post(
          "https://mahalaxmisite-backend.onrender.com/sarees",
          formData
        );
      }
      fetchSarees();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving saree:", error);
      setError("Failed to save saree. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://mahalaxmisite-backend.onrender.com/sarees/${currentSaree._id}`
      );
      fetchSarees();
      setIsDeleteModalOpen(false);
      setCurrentSaree(null);
    } catch (error) {
      console.error("Error deleting saree:", error);
      setError("Failed to delete saree. Please try again.");
    }
  };

  const openEditModal = (saree) => {
    setCurrentSaree(saree);
    setFormData({
      name: saree.name,
      price: saree.price,
      description: saree.description,
      image: saree.image,
      sell: saree.sell || false,
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentSaree(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openDeleteModal = (saree) => {
    setCurrentSaree(saree);
    setIsDeleteModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      sell: false,
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const listedSarees = sarees.filter((saree) => !saree.sell);
  const soldSarees = sarees.filter((saree) => saree.sell);

  const renderSareeTable = (sareesToDisplay) => {
    if (sareesToDisplay.length === 0) {
      return (
        <div className="text-center p-10">
          <p className="text-lg text-gray-600">No sarees found</p>
          {activeTab === "listed" && (
            <Button onClick={openAddModal} className="mt-4">
              Add New Saree
            </Button>
          )}
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Added Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sareesToDisplay.map((saree) => (
            <TableRow key={saree._id}>
              <TableCell>
                <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                  {saree.image ? (
                    <img
                      src={saree.image}
                      alt={saree.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/100/100";
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <Image className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{saree.name}</div>
                <div className="text-sm text-gray-500 truncate max-w-xs">
                  {saree.description}
                </div>
              </TableCell>
              <TableCell>{formatPrice(saree.price)}</TableCell>
              <TableCell>{formatDate(saree.date)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  onClick={() => openEditModal(saree)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openDeleteModal(saree)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sarees Management</CardTitle>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" /> Add New Saree
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="text-center p-6">Loading sarees...</div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="listed">
                Listed Sarees ({listedSarees.length})
              </TabsTrigger>
              <TabsTrigger value="sold">
                Sold Sarees ({soldSarees.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="listed">
              {renderSareeTable(listedSarees)}
            </TabsContent>
            <TabsContent value="sold">
              {renderSareeTable(soldSarees)}
            </TabsContent>
          </Tabs>
        )}

        {/* Add/Edit Saree Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentSaree ? "Edit Saree" : "Add New Saree"}
              </DialogTitle>
              <DialogDescription>
                {currentSaree
                  ? "Update the details of this saree"
                  : "Fill in the details to add a new saree"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price (₹)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className="col-span-3"
                    required
                    min="0"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="col-span-3"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sell" className="text-right">
                    Status
                  </Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="sell"
                      checked={formData.sell}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="sell" className="font-normal">
                      Mark as Sold
                    </Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {currentSaree ? "Update Saree" : "Add Saree"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{currentSaree?.name}"? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
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
      </CardContent>
    </Card>
  );
}
