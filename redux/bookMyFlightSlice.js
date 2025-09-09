import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { toast } from "react-toastify";

export const fetchFlights = createAsyncThunk(
    'bookMyFlight/fetchFlights',
    async (_, { rejectWithValue, getState }) => {
        try {
            const response = await axios.get(`https://${import.meta.env.VITE_RAPID_API_HOST}/v2/flights/`, {
                params: { ...getState().bookMyFlight.searchFlightFormData },
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
                    'x-rapidapi-host': import.meta.env.VITE_RAPID_API_HOST
                }
            })
            return response.data.results
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const sendConfirmationMail = createAsyncThunk(
    'bookMyFlight/sendConfirmationMail',
    async (_, { rejectWithValue, getState }) => {
        try {
            const templateParams = {
                to_name: getState().bookMyFlight.userCredentialsFormData.name,
                email: getState().bookMyFlight.userCredentialsFormData.email,
                booking_ref: `BF${Date.now().toString().slice(-6)}`,
                flight_number: getState().bookMyFlight.selectedFlight?.flight_code,
                departure_city: getState().bookMyFlight.selectedFlight?.departureAirport?.city,
                arrival_city: getState().bookMyFlight.selectedFlight?.arrivalAirport?.city,
                flight_date: getState().bookMyFlight.searchFlightFormData?.date,
                departure_time: getState().bookMyFlight.selectedFlight?.departureAirport?.time.split("T")[1].slice(0, 5),
                arrival_time: getState().bookMyFlight.selectedFlight?.arrivalAirport?.time.split("T")[1].slice(0, 5),
                passengers: getState().bookMyFlight.searchFlightFormData?.adult,
                class: getState().bookMyFlight.searchFlightFormData?.type,
                amount: Number(getState().bookMyFlight.selectedFlight?.totals?.base.toFixed(0)) + 120 + 20
            }
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams
            )
        } catch (err) {
            if (err instanceof EmailJSResponseStatus) {
                return rejectWithValue(err.message)
            }
        }
    }
)

const bookMyFlightSlice = createSlice({
    name: 'bookMyFlight',
    initialState: {
        flights: null,
        loading: true,
        searchFlightFormData: null,
        selectedFlight: null,
        userCredentialsFormData: null,
        notification: null
    },
    reducers: {
        updateSearchFlightFormData: (state, action) => {
            state.searchFlightFormData = action.payload
        },
        setSelectedFlight: (state, action) => {
            state.selectedFlight = action.payload
        },
        updateUserCredentialsFormData: (state, action) => {
            state.userCredentialsFormData = action.payload
        },
        setNotification: (state, action) => {
            state.notification = action.payload
        },
        clearNotification: (state) => {
            state.notification = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlights.fulfilled, (state, action) => {
                state.loading = false;
                state.flights = action.payload;
            })
            .addCase(fetchFlights.rejected, (state, action) => {
                state.loading = false;
                toast.error('Error occured while fetching flights')
            })
            .addCase(sendConfirmationMail.fulfilled, (state, action) => {
                console.log("Flight booked successfully")
            })
            .addCase(sendConfirmationMail.rejected, (state, action) => {
                toast.error('Error occured while sending the confirmation mail')
            })
    }
})

export const { 
    updateSearchFlightFormData, 
    setSelectedFlight, 
    updateUserCredentialsFormData,
    setNotification,
    clearNotification 
} = bookMyFlightSlice.actions

export default bookMyFlightSlice.reducer