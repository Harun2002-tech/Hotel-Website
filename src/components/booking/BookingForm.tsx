"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { differenceInDays, format, addDays } from "date-fns";
import {
  Calendar,
  Users,
  CreditCard,
  Smartphone,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { Room } from "@/lib/types";
import { Button } from "@/components/ui/Button";

interface AvailabilityResult {
  roomId: string;
  available: boolean;
  availableUnits: number;
}

interface BookingFormProps {
  rooms: Room[];
}

export function BookingForm({ rooms }: BookingFormProps) {
  const { locale, t } = useLocale();
  const searchParams = useSearchParams();
  const preselectedRoom = searchParams.get("room");

  const today = format(new Date(), "yyyy-MM-dd");
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(preselectedRoom ?? "");
  const [availability, setAvailability] = useState<AvailabilityResult[]>([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"telebirr" | "cbebirr" | "card">("telebirr");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState("");

  const nights = Math.max(1, differenceInDays(new Date(checkOut), new Date(checkIn)));
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  const totalPrice = selectedRoom ? selectedRoom.pricePerNight * nights : 0;

  const checkAvailability = useCallback(async () => {
    if (!checkIn || !checkOut || checkIn >= checkOut) return;
    setCheckingAvailability(true);
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkIn, checkOut }),
      });
      const data = await res.json();
      setAvailability(data.results ?? []);
    } catch {
      setError("Failed to check availability");
    } finally {
      setCheckingAvailability(false);
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    if (step >= 2) checkAvailability();
  }, [step, checkAvailability]);

  const handleSubmit = async () => {
    if (!selectedRoom) return;
    setProcessing(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: selectedRoomId,
          guestName,
          guestEmail,
          guestPhone,
          checkIn,
          checkOut,
          adults,
          children,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed");
      setBookingId(data.reservation.id);
      setBookingComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setProcessing(false);
    }
  };

  if (bookingComplete) {
    return (
      <div className="text-center py-16">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">{t("bookingSuccess")}</h2>
        <p className="text-gray-600 mb-2">{t("bookingSuccessDesc")}</p>
        <p className="text-sm text-gray-500">Booking ID: <span className="font-mono font-semibold">{bookingId}</span></p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                step >= s ? "bg-gold-500 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {s}
            </div>
            <span className={`hidden sm:block mx-3 text-sm ${step >= s ? "text-navy-900 font-medium" : "text-gray-400"}`}>
              {s === 1 ? t("step1") : s === 2 ? t("step2") : t("step3")}
            </span>
            {s < 3 && <div className={`w-12 sm:w-20 h-0.5 mx-2 ${step > s ? "bg-gold-500" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-gold-500" />
            {t("step1")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("checkIn")}</label>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("checkOut")}</label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" /> {t("adults")}
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-8 text-center">{adults}</span>
                <button
                  type="button"
                  onClick={() => setAdults(adults + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("children")}</label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-8 text-center">{children}</span>
                <button
                  type="button"
                  onClick={() => setChildren(children + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={() => setStep(2)} disabled={!checkIn || !checkOut || checkIn >= checkOut}>
              {t("selectRoom")} <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">{t("selectRoom")}</h2>
          {checkingAvailability ? (
            <p className="text-center text-gray-500 py-8">{t("processing")}</p>
          ) : (
            <div className="space-y-4">
              {rooms.map((room) => {
                const avail = availability.find((a) => a.roomId === room.id);
                const isAvailable = avail?.available ?? false;
                const guestTotal = adults + children;
                const fitsGuests = guestTotal <= room.maxGuests;

                return (
                  <button
                    key={room.id}
                    type="button"
                    disabled={!isAvailable || !fitsGuests}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                      selectedRoomId === room.id
                        ? "border-gold-500 bg-gold-50"
                        : isAvailable && fitsGuests
                        ? "border-gray-200 hover:border-gold-300"
                        : "border-gray-100 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-navy-900">{room.name[locale]}</h3>
                        <p className="text-sm text-gray-500 mt-1">{room.size} · Max {room.maxGuests} {t("guests")}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gold-600">{room.pricePerNight.toLocaleString()} ETB</p>
                        <p className="text-xs text-gray-400">{t("perNight")}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      {isAvailable && fitsGuests ? (
                        <span className="text-sm text-green-600 font-medium">
                          {t("available")} · {avail?.availableUnits} {t("roomsAvailable")}
                        </span>
                      ) : (
                        <span className="text-sm text-red-500">{t("notAvailable")}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <Button onClick={() => setStep(3)} disabled={!selectedRoomId}>
              Continue <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && selectedRoom && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">{t("guestDetails")}</h2>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("fullName")}</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("email")}</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("phone")}</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>
            </div>

            <h3 className="font-display text-xl font-bold text-navy-900 mb-4">{t("payment")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { id: "telebirr" as const, label: t("telebirr"), icon: <Smartphone className="w-5 h-5" /> },
                { id: "cbebirr" as const, label: t("cbebirr"), icon: <Smartphone className="w-5 h-5" /> },
                { id: "card" as const, label: t("card"), icon: <CreditCard className="w-5 h-5" /> },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === method.id
                      ? "border-gold-500 bg-gold-50"
                      : "border-gray-200 hover:border-gold-300"
                  }`}
                >
                  {method.icon}
                  <span className="text-sm font-medium">{method.label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-xl mb-6">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> {t("securePayment")}
                </p>
                <input
                  type="text"
                  placeholder={t("cardNumber")}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t("expiry")}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                  <input
                    type="text"
                    placeholder={t("cvv")}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>
            )}

            {(paymentMethod === "telebirr" || paymentMethod === "cbebirr") && (
              <div className="p-4 bg-gold-50 rounded-xl mb-6 text-sm text-navy-700">
                <p className="font-medium mb-2">
                  {paymentMethod === "telebirr" ? "Telebirr" : "CBEbirr"} Payment
                </p>
                <p>You will receive a payment request on your registered mobile number after confirming your booking.</p>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(2)}>
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={processing || !guestName || !guestEmail || !guestPhone}
              >
                {processing ? t("processing") : t("confirmBooking")}
              </Button>
            </div>
          </div>

          <div className="bg-navy-900 text-white rounded-2xl p-8 h-fit sticky top-28">
            <h3 className="font-display text-xl font-bold mb-6">{t("reservationSummary")}</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">{t("selectRoom")}</span>
                <span className="font-medium">{selectedRoom.name[locale]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">{t("checkIn")}</span>
                <span>{checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">{t("checkOut")}</span>
                <span>{checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">{t("guests")}</span>
                <span>{adults} {t("adults")}, {children} {t("children")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">{t("nights")}</span>
                <span>{nights}</span>
              </div>
              <div className="border-t border-white/20 pt-4 flex justify-between text-lg">
                <span className="font-semibold">{t("totalPrice")}</span>
                <span className="font-bold text-gold-400">{totalPrice.toLocaleString()} ETB</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
