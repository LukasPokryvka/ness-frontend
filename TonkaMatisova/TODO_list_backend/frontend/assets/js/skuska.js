list = []

list.push("id-3-text ID:0")
list.push("google ID: 1")
list.push("bush ID: 2")
list.push("lamaskt ID: 4")
list.push("autobatko ID:12")
list.push("lomonos ID: 5")
console.log(list)

var result
for (i= 0; i < list.length; i++) {
    // str = list[i]
//    str =  list[i].substr(0,str.indexOf(' '));
//    console.log(str)
    value = list[i];
    if (value.substring(0, 10) == "id-") {

        result = value;

        break;
    }
}

// console.log(result)

str = "kolo587 tocirah sneab hjihi"
s = str.split(/(?<=^\S+)\s/)

console.log(s[0])