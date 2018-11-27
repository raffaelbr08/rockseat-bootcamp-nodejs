// Utilizando nunjucks para renderizar uma html nas respostas
// yarn add nunjucls

const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

// configuracao do nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

// config para pegar os parametros dentro da requisicao(POST) = body
app.use(express.urlencoded({ extended: false }))

// e necessario criar uma pasta views, com um arquivo de extensao .njk
app.set('view engine', 'njk')

const user = ['Rafael', 'Diego', 'Clayton']

// chamada do servico  http get
app.get('/', (req, res) => {
  return res.render('list', { user })
})

// chamada do servico  http get
app.get('/new', (req, res) => {
  return res.render('new')
})

// chamada do servico  http post
app.post('/create', (req, res) => {
  user.push(req.body.user)
  return res.redirect('/')
})

app.listen(3000)
