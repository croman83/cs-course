// region global

// game control
var stage = 0;
var bgCanvas;
var debug = false;

// char
var charX;
var charY;
var charWidth = 50;
var charHeight = 55;
var dead = false;

// platforms

// gravity
var jump = true;
var jumpHeight = 0;

var gravityDirection = 1;
var velocity = 4;
var acceleration = velocity * 2;
var jumpPower = 40;
var fallingSpeed = 5;
var minHeight;

// collision
var collisionMap = [];
var collectingMap = [];
var dangerMap = [];

// images for textures
var darkBlock;

// endregion

// region setup
function preload() {
	bg = loadImage('assets/bg.png')
	lightBlock = loadImage('assets/block2.png')
	lightBlock1 = loadImage('assets/block1.png')
	darkBlock = loadImage('assets/block4.png')
	darkBlock1 = loadImage('assets/block5.png')
	blockB = loadImage('assets/block-b.png')
	almaz = loadImage('assets/almaz.png')
	water = loadImage('assets/water.png')
	water1 = loadImage('assets/water1.png')
	danger = loadImage('assets/d.png')
}
function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	textAlign(CENTER);
	bgCanvas = createGraphics(windowWidth, windowHeight);
	bgCanvas.noFill();
	bgCanvas.noStroke();
	bgCanvas.image(bg, 0, 0, windowWidth,windowHeight)
	init();
}
// endregion


// region draw
function draw() {
	clear();
	gravity()

	image(bgCanvas, 0, 0)

	if (stage === 0) {
		game();
	} else if (stage === 1) {
		fill(255,0,0,100);
		rect(windowWidth/2,windowHeight/2, windowWidth, windowHeight)
		fill(255,255,255)
		textSize(100);
		text('Game over',windowWidth/2,windowHeight/2);
		textSize(20);
		text('Press any button',windowWidth/2,windowHeight/2 + 50);
	}
	if (debug) {
		fill(255,0,0,100)
		circle(charX, charY, 20)
		noFill()
		initCollisionMap(collisionMap)
	}
}
// endregion


// region robot layouts
function charIdle(x1,y1) {
	var y = y1+10;
	var x = x1;
	fill(74,74,74)
	stroke(14);
	circle(x, y - 40, 30);



	fill(255,0,0)
	ellipse(x , y - 56, 14, 6);
	ellipse(x, y - 35, 12,6);
	circle(x + 17,y - 31,6)
	circle(x - 17,y - 31,6)

	fill(255,255,0)
	beginShape();
	vertex(x-7, y-28)
	vertex(x-5, y-18)
	vertex(x-2, y-20)
	vertex(x, y-15)
	vertex(x+2, y-20)
	vertex(x+5, y-18)
	vertex(x+7, y-28)
	endShape()

	fill(62,62,62)
	rect(x, y - 54, 14, 4);
	rect(x, y - 26, 14, 4);
	circle(x - 14,y - 45,8)
	circle(x - 16,y - 40,8)
	circle(x - 17,y - 35,8)

	circle(x + 14,y - 45,8)
	circle(x + 16,y - 40,8)
	circle(x + 17,y - 35,8)

	noStroke();
	noFill();
}

function jumpFront(x1,y1) {
	var y = y1-10;
	var x = x1;
	fill(74,74,74)
	stroke(14);
	circle(x, y - 40, 30);



	fill(255,0,0)
	ellipse(x , y - 56, 14, 6);
	ellipse(x, y - 35, 12,6);
	circle(x + 17,y - 31,6)
	circle(x - 17,y - 31,6)

	fill(255,255,0)
	beginShape();
	vertex(x-7, y-28)
	vertex(x-5, y-12)
	vertex(x-2, y-16)
	vertex(x, y)
	vertex(x+2, y-16)
	vertex(x+5, y-12)
	vertex(x+7, y-28)
	endShape()

	fill(62,62,62)
	rect(x, y - 54, 14, 4);
	rect(x, y - 26, 14, 4);
	circle(x - 14,y - 45,8)
	circle(x - 16,y - 40,8)
	circle(x - 17,y - 35,8)

	circle(x + 14,y - 45,8)
	circle(x + 16,y - 40,8)
	circle(x + 17,y - 35,8)

	noStroke();
	noFill();
}

