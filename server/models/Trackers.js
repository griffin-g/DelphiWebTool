module.exports = (sequelize, DataTypes) => {
  const Trackers = sequelize.define("Tracker", {
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Participants",
        key: "participant_id",
      },
    },
    survey_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Surveys",
        key: "survey_id",
      },
      onDelete: "CASCADE",
    },
    Round: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Participation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

  return Trackers;
};
