import { ArticleEditor } from 'features/article/createOrEditArticle'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'app/store/hooks/redux'
import { Loader } from 'shared/components/loader'
import { AlertError } from 'shared/components/alertError'
import { PageTitle } from 'shared/components/layout/pageTitle'
import { useEffect } from 'react'
import { useActions } from 'app/store/hooks/actions'
import {
  useGetMyArticleQuery,
  useUpdateArticleMutation,
} from 'app/store/articles/endpoints/myArticles.endpoint'

export function EditArticlePage() {
  const id: string = useParams().id || ''
  //
  const { user, isChecked } = useAppSelector((store) => store.auth)
  const { showSuccessToast, showErrorToast } = useActions()
  //
  const {
    data: article,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMyArticleQuery(
    { id: id, token: user.token || '' },
    { skip: !isChecked || !user.isAuthenticated }
  )
  //
  const [
    fetchUpdateArticle,
    {
      data: resultUpdateArticle,
      isLoading: isLoadingUpdateArticle,
      isSuccess: isSuccessUpdateArticle,
      isError: isErrorUpdateArticle,
      error: errorUpdateArticle,
    },
  ] = useUpdateArticleMutation()

  useEffect(() => {
    if (!isLoadingUpdateArticle) {
      if (isSuccessUpdateArticle && resultUpdateArticle) {
        showSuccessToast('Article updated successfully')
        //'id' in resultUpdateArticle ? navigate(`/article/${resultUpdateArticle.id}`) : void 0
      }

      if (isErrorUpdateArticle && errorUpdateArticle) {
        showErrorToast(errorUpdateArticle)
      }
    }
  }, [isLoadingUpdateArticle])

  return (
    <>
      <PageTitle title="Edit article" />
      {(function () {
        if (!isChecked) {
          return <Loader isLoading={true} />
        }

        if (!user.isAuthenticated) {
          return (
            <AlertError
              isError={true}
              error={{ status: '401', data: 'No authorization' }}
            />
          )
        }

        if (isLoading) {
          return <Loader isLoading={isLoading} />
        }

        if (isError) {
          return <AlertError isError={isError} error={error} />
        }

        if (isSuccess && article) {
          return (
            <ArticleEditor
              article={article}
              onUpdateArticle={fetchUpdateArticle}
              isFetching={isLoadingUpdateArticle}
            />
          )
        }

        return <></>
      })()}
    </>
  )
}