function moveLeft(x1,y1) {
	var y = y1+10;
	var x = x1;
	fill(74,74,74)
	stroke(14);
	ellipse(x, y - 40, 18,30);



	fill(255,0,0)
	ellipse(x - 4 , y - 54, 7, 6);
	// ellipse(x, y - 35, 7,6);
	circle(x,y - 31,6)

	fill(255,255,0)
	beginShape();
	vertex(x-5, y-28)
	vertex(x-4, y-18)
	vertex(x-2, y-20)
	vertex(x, y-15)
	vertex(x+2, y-20)
	vertex(x+4, y-18)
	vertex(x+5, y-28)
	endShape()

	fill(62,62,62)
	rect(x - 4, y - 52, 7, 4);
	rect(x, y - 26, 10, 4);

	circle(x + 4,y - 45,8)
	circle(x + 5,y - 40,8)
	circle(x + 4,y - 35,8)

	noStroke();
	noFill();
}

function moveRight(x1,y1) {
	var y = y1+10;
	var x = x1;
	fill(74,74,74)
	stroke(14);
	ellipse(x, y - 40, 18,30);



	fill(255,0,0)
	ellipse(x + 4 , y - 54, 7, 6);
	// ellipse(x, y - 35, 7,6);
	circle(x,y - 31,6)

	fill(255,255,0)
	beginShape();
	vertex(x-5, y-28)
	vertex(x-4, y-18)
	vertex(x-2, y-20)
	vertex(x, y-15)
	vertex(x+2, y-20)
	vertex(x+4, y-18)
	vertex(x+5, y-28)
	endShape()

	fill(62,62,62)
	rect(x + 4, y - 52, 7, 4);
	rect(x, y - 26, 10, 4);

	circle(x - 4,y - 45,8)
	circle(x - 5,y - 40,8)
	circle(x - 4,y - 35,8)

	noStroke();
	noFill();
}

function jumpLeft(x1,y1) {
	var y = y1-10;
	var x = x1;
	fill(74,74,74)
	stroke(14);
	ellipse(x, y - 40, 18,30);



	fill(255,0,0)
	ellipse(x - 4 , y - 54, 7, 6);
	// ellipse(x, y - 35, 7,6);
	circle(x,y - 31,6)

	fill(255,255,0)
	beginShape();
	vertex(x-5, y-28)
	vertex(x-4, y-12)
	vertex(x-2, y-16)
	vertex(x, y)
	vertex(x+2, y-16)
	vertex(x+4, y-12)
	vertex(x+5, y-28)
	endShape()

	fill(62,62,62)
	rect(x - 4, y - 52, 7, 4);
	rect(x, y - 26, 10, 4);

	circle(x + 4,y - 45,8)
	circle(x + 5,y - 40,8)
	circle(x + 4,y - 35,8)

	noStroke();
	noFill();
}

function jumpRight(x1,y1) {
	var y = y1-10;
	var x = x1;
	fill(74,74,74)
	stroke(14);
	ellipse(x, y - 40, 18,30);



	fill(255,0,0)
	ellipse(x + 4 , y - 54, 7, 6);
	circle(x,y - 31,6)

	fill(255,255,0)
	beginShape();
	vertex(x-5, y-28)
	vertex(x-4, y-12)
	vertex(x-2, y-16)
	vertex(x, y)
	vertex(x+2, y-16)
	vertex(x+4, y-12)
	vertex(x+5, y-28)
	endShape()

	fill(62,62,62)
	rect(x + 4, y - 52, 7, 4);
	rect(x, y - 26, 10, 4);

	circle(x - 4,y - 45,8)
	circle(x - 5,y - 40,8)
	circle(x - 4,y - 35,8)

	noStroke();
	noFill();
}
// endregion

// region events
function keyPressed() {
	if (keyCode === 32 && !jumpHeight && !jump && stage === 0) {
		jump = true;
		gravityDirection = -1;
		velocity = acceleration;
		jumpHeight = jumpPower;
	}
	if (stage === 1) {
		stage = 0;
		charX = windowWidth / 2;
		charY = windowHeight / 2;
		dead = false;
	}
}
function keyReleased() {

}
// endregion

