const { DataTypes,Model } = require('sequelize');
const sequelize = require('sequelize');
class Payee extends Model{};

Payee.init({
  PlaidId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  LoanAccountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  EmployeeDunkinId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: 'id',
    },
  },
},{
    sequelize
});
module.exports=Payee;







