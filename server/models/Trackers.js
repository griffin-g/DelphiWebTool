module.exports = (sequelize, DataTypes) => {
  const Trackers = sequelize.define("Trackers", {
    hashed_participant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    survey_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Surveys',
        key: 'uuid',
      },
      onDelete: 'CASCADE',
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
