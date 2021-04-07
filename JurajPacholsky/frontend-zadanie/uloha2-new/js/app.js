const input = document.querySelector("#todos");
const  btn = document.querySelector("#btn");
const list = document.querySelector("#list");
var el = document.getElementsByTagName('li');
let date = document.getElementById('date');
const fav = document.getElementById('fabicon');

    // listener on ENTER value
    input.addEventListener("keyup" , function(event){
        if(event.keyCode === 13 ){
            event.preventDefault();
            document.getElementById("btn").click();
        }
    })

    // function add new to do to todo list
    function addToList(){
        var txt = input.value;
        if(txt == ''){
            alert('you must write something')
        }else{
            li = document.createElement('li');
    
            var code = "<button id='btn1'></button>" + "<p>" + input.value + "</p>" + "<i class='far fa-trash-alt' onclick='remove_item(this)'></i>";

            li.innerHTML = code;
            list.insertBefore(li,list.childNodes[0]);
            input.value = '';
        }
        
    };

    //delete item
    function remove_item(selected_item) {
        selected_item.parentElement.remove();
}

    //done todo item
    list.onclick = function(ev){
        if(ev.target.tagName == 'LI'){
            ev.target.classList.toggle('checked');
        }
    };

    // actually date
    let today = new Date().toLocaleDateString();
    date.innerHTML = today;