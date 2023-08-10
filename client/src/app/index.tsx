import './index.scss'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { HomePage } from 'pages/home'
import { ArticlePage } from 'pages/article'
import { UserPage } from 'pages/user'
import { Provider } from 'react-redux'
import { store } from './store'
import Container from '@mui/material/Container'
import { CreateArticlePage } from 'pages/createArticle'
import { EditArticlePage } from 'pages/editArticle'
import { MyArticlesPage } from 'pages/myArticles'
import { ToastContainer } from 'entities/toast/ui/toastContainer'
import { ModalWindow } from 'entities/modal/ui/modalWindow'
import Header from 'shared/components/layout/header'
import { Auth } from 'entities/user/ui/auth'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Auth />
        <ToastContainer />
        <ModalWindow />
        <Header />
        <Container maxWidth="lg" className="mt-4">
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/create/" element={<CreateArticlePage />} />
              <Route path="/edit/:id" element={<EditArticlePage />} />
              <Route path="/my-articles/" element={<MyArticlesPage />} />
              {/*<Route path="/*" element={<Navigate replace to="/" />} />*/}
            </Routes>
          </main>
        </Container>
      </Router>
    </Provider>
  )
}

export default App
