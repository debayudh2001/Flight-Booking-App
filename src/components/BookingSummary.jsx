const BookingSummary = ({flight, passengers, cabinClass, date, totalPrice}) => {
  return (
    <div className="border-2 border-gray-400 p-4 rounded-lg">
      <div className="mb-4">
        <h3 className="font-medium mb-5 text-xl">Booking Summary</h3>
        <p className="text-sm">Date: {date}</p>
        <p className="text-sm font-medium">
          {flight?.departureAirport?.city} ({flight?.departureAirport?.code}) to{" "}
          {flight?.arrivalAirport?.city} ({flight?.arrivalAirport?.code})
        </p>
        <p className="text-sm text-gray-500">
          {flight?.flight_name} · {flight?.flight_code}
        </p>
        <p className="text-sm text-gray-500">
          {flight?.departureAirport?.time.split("T")[1].slice(0, 5)} -{" "}
          {flight?.arrivalAirport?.time.split("T")[1].slice(0, 5)}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-1">Passenger</h3>
        {passengers > 1 ? (
          <p className="text-sm">{passengers} Adults</p>
        ) : (
          <p className="text-sm">{passengers} Adult</p>
        )}
        <p className="text-sm text-gray-500">
          {cabinClass.split(" ").map((word) => {
            let ch = word[0]
            let arr = word.split("")
            arr.splice(0,1,ch.toUpperCase())
            return arr.join("")
          }).join(" ")}
        </p>
      </div>

      <hr className="text-gray-400" />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Base fare</span>
          <span>₹{flight?.totals?.base.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Taxes</span>
          <span>₹120</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Platform Fees</span>
          <span>₹20</span>
        </div>

        <hr className="text-gray-400" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <p className="text-xs text-gray-500 w-full">
          By proceeding with this booking, you agree to our Terms and Conditions
          and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
