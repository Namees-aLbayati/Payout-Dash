
const fileInputEl=document.getElementById('fileInput');
const uploadBtn=document.getElementById('upload');
const dunKregex = /Dunkin' Donuts LLC(.*?)\$/;



function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
      
    console.log('recived from backend',responseData)
    })
  

  
  
  
  
}

fileInputEl.addEventListener('change',(event)=>{
const selectedFile = event.target.files[0];

const reader = new FileReader();

reader.onload = function (event) {
  const fileContent = event.target.result;
  sendToBackendFun(fileContent)
  // Process the file content or perform any desired operations
};

reader.readAsText(selectedFile);

})



