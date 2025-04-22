import { configureStore } from '@reduxjs/toolkit'
import bookMyFlightReducer from '../redux/bookMyFlightSlice.js'

export const store = configureStore({
  reducer: {
    bookMyFlight: bookMyFlightReducer
  },
})