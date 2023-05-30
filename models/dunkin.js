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
        type:DataTypes.STRING
    },
    DBA:{
        type:DataTypes.STRING
    },
    EIN:{
        type:DataTypes.STRING
    }

     ,address:{
        type:DataTypes.STRING
    },
    city:{
        type:DataTypes.STRING
    },
    state:{
        type:DataTypes.STRING
    },

zip:{
    type:DataTypes.INTEGER
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