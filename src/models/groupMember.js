module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define(
    "GroupMember",
    {},
    {
      underscored: true,
    }
  );

  // ## GroupMember belongsto User
  GroupMember.associate = (db) => {
    GroupMember.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    }); //--

    // ## GroupMember belongsto GroupPage
    GroupMember.belongsTo(db.GroupPage, {
      foreignKey: {
        name: "groupId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    }); //--
  };

  return GroupMember;
};
