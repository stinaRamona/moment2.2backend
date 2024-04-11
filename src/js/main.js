"use strict"; 

/*
//hämtar värden från formuläret
let companyStr = document.getElementById("company").value; 
let titleStr = document.getElementById("title").value; 
let descriptionStr = document.getElementById("description").value; 
let locationStr = document.getElementById("location").value; 
*/

getExperiece(); 

addExperience("test", "test", "test", "test"); 

async function getExperiece(){
    let response = await fetch("http://127.0.0.1:3000/api/workexp"); 

    let data = await response.json(); 

    console.log(data);

    printOutData(data); 
} 

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
    <br>
    `; 

    expListEl.appendChild(newPost); 
            
    });
}