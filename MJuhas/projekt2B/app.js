const handleOnChange = () => {
    createTask = true

}
var previoueValue = null
var createTask = false
var number = 0
setInterval(() => {

    var currentValue = document.getElementById("myInput").value

    if (previoueValue == currentValue) {
        if (createTask == true) {
            number++
            var element = document.createElement("div")
            var button = "<button class=buttonStyle onClick=deleteItem()> " + "X" + "</button>"
            element.classList.add("task");

            element.id = (number)
            element.innerHTML = number + "     " + currentValue + button
            document.getElementById("toDoList").prepend(element)
            document.getElementById("myInput").value = ""

            createTask = false
        }

    } else {

        previoueValue = currentValue
    }

}, 1000)

const deleteItem = () => {
    document.activeElement.parentElement.classList.add("delete");
}