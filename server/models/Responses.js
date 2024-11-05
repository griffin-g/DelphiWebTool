module.exports = (sequelize, DataTypes) => {
  const Responses = sequelize.define("Responses", {
    response_id: {
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
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Participants",
        key: "participant_id",
      },
    },
  });
  return Responses;
};
