

//get all info in data
fetch('http://localhost:3306/todolist')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => data.forEach(element => {
      var text = document.createElement('p')
      text.innerHTML = element.value;
      document.body.appendChild(text)
  }));


//get all names
function tryToWeb(){
fetch('http://localhost:3306/names')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => console.log(data))
}


  function addName(){
      tryToWeb();
  }

  


  