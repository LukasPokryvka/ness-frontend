// for TODOs which are there from begining
const removeButtons = document.getElementsByClassName("remove");
const liElements = document.getElementsByTagName("li");

for (let i = 0; i < removeButtons.length; i++) {
    const element = removeButtons[i];
    element.onclick = () => list.removeChild(element.parentElement);
}
for (let i = 0; i < liElements.length; i++) {
    const element = liElements[i];
    element.onclick = () => element.style.backgroundColor = "lightgreen";
}

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

    const newItem = createLiElement(newTODO);
    list.appendChild(newItem);

    console.log(list);
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

function createLiElement(text) {
    const newItem = document.createElement("li");
    const firstP = document.createElement("p");
    firstP.appendChild(document.createTextNode(text));
    newItem.appendChild(firstP);

    const removeP = document.createElement("p");
    removeP.appendChild(document.createTextNode("X"));
    removeP.classList.add("remove");
    removeP.onclick = () => list.removeChild(newItem);
    newItem.appendChild(removeP);

    newItem.onclick = () => newItem.style.backgroundColor = "lightgreen";

    return newItem;
}