const routes=require('express').Router();
const { parseString } = require('xml2js');
const { Method, Environments } =require ('method-node');
const method = new Method({
  apiKey: 'sk_phnDDCbykKzmaGgYLg3RR6Hi',
  env: Environments.dev,
});
const restOfFileArr=[]
const nameRegex = /^[A-Za-z]+/;
const numberRegex = /[0-9]+/;
const userDataArr=[]
const coopDataArr=[]
const dunkinId=[]
const mainIdDun=[]
const formatDate=require('../helpers/helpersFun')
const patterncorp = /CORP-\d{8}-\d{4}-\w{4}-\w{12}\//;


const creatDunkinMain=async()=>{

    const dunkin = await method.entities.create({
      type: 'c_corporation',
      corporation: {
        name: 'Namees Dunkin Donuts LLC',
        dba: 'Dunkin Donuts',
        ein: '32120240',
        owners:[],
      },
      address: {
        line1: '999 Hayes Lights',
        line2: null,
        city: 'Kerlukemouth',
        state: 'CA',
        zip: '94043',
      },
    });
    return dunkin.id


}




const addingAccountsToDunkin=async(id)=>{
console.log(id,dunkinId[0],' data dunkin accounts');
dunkinId.forEach((ele)=>{
  const source =  method.accounts.create({
    holder_id: `${id}`,
    ach: {
      routing: `${ele[0]}`,
      number: `${ele[1]}`,
      type: 'checking',
    },
  }).then((sourceInfor)=>{
    console.log('source account has created succesfully',sourceInfor)

  })


})

}


const processData=(data)=>{
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
 console.log('user data',empId,branchId,first_name,last_name,phone,dob)
 userDataArr.push({empId,branchId,first_name,last_name,phone,dob});
}
return userDataArr

});
}




const processCoopFData=  (data)=>{
  
  data.forEach((element)=>{
    const dunIndex=element.indexOf('CORP');

const digits=element.slice(dunIndex+41);
const routing=digits.substring(0,9);
const numbRou=digits.substring(9,17)
const rest=digits.substring(17)
restOfFileArr.push(rest)


if(routing&&numbRou!==""){
  dunkinId.push([routing,numbRou])


}

  })
}





routes.post('/file',async(req,res)=>{
if(req.body.data){
    parseString(req.body.data, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', res.json({"message":"error while parsing data using xml2js"}));
        } else {
 const ParsedFileData=result.root.split('EMP-');

processCoopFData(ParsedFileData)

processData(ParsedFileData)


let data=  creatDunkinMain().then((dat)=>{
  addingAccountsToDunkin(dat)

  userDataArr.forEach((employeedata)=>{
    method.entities.create({
     type: 'individual',
     individual: {
       first_name: `${employeedata.first_name}`,
       last_name: `${employeedata.last_name}`,
       phone: "15121231111",
       dob: `${formatDate(employeedata.dob)}`,
     },
     metadata:{"dunkinId":`${dat}`}
   }).then((result)=>{
     console.log('entity emp has created',result)
   })
 })

});


 res.status(300).json()
 getMerchant(restOfFileArr)

        }
      });
}else{
    res.json({"message":"no data found on the body"})
}
   

})
const getMerchant=(rest)=>{
console.log('get merchant fun=================',rest)
 const regex = /ins_\d+/gim;
  restOfFileArr.forEach((element)=>{
    if(element!==""||undefined||null){
      const includedValuesARR=[]

      const matches = element.match(regex);
const loanAccountNu = matches[0].substring(matches[0].length - 8);
const ins = matches[0].substr(0, matches[0].length - 8);
 method.merchants.list()
.then((mdata)=>{
mdata.forEach((mdata1)=>{
const plaidArr=mdata1.provider_ids.plaid
const testplainiD=["ins_114108","ins_116243"]
const matchingElements = plaidArr.filter(element =>  testplainiD.includes(element));
includedValuesARR.push(matchingElements)
/*for(var i=0;i<plaidArr.length;i++){
  if(plaidArr[i]==testplainiD[0]){
    includedValuesARR.push(plaidArr[i])

  }else{
return false
  }
}*/
})
const nonEmptyValues = includedValuesARR.flat().filter(value => value !== '');

console.log(nonEmptyValues);
})
}
})



}


module.exports=routes