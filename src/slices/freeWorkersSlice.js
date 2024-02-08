import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const setFreeWorkersSlice = createSlice({
  name: 'freeWorkers',
  initialState,
  reducers: {
    setFreeWorkersList: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setFreeWorkersList } = setFreeWorkersSlice.actions

export default setFreeWorkersSlice.reducer
