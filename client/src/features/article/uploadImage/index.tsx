import { useLazyUploadImageQuery } from 'app/store/articles/articles.api'
import { IProps } from './model'
import Button from '@mui/material/Button'
import { useAppSelector } from 'app/store/hooks/redux'
import { useEffect, useState } from 'react'
import { Loader } from 'shared/components/loader'
import { useActions } from 'app/store/hooks/actions'
import styles from './ImageUploader.module.scss'

export function ImageUploader({ image, onImageUpload }: IProps) {
  const [
    fetchUploadImage,
    { data, isLoading, isError, error, isSuccess, isFetching },
  ] = useLazyUploadImageQuery()
  const { token } = useAppSelector((store) => store.auth.user)
  const { showSuccessToast, showErrorToast } = useActions()
  const [disabled, setDisabled] = useState(false)

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg']
    const files = (e.target as HTMLInputElement).files
    const image: File | null = files && files.length ? files[0] : null

    if (image !== null && !validTypes.includes(image.type)) {
      showErrorToast({ data: 'Only .png, .jpg and .jpeg format allowed!' })
    } else {
      const formData = new FormData()
      if (image !== null) {
        formData.append('image', image)
      }
      setDisabled(true)
      fetchUploadImage({
        formData,
        token: token || '',
      })
    }
  }

  const removeImageHandler = () => {
    onImageUpload(null)
  }

  useEffect(() => {
    if (!isFetching) {
      if (isSuccess && data) {
        onImageUpload(data)
        showSuccessToast('Image uploaded successfully')
      }
      if (isError && error) {
        showErrorToast(error)
      }
      setDisabled(false)
    }
  }, [isFetching])

  if (isLoading) {
    return <Loader isLoading={true} />
  }

  return (
    <div className={styles.root}>
      {image === null ? (
        <div className={styles.noImage}></div>
      ) : (
        <div className={styles.image}>
          <img src={image.path} alt="image" />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <Button
          sx={{ width: 180 }}
          variant="contained"
          component="label"
          disabled={disabled}
        >
          <span className="font-bold">Upload image</span>
          <input type="file" hidden onChange={changeImageHandler} />
        </Button>

        <Button
          sx={{ width: 180 }}
          color="error"
          variant="contained"
          component="label"
          disabled={disabled}
          onClick={removeImageHandler}
        >
          <span className="font-bold">Remove image</span>
        </Button>
      </div>
    </div>
  )
}
