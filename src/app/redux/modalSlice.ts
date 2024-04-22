import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  isOpen: boolean
  owner: string | null
  repoName: string | null
}

const initialState: ModalState = {
  isOpen: false,
  owner: null,
  repoName: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{ owner: string; repoName: string }>,
    ) {
      state.isOpen = true
      state.owner = action.payload.owner
      state.repoName = action.payload.repoName
    },
    closeModal(state) {
      state.isOpen = false
      state.owner = null
      state.repoName = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
