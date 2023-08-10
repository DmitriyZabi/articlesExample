import { IImageData } from 'entities/article/model'

export interface IProps {
  image: IImageData | null
  onImageUpload(image: IImageData | null): void
}
