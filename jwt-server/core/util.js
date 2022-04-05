const jwt = require("jsonwebtoken");
const { secretKey, expiresIn } = require("../config/config");

// 使用jwt生成token，传入用户id和权限
function generateToken(uid, scope) {
  const token = jwt.sign(
    {
      uid,
      scope,
    },
    secretKey,
    {
      expiresIn,
    }
  );

  return token;
}

module.exports = { generateToken };
