"use strict";

const TaskModel = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "tasks",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      deadline: {
        type: DataTypes.DATE
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  return Task;
};

export default TaskModel;
