import { configureStore } from '@reduxjs/toolkit'
import applicationsReducer from '../slices/applicationsSlice'
import freeWorkersReducer from '../slices/freeWorkersSlice'
import userInfoReducer from '../slices/userInfoSlice'

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    freeWorkers: freeWorkersReducer,
    userInfo: userInfoReducer
  }
})
