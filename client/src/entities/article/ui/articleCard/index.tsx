import { IProps } from './model'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { RemoveArticle } from 'features/article/removeArticle'

export function ArticleCard(props: IProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.user}
        </Typography>
        <Typography
          variant="body2"
          className="text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {props.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/article/${props.id}`} size="small">
          Read article
        </Button>
        {props.canEdit && (
          <Button component={Link} to={`/edit/${props.id}`} size="small">
            Edit article
          </Button>
        )}
        {props.canRemove && <RemoveArticle id={props.id} onRemoveArticle={props.onRemoveArticle} />}
      </CardActions>
    </Card>
  )
}
