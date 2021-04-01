var bill = ""
var service = ""
var people = ""


const handleOnClick = () => {
    bill = badValue(document.getElementById("bill").value)
    service = badValue(document.getElementById("service").value)
    people = badValue(document.getElementById("people").value)


    alert(calculateBill(bill, service, people))

    document.getElementById("bill").value = bill
    document.getElementById("people").value = people
}

const badValue = (x) => {

    while (!parseFloat(x) || parseFloat(x) <= 0) {
        x = prompt("Please enter your value:", "");
    }

    return parseFloat(x)
}
const calculateBill = (bill, service, people) => {
    var bigBill = parseFloat((bill * (1 + service / 100)).toFixed(2))
    var onePay = bigBill / people

    const yourBill = () => {
        if (parseFloat((onePay).toFixed(2)) * people == bigBill) {
            return people > 1 ? " Každy z vás zaplatí " + onePay + " €  spolu " + bigBill : " Zaplatíš " + bigBill + " €"
        } else {
            var one = bigBill - parseFloat((onePay).toFixed(2)) * people + onePay
            var other = people - 1 == 1 ? people - 1 + " zaplatí " + (onePay).toFixed(2) : people - 1 + " zaplatia " + (onePay).toFixed(2)
            return "1 zaplatí " + one.toFixed(2) + " € a " + other + " spolu " + bigBill
        }


    }
    const smartBill = people > 1 ? " Každy z vás zaplatí " + onePay + " €  spolu " + bigBill : " Zaplatíš " + bigBill + " €"
    var resoult = bigBill % people > 0 ? yourBill() : smartBill

    return resoult
}