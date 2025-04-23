/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1745392718245_2900';

  // add your middleware config here
  config.middleware = [ 'apiResponse', 'auth' ];
  // 移除 config.auth.ignore 配置
  // config.auth = {
  //   ignore: [ '/api/login' ] 
  // };

  // JWT 密钥
  config.jwtSecret = 'your_jwt_secret_key';

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 添加 MySQL 配置
  config.sequelize = {
    dialect: 'mysql', // 数据库类型
    host: '127.0.0.1',
    port: 3306,
    database: 'egg-database',
    username: 'root',
    password: '111111',
  };

  // 添加或修改端口配置
  config.cluster = {
    listen: {
      port: 8081, // 更改为你想要使用的端口号
      hostname: '127.0.0.1', 
    }
  };
  // 暂时关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
