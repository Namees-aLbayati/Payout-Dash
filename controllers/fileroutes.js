const routes=require('express').Router();
const { parseString } = require('xml2js');
const { Method, Environments } =require ('method-node');
const method = new Method({
  apiKey: 'sk_phnDDCbykKzmaGgYLg3RR6Hi',
  env: Environments.dev,
});


let sharedData = null;

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
        name: 'Jefffff Dunkin Donuts LLC',
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







const creatDunkinAccounts=async(ABARouting,accountNumber,dunkinId)=>{
  const account = await method.accounts.create({
    holder_id:`${dunkinId}` ,
    ach: {
      routing: `${ABARouting}`,
      number: `${accountNumber}`,
      type: 'checking',
    },
  });
if (account.type=='ach'){
  return account.id
}else{
  return false
}


}




const createEntity=  async(first_name,last_name,phone,dob,DunkinIdDepend,value)=>{
  
const ent = await method.entities.create({
  type: 'individual',
  individual: {
    first_name: `${first_name}`,
    last_name: `${last_name}`,
    phone: `${phone}`,
    dob: `${formatDate(dob)}`,
  },
 metadata:{"dunkinId":`${DunkinIdDepend}`,
value:`${value}`}
});
if(ent.type=='individual'){
return ent
}else{
  return false
}

}





routes.post('/file',async(req,res)=>{
  const DunkinIdDepend= await creatDunkinMain();

if(req.body.data){
    parseString(req.body.data, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', res.json({"message":"error while parsing data using xml2js"}));
        } else {
 const ParsedFileData=result.root.split('EMP-');

let CleanfileData=ParsedFileData.filter(element=>element.trim()!=="")
CleanfileData.forEach((element)=>{
  const dunIndex=element.indexOf('CORP');

const digits=element.slice(dunIndex+41);
const routing=digits.substring(0,9);
const numbRou=digits.substring(9,17)
const rest=digits.substring(17)

//creatDunkinAccounts(routing,numbRou,DunkinIdDepend) 


let empId=`EMP-${element.split('BRC-')[0]}`;
  var string=element.split('BRC-')[1]
if(string!==undefined){
  let branchId=`BRC-${string.substring(0,36)}`
  const lengthBoth=`${empId}+${branchId}`.length;
let first_name=string.substring(36).split(/(?=[A-Z])/)[0];
let restName= string.substring(36).split(/(?=[A-Z])/)[1];
let last_name=restName.split(/\d/,2)[0];
 let phone="15121231111";
 let dob=restName.match(/\d{2}-\d{2}-\d{4}/)[0];
 const value=element.split("$")[1]
sharedData=[first_name,last_name,phone,dob,DunkinIdDepend,value]
 //createEntity(first_name,last_name,phone,dob,DunkinIdDepend,value)


 userDataArr.push([first_name,last_name,phone,dob,value])


 const regex = /ins_\d+/gim;
const matches = element.match(regex);
const loanAccountNuDestination = matches[0].substring(matches[0].length - 8);
const ins = matches[0].substr(0, matches[0].length - 8);
//creatDunkinAccounts(routing,numbRou,DunkinIdDepend).then((sourceId)=> {
 // getMerchantDetails(ins,loanAccountNuDestination,sourceId,value)
 // })

}

})
 }
 res.json({data:userDataArr})

});
}

   

})

const getMch=async(mch,loanAccountNuDestination,sourceId,value)=>{
const merchant = await method.merchants.get(mch);
const entity = await method.entities.create({
    type: 'individual',
    individual: {
      first_name: `${merchant.parent_name}`,
      phone:'15121231111',
      last_name:'test'

    },
});


var account = await method.accounts.create({
  holder_id: `${entity.id}`,
  liability: {
    mch_id: `mch_2`,
    number: `6720443305`,
  },

},


)


const accountcheck = await method.accounts.get(`${account.id}`);




//const refresh = await method.entities.refreshCapabilities(`${entity.id}`);


//reciver acc
//account.capabilities[1]="data:sync";
 //account.available_capabilities=["payments:receive"]
//console.log('sync',refresh)


let destenation=account.id

//console.log('desta',destenation)
let source=sourceId;
let valuetoTransfer=value;
const convertedAmount = Math.round(valuetoTransfer * 100); 

const payment = await method.payments.create({
  amount: convertedAmount,
  source: `${source}`,
  destination: `${destenation}`,
  description: 'Loan Pmt',
});

console.log('payment has created succesfully')

}


const getMerchantDetails=async(ins,loanAccountNuDestination,sourceId,value)=>{
  const studentLoanFakeIns=['ins_116866','ins_126289','ins_116243','ins_132249']
  const merchants = await method.merchants.list();

const filterArray2=merchants.filter(obj => obj.provider_ids.plaid.includes(ins));
if(filterArray2==""){
  const filteredArray = merchants.filter(obj => obj.provider_ids.plaid.includes('ins_132249'));
  getMch(filteredArray[0].mch_id,loanAccountNuDestination,sourceId,value)
}else{
  getMch(filterArray2[0].mch_id,loanAccountNuDestination,sourceId,value)


}

}

routes.get('/',(req,res)=>{
  console.log(req.query.data)
  const data = req.query.data;
  //let data=[["Ariel","Hayes","15121231111","03-26-1987","8.15"],["Fletcher","Rowe","15121231111","12-13-2002","1.56"],["Lindsay","Yundt","15121231111","02-20-1996","6.72"],["Aurelia","Metz","15121231111","07-27-2003","1.58"],["Uriah","Krajcik","15121231111","09-06-2003","10.08"],["Shemar","Renner","15121231111","03-14-1982","4.96"],["Juliana","Powlowski","15121231111","11-25-1999","4.88"],["Ruth","Collier","15121231111","03-27-2000","7.2\n"]]
  
  res.render('home')
})






module.exports=routes