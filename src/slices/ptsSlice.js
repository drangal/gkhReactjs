import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0
}

export const ptsSlice = createSlice({
  name: 'pts',
  initialState,
  reducers: {
    setPts: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setPts } = ptsSlice.actions

export default ptsSlice.reducer
