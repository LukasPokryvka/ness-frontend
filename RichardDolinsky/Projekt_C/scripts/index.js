let enterButton = document.getElementById("enter");
let input = document.getElementById("userInput");
let counter = 0;
const url = 'http://localhost:3005/todo';

let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");

function inputLength() {
    return input.value.length;
}

function listLength() {
    return item.length;
}

var allList = [];

function htmlToString(txt) {

    txt = txt.innerHTML;
    ax = txt.indexOf('<');
    // console.log(ax)
    return txt.substring(0, ax)

}


function reCalculArray(elemtn) {

}
function createListElement(inputWordOne) {

    if (counter < 30) {
        counter++;
        let list = document.createElement("li");

        list.appendChild(document.createTextNode(inputWordOne, allList));
        ul.appendChild(list);
        input.value = "";
        // console.log(list.id, "   dfs")


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

            const findedId = allList.indexOf(htmlToString(list));

            splitnuteSlovo = htmlToString(list).split(/(?<=^\S+)\s/)

            console.log(allList)

            for (let index = 0; index < allList.length; index++) {
                splitnuteSlovo = allList[index].split(/(?<=^\S+)\s/)

                if (htmlToString(list) == splitnuteSlovo[1]) {
                    let numberOfFindedIndex = index;

                    allList.splice(index, 1)

                    break;
                }
            }

            console.log(typeof (idOfList))

            let a = parseInt(idOfList)
            deleteTodoOnServer(a)
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
        createListElement(input.value);
        // console.log(input.value)
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) {
        createListElement(input.value);
        // console.log(counter)
    }
}
todosFromServerOnPage();
enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);
// document.getElementsByClassName
const list = document.getElementsByClassName("listItems");



function todosFromServerOnPage() {
    /*
        fetch API (GET)
    */
    fetch(url).then(data => {

        return data.json();
    })
        .then(response => {


            list.innerHTML = '';
            for (let i = 0; i < response.length; i++) {
                createListElement(response[i].title)
                allList.push(response[i].id + " " + response[i].title)

            }
            console.log(allList, "  Loaded list")

        });
}


async function addTodoOnServer(itemTitle) {
    /*
       fetch API (POST)
     */

    const dataToPost = {
        "title": itemTitle,
        isComplete: false
    };
    const param = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(dataToPost),
        method: 'POST'
    };

    fetch(url, param).then(data => {
        return data.json()
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}


function deleteTodoOnServer(id) {
    /*
       fetch API (DELETE)
     */
    fetch(url + '/' + id, { method: 'DELETE' }).then(data => {
        return data.json()
    }).then(response => {
        todosFromServerOnPage();
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}

async function addItem() {
    const inputWord = document.getElementById("userInput").value;
    addTodoOnServer(inputWord)

}