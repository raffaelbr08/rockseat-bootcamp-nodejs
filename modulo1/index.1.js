const express = require('express')

const app = express()

const logMiddle = (req, res, next) => {
  console.log(
    `ENDERECO:${req.headers.host} | URL:${req.url} | Method:${req.method}`
  )

  // é possivel adicionar variaveis dentro do Req
  req.appName = 'GoNode'

  // Use o next para transformar o middle em algo que nao bloqueie o fluxo padrao do Node e sim
  // apenas manipule e continue o fluxo
  return next()
}

app.use(logMiddle)

app.get('/', (req, res) => {
  return res.send(`Olass, ${req.appName} ${req.query.name}`)
})

app.get('/usuario/:id', (req, res) => {
  return res.json({
    idss: req.params.id
  })
})

app.listen(3000)
