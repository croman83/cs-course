// region global

// game control
var stage = 0;
var debug = false;
var items = 0;

// char
var charX;
var charY;
var charWidth = 50;
var charHeight = 55;
var dead = false;

// stage map
var gameMap = {
    width: 2, // related to width
    height: 1,// related to height
    collisions: [],
    collectable: [
        {
            x: 20,
            y: 10,
            type: 'energy'
        },
        {
            x: 6,
            y: 90,
            type: 'energy'
        },
        {
            x: 190,
            y: 65,
            type: 'energy'
        }
    ],
    danger: [
        {
            x: 1,
            y: 90,
        },
    ],
    textures: [
        {
            x: 115,
            y: 65,
            width: 85,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 105,
            y: 75,
            width: 10,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 100,
            y: 85,
            width: 4,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 0,
            y: 40,
            width: 4,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 35,
            y: 70,
            width: 3,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 0,
            y: 50,
            width: 10,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 15,
            y: 10,
            width: 10,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 5,
            y: 20,
            width: 10,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 75,
            y: 85,
            width: 10,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 15,
            y: 60,
            width: 10,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 5,
            y: 75,
            width: 8,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 40,
            y: 80,
            width: 20,
            height: 5,
            texture: 'platform',
            fig: 'rect',
            feel: true
        },
        {
            x: 0,
            y: 90,
            width: 10,
            height: 10,
            texture: 'ground',
            fig: 'rect',
            feel: true
        },
        {
            x: 10,
            y: 95,
            width: 190,
            height: 5,
            texture: 'water',
            fig: 'rect',
            feel: false
        }

    ]
}

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

// utils
var interval = 0;
var intervalDirection = 1;
var scrollX = 0;
var scrollY = 0;

// endregion

// region setup
function setup() {
    createCanvas(gameMap.width * windowWidth, gameMap.height * windowHeight);

    rectMode(CENTER);
    textAlign(CENTER);

    initGame();
}

// endregion


// region draw
function draw() {
    clear();
    background(152)

    gravity();

    renderMap(gameMap)

    if (stage === 0) {
        game();
    } else if (stage === 1) {
        gameOver();
    }
    if (debug) {
        highlightCharDebug()
    }
}

// endregion


// region robot layouts
function charIdle(x1, y1) {
    var y = y1 + 10;
    var x = x1;
    fill(74, 74, 74)
    stroke(14);
    circle(x, y - 40, 30);


    fill(255, 0, 0)
    ellipse(x, y - 56, 14, 6);
    ellipse(x, y - 35, 12, 6);
    circle(x + 17, y - 31, 6)
    circle(x - 17, y - 31, 6)

    fill(255, 255, 0)
    beginShape();
    vertex(x - 7, y - 28)
    vertex(x - 5, y - 18)
    vertex(x - 2, y - 20)
    vertex(x, y - 15)
    vertex(x + 2, y - 20)
    vertex(x + 5, y - 18)
    vertex(x + 7, y - 28)
    endShape()

    fill(62, 62, 62)
    rect(x, y - 54, 14, 4);
    rect(x, y - 26, 14, 4);
    circle(x - 14, y - 45, 8)
    circle(x - 16, y - 40, 8)
    circle(x - 17, y - 35, 8)

    circle(x + 14, y - 45, 8)
    circle(x + 16, y - 40, 8)
    circle(x + 17, y - 35, 8)

    noStroke();
    noFill();
}

function charDead(x1, y1) {
    stage = 1;
    gravityDirection = 0
    dead = true;

    push()
    var y = y1 + 25;
    var x = x1;

    fill(74, 74, 74)
    stroke(14);
    circle(x, y - 40, 30);

    fill(255, 255, 0)

    fill(62, 62, 62)
    rect(x, y - 54, 14, 4);
    rect(x, y - 26, 14, 4);
    circle(x - 15, y - 30, 8)
    circle(x - 16, y - 25, 8)
    circle(x - 17, y - 35, 8)

    circle(x + 15, y - 30, 8)
    circle(x + 16, y - 25, 8)
    circle(x + 17, y - 35, 8)

    pop()
}

