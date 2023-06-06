const routes=require('express').Router();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'report.csv',
    header: [
      { id: 'id', title: 'id' },
      { id: 'source', title: 'Source' },
      { id: 'destination', title: 'Destination' },
      { id: 'amount', title: 'Amount' },
      { id: 'description', title: 'Description' },
      { id: 'status', title: 'Status' },
      { id: 'estimated_completion_date', title: 'Estimated Completion Date' },
      { id: 'source_settlement_date', title: 'Source Settlement Date' },
      { id: 'source_status', title: 'Source Status' },
      { id: 'destination_settlement_date', title: 'Destination Settlement Date' },
      { id: 'destination_status', title:'Destination Status' },
      { id: 'reversal_id', title: 'Reversal ID' },
      { id: 'fee', title: 'Fee' },
      { id: 'type', title: 'Type' },
      { id: 'error', title: 'Error' },
      { id: 'metadata', title: 'Metadata' },
      { id: 'created_at', title: 'Created At' },
      { id: 'updated_at', title: 'Updated At' }
      ],
      });  



routes.post('/reports',(req,res)=>{
const data=req.body.data;
csvWriter
.writeRecords(data)
.then(() => res.json({"messege":'CSV report generated successfully'}))
.catch((error) => console.error('Error generating CSV report:', error));


})




module.exports=routes