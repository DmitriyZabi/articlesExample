export interface IArticle {
  id: number
  title: string
  body: string
  image: IImageData | null
  user: {
    id: number
    name: string
  }
}

export interface IImageData {
  name: string
  path: string
}
