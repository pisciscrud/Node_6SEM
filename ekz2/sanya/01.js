const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { Sequelize, Model, Op } = require('sequelize');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sequelize = new Sequelize("ekzSa", "root", "r00t.R00T", {
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  });

class Driver extends Model{}
Driver.init({
    id: {
        type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    driverExp: {
        type: Sequelize.INTEGER,
    },
}, {sequelize});
class Cars extends Model{};
Cars.init({
    id: {
        type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true,
    },
   model: {
        type: Sequelize.STRING, 
    },
    DriverID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: Driver, key: "id" },
      },
}, {sequelize});


sequelize.sync();


app.get('/exp/:time' , async (req , res)=>{

    const drivers = await Driver.findAll({
        where: {
            driverExp: {
                [Op.lt]: +req.params.time ,
            }
        },
        field: 
        {
            id: true,
            name: true,
            driverExp:true,
        }
    });
         
    if (drivers.length > 0) {
        res.status(200).json(drivers);
    }
    else {
        res.status(404).json("Not Found!");
    }
    
  

})


app.use("/", (err, req, res, next) => {
    res.status(500).send(err.message);
})


app.listen(port , ()=> console.log('> Server is up and running on port : http://localhost:' + port))