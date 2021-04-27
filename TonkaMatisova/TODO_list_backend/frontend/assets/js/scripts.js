const url = 'http://localhost:3007/todos';

todosFromServerOnPage();

function todosFromServerOnPage() {
    /*
        fetch API (GET)
    */
    fetch(url).then(data => {
        return data.json();
    }).then(response => {
        // console.log(response)
        console.log(typeof(list) , list)
        list.innerHTML = ''; // for delete all children elements
        for (let i = 0; i < response.length; i++) {
            list.appendChild(createLiElement(response[i]));
        }
    });
}

function addTodoOnServer(itemTitle) {
    /*
       fetch API (POST)
     */
    const dataToPost = {
        itemTitle: itemTitle,
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
        todosFromServerOnPage();
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

function markTodoAsCompleteOnServer(todo) {
    /*
       fetch API (PUT)
     */
    const dataToPost = {
        itemTitle: todo.itemTitle,
        isComplete: true
    };
    const param = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(dataToPost),
        method: 'PUT'
    };

    fetch(url + '/' + todo.id, param).then(data => {
        return data.json()
    }).then(response => {
        todosFromServerOnPage();
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}


/*
   Code for interacting with page
*/

const list = document.getElementById("listTODOs");
const addForm = document.forms["newTODO"];
const formInput = addForm["newItem"];

function addItem() {
    const newTODO = formInput.value;
    const validationMessage = isValidTODO(newTODO.trim());
    if (validationMessage != "") {
        window.alert(validationMessage);
        return;
    }

    formInput.value = "";
    addTodoOnServer(newTODO);
}

function createLiElement(todo) {
    const newItem = document.createElement("li");
    const firstP = document.createElement("p");
    firstP.appendChild(document.createTextNode(todo.itemTitle));
    newItem.appendChild(firstP);

    const removeP = document.createElement("p");
    removeP.appendChild(document.createTextNode("X"));
    removeP.classList.add("remove");
    removeP.onclick = () => { deleteTodoOnServer(todo.id); };
    newItem.appendChild(removeP);

    if (todo.isComplete) {
        newItem.style.backgroundColor = "lightgreen";
    } else {
        firstP.onclick = () => {
            markTodoAsCompleteOnServer(todo);
        };
    }

    newItem.id = todo.id;
    return newItem;
}

function isValidTODO(textTODO) {
    const textLength = textTODO.length;
    if (textLength < 4) {
        return "To short text of TODO (min. 4 charakters)";
    }
    if (textLength > 28) {
        return "To long text of TODO (max. 28 charakters)";
    }
    return "";
}