let enterButton = document.getElementById("enter");
let input = document.getElementById("userInput");
let counter =0;

let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");

function inputLength() {
    return input.value.length;
}

function listLength() {
    return item.length;
}


function createListElement() {
    if (counter<5) {
    counter++;
    let list = document.createElement("li");
    list.appendChild(document.createTextNode(input.value));
    ul.appendChild(list);
    input.value = "";


    function crossOut() {
        list.classList.toggle("done");
    }

    list.addEventListener("click", crossOut);

    let createbtn = document.createElement("button");
    createbtn.appendChild(document.createTextNode("X"));
    list.appendChild(createbtn);
    createbtn.addEventListener("click", deleteListItem);


    function deleteListItem() {
        list.classList.add("delete")
        
        counter--;
      
    }
}
else {
    console.addListAfterClick
    alert("Maximum List capacity is limited for 5 masseges")

}
}




function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
        // console.log(input.value)
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) {
        createListElement();
        // console.log(counter)
    }
}

enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

