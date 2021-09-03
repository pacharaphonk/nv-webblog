module.exports = ( sequelize, DataTypes ) => {
    const Comment = sequelize.define('Comment', {
      blogId: DataTypes.STRING,
      comment: DataTypes.STRING,
      userId: DataTypes.STRING
    })
    return Comment
  }
