import { useAppSelector } from 'app/store/hooks/redux'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import SingIn from 'features/user/auth/signIn'
import SignOut from 'features/user/auth/signOut'
import { Loader } from 'shared/components/loader'

export default function Header() {
  const { user, isChecked } = useAppSelector((state) => state.auth)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit" sx={{ bgcolor: '#dadada' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Articles
          </Typography>

          <Button color="primary" component={Link} to="/">
            Home
          </Button>

          {user?.isAuthenticated && (
            <Button color="primary" component={Link} to="/create">
              Create
            </Button>
          )}
          {user?.isAuthenticated && (
            <Button color="primary" component={Link} to="/my-articles">
              My articles
            </Button>
          )}
          {(function () {
            if (!isChecked) {
              return <Loader isLoading={true} />
            }
            if (user && user.isAuthenticated) {
              return <SignOut />
            }
            return <SingIn />
          })()}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
