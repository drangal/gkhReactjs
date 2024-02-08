import { configureStore } from '@reduxjs/toolkit'
import applicationsReducer from '../slices/applicationsSlice'
import freeWorkersReducer from '../slices/freeWorkersSlice'

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    freeWorkers: freeWorkersReducer
  }
})
