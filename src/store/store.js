import { configureStore } from '@reduxjs/toolkit'


import AdminPanel from '../reducer/AdminPanel.jsx'

export const store = configureStore({
  reducer: {
    AdminPanel: AdminPanel,
  },
})