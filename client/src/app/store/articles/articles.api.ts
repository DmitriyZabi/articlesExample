import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IArticle, IImageData } from 'entities/article/model'
import { IComment } from 'entities/comment/model'
import { IUser } from 'entities/user/model'

export interface IAddCommentQueryProps {
  user: IUser
  text: string
}

const emptyArray: any[] = []

export const articlesApi = createApi({
  reducerPath: 'articles/api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/articles',
  }),
  tagTypes: ['Articles', 'MyArticles'],
  endpoints: (build) => ({
    getArticles: build.query<IArticle[], string>({
      query: () => ({
        url: '/getArticles',
      }),
      providesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    getArticle: build.query<IArticle, string>({
      query: (id: string) => ({
        url: `/getArticle/`,
        method: 'POST',
        body: {
          id: id,
        },
      }),
      providesTags: (result, error, articleId) => [
        { type: 'Articles', id: articleId },
      ],
    }),
    getArticleComments: build.query<IComment[], string>({
      query: (id: string) => ({
        url: `/getArticleComments/`,
        method: 'POST',
        body: {
          id: id,
        },
      }),
    }),
    addArticleComment: build.query<
      boolean,
      { articleId: string; text: string; token: string }
    >({
      query: ({
        articleId,
        text,
        token,
      }: {
        articleId: string
        text: string
        token: string
      }) => ({
        url: `/addArticleComment/`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          articleId,
          text,
        },
      }),
    }),
    getMyArticles: build.query<IArticle[], string>({
      query: (token: string) => ({
        url: `/getMyArticles/`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: [{ type: 'MyArticles', id: 'LIST' }],
    }),
    getMyArticle: build.query<IArticle, { articleId: string; token: string }>({
      query: ({ articleId, token }: { articleId: string; token: string }) => ({
        url: `/getMyArticle/`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          id: articleId,
        },
      }),
      providesTags: (result, error, { articleId }) => [
        { type: 'MyArticles', id: articleId },
      ],
    }),
    createArticle: build.mutation<
      { id: number } | { messsage: string },
      {
        title: string
        body: string
        imageFileName: string | null
        token: string
      }
    >({
      query: ({
        title,
        body,
        imageFileName,
        token,
      }: {
        title: string
        body: string
        imageFileName: string | null
        token: string
      }) => ({
        url: `/createArticle/`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title,
          body,
          imageFileName,
        },
      }),
      invalidatesTags: [
        { type: 'Articles', id: 'LIST' },
        { type: 'MyArticles', id: 'LIST' },
      ],
    }),
    updateArticle: build.mutation<
      { id: number } | { messsage: string },
      {
        articleId: string
        title: string
        body: string
        imageFileName: string | null
        token: string
      }
    >({
      query: ({
        articleId,
        title,
        body,
        imageFileName,
        token,
      }: {
        articleId: string | null
        title: string
        body: string
        imageFileName: string | null
        token: string
      }) => ({
        url: `/updateArticle/`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          articleId,
          title,
          body,
          imageFileName,
        },
      }),
      invalidatesTags: (result) =>
        result && 'id' in result
          ? [
              { type: 'Articles', id: result.id },
              { type: 'Articles', id: 'LIST' },
              { type: 'MyArticles', id: result.id },
              { type: 'MyArticles', id: 'LIST' },
            ]
          : emptyArray,
    }),
    removeArticle: build.mutation<
      boolean,
      { articleId: string; token: string }
    >({
      query: ({ articleId, token }: { articleId: string; token: string }) => ({
        url: `/removeArticle/`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          articleId,
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
      async onQueryStarted({ articleId, token }, { dispatch, queryFulfilled }) {
        const getMyArticlesPatch = dispatch(
          articlesApi.util.updateQueryData('getMyArticles', token, (current) =>
            current.filter((x) => `${x.id}` !== articleId)
          )
        )
        try {
          await queryFulfilled
        } catch {
          getMyArticlesPatch.undo()
        }
      },
    }),
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

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useLazyGetArticleCommentsQuery,
  useLazyAddArticleCommentQuery,
  useGetMyArticleQuery,
  useLazyGetMyArticleQuery,
  useLazyGetMyArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useRemoveArticleMutation,
  useLazyUploadImageQuery,
} = articlesApi
