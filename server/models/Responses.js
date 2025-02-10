module.exports = (sequelize, DataTypes) => {
  const Responses = sequelize.define("Responses", {
    response_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    delphi_round: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    response_data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return Responses;
};
