import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

export interface IFetchResult {
  data: any
  isSuccess: boolean
  isLoading: boolean
  isError: boolean
  error: SerializedError | FetchBaseQueryError | undefined
}
