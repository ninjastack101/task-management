"use strict";

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  User.associate = function(models) {
    User.hasMany(models.tasks, { foreignKey: "user_id" });
  };
  return User;
};
export default UserModel;