// region run once
function init() {
	initCollisionMap(collisionMap)
	initCollectionMap(collectingMap)
	initDangerMap(dangerMap)
	charX = windowWidth / 2;
	charY = windowHeight - 200;
	minHeight = windowHeight/4*3;

	drawFloor();
	drawClouds();
	drawPlatform(windowWidth - 300, windowHeight/2, 300, 50)
	drawPlatform(windowWidth - 500, windowHeight/3*2, 200, 50)
	drawBox(200, windowHeight - 200, 50);
	drawBox(250, windowHeight - 200, 50);
	drawBox(300, windowHeight - 200, 50);
	drawBox(270, windowHeight - 250, 50);
	charIdle(charX, charY);
}
// endregion

// region logic
function gravity() {
	var collision;

	if (gravityDirection*velocity > 0) {
		var c1 = isCollision(charX+charWidth/2, charY, 'fall', gravityDirection*velocity)
		var c2 = isCollision(charX-charHeight/2, charY, 'fall', gravityDirection*velocity)
		var c3 = isCollision(charX, charY, 'fall', gravityDirection*velocity)
		collision = c1||c2||c3
	} else {
		collision = isCollision(charX, charY, 'jump', charHeight + gravityDirection*velocity)
	}

	if (!collision) {
		if (charY + (gravityDirection*velocity) > windowHeight) {
			stage = 1;
			dead = true;
		}
		if (charY + (gravityDirection*velocity)<0) {
			charY = charY;
		}
		charY = charY + (gravityDirection*velocity);
	} else {
		jump = false;
		jumpHeight = 0;
	}

	if (jumpHeight) {
		jumpHeight -= 2 ;
	} else {
		jumpHeight = 0;
		gravityDirection = 1;
		velocity = fallingSpeed;
	}
}
function game() {
	if (keyIsDown(LEFT_ARROW) && !isCollision(charX-charWidth/2, charY, 'left', -velocity) && charX-charWidth/2 > 0) {
		changeCharPos(-velocity,0)
		if (jump) {
			jumpLeft(charX, charY)
		} else {
			moveLeft(charX, charY)
		}
	} else if (keyIsDown(RIGHT_ARROW) && !isCollision(charX+charWidth/2, charY, 'right', velocity) && charX+charWidth/2 < windowWidth) {
		changeCharPos(velocity,0)
		if (jump) {
			jumpRight(charX, charY)
		} else {
			moveRight(charX, charY)
		}
	} else if (jump) {
		jumpFront(charX, charY)
	} else {
		charIdle(charX, charY)
	}

	checkCollections();

}
function changeCharPos(x,y) {
	if (typeof x === 'number' && typeof y === "number") {
		charX += x;
		charY += y;
	}
}
function isCollision(x,y, direction, distance) {
	return collisionMap.some(cord => {
		var isInX;
		var isInY;
		var minX = min(cord[0], cord[2]);
		var minY = min(cord[1], cord[3]);
		var maxX = max(cord[0], cord[2]);
		var maxY = max(cord[1], cord[3]);

		if (direction === 'left' || direction === 'right') {
			isInX = x + distance > minX && x + distance < maxX
			isInY = y > minY && y < maxY

			return isInX && isInY
		} else if (direction === 'jump') {
			// isInY = y + distance > minY && y < maxY
			// return isInY
		} else if (direction === 'fall') {
			isInX = x > minX && x < maxX
			isInY = y + distance > minY && y + distance < maxY

			return isInX && isInY
		}

		return false;
	});
}
function initCollisionMap(map) {
	map.push([100, windowHeight - 150, windowWidth, windowHeight]); // ground
	map.push([200, windowHeight-200, 250, windowHeight - 150])
	map.push([250, windowHeight-200, 300, windowHeight - 150])
	map.push([300, windowHeight-200, 350, windowHeight - 150])
	map.push([270, windowHeight-250, 320, windowHeight - 200])
	map.push([windowWidth - 300, windowHeight/2, windowWidth, windowHeight/2 + 50]) // platform
	map.push([windowWidth - 500, windowHeight/3*2, windowWidth - 300, windowHeight/3*2+50]) // platform
	if (debug) {
		rectMode(CORNER);
		noFill()
		fill(255,0,0,150);
		stroke(55);
		rect(100, windowHeight - 150, windowWidth - 100, 150) // ground
		rect(200, windowHeight-200, 50, 50) // box
		rect(250, windowHeight-200, 50, 50) // box
		rect(300, windowHeight-200, 50, 50) // box
		rect(270, windowHeight-250, 50, 50) // box
		rect(windowWidth - 300, windowHeight/2, 300, 50)
		rect(windowWidth - 500, windowHeight/3*2, 200, 50)
		noFill();
		noStroke()
		rectMode(CENTER);
	}

}
function initCollectionMap(map) {
	map.push([150, windowHeight - 170])
	map.push([windowWidth - 100, windowHeight/2 - 20 ])
}
function initDangerMap() {
	dangerMap.push([windowWidth - 500, windowHeight/3*2 - 15])
	dangerMap.push([windowWidth - 300, windowHeight/2 - 15])
}
function checkCollections() {
	collectingMap = collectingMap.filter(Array.isArray).map(function (el) {
		if (dist(charX, charY, el[0], el[1]) < 40) {
			return undefined;
		} else {
			drawEnergy(el[0], el[1])
		}
		return el;
	});
	dangerMap.forEach(function (el) {
		if (dist(charX, charY, el[0]+22, el[1]+7) < 30) {
			stage = 1;
			dead = true;
		} else {
			drawDanger(el[0], el[1])
		}
	})
}

