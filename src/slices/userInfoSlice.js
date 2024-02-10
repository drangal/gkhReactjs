import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {}
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer
