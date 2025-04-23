/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  router.post("/api/login", controller.auth.login);
  // 增和改
  router.post("/api/users/save", controller.user.save);
  // 删
  router.get("/api/users/delete/:id", controller.user.delete);
  // 查单个用户
  router.get("/api/users/getInfo/:id", controller.user.getInfo);
  // 查所有用户
  router.get("/api/users/getAllInfo", controller.user.getAllInfo);
};
