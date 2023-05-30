const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/connection');
class Employee extends Model{};
Employee.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
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
   /* address:{
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
},*/
dunkin_id:{
type:DataTypes.INTEGER,
references:{
    model:'dunkin',
    key:'id'
},
dunkin_branch:{
    type:DataTypes.INTEGER,
    references:{
     model:'branch',
     key:'id'   
    }
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
sequelize.sync({force:true}).then(()=>{
    const tr=Employee.create({
        first_name:"first",
        last_name:'last',
        dob:"11-11-2022",
        phone:"737288766",
        address:'103e',
        city:'austin',
        state:'texas',
        zip:78705
    
    });
    console.log(tr)
})

module.exports=Employee;