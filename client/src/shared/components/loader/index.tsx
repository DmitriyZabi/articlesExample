import { IProps } from './model'
import CircularProgress from '@mui/material/CircularProgress'

export function Loader({ isLoading }: IProps) {
  return isLoading ? <CircularProgress /> : <></>
}
