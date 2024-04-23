import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface SearchState {
  searchValue: string | null
}

const initialState: SearchState = {
  searchValue: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string | null>) => {
      state.searchValue = action.payload
    },
  },
})

export const { setSearchValue } = searchSlice.actions

export default searchSlice.reducer
