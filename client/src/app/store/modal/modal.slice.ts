import { DefaultColorPalette } from '@mui/joy/styles/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  title: string | null
  description: string | null
  showed: boolean
  acceptButton?: {
    text: string
    color: DefaultColorPalette
    onClick(): void
  } | null
}

const initialState: ModalState = {
  title: null,
  description: null,
  showed: false,
  acceptButton: {
    text: 'Ok',
    color: 'success',
    onClick: () => void 0,
  },
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(
      state,
      action: PayloadAction<{
        title?: string | null
        description?: string | null
        acceptButton?: {
          text: string
          color: DefaultColorPalette
          onClick(): void
        } | null
      }>
    ) {
      state.title = action.payload.title
        ? action.payload.title
        : initialState.title
      state.description = action.payload.description
        ? action.payload.description
        : initialState.description
      state.acceptButton = action.payload.acceptButton
        ? action.payload.acceptButton
        : initialState.acceptButton
      state.showed = true
    },
    hideModal(state) {
      state.showed = false
      state = initialState
    },
  },
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
