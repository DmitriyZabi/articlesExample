import { AlertTitle } from '@mui/material'
import { IProps } from './model'
import Alert from '@mui/material/Alert'

export function AlertError({ isError, error }: IProps) {
  if (isError && error !== undefined) {
    const errorStatus = 'status' in error ? error.status : ''
    const errorData = 'data' in error ? error.data : 'Something is wrong'
    return (
      <Alert severity="error">
        <AlertTitle>{`Error ${errorStatus}`}</AlertTitle>
        {`${errorData}`}
      </Alert>
    )
  }
  return <></>
}
