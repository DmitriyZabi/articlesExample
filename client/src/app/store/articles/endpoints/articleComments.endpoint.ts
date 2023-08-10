import { IComment } from 'entities/comment/model'
import { articlesApi } from '../articles.api'

const articleCommentsApi = articlesApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleComments: build.query<IComment[], string>({
      query: (id: string) => ({
        url: `/getArticleComments/${id}`,
        method: 'GET',
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
  }),
})

export const { useLazyGetArticleCommentsQuery, useLazyAddArticleCommentQuery } =
  articleCommentsApi
