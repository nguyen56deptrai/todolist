const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask(){
    if(inputBox.value === ''){
        alert("you must write something !")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        li.addEventListener("click", function(e) {
            if (e.target.tagName === "LI") {
                if (editingItem !== e.target) {
                    if (editingItem) {
                        cancelEdit();
                    }
                    editingItem = e.target;
                    editItem(e.target);
                }
            }
        });

    }
    inputBox.value = "";
    saveData();
}
listContainer.addEventListener("click",function(e){
    if(e.target.tagName ==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName ==="SPAN"){
        e.target.parentElement.remove();
        saveData();
}},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
let editingItem = null;

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        if (editingItem !== e.target) {
            if (editingItem) {
                cancelEdit();
            }
            editingItem = e.target;
            editItem(e.target);
        }
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);
function editItem(item) {
    const text = item.innerText;
    item.innerHTML = "";
    const input = document.createElement("input");
    input.value = text;
    input.addEventListener("blur", function() {
        finishEdit(item);
    });
    input.addEventListener("keyup", function(e) {
        if (e.key === "Enter") {
            finishEdit(item);
        }
    });
    item.appendChild(input);
    input.focus();
}

function finishEdit(item) {
    const input = item.querySelector("input");
    const newText = input.value;
    if (newText !== "") {
        item.innerHTML = newText;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        item.appendChild(span);
        saveData();
    } else {
        item.remove();
        saveData();
    }
    editingItem = null;
}

function cancelEdit() {
    if (editingItem) {
        const input = editingItem.querySelector("input");
        const text = input.getAttribute("data-original-text");
        editingItem.innerHTML = text;
        editingItem = null;
    }
}

