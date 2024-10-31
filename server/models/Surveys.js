module.exports = (sequelize, DataTypes) => {
  const Surveys = sequelize.define("Surveys", {
    survey_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      unique: true,
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    delphi_round: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Surveys;
};
