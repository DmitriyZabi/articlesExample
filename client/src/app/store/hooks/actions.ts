import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { authActions } from '../auth/auth.slice'
import { toastActions } from '../toast/toast.slice'
import { modalActions } from '../modal/modal.slice'

const actions = {
  ...authActions,
  ...toastActions,
  ...modalActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
