const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config");
// 引入basic-auth,用作encode解密
const basicAuth = require("basic-auth");

class Auth {
  // 权限数字控制api访问权限
  constructor(level) {
    // 用户
    Auth.USER = 2;
    // 管理员
    Auth.ADMIN = 8;
    // 传进来的用户权限
    this.level = level;
  }
  // 返回中间件函数
  get middleware() {
    return async (ctx, next) => {
      // 书写权限逻辑
      // 解析请求头的authorization
      const token = basicAuth(ctx.request);
      // 检验token是否为空
      let msg = "token不合法";
      if (!token || token.name === null) {
        console.log(token.name, 11);
        ctx.body = {
          code: 10005,
          msg: msg,
        };
        return;
      }

      // 判断token是否正确（过期或不合法）
      try {
        var decoded = jwt.verify(token.name, secretKey);
      } catch (e) {
        // 1.token不合法
        // 2.token合法但过期 e.name TokenExpiredError
        if (e.name == "TokenExpiredError") {
          msg = "token已过期";
        }
        ctx.body = {
          code: 10005,
          msg: msg,
        };
        return;
      }

      // 对权限进行对比，如果用户权限小于当前接口可操作权限，返回权限不足
      if (decoded.scope < this.level) {
        ctx.body = {
          code: 401,
          msg: "权限不足",
          request: `${ctx.method}`,
        };
        return;
      }
      await next();
    };
  }

  // 定义静态方法verifyToken，验证token
  static async verifyToken(token) {
    try {
      jwt.verify(token, secretKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = {
  Auth,
};