function jumpFront(x1, y1) {
    var y = y1 - 10;
    var x = x1;
    fill(74, 74, 74)
    stroke(14);
    circle(x, y - 40, 30);


    fill(255, 0, 0)
    ellipse(x, y - 56, 14, 6);
    ellipse(x, y - 35, 12, 6);
    circle(x + 17, y - 31, 6)
    circle(x - 17, y - 31, 6)

    fill(255, 255, 0)
    beginShape();
    vertex(x - 7, y - 28)
    vertex(x - 5, y - 12)
    vertex(x - 2, y - 16)
    vertex(x, y)
    vertex(x + 2, y - 16)
    vertex(x + 5, y - 12)
    vertex(x + 7, y - 28)
    endShape()

    fill(62, 62, 62)
    rect(x, y - 54, 14, 4);
    rect(x, y - 26, 14, 4);
    circle(x - 14, y - 45, 8)
    circle(x - 16, y - 40, 8)
    circle(x - 17, y - 35, 8)

    circle(x + 14, y - 45, 8)
    circle(x + 16, y - 40, 8)
    circle(x + 17, y - 35, 8)

    noStroke();
    noFill();
}

function moveLeft(x1, y1) {
    var y = y1 + 10;
    var x = x1;
    fill(74, 74, 74)
    stroke(14);
    ellipse(x, y - 40, 18, 30);


    fill(255, 0, 0)
    ellipse(x - 4, y - 54, 7, 6);
    // ellipse(x, y - 35, 7,6);
    circle(x, y - 31, 6)

    fill(255, 255, 0)
    beginShape();
    vertex(x - 5, y - 28)
    vertex(x - 4, y - 18)
    vertex(x - 2, y - 20)
    vertex(x, y - 15)
    vertex(x + 2, y - 20)
    vertex(x + 4, y - 18)
    vertex(x + 5, y - 28)
    endShape()

    fill(62, 62, 62)
    rect(x - 4, y - 52, 7, 4);
    rect(x, y - 26, 10, 4);

    circle(x + 4, y - 45, 8)
    circle(x + 5, y - 40, 8)
    circle(x + 4, y - 35, 8)

    noStroke();
    noFill();
}

function moveRight(x1, y1) {
    var y = y1 + 10;
    var x = x1;
    fill(74, 74, 74)
    stroke(14);
    ellipse(x, y - 40, 18, 30);


    fill(255, 0, 0)
    ellipse(x + 4, y - 54, 7, 6);
    // ellipse(x, y - 35, 7,6);
    circle(x, y - 31, 6)

    fill(255, 255, 0)
    beginShape();
    vertex(x - 5, y - 28)
    vertex(x - 4, y - 18)
    vertex(x - 2, y - 20)
    vertex(x, y - 15)
    vertex(x + 2, y - 20)
    vertex(x + 4, y - 18)
    vertex(x + 5, y - 28)
    endShape()

    fill(62, 62, 62)
    rect(x + 4, y - 52, 7, 4);
    rect(x, y - 26, 10, 4);

    circle(x - 4, y - 45, 8)
    circle(x - 5, y - 40, 8)
    circle(x - 4, y - 35, 8)

    noStroke();
    noFill();
}

function jumpLeft(x1, y1) {
    var y = y1 - 10;
    var x = x1;
    fill(74, 74, 74)
    stroke(14);
    ellipse(x, y - 40, 18, 30);


    fill(255, 0, 0)
    ellipse(x - 4, y - 54, 7, 6);
    // ellipse(x, y - 35, 7,6);
    circle(x, y - 31, 6)

    fill(255, 255, 0)
    beginShape();
    vertex(x - 5, y - 28)
    vertex(x - 4, y - 12)
    vertex(x - 2, y - 16)
    vertex(x, y)
    vertex(x + 2, y - 16)
    vertex(x + 4, y - 12)
    vertex(x + 5, y - 28)
    endShape()

    fill(62, 62, 62)
    rect(x - 4, y - 52, 7, 4);
    rect(x, y - 26, 10, 4);

    circle(x + 4, y - 45, 8)
    circle(x + 5, y - 40, 8)
    circle(x + 4, y - 35, 8)

    noStroke();
    noFill();
}

function jumpRight(x1, y1) {
    var y = y1 - 10;
    var x = x1;
    fill(74, 74, 74)
    stroke(14);
    ellipse(x, y - 40, 18, 30);


    fill(255, 0, 0)
    ellipse(x + 4, y - 54, 7, 6);
    circle(x, y - 31, 6)

    fill(255, 255, 0)
    beginShape();
    vertex(x - 5, y - 28)
    vertex(x - 4, y - 12)
    vertex(x - 2, y - 16)
    vertex(x, y)
    vertex(x + 2, y - 16)
    vertex(x + 4, y - 12)
    vertex(x + 5, y - 28)
    endShape()

    fill(62, 62, 62)
    rect(x + 4, y - 52, 7, 4);
    rect(x, y - 26, 10, 4);

    circle(x - 4, y - 45, 8)
    circle(x - 5, y - 40, 8)
    circle(x - 4, y - 35, 8)

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
        charY = 0;
        scrollX = 0;
        scrollY = 0;
        dead = false;
    }
}

