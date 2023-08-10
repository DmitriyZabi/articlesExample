import { useActions } from 'app/store/hooks/actions'
import { useAppSelector } from 'app/store/hooks/redux'
import Snackbar from '@mui/material/Snackbar'
import { AlertColor } from '@mui/material/Alert'
import Alert from '@mui/material/Alert'

export function ToastContainer() {
  const { toast, showed } = useAppSelector((state) => state.toast)
  const { hideToast } = useActions()

  return (
    <>
      {toast && (
        <Snackbar
          open={showed}
          autoHideDuration={6000}
          onClose={() => hideToast()}
        >
          <Alert
            onClose={() => hideToast()}
            severity={toast.type as AlertColor}
            sx={{ width: '100%' }}
          >
            {toast.text}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}
