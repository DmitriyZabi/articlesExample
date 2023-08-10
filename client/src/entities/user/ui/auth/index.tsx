import { useCheckLoginQuery } from 'app/store/auth/auth.api'
import { useActions } from 'app/store/hooks/actions'
import { useEffect } from 'react'

export function Auth() {
  const { data: user, isSuccess } = useCheckLoginQuery('')
  const { setUser } = useActions()

  useEffect(() => {
    if (isSuccess) {
      setUser(user)
    }
  }, [user, isSuccess])
  return <></>
}
