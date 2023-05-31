const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/connection');
class Employee extends Model{};
Employee.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true
        ,allowNull:false
    }
    ,
    first_name:{
        type:DataTypes.STRING
    },
    last_name:{
        type:DataTypes.STRING
    },
    dob:{
        type:DataTypes.DATEONLY
    },
    phone:{
        type:DataTypes.STRING,
    },


BranchId:{
    type:DataTypes.INTEGER,
    references:{
        key:'id' ,  

     model:'branches'
    }
}

},{
sequelize,
timestamps:true,
freezeTableName:true,
underscored:true,
modelName:'employee'
}
);


module.exports=Employee;