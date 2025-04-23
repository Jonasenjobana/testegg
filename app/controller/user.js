const Controller = require('egg').Controller;

class UserController extends Controller {
  // 创建或更新用户
  async save() {
    const { ctx } = this;
    const { id, username, password } = ctx.request.body;
    let user;
    if (id) {
      // 更新用户
      user = await ctx.model.User.findByPk(id);
      if (!user) {
        throw new Error('用户不存在');
      }
      await user.update({ username, password });
    } else {
      // 创建用户
      user = await ctx.model.User.create({ username, password });
    }
    ctx.body = {
      success: true,
      data: user
    };
  }

  // 删除用户
  async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      throw new Error('用户不存在');
    }
    await user.destroy();
    ctx.body = {
      success: true,
      data: '用户删除成功'
    };
  }

  // 获取单个用户信息
  async getInfo() {
    const { ctx } = this;
    const { id } = ctx.params;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      throw new Error('用户不存在');
    }
    ctx.body = {
      success: true,
      data: user
    };
  }

  // 获取所有用户信息
  async getAllInfo() {
    const { ctx } = this;
    const users = await ctx.model.User.findAll();
    ctx.body = {
      success: true,
      data: users
    };
  }
}

module.exports = UserController;
