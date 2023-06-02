const routes=require('express').Router();
const { parseString } = require('xml2js');
const nameRegex = /^[A-Za-z]+/;
const numberRegex = /[0-9]+/;
const userDataArr=[]
const coopDataArr=[]
const patterncorp = /CORP-\d{8}-\d{4}-\w{4}-\w{12}\//;

const { Method, Environments } =require ('method-node');
const method = new Method({
  apiKey: 'sk_phnDDCbykKzmaGgYLg3RR6Hi',
  env: Environments.dev,
});


const createEntANDcoop=async()=>{
  const entity = await  method.entities.create({
    type: 'individual',
    individual: {
      first_name: 'Kevin',
      last_name: 'Doyle',
      phone: '+16505555555',
      email: 'kevin.doyle@gmail.com',
      dob: '1997-03-18',
    },
    address: {
      line1: '3300 N Interstate 35',
      line2: null,
      city: 'Austin',
      state: 'TX',
      zip: '78705',
    },
  });
  const coop = await method.entities.create({
    type: 'c_corporation',
    corporation: {
      name: 'Dunkin Donuts LLC',
      dba: 'Dunkin Donuts',
      ein: '32120240',
      owners: [],
    },
    address: {
      line1: '999 Hayes Lights',
      line2: null,
      city: 'Kerlukemouth',
      state: 'TX',
      zip: "78705",
    },
  });
}



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
if(routing&&numbRou!==""){
  createCoop(routing,numbRou)


}
  })
}





routes.post('/file',(req,res)=>{
  console.log('req.data',req.body)
if(req.body.data){
    parseString(req.body.data, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', res.json({"message":"error while parsing data using xml2js"}));
        } else {


 const ParsedFileData=result.root.split('EMP-');

processData(ParsedFileData)
processCoopFData(ParsedFileData)

 res.status(300).json()

        }
      });
}else{
    res.json({"message":"no data found on the body"})
}
   

})


const createCoop=async(routNu1,num2)=>{
let creditData=[routNu1,num2]
const credArr=[]
const entId=[]
const sourcACCArr=[]
credArr.push(creditData)
  const entity = await method.entities.create({
    type: 'c_corporation',
    individual:[{first_name:'branch1'},{first_name:'branch2'},{first_name:'branch3'},
    {first_name:'branch4'},{first_name:'branch5'}],
    corporation: {
      name: 'Dunkin Donuts LLC',
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
    entId.push(entity.id)
    console.log(entity)
    
  //const combinedArray = credArr.map((subArray, index) => [...subArray, entId[index]]);
/*
const source = await method.accounts.create({
  holder_id: `${combinedArray[0][2]}`,
  ach: {
    routing: `${combinedArray[0][0]}`,
    number: `${combinedArray[0][1]}`,
    type: 'checking',
  },
});
sourcACCArr.push(source.id)
*/





  

}


module.exports=routes