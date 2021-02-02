const express = require('express')
const next = require('next')
const vhost = require('vhost')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const mainServer = express()
  const adminServer = express()
  const memberServer = express()
  const loginServer = express()

  adminServer.get('/', (req, res) => {
    return app.render(req, res, '/', req.query)
  })

  adminServer.get('/*', (req, res) => {
    return app.render(req, res, `/${req.path}`, req.query)
  })

  adminServer.all('*', (req, res) => {
    return handle(req, res)
  })

  loginServer.get('/', (req, res) => {
    return app.render(req, res, '/signin.js', req.query)
  })

  loginServer.get('/*', (req, res) => {
    return app.render(req, res, `/signin${req.path}`, req.query)
  })

  loginServer.all('*', (req, res) => {
    return handle(req, res)
  })

  mainServer.use(vhost('localhost', adminServer))
  mainServer.use(vhost('login.localhost', loginServer))
  mainServer.listen(port, (err) => {
    if (err) throw err

    console.log(`> Ready on http://localhost:${port}`)
  })
})
