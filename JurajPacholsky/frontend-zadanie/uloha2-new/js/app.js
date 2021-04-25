const input = document.querySelector("#todos");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");
var el = document.getElementsByTagName('li');
let date = document.getElementById('date');
const fav = document.getElementById('fabicon');

// listener on ENTER value
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13 && input.value != "") {
        event.preventDefault();
        document.getElementById("btn").click();
    }
})


//done or iscomplete todo item
list.onclick = functionToDone;

function functionToDone(ev){
    if(ev.target.classList == 'checked'){
        setToUnDone(ev.target.id);
    }else{
        setToDone(ev.target.id)
    }
    if (ev.target.tagName == 'LI') {
        ev.target.classList.toggle('checked');
    }
};

//get all tasks from database
const getAllTasks = () =>{

    fetch('http://localhost:3306/todolist')
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => data.forEach(element => {

          li = document.createElement('li');
          li.id = element.id;
          var code = "<button id='btn1'></button>" + "<p>" + element.value + "</p>" + "<i class='far fa-trash-alt' onclick='deleteFromList(this.parentElement.id)'></i>";
  
         if(element.done == "true"){
             li.classList.toggle('checked');
         }
          li.innerHTML = code;
          list.insertBefore(li, list.childNodes[0]);
          input.value = '';
    }));
}

//delete item from list of tasks
const deleteFromList = (valueId) =>{
    fetch('http://localhost:3306/deleteById/' + valueId ,{
        method: 'DELETE'
    })
    .then(res => res.json())
    list.removeChild(document.getElementById(valueId))
}

//change item to done
const setToDone = (numberId) =>{
    fetch('http://localhost:3306/updateById/' + numberId ,{
        method: 'PUT',
    })
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
}

//change item to unDone
const setToUnDone = (numberId) =>{
    fetch('http://localhost:3306/updateToUndoneById/' + numberId ,{
        method: 'PUT',
    })
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
}

//create todo item
const postItem = () =>{
    fetch('http://localhost:3306/todolist/newitem' ,{
        
        method: 'POST',
        body: JSON.stringify({
            id: Math.floor(Math.random() * 1000),
            value: input.value,
            done: 'false'
        }),
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
    })
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(input.value = "")
    .then(update())
}

//update list of task from database real data
const update = () => {
    var node = document.getElementById('list');
    node.innerHTML = "";
    setTimeout(() => {
        getAllTasks();
    }, 50);
    
}

// actually date
let today = new Date().toLocaleDateString();
date.innerHTML = today;


getAllTasks();