function keyReleased() {

}

// endregion

// region run once
function initGame() {
    charX = windowWidth / 2;
    charY = 0;
    minHeight = windowHeight / 4 * 3;

    jumpFront(charX, charY);
}

// endregion

// region logic
function gravity() {
    var collision;

    if (gravityDirection * velocity > 0) {
        var c1 = isCollision(charX + charWidth / 2, charY, 'fall', gravityDirection * velocity)
        var c2 = isCollision(charX - charHeight / 2, charY, 'fall', gravityDirection * velocity)
        var c3 = isCollision(charX, charY, 'fall', gravityDirection * velocity)
        collision = c1 || c2 || c3
    } else {
        collision = isCollision(charX, charY, 'jump', charHeight + gravityDirection * velocity)
    }

    if (!collision) {
        if (charY + (gravityDirection * velocity) > windowHeight) {
            charDead(charX, charY)
        }
        if (charY + (gravityDirection * velocity) < 0) {
            charY = charY;
        }
        charY = charY + (gravityDirection * velocity);
    } else {
        jump = false;
        jumpHeight = 0;
    }

    if (jumpHeight) {
        jumpHeight -= 2;
    } else {
        jumpHeight = 0;
        gravityDirection = 1;
        velocity = fallingSpeed;
    }
}

function game() {
    initInterval();
    drawLightBackground();
    if (keyIsDown(LEFT_ARROW) && !isCollision(charX - charWidth / 2, charY, 'left', -velocity) && charX - charWidth / 2 > 0) {
        moveScreen(-velocity, 0)
        if (jump) {
            jumpLeft(charX, charY)
        } else {
            moveLeft(charX, charY)
        }
    } else if (keyIsDown(RIGHT_ARROW) && !isCollision(charX + charWidth / 2, charY, 'right', velocity) && charX + charWidth / 2 < width) {
        moveScreen(velocity, 0)
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

    // checkCollections();

}

function changeCharPos(x, y) {
    if (typeof x === 'number' && typeof y === "number") {
        charX += x;
        charY += y;
    }
}

function isCollision(x, y, direction, distance) {
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

            isInY = y - distance < maxY && y - distance > minY
            isInX = x > minX && x < maxX

            return isInY && isInX
        } else if (direction === 'fall') {
            isInX = x > minX && x < maxX
            isInY = y + distance > minY && y + distance < maxY

            return isInX && isInY
        }

        return false;
    });
}

function gameOver() {
    fill(255, 0, 0, 100);
    rect(width / 2, height / 2, width, height)
    fill(255, 255, 255)
    textSize(100);
    text('Game over', windowWidth / 2 - scrollX, windowHeight / 2 - scrollY);
    textSize(20);
    text('Press any button', windowWidth / 2 - scrollX, windowHeight / 2 - scrollY + 50);
    translate(scrollX, scrollY)
}

function moveScreen(x, y) {
    const charPosition = charX + x + scrollX;
    const firstQuarter = windowWidth / 3
    const lastQuarter = windowWidth / 3 * 2

    if (x > 0 && charPosition > lastQuarter && (scrollX + x) * (-1) <= width - windowWidth) {
        scrollX += -x;
        scrollY += -y;
    }
    if (x < 0 && charPosition < firstQuarter && scrollX - x <= 0) {
        scrollX -= x;
        scrollY -= y;
    }
    // if (pos > sc2) {
    // 	scrollX += -x;
    // 	scrollY += -y;
    // } else if (pos < sc){
    // 	scrollX += -x;
    // 	scrollY += -y;
    // }

    changeCharPos(x, y)
}

function initInterval() {
    if (intervalDirection) {
        interval++;
        if (interval === 100) intervalDirection = 0;
    } else {
        interval--;
        if (interval === 0) intervalDirection = 1;
    }
}

// endregion

// render place
function highlightCharDebug() {
    fill(255, 0, 0, 100)
    circle(charX, charY, 20)
    noFill()
}

function drawLightBackground() {
    push()
    fill(0, 0, 0, 50)
    rect(width / 2, height / 2, width, height)
    fill(255, 255, 100, min(170, interval))
    rect(width / 2, height / 2, width, height)
    pop()
}

