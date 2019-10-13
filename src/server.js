import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import Koa from 'koa'
import koaStatic from 'koa-static'
import koaHelmet from 'koa-helmet'
import Router from 'koa-router'
import { ApolloProvider, renderToStringWithData } from 'react-apollo'
import { Helmet } from 'react-helmet'
import { createClient } from './lib/apollo'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const router = new Router()

router.get('/*',
  async (ctx, next) => {
    const context = {}
    const client = createClient()

    const markup = await renderToStringWithData(
      <ApolloProvider client={client}>
        <StaticRouter context={context} location={ctx.url}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    )

    ctx.state.markup = markup
    ctx.state.apolloState = client.extract()
    ctx.state.helmet = Helmet.renderStatic()

    return context.url ? ctx.redirect(context.url) : next()
  },
  ctx => {
    ctx.status = 200
    ctx.body = `<!doctype html>
      <html lang="">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            ${ctx.state.helmet.title.toString()}
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
            ${
              assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
            }
            ${
              process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
            }
        </head>
        <body>
            <div id="root">${ctx.state.markup}</div>
            <script>
              window.__APOLLO_STATE__ = ${JSON.stringify(ctx.state.apolloState).replace(/</g, "\\u003c")}
            </script>
        </body>
      </html>`
  }
)

const server = new Koa()
server
  .use(koaHelmet())
  .use(koaStatic(process.env.RAZZLE_PUBLIC_DIR))
  .use(router.routes())
  .use(router.allowedMethods())

export default server
