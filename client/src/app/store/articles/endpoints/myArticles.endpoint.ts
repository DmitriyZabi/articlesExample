import { IArticle } from 'entities/article/model'
import { articlesApi } from '../articles.api'

const emptyArray: any[] = []

const myArticlesApi = articlesApi.injectEndpoints({
  endpoints: (build) => ({
    getMyArticles: build.query<IArticle[], string>({
      query: (token: string) => ({
        url: `/getMyArticles/`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: [{ type: 'MyArticles', id: 'LIST' }],
    }),
    getMyArticle: build.query<IArticle, { id: string; token: string }>({
      query: ({ id, token }: { id: string; token: string }) => ({
        url: `/getMyArticle/${id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result, error, { id: articleId }) => [
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
        { type: 'AllArticles', id: 'LIST' },
        { type: 'MyArticles', id: 'LIST' },
      ],
    }),
    updateArticle: build.mutation<
      { id: number } | { messsage: string },
      {
        id: string
        title: string
        body: string
        imageFileName: string | null
        token: string
      }
    >({
      query: ({
        id,
        title,
        body,
        imageFileName,
        token,
      }: {
        id: string | null
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
          id,
          title,
          body,
          imageFileName,
        },
      }),
      invalidatesTags: (result) =>
        result && 'id' in result
          ? [
              { type: 'AllArticles', id: result.id },
              { type: 'AllArticles', id: 'LIST' },
              { type: 'MyArticles', id: result.id },
              { type: 'MyArticles', id: 'LIST' },
            ]
          : emptyArray,
    }),
    removeArticle: build.mutation<boolean, { id: string; token: string }>({
      query: ({ id, token }: { id: string; token: string }) => ({
        url: `/removeArticle/`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          id,
        },
      }),
      invalidatesTags: [{ type: 'AllArticles', id: 'LIST' }],
      async onQueryStarted({ id, token }, { dispatch, queryFulfilled }) {
        const getMyArticlesPatch = dispatch(
          myArticlesApi.util.updateQueryData(
            'getMyArticles',
            token,
            (current) => current.filter((x) => `${x.id}` !== id)
          )
        )
        try {
          await queryFulfilled
        } catch {
          getMyArticlesPatch.undo()
        }
      },
    }),
  }),
})

export const {
  useGetMyArticleQuery,
  useLazyGetMyArticleQuery,
  useLazyGetMyArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useRemoveArticleMutation,
} = myArticlesApi
