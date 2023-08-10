import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { articlesApi } from './articles/articles.api'
import { authApi } from './auth/auth.api'
import { authReducer } from './auth/auth.slice'
import { toastReducer } from './toast/toast.slice'
import { modalReducer } from './modal/modal.slice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    auth: authReducer,
    toast: toastReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(articlesApi.middleware, authApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
