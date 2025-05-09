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

// export default function SareeGalleryUser() {
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
import BuySareeForm from "./BuySareeForm"; // Import the new component

export default function SareeGalleryUser() {
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSaree, setSelectedSaree] = useState(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

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

  // Handler for opening the buy modal
  const handleBuyClick = (saree) => {
    setSelectedSaree(saree);
    setIsBuyModalOpen(true);
  };

  // Handler for closing the buy modal
  const handleCloseModal = () => {
    setIsBuyModalOpen(false);
    // Reset selectedSaree after a delay to avoid UI flicker
    setTimeout(() => setSelectedSaree(null), 300);
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
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sarees.map((saree) =>
            saree.sell === true ? null : (
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
                  {/* <Button variant="outline" size="sm">
                    View Details
                  </Button> */}
                  <Button size="sm" onClick={() => handleBuyClick(saree)}>
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      )}

      {/* Buy Saree Modal */}
      {selectedSaree && (
        <BuySareeForm
          saree={selectedSaree}
          open={isBuyModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
