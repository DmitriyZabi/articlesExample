import { ArticleCard } from 'entities/article/ui/articleCard'
import { useAppSelector } from 'app/store/hooks/redux'
import { useEffect } from 'react'
import { Loader } from 'shared/components/loader'
import { AlertError } from 'shared/components/alertError'
import { PageTitle } from 'shared/components/layout/pageTitle'
import { AlertInfo } from 'shared/components/alertInfo'
import { useLazyGetMyArticlesQuery } from 'app/store/articles/endpoints/myArticles.endpoint'

export function MyArticlesPage() {
  const { user, isChecked } = useAppSelector((store) => store.auth)
  const [
    fetchMyArticles,
    { data: articles, isSuccess, isLoading, isError, error },
  ] = useLazyGetMyArticlesQuery()

  useEffect(() => {
    if (isChecked && user.isAuthenticated) {
      fetchMyArticles(user.token || '')
    }
  }, [isChecked])

  return (
    <div className="flex flex-col">
      <PageTitle title="My articles" />
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

        if (isSuccess && articles && !articles.length) {
          return <AlertInfo info="No articles" />
        }

        if (isSuccess && articles) {
          return (
            <div className="flex flex-col gap-2">
              {articles.map((x) => (
                <ArticleCard
                  key={x.id}
                  id={x.id}
                  user={x.user?.name}
                  title={x.title}
                  body={x.body}
                  canEdit={true}
                  canRemove={true}
                  onRemoveArticle={() => fetchMyArticles(user.token || '')}
                />
              ))}
            </div>
          )
        }

        return <></>
      })()}
    </div>
  )
}
