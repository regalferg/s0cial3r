
module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("user", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    displayName: {
      type: Sequelize.TEXT
    },

    about: {
      type: Sequelize.TEXT
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    last_login: {
      type: Sequelize.DATE
    },

    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active"
    },
    resetPasswordToken: {
      type: Sequelize.STRING
    },
    resetPasswordExpires: {
      type: Sequelize.DATE
    },
    image: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    },
    interests: {
        type: Sequelize.TEXT
      },

    friendsList: {
      type: Sequelize.TEXT
    },


    });
    User.associate = function (models) {
        User.belongsToMany(models.Friendship, {as:"friends",through: "friendship", foreignKey:"FID" })
    }

    return User;};

    // Post.associate = function(models) {
    //     // We're saying that a Post should belong to an Author
    //     // A Post can't be created without an Author due to the foreign key constraint
    //     Post.belongsTo(models.Author, {rs
    //       foreignKey: {
    //         allowNull: false
    //       }
    //     });
    //   };