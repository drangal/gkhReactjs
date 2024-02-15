import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const setJobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobsList: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setJobsList } = setJobsSlice.actions

export default setJobsSlice.reducer
