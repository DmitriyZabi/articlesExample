import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import { getGoogleUrl } from 'entities/user/lib/auth/getGoogleUrl'

export default function SingIn() {
  const clickHandler = () => {
    window.location.href = getGoogleUrl()
  }

  return (
    <Button
      color="primary"
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={clickHandler}
    >
      <span className="font-bold">Sign In</span>
    </Button>
  )
}
