import express from 'express'
import path from 'path'
import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { Router, Route, IndexRoute, browserHistory, RouterContext, match } from 'react-router'

/* ----------------------------------------------------------------------------
/* React Component for Server Render
/* ---------------------------------------------------------------------------- */
const Root = () => (<h1>Server Root</h1>)
const A = () => (<h1>Server A</h1>)
const B = () => (<h1>Server B</h1>)
const NoMatch = () => (<h1>Server NoMatch</h1>)

const routes = (
    <Route path="/">
      <IndexRoute component={Root}/>
      <Route path="/A" component={A} />
      <Route path="/B" component={B}/>
      <Route path="*" component={NoMatch}/>
    </Route>
)

const html = (renderProps) => renderToString(
  <RouterContext {...renderProps} />
)

/* ----------------------------------------------------------------------------
/* Express custom middlewares
/* ---------------------------------------------------------------------------- */
const requestLogger = (req, res, next)=>{
  console.warn(`[Server] <-- [Browser]  ${req.path}`)
  next()
}

const sendRenderResult = (req, res, html) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>

        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `)
}
/* ----------------------------------------------------------------------------
/* Express configs
/* ---------------------------------------------------------------------------- */
const app = express();
const port = 3000;

const rootDir = path.join(__dirname, '..')
app.use('/dist', express.static(`${rootDir}/dist`))

app.use(requestLogger)

const apiRouter = express.Router()
// /api/api1
apiRouter.get('/api1', (req, res) => {
  res.json({a: 1, b: 2})
})
app.use('/api', apiRouter)

const serverRenderWithRouterMiddleware = (req, res) => {
  match({ routes, location: req.url }, (err, redirect, renderProps) => {
    sendRenderResult(req, res, html(renderProps))
  })
}
app.use(serverRenderWithRouterMiddleware)
app.listen(port, (error) => {
  (error) ? console.error(error) : console.warn(`Listening on port ${port}.`)
})
