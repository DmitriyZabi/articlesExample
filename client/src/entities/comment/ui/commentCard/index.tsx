import { IProps } from './model'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export function CommentCard(props: IProps) {
  const { user, text } = props.comment
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user.name}
        </Typography>
        <Typography
          variant="body2"
          className="text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  )
}
