module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define(
    "GroupMember",
    {},
    {
      underscored: true,
    }
  );
  return GroupMember;
};
