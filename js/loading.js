document.getElementById("loading");

var counter = 0;

function progressDemo(){
	counter+=5;
	document.getElementById('load').value = counter;
	if(counter == 100) {
		clearInterval(timer);
	}
	if (counter == 95) {counter = 0;}

}
let timer = setInterval(progressDemo, 200);