import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesApi = createApi({
  reducerPath: 'articles/api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/articles',
  }),
  tagTypes: ['AllArticles', 'MyArticles'],
  endpoints: (build) => ({}),
})

export const {} = articlesApi
