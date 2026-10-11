import { useCallback, useEffect, useMemo, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Copy,
  Download,
  Eye,
  Edit,
  RefreshCw,
  Search,
  Trash2,
  CalendarX,
  Check,
  X,
  Loader2,
} from "lucide-react";

const API_URL = "https://mahalaxmisite-backend.onrender.com";
const TIME_OPTIONS = ["5 AM", "7 AM", "9:30 AM"];

function getBookingTimestamp(booking) {
  const value = booking?.formFilingDateTime;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (value) {
    const parsed = new Date(value).getTime();
    if (Number.isFinite(parsed)) return parsed;
  }
  // Older records may not have a creation timestamp. Fall back to their ID or booking date.
  const idTimestamp =
    booking?._id && /^[0-9a-f]{24}$/i.test(booking._id)
      ? parseInt(booking._id.slice(0, 8), 16) * 1000
      : NaN;
  if (Number.isFinite(idTimestamp)) return idTimestamp;
  return new Date(booking?.bookingDateTime || 0).getTime();
}

function localDateInputValue(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletePastModalOpen, setIsDeletePastModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [savingId, setSavingId] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [editedBooking, setEditedBooking] = useState({
    name: "",
    phone: "",
    bookingDate: "",
    time: "",
    transactionId: "",
    isCompleted: false,
  });

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const showSuccess = (message) => {
    setError("");
    setSuccess(message);
    window.setTimeout(
      () => setSuccess((current) => (current === message ? "" : current)),
      3500,
    );
  };

  const fetchBookings = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      setError("");
      const response = await axios.get(`${API_URL}/bookings`, {
        timeout: 180000,
      });
      const records = Array.isArray(response.data) ? response.data : [];
      setBookings(
        records.sort((a, b) => getBookingTimestamp(b) - getBookingTimestamp(a)),
      );
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(
        err.response?.data?.error ||
          "Failed to load bookings. Please try again.",
      );
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const todayStart = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }, [bookings.length]);

  const formatDate = (dateValue) => {
    if (!dateValue) return "—";
    const date = new Date(dateValue);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
  };

  const formatTime = (dateValue) => {
    if (!dateValue) return "—";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "—";
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (hours === 5 && minutes === 0) return "5 AM";
    if (hours === 7 && minutes === 0) return "7 AM";
    if (hours === 9 && minutes === 30) return "9:30 AM";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const copyText = async (value, label) => {
    if (!value) {
      setError(`${label} is not available to copy.`);
      return;
    }
    try {
      await navigator.clipboard.writeText(String(value));
      showSuccess(`${label} copied to clipboard.`);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      setError(
        "Could not copy automatically. Please select and copy the text manually.",
      );
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
    const date = new Date(booking.bookingDateTime);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    let time = formatTime(booking.bookingDateTime);
    if (!TIME_OPTIONS.includes(time)) {
      if (hour === 5) time = "5 AM";
      else if (hour === 7) time = "7 AM";
      else if (hour === 9 && minutes >= 15 && minutes <= 45) time = "9:30 AM";
      else time = "5 AM";
    }
    setEditedBooking({
      name: booking.name || "",
      phone: booking.phone || "",
      bookingDate: localDateInputValue(booking.bookingDateTime),
      time:
        booking.time && TIME_OPTIONS.includes(booking.time)
          ? booking.time
          : time,
      transactionId: booking.transactionId || "",
      isCompleted: Boolean(booking.isCompleted),
    });
    setIsEditModalOpen(true);
  };

  const handleEdit = async () => {
    if (!currentBooking?._id) return;
    try {
      clearMessages();
      const [hour, minute] =
        editedBooking.time === "5 AM"
          ? [5, 0]
          : editedBooking.time === "7 AM"
            ? [7, 0]
            : [9, 30];
      const [year, month, day] = editedBooking.bookingDate
        .split("-")
        .map(Number);
      const bookingDateTime = new Date(
        year,
        month - 1,
        day,
        hour,
        minute,
        0,
        0,
      );
      if (
        !editedBooking.bookingDate ||
        Number.isNaN(bookingDateTime.getTime())
      ) {
        setError("Please select a valid booking date and time.");
        return;
      }
      const payload = {
        name: editedBooking.name.trim(),
        phone: editedBooking.phone.trim(),
        transactionId: editedBooking.transactionId.trim(),
        bookingDateTime: bookingDateTime.toISOString(),
        time: editedBooking.time,
        isCompleted: Boolean(editedBooking.isCompleted),
      };
      setSavingId(currentBooking._id);
      await axios.put(`${API_URL}/bookings/${currentBooking._id}`, payload, {
        timeout: 180000,
      });
      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === currentBooking._id
            ? { ...booking, ...payload }
            : booking,
        ),
      );
      setIsEditModalOpen(false);
      setCurrentBooking(null);
      showSuccess("Booking updated successfully.");
      await fetchBookings(false);
    } catch (err) {
      console.error("Error updating booking:", err);
      setError(
        err.response?.data?.error ||
          "Failed to update booking. Please try again.",
      );
    } finally {
      setSavingId("");
    }
  };

  const handleCompletionChange = async (booking, isCompleted) => {
    if (!booking?._id || savingId) return;
    setSavingId(booking._id);
    clearMessages();
    // Optimistic UI update; revert if the API fails.
    setBookings((previous) =>
      previous.map((item) =>
        item._id === booking._id ? { ...item, isCompleted } : item,
      ),
    );
    try {
      await axios.put(
        `${API_URL}/bookings/${booking._id}`,
        { isCompleted },
        { timeout: 180000 },
      );
      setCurrentBooking((previous) =>
        previous?._id === booking._id ? { ...previous, isCompleted } : previous,
      );
      showSuccess(
        isCompleted
          ? "Booking marked as completed and updated."
          : "Booking marked as pending and updated.",
      );
    } catch (err) {
      setBookings((previous) =>
        previous.map((item) =>
          item._id === booking._id
            ? { ...item, isCompleted: Boolean(booking.isCompleted) }
            : item,
        ),
      );
      console.error("Error updating completion status:", err);
      setError(
        err.response?.data?.error ||
          "Could not update completion status. Please try again.",
      );
    } finally {
      setSavingId("");
    }
  };

  const handleDelete = async () => {
    if (!currentBooking?._id) return;
    try {
      setDeleting(true);
      clearMessages();
      await axios.delete(`${API_URL}/bookings/${currentBooking._id}`, {
        timeout: 180000,
      });
      setBookings((previous) =>
        previous.filter((booking) => booking._id !== currentBooking._id),
      );
      setIsDeleteModalOpen(false);
      setCurrentBooking(null);
      showSuccess("Booking deleted successfully.");
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError(
        err.response?.data?.error ||
          "Failed to delete booking. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleDeletePastBookings = async () => {
    try {
      setDeleting(true);
      clearMessages();
      const cutoff = new Date();
      cutoff.setHours(0, 0, 0, 0);
      await axios.delete(
        `${API_URL}/bookings/delete-past/${encodeURIComponent(cutoff.toISOString())}`,
        { timeout: 180000 },
      );
      setIsDeletePastModalOpen(false);
      showSuccess("Past bookings deleted successfully.");
      await fetchBookings(false);
    } catch (err) {
      console.error("Error deleting past bookings:", err);
      setError(
        err.response?.data?.error ||
          "Failed to delete past bookings. Check that the backend delete-past route is configured.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteAllBookings = async () => {
    try {
      setDeleting(true);
      clearMessages();
      await axios.delete(`${API_URL}/bookings`, { timeout: 180000 });
      setBookings([]);
      setIsDeleteAllModalOpen(false);
      showSuccess("All bookings deleted successfully.");
    } catch (err) {
      console.error("Error deleting all bookings:", err);
      setError(
        err.response?.data?.error ||
          "Failed to delete all bookings. Check that the backend DELETE /bookings route is configured.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const downloadBookingsData = () => {
    try {
      const dateString = new Date().toISOString().slice(0, 10);
      const rows = [
        [
          "Name",
          "Phone",
          "Date",
          "Time",
          "Transaction ID",
          "Completed",
          "Form Submitted At",
        ],
        ...filteredAndSortedBookings.map((booking) => [
          booking.name,
          booking.phone,
          formatDate(booking.bookingDateTime),
          booking.time || formatTime(booking.bookingDateTime),
          booking.transactionId || "",
          booking.isCompleted ? "Yes" : "No",
          booking.formFilingDateTime
            ? new Date(Number(booking.formFilingDateTime)).toLocaleString()
            : "",
        ]),
      ];
      const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n");
      const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bookings-${dateString}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      showSuccess("Bookings data downloaded successfully.");
    } catch (err) {
      console.error("Error downloading bookings:", err);
      setError("Failed to download bookings data.");
    }
  };

  const pastBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const date = new Date(booking.bookingDateTime).getTime();
        return Number.isFinite(date) && date < todayStart;
      }),
    [bookings, todayStart],
  );

  const upcomingBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const date = new Date(booking.bookingDateTime).getTime();
        return !Number.isFinite(date) || date >= todayStart;
      }),
    [bookings, todayStart],
  );

  const bookingsForTab = activeTab === "past" ? pastBookings : upcomingBookings;

  const filteredAndSortedBookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = bookingsForTab.filter((booking) => {
      const values = [
        booking.name,
        booking.phone,
        booking.transactionId,
        booking.time,
        booking.isCompleted ? "completed" : "pending",
      ];
      return (
        !query ||
        values.some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(query),
        )
      );
    });
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return getBookingTimestamp(a) - getBookingTimestamp(b);
        case "bookingNewest":
          return (
            new Date(b.bookingDateTime).getTime() -
            new Date(a.bookingDateTime).getTime()
          );
        case "bookingOldest":
          return (
            new Date(a.bookingDateTime).getTime() -
            new Date(b.bookingDateTime).getTime()
          );
        case "nameAsc":
          return String(a.name || "").localeCompare(String(b.name || ""));
        case "nameDesc":
          return String(b.name || "").localeCompare(String(a.name || ""));
        case "newest":
        default:
          return getBookingTimestamp(b) - getBookingTimestamp(a);
      }
    });
  }, [bookingsForTab, search, sortBy]);

  const renderCopyButton = (value, label) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-7 w-7 shrink-0"
      title={`Copy ${label}`}
      aria-label={`Copy ${label}`}
      onClick={() => copyText(value, label)}
      disabled={!value}
    >
      <Copy className="h-3.5 w-3.5" />
    </Button>
  );

  const renderBookingsTable = () => {
    if (!filteredAndSortedBookings.length) {
      return (
        <div className="rounded-md border p-10 text-center text-gray-500">
          No bookings match your search.
        </div>
      );
    }

    return (
      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="min-w-[1180px] border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="border-r bg-muted">Name</TableHead>
              <TableHead className="border-r bg-muted">Phone</TableHead>
              <TableHead className="border-r bg-muted min-w-[150px]">
                Transaction ID
              </TableHead>
              <TableHead className="border-r bg-muted">Date</TableHead>
              <TableHead className="border-r bg-muted">Aarti Time</TableHead>
              <TableHead className="border-r bg-muted">Submitted</TableHead>
              <TableHead className=" border-l bg-muted text-center">
                status
              </TableHead>

              <TableHead className="border-l bg-muted text-center">Details</TableHead>
              <TableHead className="w-[76px] border-l border-r bg-muted text-center">
                Edit
              </TableHead>
              <TableHead className="w-[76px]border-l border-r bg-muted text-center">
                Delete
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedBookings.map((booking) => (
              <TableRow
                key={booking._id}
                className={booking.isCompleted ? "bg-green-50/50" : ""}
              >
                <TableCell className="border-r font-medium">
                  {booking.name || "—"}
                </TableCell>
                <TableCell className="border-r">
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <span>{booking.phone || "—"}</span>
                    {renderCopyButton(booking.phone, "phone number")}
                  </div>
                </TableCell>
                <TableCell className="border-r">
                  <div className="flex items-center gap-1">
                    <span
                      className="max-w-[190px] truncate font-mono text-xs"
                      title={booking.transactionId || ""}
                    >
                      {booking.transactionId || "—"}
                    </span>
                    {renderCopyButton(booking.transactionId, "transaction ID")}
                  </div>
                </TableCell>
                <TableCell className="border-r whitespace-nowrap">
                  {formatDate(booking.bookingDateTime)}
                </TableCell>
                <TableCell className="border-r whitespace-nowrap">
                  {booking.time || formatTime(booking.bookingDateTime)}
                </TableCell>

                <TableCell className="border-r border-l whitespace-nowrap text-xs text-muted-foreground">
                  {booking.formFilingDateTime
                    ? new Date(
                        Number(booking.formFilingDateTime),
                      ).toLocaleString()
                    : "—"}
                </TableCell>

                <TableCell className=" border-l border-r bg-background text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Switch
                      checked={Boolean(booking.isCompleted)}
                      onCheckedChange={(checked) =>
                        handleCompletionChange(booking, checked)
                      }
                      disabled={Boolean(savingId)}
                      aria-label={`Mark ${booking.name || "booking"} as ${booking.isCompleted ? "pending" : "completed"}`}
                    />
                  </div>
                </TableCell>
                <TableCell className="border-r text-center">
                  <Button
                    variant="outline"
                    size="icon"
                    title="View details"
                    onClick={() => openViewModal(booking)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className=" border-r bg-background text-center">
                  <Button
                    variant="outline"
                    size="icon"
                    title="Edit booking"
                    onClick={() => openEditModal(booking)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className=" border-r bg-background text-center">
                  <Button
                    variant="outline"
                    size="icon"
                    title="Delete booking"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => openDeleteModal(booking)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const copyField = (value, label) => (
    <div className="flex min-w-0 items-center gap-1">
      <span className="break-all">{value || "—"}</span>
      {renderCopyButton(value, label)}
    </div>
  );

  return (
    <>
      {success && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 top-4 z-[100] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 shadow-xl sm:right-6 sm:top-6"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{success}</span>
          <button
            type="button"
            className="ml-2 rounded p-1 hover:bg-green-100"
            onClick={() => setSuccess("")}
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <Card className="w-full">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
          <CardTitle>Bookings Management</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={downloadBookingsData}
              variant="outline"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Data
            </Button>
            <Button
              onClick={() => setIsDeletePastModalOpen(true)}
              variant="outline"
              className="gap-2 text-red-600 hover:bg-red-50"
              disabled={pastBookings.length === 0}
            >
              <CalendarX className="h-4 w-4" />
              Delete Past ({pastBookings.length})
            </Button>
            <Button
              onClick={() => setIsDeleteAllModalOpen(true)}
              variant="destructive"
              className="gap-2"
              disabled={bookings.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              Delete All
            </Button>
            <Button
              onClick={() => fetchBookings()}
              variant="outline"
              className="gap-2"
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
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
          <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(220px,1fr)_220px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, phone, transaction ID, status..."
                className="pl-9"
                aria-label="Search bookings"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger aria-label="Sort bookings">
                <SelectValue placeholder="Sort bookings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  Newest submitted first (default)
                </SelectItem>
                <SelectItem value="oldest">Oldest submitted first</SelectItem>
                <SelectItem value="bookingNewest">
                  Latest booking date first
                </SelectItem>
                <SelectItem value="bookingOldest">
                  Earliest booking date first
                </SelectItem>
                <SelectItem value="nameAsc">Name A–Z</SelectItem>
                <SelectItem value="nameDesc">Name Z–A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading bookings...
            </div>
          ) : (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-5 grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">
                  Upcoming ({upcomingBookings.length})
                </TabsTrigger>
                <TabsTrigger value="past">
                  Past ({pastBookings.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                {renderBookingsTable()}
              </TabsContent>
              <TabsContent value="past">{renderBookingsTable()}</TabsContent>
            </Tabs>
          )}
        </CardContent>

        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
            </DialogHeader>
            {currentBooking && (
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-2">
                  <span className="font-semibold">Name</span>
                  <span className="break-words">
                    {currentBooking.name || "—"}
                  </span>
                </div>
                <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-2">
                  <span className="font-semibold">Phone</span>
                  {copyField(currentBooking.phone, "phone number")}
                </div>
                <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-2">
                  <span className="font-semibold">Date</span>
                  <span>{formatDate(currentBooking.bookingDateTime)}</span>
                </div>
                <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-2">
                  <span className="font-semibold">Time</span>
                  <span>
                    {currentBooking.time ||
                      formatTime(currentBooking.bookingDateTime)}
                  </span>
                </div>
                <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-2">
                  <span className="font-semibold">Transaction ID</span>
                  {copyField(currentBooking.transactionId, "transaction ID")}
                </div>
                <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-2">
                  <span className="font-semibold">Submitted</span>
                  <span>
                    {currentBooking.formFilingDateTime
                      ? new Date(
                          Number(currentBooking.formFilingDateTime),
                        ).toLocaleString()
                      : "—"}
                  </span>
                </div>
                <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-2">
                  <span className="font-semibold">Status</span>
                  <span
                    className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${currentBooking.isCompleted ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {currentBooking.isCompleted ? (
                      <>
                        <Check className="h-3 w-3" />
                        Completed
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3" />
                        Pending
                      </>
                    )}
                  </span>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Booking</DialogTitle>
              <DialogDescription>
                Update booking information and completion status.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editedBooking.name}
                  onChange={(event) =>
                    setEditedBooking((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-phone"
                    value={editedBooking.phone}
                    onChange={(event) =>
                      setEditedBooking((previous) => ({
                        ...previous,
                        phone: event.target.value,
                      }))
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    title="Copy phone number"
                    onClick={() =>
                      copyText(editedBooking.phone, "phone number")
                    }
                    disabled={!editedBooking.phone}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-transaction">Transaction ID / UTR</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-transaction"
                    value={editedBooking.transactionId}
                    onChange={(event) =>
                      setEditedBooking((previous) => ({
                        ...previous,
                        transactionId: event.target.value,
                      }))
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    title="Copy transaction ID"
                    onClick={() =>
                      copyText(editedBooking.transactionId, "transaction ID")
                    }
                    disabled={!editedBooking.transactionId}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editedBooking.bookingDate}
                  onChange={(event) =>
                    setEditedBooking((previous) => ({
                      ...previous,
                      bookingDate: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-time">Time</Label>
                <Select
                  value={editedBooking.time}
                  onValueChange={(value) =>
                    setEditedBooking((previous) => ({
                      ...previous,
                      time: value,
                    }))
                  }
                >
                  <SelectTrigger id="edit-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label htmlFor="edit-completed" className="font-semibold">
                    Mark as completed
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Switch on when this booking is complete.
                  </p>
                </div>
                <Switch
                  id="edit-completed"
                  checked={Boolean(editedBooking.isCompleted)}
                  onCheckedChange={(checked) =>
                    setEditedBooking((previous) => ({
                      ...previous,
                      isCompleted: checked,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={Boolean(savingId)}
              >
                Cancel
              </Button>
              <Button onClick={handleEdit} disabled={Boolean(savingId)}>
                {savingId ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this booking?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            {currentBooking && (
              <div className="my-2 space-y-1 rounded-md border p-3 text-sm">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {currentBooking.name}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {currentBooking.phone}
                </p>
                <p>
                  <span className="font-medium">Transaction ID:</span>{" "}
                  {currentBooking.transactionId || "—"}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(currentBooking.bookingDateTime)} ·{" "}
                  {currentBooking.time ||
                    formatTime(currentBooking.bookingDateTime)}
                </p>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isDeletePastModalOpen}
          onOpenChange={setIsDeletePastModalOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete past bookings?</DialogTitle>
              <DialogDescription>
                This will permanently delete all {pastBookings.length} bookings
                dated before today. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeletePastModalOpen(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeletePastBookings}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete Past Bookings"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isDeleteAllModalOpen}
          onOpenChange={setIsDeleteAllModalOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete ALL bookings?</DialogTitle>
              <DialogDescription className="font-medium text-red-600">
                You are about to permanently delete all {bookings.length}{" "}
                bookings. This cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteAllModalOpen(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAllBookings}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete All Bookings"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