function renderMap(map) {
    translate(scrollX, scrollY);

    collisionMap = [];

    for (let i = 50; i < width - 500; i += 500) {
        drawLamp(i, 0)
    }

    map.textures.forEach(t => {

        if (t.texture === 'platform') {
            drawPlatform(cw(t.x), ch(t.y), cw(t.width), ch(t.height))
        } else if (t.texture === 'water') {
            drawWater(cw(t.x), ch(t.y), cw(t.width), ch(t.height))
        } else if (t.texture === 'ground') {
            drawGround(cw(t.x), ch(t.y), cw(t.width), ch(t.height))
        }

        if (t.feel) {
            collisionMap.push([cw(t.x), ch(t.y), cw(t.x) + cw(t.width), ch(t.y) + ch(t.height)])
            if (debug) {
                push();
                rectMode(CORNER);
                stroke(255, 0, 0, 10);
                fill(255, 0, 0, 100)
                strokeWeight(4)
                rect(cw(t.x), ch(t.y), cw(t.width), ch(t.height))
                pop()
            }
        }
    })

    map.collectable = map.collectable.filter((l => typeof l === 'object')).map(function (el) {
        if (dist(charX, charY, cw(el.x), ch(el.y)) < 40) {
            items++;
            return undefined;
        } else {
            if (el.type === 'energy') drawEnergy(cw(el.x), ch(el.y), true)
        }
        return el;
    });

    map.danger.forEach(function (el) {
        if (dist(charX, charY, cw(el.x) + 22, ch(el.y) - 7) < 30) {
            charDead(charX, charY)
        } else {
            drawDanger(cw(el.x), ch(el.y), 45, 15)
        }
    })

    drawItemCount()

}

function cw(d) {
    return windowWidth / 100 * d;
}

function ch(d) {
    return windowHeight / 100 * d;
}

function drawItemCount() {
    push()
    drawEnergy(25 - scrollX, 38, false)
    textSize(20)
    fill(0, 90, 255)
    text(items.toString(), 55 - scrollX, 30)
    pop()
}

function drawEnergy(cordX, cordY, isShining) {
    var x = cordX;
    var y = cordY - 15

    if (isShining) {
        fill(115, 219, 255, 10);
        for (i = 0; i < 30; i++) {
            ellipse(x, y, i * 2.2);
        }
        noFill()
    }

    fill(0, 128, 255);
    circle(x, y, 25)

    fill(255, 255, 255, 50)

    for (i = 0; i < 10; i++) {
        ellipse(x + 5, y - 5, i);
    }
    noFill()
}

function drawDanger(cordX, cordY) {
    var x = cordX;
    var y = cordY;

    push()
    fill(255, 102, 102, 3);
    noStroke()
    for (i = 0; i < 30; i++) {
        ellipse(x + 21, y - 8, i * 3);
    }
    noFill()

    for (let i = 0; i < 42; i += 14) {
        stroke(90)
        if (i < 28) {
            fill(93, 0, 0)
            beginShape()

            vertex(x + i + 7, y)
            vertex(x + i + 14, y - 12)
            vertex(x + i + 21, y)

            endShape()
        }
        fill(93, 0, 0)
        beginShape()

        vertex(x + i, y)
        vertex(x + i + 7, y - 15)
        vertex(x + i + 14, y)

        endShape()

        fill(190)
        beginShape()

        vertex(x + i, y)
        vertex(x + i + 7, y - 15)
        vertex(x + i + 10, y - 9)

        endShape()
    }

    pop()
}

function drawPlatform(x, y, width) {
    push();
    rectMode(CORNER);
    fill(204, 102, 0)
    stroke(153, 76, 0)
    rect(x, y, width, 50);

    stroke(153, 76, 0)
    fill(255, 128, 0)
    rect(x + 4, y + 24, width - 8, 22);

    fill(255, 255, 0)
    stroke(5)
    rect(x, y, width, 20)

    fill(0);
    noStroke()

    let count = 0;
    for (let i = x + 4; i <= x + width - 14; i += 14) {
        count++;
        beginShape()
        vertex(i + 2, y + 2)
        vertex(i + 8, y + 2)
        vertex(i + 14, y + 18)
        vertex(i + 8, y + 18)
        endShape()
    }

    pop();
}

function drawWater(x, y, width) {
    push();
    rectMode(CORNER);
    fill(102, 178, 255)

    rect(x, y, width, height)
    fill(255)
    rect(x, y, width, 5)
    fill(153, 204, 255)
    rect(x, y + 5, width, 5)

    pop();
}

function drawGround(x, y, width) {
    push();
    rectMode(CORNER);
    fill(96)

    rect(x, y, width, height)
    fill(50)
    rect(x, y, width, 15)
    fill(64)
    rect(x, y + 15, width, 20)

    pop();
}

function drawLamp(x, y) {
    push();

    fill(255, 250, 0, max(100, interval * 2.5))
    stroke(90)
    circle(x, y + 5, 30)

    fill(255, 250, 0)
    noStroke()
    circle(x, y + 5, 10)

    fill(90)
    rect(x, y, 40, 10)

    pop();
}