const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
  return async function auth(ctx, next) {
    console.log('auth wtf');
    const apiPrefix = '/api/';
    const ignorePath = '/api/login';

    ctx.logger.info(`当前请求路径: ${ctx.path}`); // 使用内置日志系统记录信息

    // 检查请求路径是否以 /api/ 开头，并且不是 /api/login
    if (ctx.path.startsWith(apiPrefix) && ctx.path !== ignorePath) {
      const token = ctx.header.authorization;
      ctx.logger.info(`获取到的 token: ${token}`); // 使用内置日志系统记录信息
      if (!token) {
        ctx.status = 401;
        ctx.body = {
          success: false,
          error: '缺少 token'
        };
        return;
      }

      try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), app.config.jwtSecret);
        ctx.state.userId = decoded.userId;
        ctx.logger.info(`解码后的用户 ID: ${decoded.userId}`); // 使用内置日志系统记录信息
        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = {
          success: false,
          error: '无效的 token'
        };
        ctx.logger.error(`验证 token 时出错: ${err.message}`); // 使用内置日志系统记录错误信息
      }
    } else {
      // 如果不是 /api/ 开头或者是 /api/login，直接放行
      ctx.logger.info('请求路径无需鉴权，直接放行'); // 使用内置日志系统记录信息
      await next();
    }
  };
};