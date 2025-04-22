import { Plane, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSearchFlightFormData, fetchFlights } from "../../redux/bookMyFlightSlice";
import { useRef } from "react";

const Form = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const from = useRef(null)
  const to = useRef(null)
  const date = useRef(null)
  const adult = useRef(null)
  const type = useRef(null)
  
  return (
    <div className="p-6 bg-white rounded-xl">
      {/* <p className="text-xl font-medium mb-5">Search for Flights:</p> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(updateSearchFlightFormData({
            from: from.current.value,
            to: to.current.value,
            date: date.current.value,
            adult: adult.current.value,
            type: type.current.value.toLowerCase(),
            currency: "INR"
          }))
          dispatch(fetchFlights())
          navigate("/flight-search");
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="from">From</label>
            <div className="relative mt-1">
              <Plane className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 rotate-45" />
              <input
                id="from"
                ref={from}
                placeholder="City or Airport"
                type="text"
                className="p-2 pl-10 border-2 border-gray-400 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label htmlFor="to">To</label>
            <div className="relative mt-1">
              <Plane className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 -rotate-45" />
              <input
                id="to"
                ref={to}
                placeholder="City or Airport"
                type="text"
                className="p-2 pl-10 border-2 border-gray-400 rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="date">Departure Date</label>
          <div className="mt-1">
            <input
              id="date"
              ref={date}
              placeholder="none"
              type="date"
              className="p-2 pl-4 border-2 border-gray-400 rounded-lg text-gray-600"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="adult">Passengers</label>
            <div className="relative mt-1">
              <Users className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input
                id="adult"
                ref={adult}
                placeholder="No. of passengers"
                type="number"
                className="p-2 pl-10 border-2 border-gray-400 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label htmlFor="type">Cabin Class</label>
            <div className="mt-1">
              <select
                id="type"
                ref={type}
                className="p-2 pl-4 border-2 border-gray-400 rounded-lg"
              >
                <option>Select a Class</option>
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Businesss</option>
                <option>First Class</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white p-2.5 rounded-lg font-bold"
        >
          Search Flights
        </button>
      </form>
    </div>
  );
};

export default Form;
