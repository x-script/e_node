import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import koaRouter from 'koa-router'

import connect from './src/mongodb'
import routers from './src/router'

const app = new Koa()
const router = new koaRouter()

app.use(koaBodyParser())

routers(router)
app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
  await connect()
})()

const server = app.listen('3000', () => {
  console.log(`[Server] starting at port ${server.address().port}`)
})