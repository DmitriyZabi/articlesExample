import { useEffect, useState } from 'react'
import { useAppSelector } from 'app/store/hooks/redux'
import Button from '@mui/material/Button'
import { IProps } from './model'
import TextField from '@mui/material/TextField'
import { ImageUploader } from '../uploadImage'
import { IImageData } from 'entities/article/model'

export function ArticleEditor({
  article,
  onUpdateArticle,
  isFetching,
}: IProps) {
  const { token } = useAppSelector((store) => store.auth.user)

  // states
  const [disabled, setDisabled] = useState(false)
  const [image, setImage] = useState<IImageData | null>(
    article !== null ? article.image : null
  )
  const [title, setTitle] = useState(article !== null ? article.title : '')
  const [body, setBody] = useState(article !== null ? article.body : '')

  // handlers
  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const bodyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value)
  }

  const saveArticleHandler = () => {
    if (title.length && body.length) {
      setDisabled(true)
      onUpdateArticle({
        id: `${article?.id}`,
        title,
        body,
        imageFileName: image !== null ? image.name : null,
        token: token || '',
      })
    }
  }

  // effects
  useEffect(() => {
    if (!isFetching) {
      setDisabled(false)
    }
  }, [isFetching])

  return (
    <>
      <div className="flex flex-col gap-5">
        <ImageUploader image={image} onImageUpload={setImage} />

        <TextField
          label="Article title"
          variant="filled"
          sx={{ width: '100%' }}
          onChange={titleChangeHandler}
          disabled={disabled}
          value={title}
        />

        <TextField
          label="Article text"
          variant="filled"
          multiline={true}
          rows={10}
          sx={{ width: '100%' }}
          onChange={bodyChangeHandler}
          disabled={disabled}
          value={body}
        />

        <Button
          sx={{ width: 180 }}
          color="primary"
          variant="contained"
          onClick={saveArticleHandler}
          disabled={disabled}
        >
          <span className="font-bold">Save article</span>
        </Button>
      </div>
    </>
  )
}
