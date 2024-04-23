import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalSlice'
import cursorReducer from './cursorSlice'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    cursor: cursorReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
