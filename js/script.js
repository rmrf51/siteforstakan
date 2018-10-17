console.log(window);

//Счет
let score = document.getElementById("score");

let counter = 0;
let HP = 10;

function progressDemo(){
	counter++;
	document.getElementById('score').value = counter;
	if(counter == 100) {
		clearInterval(timer);
		document.getElementById("score").innerHTML = counter;
	}
}

let timer = setInterval(progressDemo, 200);

//функция рандома от min до max
function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function MacroCollision(obj1, obj2){
	let XColl=false;
	let YColl=false;

	if((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) XColl = true;
	if((obj1.y + obj1.width >= obj2.y) && (obj1.y <= obj2.y + obj2.width)) YColl = true;

	if(XColl & YColl) {
		return true;
	} else {
		return false; 	
	} 
}

//подключение
let	canvas = document.getElementById("Canvas");
let context = canvas.getContext("2d");

var bgimg = new Image();
bgimg.src = "img/bgimg1.png";

//при загрузке
window.onload = function() {
	setInterval(update, 1000/30);
	document.addEventListener("keydown", function(e){
		if(e.keyCode == 37 && pxd > 50) {
			pxd-=32;
			console.log("+");
		};
		if(e.keyCode == 39 && pxd < 520) {
			pxd+=32;
			console.log("-")
		}
	});
	
}

let pxd = 320;
const pyd = 350;
let speedEnemy = 4;

class Player{
	constructor(x,y){
		this.color = "black";
		this.type = "player";
		this.x = x;
		this.y = y;
		this.width = 16;
		this.height = 16;
	}
	updateP(pxd, pyd){
		this.x = pxd;
		this.y = pyd;
	}
}

class Enemy{
	constructor(x,y){
		this.color = "red";
		this.type = "enemy";
		this.x = x;
		this.y = y;
		this.width = 16;
		this.height = 16;
	}
	updateE(exd, eyd){
		this.x = exd;
		this.y = eyd;
	}
}

bgimg.onload = function(){
	let pattern = context.createPattern(bgimg, "repeat");
	context.fillStyle = pattern;
	context.fillRect(0,0,600,400);
}

function reset() {
	let pattern = context.createPattern(bgimg, "repeat");
	context.fillStyle = pattern;
	context.fillRect(0,0,600,400);
}

let player = new Player(pxd, pyd);
var aEnemy = [];
var ve = 0;

for (var i = 0; i < 20; i++) {
	aEnemy.push(new Enemy(getRandomInt(32, 556), getRandomInt(32, 400)));
}

function update(){
	reset();
	context.fillStyle = player.color;
	player.updateP(pxd, pyd);
	context.fillRect(player.x, player.y, 32, 32);
	counter++;
	score.innerHTML = "Score = " + counter + "     HP: " + HP;

	while(ve != aEnemy.length) {
		context.fillStyle = aEnemy[ve].color;
		context.fillRect(aEnemy[ve].x, aEnemy[ve].y, 32, 32);
		aEnemy[ve].updateE(aEnemy[ve].x, aEnemy[ve].y + speedEnemy);

		if (aEnemy[ve].y > 750) {
			aEnemy[ve].x = getRandomInt(32, 556);
			aEnemy[ve].y = getRandomInt(10, 100);
		}

		// if(player.x - 15 >= aEnemy[ve].x || player.x + 15 <= aEnemy[ve].x && player.y - 15 >= aEnemy[ve].y || player.y - 15 >= aEnemy[ve].y) {
		// 	alert("Вы сдохли");
		// }

		if (MacroCollision(player, aEnemy[ve])) {
			//alert("You die((");
			HP--;
			if(HP <= 0){
				score.innerHTML = "You die!))";
				counter = 0;
				HP = 10;
				reset();
			}
			console.log('You die((');
			console.log(aEnemy[ve]);
			reset();
		}

		ve +=1;
	}

	ve = 0;
}