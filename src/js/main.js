"use strict"; 

getExperiece(); 
let submitBtnEl = document.getElementById("submitBtn"); 

//eventlyssnare
submitBtnEl.addEventListener("click", function(event){
    event.preventDefault(); //så sidan inte laddar om. 

    //hämtar värden från formuläret
    let companyStr = document.getElementById("company").value; 
    let titleStr = document.getElementById("title").value; 
    let descriptionStr = document.getElementById("description").value; 
    let locationStr = document.getElementById("location").value; 

    //skickar med värden till funktion
    addExperience(companyStr, titleStr, descriptionStr, locationStr);
})  

async function addExperience(company, title, description, location) {
    let experience = {
        company:company, 
        title: title, 
        description: description, 
        location: location
    }

    let response = await fetch("http://127.0.0.1:3000/api/workexp", {
        method: "POST", 
        headers: {
            "content-type": "Application/json"
        }, 
        body: JSON.stringify(experience)
    }); 

    let data = await response.json(); 

    console.table(data); 
}

async function getExperiece(){
    let response = await fetch("http://127.0.0.1:3000/api/workexp"); 

    let data = await response.json(); 

    console.log(data);

    printOutData(data);  
} 
 

//för att skriva ut data till första sidan. 
function printOutData(data){ 

    let expListEl = document.getElementById("expList")

    data.forEach(post => {
    let newPost = document.createElement("article"); 
    
    newPost.innerHTML = `
    <b>Arbetsgivare:</b> ${post.companyname}<br>
    <b>Jobbtitel:</b> ${post.jobtitle}<br>
    <b>Arbetsuppgift:</b> ${post.description}<br>
    <b>Plats/Stad:</b> ${post.location}<br>
    `;  
    
    let deleteBtn = document.createElement("button"); 
    deleteBtn.textContent = "Radera" 

    deleteBtn.addEventListener('click', function(){
        deletePost(post.id); 
    });

    newPost.appendChild(deleteBtn); 
    expListEl.appendChild(newPost); 
            
    });
}  

async function deletePost(id){

    let response = await fetch("http://127.0.0.1:3000/api/workexp/" + id, {
        method: "DELETE", 
        headers: {
        "content-type": "Application/json"
        }
    }); 

    let data = await response.json(); 

    window.location.reload(); 
    
    console.log(data);
 
}

window.onload = printOutData; 