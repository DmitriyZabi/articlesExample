import { IArticle } from 'entities/article/model'
import { articlesApi } from '../articles.api'

const allArticlesApi = articlesApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<IArticle[], string>({
      query: () => ({
        url: '/getArticles',
        method: 'GET',
      }),
      providesTags: [{ type: 'AllArticles', id: 'LIST' }],
    }),
    getArticle: build.query<IArticle, string>({
      query: (id: string) => ({
        url: `/getArticle/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, articleId) => [
        { type: 'AllArticles', id: articleId },
      ],
    }),
  }),
})

export const { useGetArticlesQuery, useGetArticleQuery } = allArticlesApi
