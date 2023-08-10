import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'

export default function SignOut() {
  const clickHandler = () => {
    const host =
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_SERVER_ENDPOINT_PROD
        : process.env.REACT_APP_SERVER_ENDPOINT_DEV

    window.location.href = `${host}/api/auth/logout`
  }

  return (
    <Button
      color="primary"
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={clickHandler}
    >
      <span className="font-bold">Sign Out</span>
    </Button>
  )
}
