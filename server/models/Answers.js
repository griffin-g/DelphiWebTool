module.exports = (sequelize, DataTypes) => {
  const Answers = sequelize.define("Answers", {
    answer_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    response_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Responses",
        key: "response_id",
      },
    },
    answer: {
      unique: false,
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Answers;
};
