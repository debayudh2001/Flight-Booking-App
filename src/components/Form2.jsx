import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  sendConfirmationMail,
  updateUserCredentialsFormData,
} from "../../redux/bookMyFlightSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { initializeRazorpay } from "../../utils/razorPay";

const Form2 = ({ totalPrice }) => {
  let name = useRef(null);
  let email = useRef(null);
  let number = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const userDetails = {
      name: name.current.value,
      email: email.current.value,
      number: number.current.value,
    };
    dispatch(updateUserCredentialsFormData(userDetails));
    try {
      const paymentResponse = await initializeRazorpay(totalPrice, userDetails);
      if (paymentResponse.razorpay_payment_id) {
        dispatch(sendConfirmationMail());
        setTimeout(() => {
          navigate("/");
          toast.success(
            "Payment successful! Booking confirmed. Confirmation mail will be sent to your email."
          );
        }, 1500);
      }
    } catch (err) {
      toast.error(err.message || "Payment failed. Please try again.");
    }
  }

  return (
    <div className="border-2 border-gray-400 p-4 rounded-lg w-[300px]">
      <p className="font-medium text-xl">Fill the Form</p>
      <span className="text-xs font-medium text-gray-400">
        Please fill in the form with the correct details
      </span>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <div>
            <input
              id="name"
              ref={name}
              placeholder="Enter your full name"
              type="text"
              className="p-2 pl-8 border-2 border-gray-400 rounded-lg mt-1"
            />
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="email">Email</label>
          <div>
            <input
              id="email"
              ref={email}
              placeholder="Enter your email"
              type="text"
              className="p-2 pl-8 border-2 border-gray-400 rounded-lg mt-1"
            />
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="number">Phone Number</label>
          <div>
            <input
              id="number"
              ref={number}
              placeholder="Enter your number"
              type="text"
              className="p-2 pl-8 border-2 border-gray-400 rounded-lg mt-1"
            />
          </div>
        </div>
        <br />
        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white p-2.5 rounded-lg font-bold"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Form2;
