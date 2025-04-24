import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Flight from "../components/Flight";
import { useDispatch, useSelector } from "react-redux";

const FlightSearch = () => {
  const flights = useSelector((state) => state.bookMyFlight.flights)
  const loading = useSelector((state) => state.bookMyFlight.loading)
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen bg-sky-300 to-white">
      <div className="container mx-auto px-4 py-8">
        <button className="rounded-lg bg-gray-200 mb-8 font-semibold text-sky-600">
          <Link to="/" className="flex items-center justify-center p-4">
            <ChevronLeft className="mr-1.5 h-5 w-5" />
            <span>Go Back</span>
          </Link>
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-sky-700">Available Flights</h2>
        {loading ? 
            <p className="font-semibold text-sky-700">Loading ...</p>
            :
            flights.map(flight => <Flight key={flight.id} flight={flight} />)
        }
      </div>
    </div>
  );
};

export default FlightSearch;
