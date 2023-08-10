import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ArticleContent } from 'entities/article/ui/articleContent'
import { ArticleComments } from 'entities/article/ui/articleComments'
import { Loader } from 'shared/components/loader'
import { AlertError } from 'shared/components/alertError'
import { useGetArticleQuery } from 'app/store/articles/endpoints/allArticles.endpoint'

export function ArticlePage() {
  const id: string = useParams().id || ''
  const {
    data: article,
    isSuccess: isSuccessArticle,
    isLoading: isLoadingArticle,
    isError: isErrorArticle,
    error: errorArticle,
  } = useGetArticleQuery(id)

  if (isLoadingArticle) {
    return <Loader isLoading={isLoadingArticle} />
  }

  if (isErrorArticle) {
    return <AlertError isError={isErrorArticle} error={errorArticle} />
  }

  return (
    <>
      {isSuccessArticle && article && (
        <>
          <ArticleContent article={article} />
          <div className="mt-4 flex flex-col gap-2">
            <Typography variant="h5" component="div">
              Comments
            </Typography>
            <ArticleComments article={article} />
          </div>
        </>
      )}
    </>
  )
}
//
