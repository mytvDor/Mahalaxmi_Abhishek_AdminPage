import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  PlusCircle,
  RefreshCw,
  Package,
  Users,
  Calendar,
  PieChart,
} from "lucide-react";
import BookingManagement from "./Dashboard/BookingManagementAdmin";
import SareeManagement from "./dashboard/SareeManagement";
import BuyersManagement from "./dashboard/BuyersManagement";
import DashboardOverview from "./Dashboard/DashboardOverviewMy";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalSarees: 0,
    totalBuyers: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, sareesRes, buyersRes] = await Promise.all([
        axios.get("https://mahalaxmisite-backend.onrender.com/bookings"),
        axios.get("https://mahalaxmisite-backend.onrender.com/sarees"),
        axios.get("https://mahalaxmisite-backend.onrender.com/buyers"),
      ]);

      // Calculate total revenue from buyers and their purchased sarees
      let totalRevenue = 0;
      for (const buyer of buyersRes.data) {
        if (buyer.sareeId && typeof buyer.sareeId === "object") {
          totalRevenue += buyer.sareeId.price || 0;
        }
      }

      setStats({
        totalBookings: bookingsRes.data.length,
        totalSarees: sareesRes.data.length,
        totalBuyers: buyersRes.data.length,
        revenue: totalRevenue,
      });

      setError("");
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
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

  if (loading && activeTab === "overview") {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={fetchDashboardData}>
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={fetchDashboardData} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Data
        </Button>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Bookings
              </CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.totalBookings}</div>
                <Calendar className="h-5 w-5 text-gray-500" />
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Sarees
              </CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.totalSarees}</div>
                <Package className="h-5 w-5 text-gray-500" />
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Buyers
              </CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.totalBuyers}</div>
                <Users className="h-5 w-5 text-gray-500" />
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Revenue
              </CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">
                  {formatCurrency(stats.revenue)}
                </div>
                <PieChart className="h-5 w-5 text-gray-500" />
              </div>
            </CardHeader>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sarees">Sarees</TabsTrigger>
          <TabsTrigger value="buyers">Buyers</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardOverview stats={stats} />
        </TabsContent>

        <TabsContent value="sarees">
          <SareeManagement />
        </TabsContent>

        <TabsContent value="buyers">
          <BuyersManagement />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
