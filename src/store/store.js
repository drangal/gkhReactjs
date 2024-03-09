import { configureStore } from '@reduxjs/toolkit'
import applicationsReducer from '../slices/applicationsSlice'
import freeWorkersReducer from '../slices/freeWorkersSlice'
import userInfoReducer from '../slices/userInfoSlice'
import jobsReducer from '../slices/jobsSlice'
import ptsReducer from '../slices/ptsSlice'

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    freeWorkers: freeWorkersReducer,
    userInfo: userInfoReducer,
    jobs: jobsReducer,
    pts: ptsReducer
  }
})
