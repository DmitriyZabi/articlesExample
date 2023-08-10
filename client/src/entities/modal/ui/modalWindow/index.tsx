import { useActions } from 'app/store/hooks/actions'
import { useAppSelector } from 'app/store/hooks/redux'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import { useState } from 'react'

export function ModalWindow() {
  const { hideModal } = useActions()
  const { showed, title, description, acceptButton } = useAppSelector(
    (store) => store.modal
  )
  const [disabled, setDisabled] = useState(false)

  const handleAcceptClick = async () => {
    setDisabled(true)
    acceptButton && acceptButton.onClick ? await acceptButton.onClick() : void 0
    hideModal()
    setDisabled(false)
  }

  return (
    <Modal open={showed} onClose={() => hideModal()}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: 'none',
            maxWidth: 'unset',
          },
        })}
      >
        {title && (
          <Typography id="nested-modal-title" component="h2">
            {title}
          </Typography>
        )}
        {description && (
          <Typography id="nested-modal-description" textColor="text.tertiary">
            {description}
          </Typography>
        )}
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row-reverse' },
          }}
        >
          {acceptButton !== null && (
            <Button
              variant="solid"
              color={acceptButton?.color}
              onClick={handleAcceptClick}
              disabled={disabled}
            >
              {acceptButton!.text}
            </Button>
          )}
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => hideModal()}
          >
            Cancel
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}
