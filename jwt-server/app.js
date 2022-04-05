const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
// 引入token相关路由
const tokenRouter = require("./app/api/token");
// 引入内容相关路由
const contentRouter = require("./app/api/content");

const app = new Koa();

// 解析前端发送过来的数据, ctx.request.body
app.use(bodyParser());

// 注册 token 相关路由
app.use(tokenRouter.routes());
// 注册 content 相关路由
app.use(contentRouter.routes());

// 端口号配置
app.listen(3000);
