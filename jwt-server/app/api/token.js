const Router = require("@koa/router");
const users = require("../data/users");
const { generateToken } = require("../../core/util");
const { Auth } = require("../../middlewares/auth");

const tokenRouter = new Router({
  // 设置路由前缀 /token
  prefix: "/token",
});

tokenRouter.post("/", async (ctx) => {
  // 解构读取信息
  const { username, password } = ctx.request.body;

  // 验证账号密码是否正确
  const result = verifyUsernamePassword(username, parseInt(password));

  // 返回结果
  ctx.body = {
    ...result,
  };
});

tokenRouter.post("/verify", async (ctx) => {
  const token = ctx.request.body.userToken;
  const isValid = await Auth.verifyToken(token);
  if (isValid) {
    ctx.body = {
      code: 200,
      msg: "token验证成功",
    };
    return;
  }
  ctx.body = {
    code: 401,
    msg: "token失效",
  };
});

function verifyUsernamePassword(username, password) {
  const index = users.findIndex((item) => {
    return item.username === username && item.password === password;
  });

  // users是否包含返回的数据，如果包含返回下标（为true），否则返回undefined
  const user = users[index];

  // 定义返回值
  const codeMssage = {
    code: 200,
    msg: "登陆成功~",
  };

  // 验证错误，返回错误参数
  if (!user) {
    codeMssage.code = 10001;
    codeMssage.msg = "账号密码错误~";
    return codeMssage;
  }

  // 通过generateToken方法来获取token
  const token = generateToken(user.id, Auth.USER);
  // token值添加到返回中
  codeMssage.token = token;

  // 验证成功
  return codeMssage;
}

// 导出
module.exports = tokenRouter;
