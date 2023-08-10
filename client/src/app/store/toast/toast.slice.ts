import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IToast } from 'entities/toast/model'

interface ToastState {
  toast: IToast | null
  showed: boolean
}

const initialState: ToastState = {
  toast: null,
  showed: false,
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<IToast>) {
      state.toast = action.payload
      state.showed = true
    },
    showSuccessToast(state, action: PayloadAction<string>) {
      state.toast = {
        type: 'success',
        text: action.payload
      }
      state.showed = true
    },
    showErrorToast(state, action: PayloadAction<any>) {
      const errorStatus = 'status' in action.payload ? action.payload.status : ''
      const errorData = 'data' in action.payload ? action.payload.data : 'Something is wrong'
      const errorMessage = errorData
      state.toast = {
        type: 'error',
        text: errorMessage
      }
      state.showed = true
    },
    hideToast(state) {
      state.toast = null
      state.showed = false
    },
  },
})

export const toastActions = toastSlice.actions
export const toastReducer = toastSlice.reducer
