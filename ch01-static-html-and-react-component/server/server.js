import express from 'express'
import path from 'path'
import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server'

/* ----------------------------------------------------------------------------
/* React Component for Server Render
/* ---------------------------------------------------------------------------- */
const ReactComponent = () => (<h1>server render</h1>)
const html = renderToString(
  <ReactComponent />
)

/* ----------------------------------------------------------------------------
/* Express custom middlewares
/* ---------------------------------------------------------------------------- */
const requestLogger = (req, res, next)=>{
  console.warn(`[Server] <-- [Browser]  ${req.path}`)
  next()
}

const sendRenderResult = (req, res) => {
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
app.use(sendRenderResult)

app.listen(port, (error) => {
  (error) ? console.error(error) : console.warn(`Listening on port ${port}.`)
})
