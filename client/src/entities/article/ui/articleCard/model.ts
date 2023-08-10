export interface IProps {
  id: number
  user: string
  title: string
  body: string
  canEdit?: boolean
  canRemove?: boolean
  onRemoveArticle?(): void
}
