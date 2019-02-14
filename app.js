const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
/* jwt密钥 */
const {secret } = require('./config/jwt')
const jwtKoa = require('koa-jwt')

const index = require('./routes/index')
const demo = require('./routes/demo')
const account = require('./routes/account')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
/* 路由权限控制 */
// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401){
        ctx.body = {
            code: 401,
            msg: '需要登录',
            data:'Protected resource, use Authorization header to get access\n'
        }
        ctx.status = 401;
      }else{
          throw err;
      }
  })
})
app.use(jwtKoa({ secret: secret }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
      /^\/account\/login/,
      /^\/account\/create/
  ]
}));
app.use(index.routes(), index.allowedMethods())
app.use(demo.routes(), demo.allowedMethods())
app.use(account.routes(), account.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
