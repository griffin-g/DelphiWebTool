module.exports = (sequelize, DataTypes) => {
  const Participants = sequelize.define("Participants", {
    participant_id: {
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
      onDelete: "CASCADE",
    },
    participant_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Participants.associate = function (models) {
    Participants.belongsTo(models.Surveys, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Participants;
};
