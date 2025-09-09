import { useEffect } from "react";
import Form from "./components/Form";
import emailjs from "@emailjs/browser";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../redux/bookMyFlightSlice";

const App = () => {
  const notification = useSelector((state) => state.bookMyFlight.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  useEffect(() => {
    if (notification) {
      if (notification.type === "success") {
        toast.success(notification.message);
      } else if (notification.type === "error") {
        toast.error(notification.message);
      }
      // Clear the notification after showing it
      dispatch(clearNotification());
    }
  }, [notification, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-white">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center text-sky-900 mb-2">
            BookMyFlight
          </h1>
          <p className="text-center text-gray-600">
            Find and book your perfect flight
          </p>
        </header>
        <Form />
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
          type="success"
          style={{padding: "2px"}}
        />
      </div>
    </div>
  );
};

export default App;
