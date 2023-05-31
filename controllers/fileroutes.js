const routes=require('express').Router();
const { parseString } = require('xml2js');
const Employee=require('../models')
const nameRegex = /^[A-Za-z]+/;
const numberRegex = /[0-9]+/;
const userDataArr=[]

const processData=(data)=>{
  //console.log('EMPID,BRANCHID',data[1].split('BRC-')[1].substring(0, 36))
 data.forEach(data1 => {

  let empId=`EMP-${data1.split('BRC-')[0]}`;
  var string=data1.split('BRC-')[1]
  
if(string!==undefined){
  let branchId=`BRC-${string.substring(0,36)}`
  const lengthBoth=`${empId}+${branchId}`.length;
let first_name=string.substring(36).split(/(?=[A-Z])/)[0];
let restName= string.substring(36).split(/(?=[A-Z])/)[1];
let last_name=restName.split(/\d/,2)[0];
 let phone=restName.split("+")[1];
 let dob=restName.match(/\d{2}-\d{2}-\d{4}/)[0];
 userDataArr.push({empId,branchId,first_name,last_name,phone,dob});
}else{
  console.log('error')
}
return userDataArr

});
}
routes.post('/file',(req,res)=>{
if(req.body.data){
    parseString(req.body.data, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', res.json({"message":"error while parsing data using xml2js"}));
        } else {
          const ParsedFileData=result.root.split('EMP-');


processData(ParsedFileData)
 res.status(300).json(userDataArr)

        }
      });
}else{
    res.json({"message":"no data found on the body"})
}
   

})
module.exports=routes