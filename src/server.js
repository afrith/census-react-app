import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import Koa from 'koa'
import koaStatic from 'koa-static'
import koaHelmet from 'koa-helmet'
import Router from 'koa-router'
import { ApolloProvider, renderToStringWithData } from 'react-apollo'
import { createClient } from './lib/apollo'
import { HelmetProvider } from 'react-helmet-async'
import { request as graphqlRequest } from 'graphql-request'
import { makeFeatureFromPlace } from './lib/geom'
import tokml from 'tokml'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const router = new Router()

router.get('/place/:code/kml', async ctx => {
  const query = `query ($code: String!) {
    placeByCode(code: $code) {
      code
      name
      type { descrip }
      geom
    }
  }`
  const data = await graphqlRequest(process.env.RAZZLE_API_URL + '/graphql', query, { code: ctx.params.code })

  const feature = makeFeatureFromPlace(data.placeByCode)
  feature.properties.description = `${data.placeByCode.type.descrip} ${data.placeByCode.code}`
  const kml = tokml(feature)

  ctx.set('Content-Type', 'application/vnd.google-earth.kml+xml')
  ctx.set('Content-Disposition', `attachment; filename=${data.placeByCode.code}.kml`)
  ctx.body = kml
})

router.get('/*',
  async (ctx, next) => {
    const context = {}
    const client = createClient()
    const helmetContext = {}

    const markup = await renderToStringWithData(
      <ApolloProvider client={client}>
        <StaticRouter context={context} location={ctx.url}>
          <HelmetProvider context={helmetContext}>
            <App />
          </HelmetProvider>
        </StaticRouter>
      </ApolloProvider>
    )

    ctx.state.markup = markup
    ctx.state.apolloState = client.extract()
    ctx.state.helmet = helmetContext.helmet

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
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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
              window.__APOLLO_STATE__ = ${JSON.stringify(ctx.state.apolloState).replace(/</g, '\\u003c')}
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
