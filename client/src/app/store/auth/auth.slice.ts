import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from 'entities/user/model'

interface AuthState {
  user: IUser
  isChecked: boolean
}

const initialState: AuthState = {
  user: {
    isAuthenticated: false,
    email: null,
    name: null,
    token: null,
  },
  isChecked: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
      state.isChecked = true
    },
  },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
