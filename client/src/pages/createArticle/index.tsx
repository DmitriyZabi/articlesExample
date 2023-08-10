import { useAppSelector } from 'app/store/hooks/redux'
import { ArticleEditor } from 'features/article/createOrEditArticle'
import { Loader } from 'shared/components/loader'
import { AlertError } from 'shared/components/alertError'
import { PageTitle } from 'shared/components/layout/pageTitle'
import { useCreateArticleMutation } from 'app/store/articles/articles.api'
import { useEffect } from 'react'
import { useActions } from 'app/store/hooks/actions'
import { useNavigate } from 'react-router-dom'

export function CreateArticlePage() {
  const { user, isChecked } = useAppSelector((store) => store.auth)
  const { showSuccessToast, showErrorToast } = useActions()
  const navigate = useNavigate()
  const [
    fetchCreateArticle,
    {
      data: result,
      isLoading: isLoading,
      isSuccess: isSuccess,
      isError: isError,
      error: error,
    },
  ] = useCreateArticleMutation()

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess && result) {
        showSuccessToast('Article created successfully')
        'id' in result ? navigate(`/edit/${result.id}`) : void 0
      }

      if (isError && error) {
        showErrorToast(error)
      }
    }
  }, [isLoading])

  return (
    <>
      <PageTitle title="Create article" />
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
        return (
          <ArticleEditor
            article={null}
            onUpdateArticle={fetchCreateArticle}
            isFetching={isLoading}
          />
        )
      })()}
    </>
  )
}
