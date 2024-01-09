const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

class TokenManager {
  static getGenerateAccessToken(payload)
  {
    return jwt.sign(
        payload,
        SECRET,
        {'expiresIn':'1d'}
      );
  }
  static authAccess(req) {
    try {
      let accessToken = req.headers.authorization.split(' ')[1];
      let jwtRes = jwt.verify(String(accessToken),SECRET)
      return jwtRes
    }catch(err) {
      return false
    }
  }
  static getSecret() {
    return require('crypto').randomBytes(64).toString('hex');
  }
}
module.exports = TokenManager;