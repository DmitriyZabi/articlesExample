import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from 'entities/user/model'

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
  }),
  endpoints: (build) => ({
    checkLogin: build.query<IUser, string>({
      query: () => ({
        url: '/checkLogin',
      }),
    }),
  }),
})

export const { useCheckLoginQuery } = authApi
