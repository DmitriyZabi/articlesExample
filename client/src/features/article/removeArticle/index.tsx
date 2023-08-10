import { IProps } from './model'
import { useAppSelector } from 'app/store/hooks/redux'
import { useActions } from 'app/store/hooks/actions'
import { useEffect } from 'react'
import Button from '@mui/material/Button'
import { useRemoveArticleMutation } from 'app/store/articles/endpoints/myArticles.endpoint'

export function RemoveArticle({ id, onRemoveArticle }: IProps) {
  const [fetchRemoveArticle, { isLoading, isSuccess, isError, error }] =
    useRemoveArticleMutation()
  const { token } = useAppSelector((store) => store.auth.user)
  const { showSuccessToast, showErrorToast, showModal } = useActions()

  const handleRemoveArticle = () => {
    showModal({
      title: 'Are you sure ?',
      description: 'This will remove the article and its comments.',
      acceptButton: {
        text: 'Remove article',
        color: 'danger',
        onClick: async () => {
          fetchRemoveArticle({ id: `${id}`, token: token || '' })
        },
      },
    })
  }

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        showSuccessToast('Article removed successfully')
        onRemoveArticle ? onRemoveArticle() : void 0
      }

      if (isError && error) {
        showErrorToast(error)
      }
    }
  }, [isLoading])

  return (
    <Button size="small" color="error" onClick={handleRemoveArticle}>
      Remove article
    </Button>
  )
}
