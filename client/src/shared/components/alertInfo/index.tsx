import { AlertTitle } from '@mui/material'
import { IProps } from './model'
import Alert from '@mui/material/Alert'

export function AlertInfo({ title, info }: IProps) {
  return (
    <Alert severity="info">
      {title && <AlertTitle>{title}</AlertTitle>}
      {info}
    </Alert>
  )
}
