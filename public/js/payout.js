
const fileInputEl=document.getElementById('fileInput');
const uploadBtn=document.getElementById('upload');
const dunKregex = /Dunkin' Donuts LLC(.*?)\$/;

const filecontentArr=[]
const containerEl=document.getElementById('container')
function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


const createReports=async(result)=>{
  fetch('/reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"data":result})
  })
    .then(response => response.json())
    .then(responseData => {
alert(responseData.messege)
    })
  }



const sendToBackendFun=(data)=>{
  fetch('/file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"data":data})
  })
    .then(response => response.json())
    .then(responseData => {
      // Handle the response data
      
const dataArray=responseData.data
// Select the parent element where the table will be appended
// Select the parent element where the table will be appended
const parentElement = document.getElementById('parentElement');

// Create the table element
const table = document.createElement('table');
table.classList.add('table');

// Create the table header
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');

// Create the table header cells
const headers = ['#', 'First', 'Last', 'DOB', 'Phone', 'Value to be Paid'];
headers.forEach(headerText => {
  const th = document.createElement('th');
  th.setAttribute('scope', 'col');
  th.textContent = headerText;
  headerRow.appendChild(th);
});

thead.appendChild(headerRow);

const tbody = document.createElement('tbody');

dataArray.forEach((data, index) => {
  const row = document.createElement('tr');

  const th = document.createElement('th');
  th.setAttribute('scope', 'row');
  th.textContent = index + 1;
  row.appendChild(th);

  data.forEach((cellData, cellIndex) => {
    const td = document.createElement('td');
    td.textContent = cellData;

    row.appendChild(td);
  });

  const buttonCell = document.createElement('td');
  const button = document.createElement('button');

  button.textContent = 'Create the payment';
  button.addEventListener('click', () => {
    const rowData = dataArray[index];
    console.log('Row data:', rowData);
    
    
    alert(`Clicked button in row ${index + 1} - Row data: ${rowData}`);
  });

  buttonCell.appendChild(button);
  row.appendChild(buttonCell);

  tbody.appendChild(row);
});
  

table.appendChild(thead);
table.appendChild(tbody);

const button = document.createElement('button');
button.setAttribute('type', 'button');
button.style.marginLeft = '83px';
button.classList.add('btn', 'btn-danger');
button.textContent = 'Create payment for all of the employees';

button.addEventListener('click',()=>{
  fetch('/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"data":filecontentArr})
  })
    .then(response => response.json())
    .then(result => {
      console.log('result from payment',result)
      if(result){
        alert('payments have been created successfully!!')
        createReports(result)
      }

    })


})
containerEl.appendChild(button)
containerEl.appendChild(table);



    })
  

  
  
  
  
}

fileInputEl.addEventListener('change',(event)=>{
const selectedFile = event.target.files[0];

const reader = new FileReader();

reader.onload = function (event) {
  const fileContent = event.target.result;
  sendToBackendFun(fileContent)
  filecontentArr.push(fileContent)
};

reader.readAsText(selectedFile);

})



