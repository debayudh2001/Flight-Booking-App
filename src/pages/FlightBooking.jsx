import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Form2 from "../components/Form2";
import BookingSummary from "../components/BookingSummary";
import { ToastContainer, Zoom } from "react-toastify";

const FlightBooking = () => {
  const flight = useSelector((state) => state.bookMyFlight.selectedFlight);
  const date = useSelector(
    (state) => state.bookMyFlight.searchFlightFormData?.date
  );
  const passengers = useSelector(
    (state) => state.bookMyFlight.searchFlightFormData?.adult
  );
  const cabinClass = useSelector(
    (state) => state.bookMyFlight.searchFlightFormData?.type
  );

  let totalPrice = useMemo(() => {
    return Number(flight?.totals?.base.toFixed(0)) + 120 + 20;
  }, [flight]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-white">
      <div className="container mx-auto px-4 py-8">
        <button className="rounded-lg bg-gray-200 mb-8 font-semibold text-sky-600">
          <Link
            to="/flight-search"
            className="flex items-center justify-center p-4"
          >
            <ChevronLeft className="mr-1.5 h-5 w-5" />
            <span>Go back</span>
          </Link>
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-sky-700">
          Complete Your Booking
        </h2>
        <BookingSummary
          flight={flight}
          passengers={passengers}
          date={date}
          cabinClass={cabinClass}
          totalPrice={totalPrice}
        />
        <br />
        <br />
        <Form2 totalPrice={totalPrice} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
        type="error"
        style={{ padding: "2px" }}
      />
    </div>
  );
};

export default FlightBooking;
