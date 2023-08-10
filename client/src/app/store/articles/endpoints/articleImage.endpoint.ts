import { IImageData } from 'entities/article/model'
import { articlesApi } from '../articles.api'

const articleImageApi = articlesApi.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.query<
      IImageData,
      {
        formData: FormData
        token: string
      }
    >({
      query: ({ formData, token }: { formData: FormData; token: string }) => ({
        url: `/upload/`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }),
    }),
  }),
})

export const { useLazyUploadImageQuery } = articleImageApi
