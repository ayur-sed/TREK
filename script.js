let pets = JSON.parse(localStorage.getItem("pets")) || [];

function save() {
    localStorage.setItem("pets", JSON.stringify(pets));
}

function render() {
    let div = document.getElementById("pets");
    if(!div) return;

    div.innerHTML = "";

    pets.forEach((p, i) => {
        div.innerHTML += `
        <div class="pet" onclick="openProfile(${i})">
            <img src="${p.photo}" alt="${p.name}">
            <h3>${p.name}</h3>
            <button onclick="deletePet(${i});event.stopPropagation()">❌</button>
        </div>`;
    });
}

function openModal(){ document.getElementById("modal").style.display="flex"; }
function closeModal(){ document.getElementById("modal").style.display="none"; }

function savePet() {
    let name = document.getElementById("name").value;
    let type = document.getElementById("type").value;
    let age = document.getElementById("age").value;
    let weight = document.getElementById("weight").value;
    let file = document.getElementById("photo").files[0];
    let photo = file ? URL.createObjectURL(file) : "images/cat.jpg";

    if(!name) return alert("Введите имя!");

    pets.push({name,type,age,weight,photo});
    save();
    render();
    closeModal();
}

function deletePet(i) {
    pets.splice(i,1);
    save();
    render();
}

function openProfile(i){
    localStorage.setItem("current", i);
    window.location = "profile.html";
}

function loadProfile(){
    let i = localStorage.getItem("current");
    if(i===null) return;
    let p = pets[i];
    let div = document.getElementById("profile");
    if(!div) return;
    div.innerHTML = `
    <h2>${p.name}</h2>
    <img src="${p.photo}" width="200">
    <p>Вид: ${p.type}</p>
    <p>Возраст: ${p.age}</p>
    <p>Вес: ${p.weight}</p>`;
}

render();
loadProfile();