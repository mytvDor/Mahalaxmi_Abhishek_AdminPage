import { useState } from "react";
import axios from "axios";
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
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SareeUploadForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!name || !price || !description || !image) {
      setError("All fields are required");
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      setError("Please enter a valid price");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://mahalaxmisite-backend.onrender.com/sarees",
        {
          name,
          price: Number(price),
          description,
          image,
        }
      );

      console.log("Saree added successfully:", response.data);
      setSuccess(true);

      // Clear form after successful submission
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.response?.data?.error || "Failed to add saree. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Saree</CardTitle>
          <CardDescription>
            Enter the details to add a new saree to your collection.
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
                  Saree has been added successfully!
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Saree Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter saree name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price in rupees"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter saree description, material, etc."
                required
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="mt-5">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding..." : "Add Saree"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
