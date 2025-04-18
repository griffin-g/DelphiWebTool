const { v4: uuidv4 } = require("uuid");

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
    elements: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: false,
    },
    delphi_round: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => uuidv4(), // Generate UUID for each survey
      unique: true,
    },
    access_token_hash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Surveys.associate = function (models) {
    Surveys.hasMany(models.Responses, {
      foreignKey: "survey_uuid",
      sourceKey: "uuid",
      as: "responses", // Optional alias for the association
    });
  };

  Surveys.associate = function (models) {
    Surveys.hasMany(models.Participants, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  Surveys.beforeCreate((survey, options) => {
    if (survey.access_token) {
      survey.access_token_hash = hashToken(survey.access_token);
    }
  });

  function hashToken(token) {
    const salt = "salty_pirate";
    return crypto.createHmac("sha256", salt).update(token).digest("hex");
  }

  return Surveys;
};
