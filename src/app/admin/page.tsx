"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard,
  Bed,
  Calendar,
  LogOut,
  Save,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Room, Reservation } from "@/lib/types";

type Tab = "dashboard" | "rooms" | "reservations";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [roomsRes, reservationsRes] = await Promise.all([
        fetch("/api/admin/rooms"),
        fetch("/api/admin/reservations"),
      ]);
      if (roomsRes.status === 401) {
        setAuthenticated(false);
        return;
      }
      const roomsData = await roomsRes.json();
      const reservationsData = await reservationsRes.json();
      setRooms(roomsData.rooms ?? []);
      setReservations(reservationsData.reservations ?? []);
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      fetchData();
    } else {
      setLoginError("Invalid password");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
  };

  const saveRooms = async () => {
    const res = await fetch("/api/admin/rooms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rooms }),
    });
    if (res.ok) {
      setSaveMessage("Rooms saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const updateReservationStatus = async (id: string, status: Reservation["status"]) => {
    await fetch("/api/admin/reservations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  };

  const updateRoomPrice = (roomId: string, price: number) => {
    setRooms(rooms.map((r) => (r.id === roomId ? { ...r, pricePerNight: price } : r)));
  };

  const updateRoomUnits = (roomId: string, units: number) => {
    setRooms(rooms.map((r) => (r.id === roomId ? { ...r, totalUnits: units } : r)));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-navy-950 font-bold text-2xl">GE</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-navy-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-2">Grand Ethiopia Hotel CMS</p>
          </div>
          {loginError && <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 mb-4 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
          <button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 rounded-lg font-semibold transition-colors">
            Sign In
          </button>
          <p className="text-xs text-gray-400 text-center mt-4">Default password: admin123</p>
        </form>
      </div>
    );
  }

  const confirmedCount = reservations.filter((r) => r.status === "confirmed").length;
  const pendingCount = reservations.filter((r) => r.status === "pending").length;
  const totalRevenue = reservations
    .filter((r) => r.status === "confirmed")
    .reduce((sum, r) => sum + r.totalPrice, 0);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-navy-950 text-white p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center font-bold text-navy-950">GE</div>
          <div>
            <p className="font-semibold text-sm">Admin Panel</p>
            <p className="text-xs text-white/50">Hotel CMS</p>
          </div>
        </div>
        <nav className="space-y-2 flex-1">
          {[
            { id: "dashboard" as Tab, label: "Dashboard", icon: LayoutDashboard },
            { id: "rooms" as Tab, label: "Rooms", icon: Bed },
            { id: "reservations" as Tab, label: "Reservations", icon: Calendar },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                activeTab === item.id ? "bg-gold-500 text-white" : "text-white/70 hover:bg-white/10"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white text-sm transition-colors"
        >
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </aside>

      <main className="flex-1 p-8">
        {saveMessage && (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6">{saveMessage}</div>
        )}

        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold text-navy-900 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Reservations", value: reservations.length, icon: Calendar, color: "bg-blue-500" },
                { label: "Confirmed", value: confirmedCount, icon: CheckCircle, color: "bg-green-500" },
                { label: "Pending", value: pendingCount, icon: Clock, color: "bg-yellow-500" },
                { label: "Revenue (ETB)", value: totalRevenue.toLocaleString(), icon: DollarSign, color: "bg-gold-500" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-navy-900 mb-4">Recent Reservations</h2>
              {reservations.slice(-5).reverse().map((r) => (
                <div key={r.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-sm">{r.guestName}</p>
                    <p className="text-xs text-gray-500">{r.checkIn} → {r.checkOut}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    r.status === "confirmed" ? "bg-green-100 text-green-700" :
                    r.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {r.status}
                  </span>
                </div>
              ))}
              {reservations.length === 0 && <p className="text-gray-400 text-sm">No reservations yet</p>}
            </div>
          </div>
        )}

        {activeTab === "rooms" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-navy-900">Room Management</h1>
              <button
                onClick={saveRooms}
                className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
            <div className="space-y-4">
              {rooms.map((room) => (
                <div key={room.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-navy-900">{room.name.en}</h3>
                      <p className="text-sm text-gray-500 capitalize">{room.category} · {room.size}</p>
                    </div>
                    <span className="text-xs bg-navy-100 text-navy-700 px-3 py-1 rounded-full">{room.id}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Price per Night (ETB)</label>
                      <input
                        type="number"
                        value={room.pricePerNight}
                        onChange={(e) => updateRoomPrice(room.id, Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Total Units</label>
                      <input
                        type="number"
                        value={room.totalUnits}
                        onChange={(e) => updateRoomUnits(room.id, Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reservations" && (
          <div>
            <h1 className="text-2xl font-bold text-navy-900 mb-8">Reservations</h1>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : reservations.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No reservations yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 font-semibold text-gray-600">ID</th>
                        <th className="text-left px-6 py-4 font-semibold text-gray-600">Guest</th>
                        <th className="text-left px-6 py-4 font-semibold text-gray-600">Dates</th>
                        <th className="text-left px-6 py-4 font-semibold text-gray-600">Guests</th>
                        <th className="text-left px-6 py-4 font-semibold text-gray-600">Total</th>
                        <th className="text-left px-6 py-4 font-semibold text-gray-600">Payment</th>
                        <th className="text-left px-6 py-4 font-semibold text-gray-600">Status</th>
                        <th className="text-left px-6 py-4 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((r) => (
                        <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50">
                          <td className="px-6 py-4 font-mono text-xs">{r.id}</td>
                          <td className="px-6 py-4">
                            <p className="font-medium">{r.guestName}</p>
                            <p className="text-xs text-gray-500">{r.guestEmail}</p>
                          </td>
                          <td className="px-6 py-4 text-xs">{r.checkIn}<br />{r.checkOut}</td>
                          <td className="px-6 py-4">{r.adults}+{r.children}</td>
                          <td className="px-6 py-4 font-semibold">{r.totalPrice.toLocaleString()} ETB</td>
                          <td className="px-6 py-4 capitalize text-xs">{r.paymentMethod}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              r.status === "confirmed" ? "bg-green-100 text-green-700" :
                              r.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              {r.status !== "confirmed" && (
                                <button
                                  onClick={() => updateReservationStatus(r.id, "confirmed")}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                  title="Confirm"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                              {r.status !== "cancelled" && (
                                <button
                                  onClick={() => updateReservationStatus(r.id, "cancelled")}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                  title="Cancel"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
