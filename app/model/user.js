const { v4: uuidv4 } = require('uuid');
module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  const User = app.model.define('User', {
    id: {
      type: STRING,
      primaryKey: true,
      defaultValue: () => uuidv4()
    },
    username: STRING,
    password: STRING,
    created_at: DATE
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return User;
};