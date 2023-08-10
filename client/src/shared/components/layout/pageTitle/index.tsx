import { IProps } from './model'
import { Typography } from '@mui/material'

export function PageTitle(props: IProps) {
  return (
    <Typography variant="h3" component="div">
      {props.title}
    </Typography>
  )
}
