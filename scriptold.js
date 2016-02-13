// Var canvas and context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Rest of variables
var j = 1;
var n = 1;
var dy = -10;

var tubeWidth = 100;
var tubeHeight = 400;

var margin = 10;

var ballRadius = 50;
var ballY = tubeHeight;
var balls = [[]];

function drawTubes() {
	var y = 0;
	var x = 0;
	var i = 0;
	for (i = 0; i < 6; i += 1) {
		x = (tubeWidth + margin) * i;
		ctx.beginPath();
		ctx.rect(x, y, tubeWidth, tubeHeight);
		ctx.stroke();
		ctx.closePath();
	}
}

for (j = 1; j <= 6; j += 1) {
	var ballX = (tubeWidth + margin) * j - tubeWidth / 2 - margin;
	balls.push([j, ballX, ballY]);
}
function drawBalls() {
	var i = 1;
	for (i = 1; i <= 6; i += 1) {
		ctx.beginPath();
		ctx.arc(balls[i][1], balls[i][2], ballRadius, 0, Math.PI * 2);
		ctx.fillStyle = 'yellow';
		ctx.fill();
		ctx.closePath();
	}
}





function numbers() {
	var j = 0;
	var i = 0;
	var ballNum = 6;
	var numbersCount = 49;
	
	var correct = true;
	var r = [];
	for (i = 1; i <= ballNum; i += 1) {
		r[i] = Math.round(Math.random() * (numbersCount - 1)) + 1;
	}
	for (i = ballNum; i >= 1; i-=1) {
		for ( j = ballNum; j >= 1; j -= 1) {
			if ((i !== j) && (r[i] === r[j])){ correct = false }; 
		}
	}
	if (correct) {
		console.log(r);
		return r;
	}
	else { numbers(); }
}


function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawTubes();
	drawBalls();
	balls[n][2] += dy;
	if (balls[n][2] === tubeWidth / 2) {
		n += 1;
		if (n === 7) {
			return;
		}
	}
	requestAnimationFrame(draw);
}
numbers();
draw();


















