import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SareeUploadForm from "./SareeUploadForm";
import SareeGallery from "./SareeGallery";
import SareeGalleryUser from "../userComponents/SareeGalleryUser";

export default function SareeUpload() {
  // Reference to the gallery component for refreshing
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to trigger refresh of gallery after new upload
  const handleSuccessfulUpload = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Saree Management</h1>

      <Tabs defaultValue="gallery" className="w-full">
        <div className="flex align-middle justify-center">
          {" "}
          <TabsList className="grid w-300px  grid-cols-2">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="upload">Add New Saree</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="gallery">
          <SareeGallery key={refreshTrigger} />
          {/* <SareeGalleryUser /> */}
        </TabsContent>

        <TabsContent value="upload">
          <SareeUploadForm onSuccess={handleSuccessfulUpload} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
