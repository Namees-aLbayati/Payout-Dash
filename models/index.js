const Dunkin=require('./dunkin');
const Branches=require('./branch')
const Employee=require('./employees')

Dunkin.hasMany(Branches, { foreignKey: 'dunkinId'});
Branches.belongsTo(Dunkin,{foreignKey:'dunkinId'});
Branches.hasMany(Employee,{foreignKey:'BranchId'});
Employee.belongsTo(Branches,{foreignKey:'BranchId'});
module.exports = { Dunkin, Branches, Employee };
