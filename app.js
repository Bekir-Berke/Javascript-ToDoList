let taskInput = document.querySelector("#task");
let addTaskButton = document.querySelector("#liveToastBtn");
let taskList = document.querySelector("#list");
let lists = taskList.querySelectorAll("li");
let itemArray = [];
localStorage.setItem("items", JSON.stringify(itemArray));
const data = JSON.parse(localStorage.getItem("items"));

window.addEventListener("load", getList);

function newElement(){
    if(taskInput && taskInput.value && taskInput.value.trim()){
        itemArray.push(taskInput.value);
        localStorage.setItem("items", JSON.stringify(itemArray));
        addListItem(taskInput.value);
        taskInput.value = "";
        $('.success').toast("show")
    }else{
        $('.error').toast("show")
    }
}

function addListItem(input){
    let liDOM = document.createElement("li");
    let liText = document.createTextNode(input);
    let deleteBtn = document.createElement("span");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("close");
    deleteBtn.onclick = deleteListItem;
    liDOM.appendChild(liText);
    liDOM.appendChild(deleteBtn);
    taskList.appendChild(liDOM);
}

function deleteListItem(e){
    let text = e.path[1].firstChild.data;
    itemArray.forEach((item, index) => {
        if(text === item){
            itemArray.splice(index, 1);
        }
    })
    localStorage.setItem("items", JSON.stringify(itemArray));
    this.parentElement.remove();
}

function getList(){
    data.forEach((item) => {
        addListItem(item)
    });
}