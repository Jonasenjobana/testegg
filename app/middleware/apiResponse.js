module.exports = () => {
  return async function apiResponse(ctx, next) {
    let rlt = 0;
    let info = '';
    try {
      await next();
    } catch (error) {
      rlt = 1;
      // 根据错误信息设置 info
      if (error.message) {
        info = error.message;
      } else {
        info = '系统异常';
      }
      ctx.status = ctx.status || 500;
    }

    if (ctx.path.startsWith('/api')) {
      const response = {
        data: ctx.body || null,
        info: info,
        rlt: rlt
      };
      ctx.body = response;
    }
  };
};