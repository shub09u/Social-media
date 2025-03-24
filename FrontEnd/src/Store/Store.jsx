import { configureStore } from '@reduxjs/toolkit'
import Userslice from './Userslice'
import socketSlice from './Socketslice'
export const store = configureStore({
  reducer: {
user:Userslice,
socket:socketSlice
},
})