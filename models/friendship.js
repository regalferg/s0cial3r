module.exports = function(sequelize, Sequelize) {
  var Friendship = sequelize.define(
    "Friendship",

    {
        User1:{
            type: Sequelize.INTEGER,
        },
        User2:{
            type: Sequelize.INTEGER,
        },

      accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }

    },
    
  );

//   Friendship.associate = function (models) {
//     Friendship.belongsToMany(models.user, {as:"groups",through: "friendship", foreignKey:"FID" })
// }
  return Friendship;
};
