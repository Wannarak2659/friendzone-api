//@ts-check
module.exports = (sequelize, DataTypes) => {
  const GroupPage = sequelize.define(
    "GroupPage",
    {
      name: {
        type: DataTypes.STRING,

        validate: {
          notEmpty: true,
        },
      },
      detail: {
        type: DataTypes.STRING,

        validate: {
          notEmpty: true,
        },
      },
      post: {
        type: DataTypes.STRING,

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

  GroupPage.associate = (db) => {
    // ## GroupPage belongsto User
    GroupPage.belongsTo(db.User, {
      foreignKey: {
        // same data as User
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    }); //--

    // ## GroupPage is associate with GroupMember
    // GroupPage.hasMany(db.GroupMember, {
    //   foreignKey: {
    //     name: "groupId",
    //     allowNull: false,
    //   },
    //   onDelete: "RESTRICT",
    // }); //--

    // ## GroupPage is associate with Post
    GroupPage.hasMany(db.Post, {
      foreignKey: {
        name: "groupId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return GroupPage;
};
