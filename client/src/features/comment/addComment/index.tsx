import { useEffect, useState } from 'react'
import { IProps } from './model'
import { useAppSelector } from 'app/store/hooks/redux'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useActions } from 'app/store/hooks/actions'
import { AlertWarning } from 'shared/components/alertWarning'
import { useLazyAddArticleCommentQuery } from 'app/store/articles/endpoints/articleComments.endpoint'

export function AddComment(props: IProps) {
  const { isAuthenticated, token } = useAppSelector((store) => store.auth.user)
  const [text, setText] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [fetchAddComment, { isSuccess, isFetching, isError, error }] =
    useLazyAddArticleCommentQuery()

  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const { showSuccessToast, showErrorToast } = useActions()

  const addCommentHandler = () => {
    if (text.length) {
      setDisabled(true)
      fetchAddComment({
        articleId: `${props.article.id}`,
        text,
        token: token || '',
      })
    }
  }

  useEffect(() => {
    if (!isFetching) {
      if (isSuccess) {
        showSuccessToast('Comment added successfully')
        props.onAddComment()
        setText('')
      }

      if (isError && error) {
        showErrorToast(error)
      }
      setDisabled(false)
    }
  }, [isFetching])

  if (!isAuthenticated) {
    return <AlertWarning warning="Please sign in for add comment" />
  }

  return (
    <div className="flex flex-col gap-2 items-end">
      <TextField
        id="filled-multiline-static"
        label="Add comment"
        multiline
        rows={6}
        variant="filled"
        sx={{ width: '100%' }}
        onChange={textChangeHandler}
        disabled={disabled}
        value={text}
      />
      <Button
        sx={{ width: 180 }}
        color="primary"
        variant="contained"
        onClick={addCommentHandler}
        disabled={disabled}
      >
        <span className="font-bold">Add comment</span>
      </Button>
    </div>
  )
}
