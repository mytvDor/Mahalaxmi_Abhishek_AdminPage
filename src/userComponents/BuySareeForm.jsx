import { useState } from "react";
import axios from "axios";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

export default function BuySareeForm({ saree, open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    transactionId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create the buyer order with saree reference
      const orderData = {
        ...formData,
        sareeId: saree._id,
      };

      const response = await axios.post(
        "https://mahalaxmisite-backend.onrender.com/buyers",
        orderData
      );

      const updatedSaree = { ...saree, sell: true }; // Keep existing saree details and update `sell`

      await axios.put(
        `https://mahalaxmisite-backend.onrender.com/sarees/${saree._id}`,
        updatedSaree
      );

      console.log("Order placed successfully:", response.data);
      setSuccess(true);

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          transactionId: "",
        });
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error("Error placing order:", err);
      setError(
        err.response?.data?.error || "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase Saree</DialogTitle>
          <DialogDescription>
            {saree
              ? `Complete the form to purchase "${
                  saree.name
                }" for ${new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(saree.price)}`
              : "Complete the form to purchase this saree"}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-xl font-medium text-center">
              Order Placed Successfully!
            </h3>
            <p className="text-center text-gray-500 mt-2">
              Thank you for your purchase. We'll contact you shortly.
            </p>
          </div>
        ) : (
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
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transactionId" className="text-right">
                  Transaction ID
                </Label>
                <Input
                  id="transactionId"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                  placeholder="UPI/Bank reference number"
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Complete Purchase"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
