const { Router } = require('express')
const router = Router()
const db = require('../models')
const auth = require('../middleware/auth.middlware')
const { getFullFilePath, upload } = require('../services/uploadStorage.service')
const multer = require('multer')

router.get('/getArticles', async (req, res) => {
  try {
    const articles = await db.article.findAll({
      attributes: ['id', 'title', 'body', 'image'],
      include: [
        {
          attributes: ['id', 'name'],
          model: db.user,
          as: 'user',
        },
      ],
    })
    articles.forEach((article) => {
      if (article.image !== null) {
        article.image = {
          name: article.image,
          path: getFullFilePath(article.image),
        }
      }
    })
    res.status(201).json(articles)
  } catch (e) {
    res.status(500).json('Something is wrong, please try again')
  }
})

router.post('/getArticle', async (req, res) => {
  try {
    const { id } = req.body
    if (id === undefined) {
      res.status(500).json('Something is wrong, please try again')
    }
    const article = await db.article.findOne({
      attributes: ['id', 'title', 'body', 'image'],
      where: {
        id: id,
      },
      include: [
        {
          attributes: ['id', 'name'],
          model: db.user,
          as: 'user',
        },
      ],
    })
    if (article === null) {
      return res.status(500).json('Article does not found')
    }
    if (article.image !== null) {
      article.image = {
        name: article.image,
        path: getFullFilePath(article.image),
      }
    }
    res.status(201).json(article)
  } catch (e) {
    res.status(500).json('Something is wrong, please try again')
  }
})

router.post('/getArticleComments', async (req, res) => {
  try {
    const { id } = req.body
    if (id === undefined) {
      res.status(500).json('Something is wrong, please try again')
    }
    const article = await db.article.findOne({
      attributes: ['id'],
      where: {
        id: id,
      },
    })
    if (article === null) {
      return res.status(500).json('Article does not found')
    }
    const comments = await db.comment.findAll({
      attributes: ['id', 'text', 'dateTime'],
      where: {
        articleID: article.id,
      },
      include: [
        {
          attributes: ['id', 'name'],
          model: db.user,
          as: 'user',
        },
      ],
    })
    res.status(201).json(comments)
  } catch (e) {
    res.status(500).json('Something is wrong, please try again')
  }
})

router.post('/addArticleComment', auth, async (req, res) => {
  try {
    const { articleId, text } = req.body

    if (!text) {
      return res.status(500).json('Comment is empty')
    }

    const article = await db.article.findOne({
      attributes: ['id'],
      where: {
        id: articleId,
      },
    })
    if (article === null) {
      return res.status(500).json('Article does not found')
    }

    await db.comment.create({
      articleID: articleId,
      text: text,
      userID: req.user.id,
      dateTime: new Date(),
    })

    res.status(201).json(true)
  } catch (e) {
    res.status(500).json('Something is wrong, please try again')
  }
})

router.post('/getMyArticle', auth, async (req, res) => {
  try {
    const { id } = req.body
    if (id === undefined) {
      res.status(500).json('Something is wrong, please try again')
    }
    const article = await db.article.findOne({
      attributes: ['id', 'title', 'body', 'image'],
      where: {
        id: id,
        userID: req.user.id,
      },
      include: [
        {
          attributes: ['id', 'name'],
          model: db.user,
          as: 'user',
        },
      ],
    })
    if (article === null) {
      return res.status(500).json('Article does not found')
    }
    if (article.image !== null) {
      article.image = {
        name: article.image,
        path: getFullFilePath(article.image),
      }
    }
    res.status(201).json(article)
  } catch (e) {
    res.status(500).json('Something is wrong, please try again')
  }
})

router.get('/getMyArticles', auth, async (req, res) => {
  try {
    const articles = await db.article.findAll({
      attributes: ['id', 'title', 'body', 'image'],
      where: {
        userID: req.user.id,
      },
      include: [
        {
          attributes: ['id', 'name'],
          model: db.user,
          as: 'user',
        },
      ],
    })
    articles.forEach((article) => {
      if (article.image !== null) {
        article.image = {
          name: article.image,
          path: getFullFilePath(article.image),
        }
      }
    })
    res.status(201).json(articles)
  } catch (e) {
    res.status(500).json('Something is wrong, please try again')
  }
})

router.post('/createArticle', auth, async (req, res) => {
  try {
    const { title, body, imageFileName: image } = req.body

    const article = await db.article.create({
      title: title,
      body: body,
      image: image,
      userID: req.user.id,
    })

    res.status(201).json({ id: article.id })
  } catch (e) {
    res.status(500).json('Something is wrong, please try again')
  }
})

router.patch('/updateArticle', auth, async (req, res) => {
  try {
    const { articleId, title, body, imageFileName: image } = req.body

    const findArticle = await db.article.findOne({
      attributes: ['id'],
      where: {
        id: articleId,
        userID: req.user.id,
      },
    })
    if (findArticle === null) {
      return res.status(500).json('Article does not found')
    }

    await db.article.update(
      {
        title: title,
        body: body,
        image: image,
      },
      {
        where: {
          id: articleId,
        },
      }
    )
    res.status(201).json({ id: articleId })
  } catch (e) {
    res.status(500).json('Something is wrong, please try again')
  }
})

router.post('/upload', auth, async (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    }
    if (err) {
      return res.status(500).json(err.message)
    }
    return res.status(200).json({
      name: req.file.filename,
      path: getFullFilePath(req.file.filename),
    })
  })
})

router.delete('/removeArticle', auth, async (req, res) => {
  try {
    const { articleId } = req.body
    if (articleId) {
      const findArticle = await db.article.findOne({
        attributes: ['id'],
        where: {
          id: articleId,
          userID: req.user.id,
        },
      })
      if (findArticle === null) {
        return res.status(500).json('Article does not found')
      }

      await db.comment.destroy({
        where: {
          articleID: articleId,
        },
      })
      await findArticle.destroy()
    }

    res.status(201).json(true)
  } catch (e) {
    res.status(500).json('Something is wrong, please try again')
  }
})

module.exports = router
