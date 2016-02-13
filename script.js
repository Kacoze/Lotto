
// Var canvas and context
var canvas = document.getElementById("myCanvas"),
	ctx = canvas.getContext("2d");

// Variables
var dy = -10,
	n = 1;

var tubeWidth = 100,
	tubeHeight = 400,
	tubeY = 10,
	tubeX = 10;


var margin = 10;

var ballRadius = 48,
	ballY = tubeHeight,
	balls = [[]];

var prevRadius = 15,
	prevMargin = 20,
	prevX = 680,
	prevY = 20;

var genNum;

var buttonX = 750,
	buttonY = 250,
	buttonWidth = 100,
	buttonHeight = 40;

var prev = [];

// Generate numbers
function numbers() {
	'use strict';
	var j = 6,
		i = 1,
		correct = true,
		r = [];
	for (i = 1; i <= 6; i += 1) {
		r[i] = Math.round(Math.random() * (48)) + 1;
	}
	for (i = 6; i >= 1; i -= 1) {
		for (j = 6; j >= 1; j -= 1) {
			if ((i !== j) && (r[i] === r[j])) {correct = false; }
		}
	}
	if (correct) {
		return r;
	}
}

// Draw tubes
function drawTubes() {
	'use strict';
	var x, y = 0, j = 0;
	for (j = 0; j < 6; j += 1) {
		x = (tubeWidth + margin) * j;
		ctx.beginPath();
		ctx.rect(x + tubeX, y + tubeY, tubeWidth, tubeHeight);
		ctx.stroke();
		ctx.closePath();
	}
}

// Draw balls
function drawBalls() {
	'use strict';
	var i, j, ballX;
	// Generate balls
	for (j = 1; j <= 6; j += 1) {
		ballX = (tubeWidth + margin) * j - tubeWidth / 2 - margin;
		balls.push([j, ballX, ballY]);
	}
	// Draw balls
	for (i = 1; i <= 6; i += 1) {
		ctx.beginPath();
		//Ball
		ctx.arc(balls[i][1] + tubeX, balls[i][2] + tubeY, ballRadius, 0, Math.PI * 2);
		ctx.fillStyle = 'yellow';
		ctx.fill();
		//Number
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText(genNum[i], balls[i][1] + tubeY, balls[i][2] + 20);
		ctx.closePath();
	}
}

// Draw button
function drawButton() {
	'use strict';
	ctx.beginPath();
	// Button
	ctx.rect(buttonX, buttonY, buttonWidth, buttonHeight);
	ctx.fillStyle = "#0095DD";
    ctx.fill();
	// Text
	ctx.font = "20px Arial";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText('Generate', buttonX + 0.5 * buttonWidth, buttonY + 0.6 * buttonHeight);
	ctx.closePath();
}

function drawPrev() {
	'use strict';
	if (prev) {
		var i, j, pIL, pL = prev.length - 1;
		// Rows
		for (i = pL; i >= 0; i -= 1) {
			pIL = prev[i].length - 1;
			// Balls
			for (j = 1; j <= pIL; j += 1) {
				ctx.beginPath();
				// Balls
				ctx.arc(prevX + (prevRadius + prevMargin) * j, prevY + (prevMargin + prevRadius) * i, prevRadius, 0, Math.PI * 2);
				ctx.fillStyle = 'yellow';
				ctx.fill();
				// Numbers
				ctx.font = "10px Arial";
				ctx.fillStyle = "red";
				ctx.textAlign = "center";
				ctx.fillText(prev[i][j], prevX + (prevRadius + prevMargin) * j, prevY + (prevMargin + prevRadius) * i + 3);
				ctx.closePath();
			}
		}
	}
}

// One function to rule them all
function draw() {
	'use strict';
	// Get correct numbers
	while (!genNum) {
		genNum = numbers();
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Draw things
	drawTubes();
	drawBalls();
	drawButton();
	drawPrev();
	// Move balls
	balls[n][2] += dy;
	// Stop balls
	if (balls[n][2] <= tubeWidth / 2) {
		if (n === 6) {
			if (balls[6][2] < tubeWidth / 2) {
				return;
			}
		} else {
			n += 1;
		}
	}
	// If end stop animation
	if (balls[6][2] >= tubeWidth / 2) {
		window.requestAnimationFrame(draw);
	}
}
draw();

// Evelnt listener on button
function click(e) {
	'use strict';
	// Should work only if 
    if (balls[6][2] < tubeWidth / 2) {
		if (((e.clientX >= buttonX) && (e.clientX < buttonX + buttonWidth)) && ((e.clientY >= buttonY) && (e.clientY < buttonY + buttonHeight))) {
			prev.unshift(genNum);
			if (prev.length > 7) {
				prev.pop();
			}
			genNum = false;
			ballY = tubeHeight;
			balls = [[]];
			n = 1;
			prevX = 680;
			prevY = 20;
			draw();
		}
	}
}
document.addEventListener("click", click, false);
