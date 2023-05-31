const fileInputEl=document.getElementById('fileInput');
const uploadBtn=document.getElementById('upload');
const token='sk_phnDDCbykKzmaGgYLg3RR6Hi'
const url = 'https://dev.methodfi.com/entities';
function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const createIndvisualsFun=(data)=>{
  fetch(url,{
    method:'POST',
    headers:{
      'Authorization': `Bearer ${token}`,

      "Content-Type":'application/json'
    },
    body: JSON.stringify(data)

    }).then((response)=>response.json()).then((result)=>{
console.log('success',result)
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
      responseData.forEach(element => {
        let data={"type": "individual",
        "individual": {
          first_name: element.first_name,
          last_name:element.last_name,
          phone:element.phone,
          dob:formatDate(element.dob)
        }}

createIndvisualsFun(data)



      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

  
  
  
  
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