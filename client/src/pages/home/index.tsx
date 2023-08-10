import { useGetArticlesQuery } from 'app/store/articles/articles.api'
import { ArticleCard } from 'entities/article/ui/articleCard'
import { AlertError } from 'shared/components/alertError'
import { PageTitle } from 'shared/components/layout/pageTitle'
import { Loader } from 'shared/components/loader'

export function HomePage() {
  const {
    data: articles,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetArticlesQuery('')

  return (
    <div className="flex flex-col">
      <PageTitle title="Home" />
      {(function () {
        if (isLoading) {
          return <Loader isLoading={isLoading} />
        }

        if (isError) {
          return <AlertError isError={isError} error={error} />
        }

        if (isSuccess) {
          return (
            <div className="flex flex-col gap-2">
              {articles.map((x) => (
                <ArticleCard
                  key={x.id}
                  id={x.id}
                  user={x.user?.name}
                  title={x.title}
                  body={x.body}
                />
              ))}
            </div>
          )
        }
      })()}
    </div>
  )
}
