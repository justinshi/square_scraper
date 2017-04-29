var canvas = null;
var context = null;
var scoreDisplay = null;
var stage = null;
var moveRight = false;
var moveLeft = false;
var jump = false;
var characters = [];
var meteors = [];
var lava = [];
var score = 0;
var meteorInterval = null;
var lavaInterval = null;
var intervalTime = 1250;
var vy = 0.08;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function drawScene() {
	for (var i in characters) {
		if (characters[i].alive) {
			break;
		}
		if (i == 3) {
			if(confirm("Game over! Press \"OK\" to play again, or \"Cancel\" to quit.")) {
				window.location.reload();
			}
			else {
				window.close();
			}
		}
	}
	context.clearColor(0.90, 0.90, 0.90, 1.0);
	context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
	for (var property in stage) {
		if (stage.hasOwnProperty(property)) {
			createBuffers(stage[property]);
			drawPrimitive(stage[property]);
		}
	}

	updatePositions();

	for (var i in characters) {
		if (characters[i].alive) {
			createBuffers(characters[i]);
			drawPrimitive(characters[i]);
		}
	}

	for (var i in meteors) {
		createBuffers(meteors[i]);
		drawPrimitive(meteors[i]);
	}

	for (var i = lava.length - 1; i >= 0; i--) {
		if (lava[i].alive == 2) {
			lava.splice(i, 1);
		}
		else {
			createBuffers(lava[i]);
			drawPrimitive(lava[i]);
		}
	}
}

function checkCollision(character) {
	var characterXCenter = (character.vertices[6] + character.vertices[0]) / 2;
	var characterYCenter = (character.vertices[4] + character.vertices[1]) / 2;
	var characterZCenter = (character.vertices[8] + character.vertices[2]) / 2;
	for (i in meteors) {
		if (meteors[i].wall == character.wall) {
			var meteorXCenter = (meteors[i].vertices[6] + meteors[i].vertices[0]) / 2;
			var meteorYCenter = (meteors[i].vertices[4] + meteors[i].vertices[1]) / 2;
			var meteorZCenter = (meteors[i].vertices[8] + meteors[i].vertices[2]) / 2;
			if (Math.abs(characterXCenter - meteorXCenter) <= 0.1875 &&
				Math.abs(characterYCenter - meteorYCenter) <= 0.1875 &&
				Math.abs(characterZCenter - meteorZCenter) <= 0.1875) {
				return i
			}
		}
	}
	return null;
}

function checkLava(character) {
	var characterXCenter = (character.vertices[6] + character.vertices[0]) / 2;
	var characterY = character.vertices[1];
	var characterZCenter = (character.vertices[8] + character.vertices[2]) / 2;
	for (i in lava) {
		if (lava[i].wall == character.wall && lava[i].alive == 1) {
			var lavaXCenter = (lava[i].vertices[0] + lava[i].vertices[3]) / 2;
			var lavaZCenter = (lava[i].vertices[2] + lava[i].vertices[5]) / 2;
			if (Math.abs(characterXCenter - lavaXCenter) <= 0.25 &&
				Math.abs(characterZCenter - lavaZCenter) <= 0.25 &&
				characterY == 0) {
				return true;
			}
		}
	}
	return false;
}

