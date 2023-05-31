const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/connection');
class Branches extends Model{};
Branches.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    dunkinId:{
type:DataTypes.INTEGER,
references:{
    key:'id',
    model:'dunkin'
}
    }
},{
    sequelize,
    modelName:'branches'
});
module.exports=Branches
