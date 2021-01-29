function addWrapper(){
   let aStr = document.getElementById("idNum1").value; 
   let a = parseInt(aStr);

   let bStr = document.getElementById("idNum2").value; 
   let b = parseInt(bStr);
   document.getElementById("idResult").value = add(a,b);
}



function add(a,b){
    let c = 0;
    c = a + b;
    return c;
}
