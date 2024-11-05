module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    question_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    survey_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Surveys",
        key: "survey_id",
      },
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Short Response", "Multiple Choice", "Ranking"),
      allowNull: false,
    },
    required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return Questions;
};
