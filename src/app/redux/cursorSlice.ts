import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface CursorState {
  afterCursor: string | null
}

const initialState: CursorState = {
  afterCursor: null,
}

const cursorSlice = createSlice({
  name: 'cursor',
  initialState,
  reducers: {
    setAfterCursor: (state, action: PayloadAction<string | null>) => {
      state.afterCursor = action.payload
    },
  },
})

export const { setAfterCursor } = cursorSlice.actions

export default cursorSlice.reducer
