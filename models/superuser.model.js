module.exports = (sequelize, Sequelize) => {
  const SuperUser = sequelize.define(
    "tb_super_user",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      aktif: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "tb_super_user",
      timestamps: false,
      underscore: true,
    }
  );

  return SuperUser;
};
