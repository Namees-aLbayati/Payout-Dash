const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/connection');
class Dunkin extends Model{};
//payor
Dunkin.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
        ,allowNull:false
    },
    ABARouting:{
type:DataTypes.INTEGER
    },
    AccountNumber:{
type:DataTypes.INTEGER
    },
    name:{
        type:DataTypes.STRING,
        defaultValue:'Dunkin Donuts LLC'
    },
    DBA:{
        type:DataTypes.STRING,
        defaultValue:'Dunkin Donuts'
    },
    ein:{
        type:DataTypes.STRING,
        defaultValue:"32120240999"
    }

     ,address:{
        type:DataTypes.STRING,
        defaultValue:'Hayes Lights'
    },
    city:{
        type:DataTypes.STRING,
        defaultValue:'Kerlukemouth'
    },
    state:{
        type:DataTypes.STRING,
        defaultValue:'IA'
    },

zip:{
    type:DataTypes.INTEGER,
    defaultValue:67485
}
    
   },{
sequelize,
timestamps:true,
freezeTableName:true,
underscored:true,
modelName:'dunkin'
}
);


module.exports=Dunkin;