const Sequelize = require('sequelize');
const sequelize = new Sequelize('node19', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
      }
  });

const Book = sequelize.define('book', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
},{
    sequelize,
    modelName: 'Book',
    tableName: 'Book'
   
}
);

module.exports = Book;