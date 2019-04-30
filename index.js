const express = require('express')
const nunjuncks = require('nunjucks')

const app = express()

nunjuncks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

// --- criando um middleware
const verifyMiddleware = (req, res, next) => {
  if (!req.query.idade) {
    return res.redirect('/')
  } else {
    return next()
  }
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  if (req.body.idade >= 18) {
    return res.redirect(`/major/?idade=${req.body.idade}`)
  } else {
    return res.redirect(`/minor/?idade=${req.body.idade}`)
  }
})

app.get('/major', verifyMiddleware, (req, res) => {
  let idade = req.query.idade
  return res.render('major', { idade })
})

app.get('/minor', verifyMiddleware, (req, res) => {
  let idade = req.query.idade
  return res.render('minor', { idade })
})

app.listen(3000)
