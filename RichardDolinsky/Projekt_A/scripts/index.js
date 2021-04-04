function calculateTip() {
    // console.log("ooooo" + document.getElementById("inputShareBill").value);


      var numberOfShare = document.getElementById("inputShareBill").value;
      var billValue = document.getElementById("billValue").value;

      var serviceQual = document.getElementById("servicee").value;
      let statement = false;
      let statement2=false;



      if (numberOfShare == "" || numberOfShare <= 0 || isNaN(numberOfShare) || serviceQual<= 0 ) {
        //  console.log("Not valid Value ")
       
        statement2=false;
        // break;
    }
    else {
        // console.log("Valid value")

        statement2=true;
    }

    if (billValue == "" || billValue <= 0 || isNaN(billValue) || serviceQual<= 0 ) {
        // console.log("Not valid Value ")
        statement=false;
        
    }
    else {
        // console.log("Valid value")
        statement=true;
    }

if (statement==true && statement2==true) {
    
    let finalValue = (billValue * serviceQual) / numberOfShare;
  finalValue = Math.round(finalValue * 100) / 100;
  // 20 * 0.2 / 1 = 4
  // 20 * 0,5 / 1  = 10
  // 20 * 0,7 / 1  4
  alert("Final Tip is: " + finalValue);
}
else {
    alert("Please enter correct values");
}

}

  document.getElementById("calculate").onclick = function() {
    calculateTip();
  
  };