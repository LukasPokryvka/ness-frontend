const url = 'http://localhost:3005/todos';

/*
  fetch API (GET)
 */
fetch(url).then(data => {
    return data.json();
}).then(response => {
    for (let i = 0; i < response.length; i++) {
        list.appendChild(createLiElement(response[i].itemTitle, response[i].isComplete));
    }
});

// code for interacting with page
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

    const newItem = createLiElement(newTODO, false);
    list.appendChild(newItem);
}

function createLiElement(itemTitle, isComplete) {
    const newItem = document.createElement("li");
    const firstP = document.createElement("p");
    firstP.appendChild(document.createTextNode(itemTitle));
    newItem.appendChild(firstP);

    const removeP = document.createElement("p");
    removeP.appendChild(document.createTextNode("X"));
    removeP.classList.add("remove");
    removeP.onclick = () => list.removeChild(newItem);
    newItem.appendChild(removeP);

    if (isComplete) {
        newItem.style.backgroundColor = "lightgreen";
    } else {
        newItem.onclick = () => newItem.style.backgroundColor = "lightgreen";
    }

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