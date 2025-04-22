import { Clock, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFlight } from "../../redux/bookMyFlightSlice";
import { useNavigate } from "react-router-dom";

const Flight = ({ flight }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const passengers = useSelector(state => state.bookMyFlight.searchFlightFormData?.adult)

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-2 border-gray-400 rounded-lg mb-4">
      <div>
        <p className="font-medium">{flight?.flight_name}</p>
        <p className="text-sm text-gray-600">{flight?.flight_code}</p>
      </div>

      <div className="col-span-2 grid grid-cols-3 gap-2">
        <div>
          <p className="text-lg font-semibold">{flight?.departureAirport?.time.split("T")[1].slice(0,5)}</p>
          <p className="text-sm font-medium">{flight?.departureAirport?.code}</p>
          <p className="text-xs text-gray-600">{flight?.departureAirport?.city}</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-xs text-gray-600 flex items-center">
            <Clock className="h-3 w-3 mr-1" />{flight?.duration?.text}
          </p>
          <div className="relative w-full my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-400"></div>
            </div>
            <div className="relative flex justify-center">
              <ArrowRight className="h-4 w-4 text-gray-600" />
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            <span className="text-xs p-1 px-2 border-2 border-gray-400 font-bold rounded-xl">
              {flight?.stops}
            </span>
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold">{flight?.arrivalAirport?.time.split("T")[1].slice(0,5)}</p>
          <p className="text-sm font-medium">{flight?.arrivalAirport?.code}</p>
          <p className="text-xs text-gray-600">{flight?.arrivalAirport?.city}</p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <div className="text-right">
          <p className="text-2xl font-bold text-sky-600">₹{Number(flight?.totals?.base.toFixed(0))/passengers}</p>
          <p className="text-xs text-gray-600">per person</p>
        </div>
        <button onClick={() => {
            dispatch(setSelectedFlight(flight))
            navigate("/flight-booking")
        }} className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-5 mt-1.5 rounded-lg font-semibold">
          Select
        </button>
      </div>
    </div>
  );
};

export default Flight;
