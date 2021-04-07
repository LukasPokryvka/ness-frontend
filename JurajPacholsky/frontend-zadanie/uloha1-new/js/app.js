function sumTips(){

    var bill = document.getElementById("bill").value;
    var peoples = document.getElementById("people").value;
    var tips = Number(document.getElementById("tips").value);


    if(isLetter(bill) || isLetter(peoples)){
        window.alert("kamarat vo fakture alebo pocte ludoch si zadat namiesto cisla text")
    }else{
        var newBill = parseFloat(bill);
        var tipsOfficial = (newBill /100) * tips;
        var summary = ((newBill + tipsOfficial) / peoples)
        var total = summary.toFixed(2);
        var define = (summary - total);

        
        if(define < 0){
            window.alert('Na ucet sa poskladate nasledovne, kazdy po: ' + total + ' €. Jeden z Vas vsak doplati este: ' 
            + Math.abs(define.toFixed(5)) + ' €. Je to rozdiel po zaokruhleni..')
        }else if(define == 0){
            window.alert('Na ucet sa poskladate nasledovne, kazdy po: ' + total + ' €')
        }else{
            window.alert('Na ucet sa poskladate nasledovne, kazdy po: ' + total + ' €. Kedze ste stedri pri zaokruhlovani tak ste zaplatili viac o: ' 
            + define.toFixed(5) + ' €. Dakujeme ste supis.')
        }
    }
}

  const isLetter = (c) => c.toLowerCase() != c.toUpperCase();

