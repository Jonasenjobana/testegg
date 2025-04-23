// 引入 jsonwebtoken 库
const { Controller } = require('egg');
const jwt = require('jsonwebtoken');

// 定义 authController 对象，包含登录、登出和获取 CSRF token 的方法
class authController extends Controller {
  // 登录方法
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    // 从数据库中查找用户
    const user = await ctx.model.User.findOne({
      where: {
        username: username,
        password: password
      }
    });

    if (user) {
      // 验证成功，生成 JWT token
      const token = jwt.sign({ username }, ctx.app.config.jwtSecret || 'your_jwt_secret_key', { expiresIn: '1h' });

      // 将 token 写入 cookie
      ctx.cookies.set('token', token, {
        httpOnly: true, // 防止客户端 JavaScript 访问 cookie，增强安全性
        maxAge: 3600000, // 设置 cookie 的过期时间，与 token 过期时间一致
        encrypt: true // 对 cookie 进行加密
      });

      ctx.body = { message: '登录成功', token };
    } else {
      // 验证失败，抛出错误
      throw new Error('用户名或密码错误');
    }
  }

  // 登出方法
  async logout() {
    const { ctx } = this;
    try {
      // 清除用户会话
      ctx.session.user = null;
      // 清除 cookie 中的 token
      ctx.cookies.set('token', null);
      ctx.body = { message: '登出成功' };
    } catch (error) {
      // 抛出错误
      throw error;
    }
  }

  // 获取 CSRF token 的方法
  async csrf() {
    const { ctx } = this;
    try {
      // Egg.js 内置了 CSRF 中间件，可通过 ctx.csrf 直接获取 CSRF token
      ctx.body = { csrfToken: ctx.csrf };
    } catch (error) {
      // 抛出错误
      throw error;
    }
  }
};

module.exports = authController;
