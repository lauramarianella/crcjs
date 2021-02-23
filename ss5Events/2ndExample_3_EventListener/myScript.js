
//<script src="myScript.js"></script>
(function(){
    let btn = document.getElementById('idBtn');
    btn.addEventListener('click', function(){ alert('you clicked me');}, false);
    btn.addEventListener('click', function(){ alert('2nd function was call');}, false);
})();