import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { getRooms } from "@/lib/store";

function BookingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export const metadata = {
  title: "Book Your Stay",
  description: "Reserve your room at Grand Ethiopia Hotel with our secure online booking system.",
};

export default function BookingPage() {
  const rooms = getRooms();

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="bg-navy-900 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Book Your Stay</h1>
          <p className="text-white/60">Secure online reservation with instant confirmation</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<BookingFallback />}>
          <BookingForm rooms={rooms} />
        </Suspense>
      </div>
    </div>
  );
}