// endregion

// render place
function drawDanger(x, y) {
	image(danger, x,y, 45,15)
}

function drawPlatform(x, y, width, height, img) {
	for(let i = x; i< x+width; i+=50){
		for (let j=y; j< y+height; j+=50) {
			bgCanvas.image(darkBlock1, i, j, 50,50,0,0,160,160)
		}
	}
}

function drawEnergy(x, y) {
	fill(255,0,0);
	image(almaz,x - 20, y - 20,40,40,0,0,almaz.width, almaz.height)
	fill(115,219,255,5);
	for(i = 0; i < 30; i++){
		ellipse(x,y, i*3);
	}
	noFill()
}

function drawBox(x, y, width) {
	bgCanvas.fill(219,173,0)
	bgCanvas.stroke(50)
	bgCanvas.square(x,y,width)
	bgCanvas.line(x,y, x+width,y+width)
	bgCanvas.line(x,y+width,x+width, y);
	bgCanvas.image(blockB, x, y, width,width,0,0,160,160,'CONTAIN')

	bgCanvas.noStroke();
	bgCanvas.noFill()
}

function drawClouds() {
	bgCanvas.fill(255,255,255);
	bgCanvas.ellipse(200,100, 100,50)
	bgCanvas.ellipse(250,120, 100,50)
	bgCanvas.ellipse(180,120, 100,50)

	bgCanvas.ellipse(windowWidth - 300,80, 100,50)
	bgCanvas.ellipse(windowWidth - 280,100, 100,50)
	bgCanvas.ellipse(windowWidth - 350,100, 100,50)

	bgCanvas.noFill()
}

function drawFloor() {
	bgCanvas.rect(0, windowHeight - 150, windowWidth, 150)
	for(let i = 100; i< windowWidth; i+=50){
		for (let j=windowHeight - 150; j< windowHeight; j+=50) {
			if (j === windowHeight - 150) {
				bgCanvas.image(lightBlock1, i, j, 50,50,0,0,160,160,'CONTAIN')
			} else {
				bgCanvas.image(lightBlock, i, j, 50,50,0,0,160,160,'CONTAIN')
			}
		}
	}
	for(let i = 0; i< 100; i+=50){
		for (let j=windowHeight - 100; j< windowHeight; j+=50) {
			if (j === windowHeight - 100) {
				bgCanvas.image(water, i, j, 50,50,0,0,160,160,'CONTAIN')
			} else {
				bgCanvas.image(water1, i, j, 50,50,0,0,160,160,'CONTAIN')
			}
		}
	}
}