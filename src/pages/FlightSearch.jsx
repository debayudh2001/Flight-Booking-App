import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Flight from "../components/Flight";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const FlightSearch = () => {
  const flights = useSelector((state) => state.bookMyFlight.flights);
  const loading = useSelector((state) => state.bookMyFlight.loading);
  const dispatch = useDispatch();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(10);
  
  // Calculate total pages
  const totalPages = flights ? Math.ceil(flights.length / flightsPerPage) : 0;
  
  // Get current flights
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights ? flights.slice(indexOfFirstFlight, indexOfLastFlight) : [];
  
  // Change page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Reset to first page when flights data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [flights]);

  return (
    <div className="min-h-screen bg-sky-200">
      <div className="container mx-auto px-4 py-8">
        <button className="rounded-lg bg-gray-200 mb-8 font-semibold text-sky-600">
          <Link to="/" className="flex items-center justify-center p-4">
            <ChevronLeft className="mr-1.5 h-5 w-5" />
            <span>Go Back</span>
          </Link>
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-sky-700">
          Available Flights
        </h2>
        {loading ? (
          <p className="font-semibold text-sky-700">Loading ...</p>
        ) : flights?.length === 0 ? (
          <p className="font-semibold text-sky-700">No data found</p>
        ) : (
          <>
            {currentFlights.map((flight) => (
              <Flight key={flight.id} flight={flight} />
            ))}
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <span className="text-sky-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
