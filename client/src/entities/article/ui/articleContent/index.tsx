import { IProps } from './model'
import { Typography } from '@mui/material'

export function ArticleContent(props: IProps) {
  const { title, body, image } = props.article

  return (
    <div>
      <Typography variant="h4" component="div">
        {title}
      </Typography>
      {image !== null && <img src={image.path} alt="" />}
      <div>{body}</div>
    </div>
  )
}
