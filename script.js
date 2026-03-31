// Питомцы
let pets = JSON.parse(localStorage.getItem("pets")) || [];

function save(){ localStorage.setItem("pets", JSON.stringify(pets)); }

function render(){
    let div = document.getElementById("pets");
    if(!div) return;
    div.innerHTML = "";
    pets.forEach((p,i)=>{
        div.innerHTML += `
        <div class="pet" onclick="openProfile(${i})">
            <img src="${p.photo}" alt="${p.name}">
            <h3>${p.name}</h3>
            <button onclick="deletePet(${i});event.stopPropagation()">❌</button>
        </div>`;
    });
}

// Модалка
function openModal(){ document.getElementById("modal").style.display="flex"; }
function closeModal(){ document.getElementById("modal").style.display="none"; }

function savePet(){
    let name=document.getElementById("name").value;
    let type=document.getElementById("type").value;
    let age=document.getElementById("age").value;
    let weight=document.getElementById("weight").value;
    let file=document.getElementById("photo").files[0];
    let photo=file?URL.createObjectURL(file):"images/cat.jpg";
    if(!name) return alert("Введите имя!");
    pets.push({name,type,age,weight,photo});
    save(); render(); closeModal();
}

function deletePet(i){ pets.splice(i,1); save(); render(); }

function openProfile(i){ localStorage.setItem("current", i); window.location="profile.html"; }
function loadProfile(){
    let i=localStorage.getItem("current");
    if(i===null) return;
    let p=pets[i];
    let div=document.getElementById("profile");
    if(!div) return;
    div.innerHTML=`
    <h2>${p.name}</h2>
    <img src="${p.photo}" width="200">
    <p>Вид: ${p.type}</p>
    <p>Возраст: ${p.age}</p>
    <p>Вес: ${p.weight}</p>`;
}

render();
loadProfile();

// Календарь
let today=new Date();
let currentMonth=today.getMonth();
let currentYear=today.getFullYear();
const monthNames=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

function renderCalendar(){
    let calendar=document.getElementById("calendar");
    if(!calendar) return;
    calendar.innerHTML="";
    document.getElementById("monthYear").innerText=monthNames[currentMonth]+" "+currentYear;
    let firstDay=new Date(currentYear,currentMonth,1).getDay();
    firstDay=(firstDay+6)%7;
    let daysInMonth=new Date(currentYear,currentMonth+1,0).getDate();
    for(let i=0;i<firstDay;i++){ let div=document.createElement("div"); div.className="day empty"; calendar.appendChild(div); }
    for(let d=1;d<=daysInMonth;d++){
        let div=document.createElement("div");
        div.className="day";
        div.innerHTML=`<span>${d}</span>`;
        div.onclick=()=>addEvent(d);
        calendar.appendChild(div);
    }
}

function prevMonth(){ currentMonth--; if(currentMonth<0){currentMonth=11;currentYear--;} renderCalendar();}
function nextMonth(){ currentMonth++; if(currentMonth>11){currentMonth=0;currentYear++;} renderCalendar();}
function addEvent(day){
    let eventText=prompt("Введите событие (вес, вакцина, лекарства...)");
    if(!eventText) return;
    let calendar=document.getElementById("calendar");
    let days=calendar.getElementsByClassName("day");
    for(let div of days){ if(div.firstChild.innerText==day){
        let p=document.createElement("p"); p.className="event"; p.innerText=eventText; div.appendChild(p); 
    }}
}

renderCalendar();