function updatePositions() {
	if (jump) {
		for (i in characters) {
			characters[i].vertices[1] += vy;
			characters[i].vertices[4] += vy;
			characters[i].vertices[7] += vy;
			characters[i].vertices[10] += vy;
		}
		vy -= 0.005;
		if (characters[0].vertices[1] <= 0) {
			jump = false;
			vy = 0.08;
			for (i in characters) {
				characters[i].vertices[1] = 0;
				characters[i].vertices[4] = 0.25;
				characters[i].vertices[7] = 0;
				characters[i].vertices[10] = 0.25;
			}
		}
	}
	if (moveRight) {
		if (characters[1].vertices[6] < 1) {
			characters[0].vertices[2] += 0.0625;
			characters[0].vertices[5] += 0.0625;
			characters[0].vertices[8] += 0.0625;
			characters[0].vertices[11] += 0.0625;
			characters[1].vertices[0] += 0.0625;
			characters[1].vertices[3] += 0.0625;
			characters[1].vertices[6] += 0.0625;
			characters[1].vertices[9] += 0.0625;
			characters[2].vertices[0] -= 0.0625;
			characters[2].vertices[3] -= 0.0625;
			characters[2].vertices[6] -= 0.0625;
			characters[2].vertices[9] -= 0.0625;
			characters[3].vertices[2] -= 0.0625;
			characters[3].vertices[5] -= 0.0625;
			characters[3].vertices[8] -= 0.0625;
			characters[3].vertices[11] -= 0.0625;
		}
	}
	if (moveLeft) {
		if (characters[1].vertices[0] > -1) {
			characters[0].vertices[2] -= 0.0625;
			characters[0].vertices[5] -= 0.0625;
			characters[0].vertices[8] -= 0.0625;
			characters[0].vertices[11] -= 0.0625;
			characters[1].vertices[0] -= 0.0625;
			characters[1].vertices[3] -= 0.0625;
			characters[1].vertices[6] -= 0.0625;
			characters[1].vertices[9] -= 0.0625;
			characters[2].vertices[0] += 0.0625;
			characters[2].vertices[3] += 0.0625;
			characters[2].vertices[6] += 0.0625;
			characters[2].vertices[9] += 0.0625;
			characters[3].vertices[2] += 0.0625;
			characters[3].vertices[5] += 0.0625;
			characters[3].vertices[8] += 0.0625;
			characters[3].vertices[11] += 0.0625;
		}
	}
	for (var i = meteors.length - 1; i >= 0; i--) {
		meteors[i].vertices[1] += meteors[i].v;
		meteors[i].vertices[4] += meteors[i].v;
		meteors[i].vertices[7] += meteors[i].v;
		meteors[i].vertices[10] += meteors[i].v;
		if (meteors[i].vertices[1] < 0) {
			meteors.splice(i, 1);
		}
	}
	for (var i in characters) {
		if (!characters[i].alive) {
			continue;
		}
		var meteorIndex = checkCollision(characters[i]);
		if (meteorIndex != null) {
			characters[i].alive = false;
			clearInterval(meteorInterval);
			intervalTime -= 250;
			meteorInterval = setInterval(createMeteors, intervalTime);
			meteors.splice(meteorIndex, 1);
		}
		if (checkLava(characters[i])) {
			characters[i].alive = false;
			clearInterval(meteorInterval);
			intervalTime -= 250;
			meteorInterval = setInterval(createMeteors, intervalTime);
		}
	}
}

function createMeteors() {
	var meteorLocation = getRandomInt(0, 4);
	while (!characters[meteorLocation].alive) {
		meteorLocation = getRandomInt(0, 4);
	}
	var meteorPosition = (Math.random() * 2 * 0.9375) - 0.9375;
	var newMeteor = new Meteor(meteorLocation, meteorPosition, -0.01575)
	meteors.push(newMeteor);
}

function createLava() {
	if (document.getElementById("lava").checked) {
		var lavaLocation = getRandomInt(0, 4);
		var lavaPosition = (Math.random() * 2 * 0.875) - 0.875;
		var newLava = new Lava(lavaLocation, lavaPosition)
		lava.push(newLava);
	}
}

function keyDownHandler(event) {
	if (event.keyCode == 37) {
		moveLeft = true;
	}
	else if (event.keyCode == 39) {
		moveRight = true;
	}
	else if (event.keyCode == 32 && !jump) {
		jump = true;
	}
}

function keyUpHandler(event) {
	if (event.keyCode == 37) {
		moveLeft = false;
	}
	else if (event.keyCode == 39) {
		moveRight = false;
	}
}

function updateScore() {
	for (i in characters) {
		if (characters[i].alive) {
			score++;
		}
	}
	scoreDisplay.innerHTML = "Score: " + score.toString();
}

function setup() {
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("webgl");
	scoreDisplay = document.getElementById("score");
	stage = new Stage();
	characters.push(new Character(0));
	characters.push(new Character(1));
	characters.push(new Character(2));
	characters.push(new Character(3));
	document.addEventListener("keydown", keyDownHandler, true);
	document.addEventListener("keyup", keyUpHandler, true);
 	initShaders();
 	canvas.focus();
 	setInterval(updateScore, 1000);
 	meteorInterval = setInterval(createMeteors, intervalTime);
 	lavaInterval = setInterval(createLava, intervalTime + 1000);
 	setInterval(drawScene, 16.67);
}