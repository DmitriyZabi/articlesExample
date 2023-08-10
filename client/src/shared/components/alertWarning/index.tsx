import { AlertTitle } from '@mui/material'
import { IProps } from './model'
import Alert from '@mui/material/Alert'

export function AlertWarning({ title, warning }: IProps) {
  return (
    <Alert severity="warning">
      {title && <AlertTitle>{title}</AlertTitle>}
      {warning}
    </Alert>
  )
}
