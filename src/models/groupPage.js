module.exports = (sequelize, DataTypes) => {
  const GroupPage = sequelize.define(
    "GroupPage",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      groupImage: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
  return GroupPage;
};
