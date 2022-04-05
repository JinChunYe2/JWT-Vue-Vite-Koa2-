const Router = require("@koa/router");
const { Auth } = require("../../middlewares/auth");

const contentRouter = new Router({
  prefix: "/content",
});

// 获取文章内容，不需要鉴权
contentRouter.get("/", async (ctx) => {
  ctx.body = "获取文章内容成功";
});

// 新增这种post请求，需要验证token是否有效合法,添加中间件鉴权
contentRouter.post("/", new Auth(8).middleware, async (ctx) => {
  ctx.body = "新增文章内容成功";
});

module.exports = contentRouter;
