import { IProps } from './model'
import { CommentCard } from 'entities/comment/ui/commentCard'
import { useEffect } from 'react'
import { AddComment } from 'features/comment/addComment'
import { Loader } from 'shared/components/loader'
import { AlertError } from 'shared/components/alertError'
import { AlertInfo } from 'shared/components/alertInfo'
import { useLazyGetArticleCommentsQuery } from 'app/store/articles/endpoints/articleComments.endpoint'

export function ArticleComments(props: IProps) {
  const [
    fetchArticleComments,
    { data: comments, isSuccess, isLoading, isError, error },
  ] = useLazyGetArticleCommentsQuery()

  useEffect(() => {
    fetchArticleComments(`${props.article.id}`)
  }, [])

  if (isLoading) {
    return <Loader isLoading={isLoading} />
  }

  if (isError) {
    return <AlertError isError={isError} error={error} />
  }

  if (isSuccess && comments) {
    return (
      <>
        {!comments.length ? (
          <AlertInfo info="No comments" />
        ) : (
          comments.map((x) => <CommentCard key={x.id} comment={x} />)
        )}
        <AddComment
          article={props.article}
          onAddComment={() => fetchArticleComments(`${props.article.id}`)}
        />
      </>
    )
  }
  return null
}
