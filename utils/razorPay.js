
export const initializeRazorpay = (orderAmount, userDetails) => {
    return new Promise((resolve, reject) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: orderAmount * 100, 
            currency: "INR",
            name: "BookMyFlight",
            description: "Flight Ticket Payment",
            theme: {
                color: '#0284c7'
            },
            callback_url: 'https://flight-booking-app-alpha.vercel.app',
            prefill: {
                name: userDetails.name,
                email: userDetails.email,
                contact: userDetails.number,
            },
            handler: function (response) {
                resolve(response);
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    });
};
