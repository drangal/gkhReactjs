import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplicationList: (state, action) => {
      state.value = action.payload
    },
    setNewApplication: (state, action) => {
      state.value.push(action.payload)
    },
    updateApplicationCompleted: (state, action) => {
      const task = state.value.find(
        (task) =>
          task.id === action.payload.id && task.userId === action.payload.userId
      )
      if (!task) return
      task.completed = !task.completed
    },
    deleteApplication: (state, action) => {
      const taskIndexToRemove = state.value.findIndex(
        (task) =>
          task.id === action.payload.id && task.userId === action.payload.userId
      )
      state.value.splice(taskIndexToRemove, 1)
    }
  }
})

export const {
  setApplicationList,
  setNewApplication,
  updateApplicationCompleted,
  deleteApplication
} = applicationsSlice.actions

export default applicationsSlice.reducer
