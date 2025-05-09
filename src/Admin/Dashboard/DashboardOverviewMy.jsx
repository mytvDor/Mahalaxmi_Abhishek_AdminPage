import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardOverviewMy({ stats }) {
  const [recentBuyers, setRecentBuyers] = useState([]);
  const [topSarees, setTopSarees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      setLoading(true);

      // Fetch buyers data to get recent purchases
      const buyersRes = await axios.get(
        "https://mahalaxmisite-backend.onrender.com/buyers"
      );
      const buyers = buyersRes.data;

      // Get most recent 5 buyers
      const sortedBuyers = [...buyers]
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .slice(0, 5);
      setRecentBuyers(sortedBuyers);

      // Count purchases per saree to find top selling items
      const sareeCounts = {};
      buyers.forEach((buyer) => {
        if (buyer.sareeId) {
          const sareeId =
            typeof buyer.sareeId === "object"
              ? buyer.sareeId._id
              : buyer.sareeId;
          sareeCounts[sareeId] = (sareeCounts[sareeId] || 0) + 1;
        }
      });

      // Get sarees and match with counts
      const sareesRes = await axios.get(
        "https://mahalaxmisite-backend.onrender.com/sarees"
      );
      const sarees = sareesRes.data;

      // Create data for top sarees chart
      const topSareeData = sarees
        .map((saree) => ({
          name: saree.name,
          value: sareeCounts[saree._id] || 0,
          price: saree.price,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      setTopSarees(topSareeData);
    } catch (error) {
      console.error("Error fetching overview data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Top Selling Sarees</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading chart data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSarees}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value} sales (${formatCurrency(
                      value * props.payload.price
                    )})`,
                    "Sales",
                  ]}
                />
                <Bar dataKey="value" fill="#8884d8" name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading recent purchases...</p>
            </div>
          ) : recentBuyers.length === 0 ? (
            <p className="text-gray-500 py-10 text-center">No purchases yet</p>
          ) : (
            <div className="space-y-4">
              {recentBuyers.map((buyer) => (
                <div key={buyer._id} className="border-b pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{buyer.name}</p>
                      <p className="text-sm text-gray-500">{buyer.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{formatDate(buyer.time)}</p>
                      {buyer.sareeId && typeof buyer.sareeId === "object" && (
                        <p className="font-medium">
                          {formatCurrency(buyer.sareeId.price)}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm mt-1">
                    Purchased:{" "}
                    {buyer.sareeId && typeof buyer.sareeId === "object"
                      ? buyer.sareeId.name
                      : "Unknown Saree"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
