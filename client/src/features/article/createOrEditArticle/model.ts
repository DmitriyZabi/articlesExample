import { IArticle } from 'entities/article/model'

export interface IProps {
  article: IArticle | null
  onUpdateArticle(args: {
    id: string
    title: string
    body: string
    imageFileName: string | null
    token: string
  }): void
  isFetching: boolean
}
