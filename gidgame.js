let scale = 4.7
let houseimg = new Image()
houseimg.src = "house.png"

let deadhouseimg = new Image()
deadhouseimg.src = "deadhouse.png"

let imgfsm = new Image()
imgfsm.src = "imgfsm.png"

let zap = new Audio()
zap.src = "zap2.mp3"


let womanwalkimgL = new Image()
womanwalkimgL.src = "Woman_walkL.png"
let womanwalkimg = new Image()
womanwalkimg.src = "Woman_walk.png"
let womandeathimg = new Image()
womandeathimg.src = "Woman_death.png"
let womandeathimgL = new Image()
womandeathimgL.src = "Woman_deathL.png"

let ManwalkimgL = new Image()
ManwalkimgL.src = "Man_walkL.png"
let Manwalkimg = new Image()
Manwalkimg.src = "Man_walk.png"
let Mandeathimg = new Image()
Mandeathimg.src = "Man_death.png"
let MandeathimgL = new Image()
MandeathimgL.src = "Man_deathL.png"

let GirlwalkimgL = new Image()
GirlwalkimgL.src = "Girl_walkL.png"
let Girlwalkimg = new Image()
Girlwalkimg.src = "Girl_walk.png"
let Girldeathimg = new Image()
Girldeathimg.src = "Girl_death.png"
let GirldeathimgL = new Image()
GirldeathimgL.src = "Girl_deathL.png"


let BoywalkimgL = new Image()
BoywalkimgL.src = "Boy_walkL.png"
let Boywalkimg = new Image()
Boywalkimg.src = "Boy_walk.png"
let Boydeathimg = new Image()
Boydeathimg.src = "Boy_death.png"
let BoydeathimgL = new Image()
BoydeathimgL.src = "Boy_deathL.png"


let Old_manwalkimgL = new Image()
Old_manwalkimgL.src = "Old_man_walkL.png"
let Old_manwalkimg = new Image()
Old_manwalkimg.src = "Old_man_walk.png"
let Old_mandeathimg = new Image()
Old_mandeathimg.src = "Old_man_death.png"
let Old_mandeathimgL = new Image()
Old_mandeathimgL.src = "Old_man_deathL.png"


let Old_womanwalkimgL = new Image()
Old_womanwalkimgL.src = "Old_woman_walkL.png"
let Old_womanwalkimg = new Image()
Old_womanwalkimg.src = "Old_woman_walk.png"
let Old_womandeathimg = new Image()
Old_womandeathimg.src = "Old_woman_death.png"
let Old_womandeathimgL = new Image()
Old_womandeathimgL.src = "Old_woman_deathL.png"


window.addEventListener('DOMContentLoaded', (event) => {
    const gamepadAPI = {
        controller: {},
        turbo: true,
        connect: function (evt) {
            if (navigator.getGamepads()[0] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[1] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[2] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[3] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            }
            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i] === null) {
                    continue;
                }
                if (!gamepads[i].connected) {
                    continue;
                }
            }
        },
        disconnect: function (evt) {
            gamepadAPI.turbo = false;
            delete gamepadAPI.controller;
        },
        update: function () {
            gamepadAPI.controller = navigator.getGamepads()[0]
            gamepadAPI.buttonsCache = [];// clear the buttons cache
            for (var k = 0; k < gamepadAPI.buttonsStatus.length; k++) {// move the buttons status from the previous frame to the cache
                gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
            }
            gamepadAPI.buttonsStatus = [];// clear the buttons status
            var c = gamepadAPI.controller || {}; // get the gamepad object
            var pressed = [];
            if (c.buttons) {
                for (var b = 0, t = c.buttons.length; b < t; b++) {// loop through buttons and push the pressed ones to the array
                    if (c.buttons[b].pressed) {
                        pressed.push(gamepadAPI.buttons[b]);
                    }
                }
            }
            var axes = [];
            if (c.axes) {
                for (var a = 0, x = c.axes.length; a < x; a++) {// loop through axes and push their values to the array
                    axes.push(c.axes[a].toFixed(2));
                }
            }
            gamepadAPI.axesStatus = axes;// assign received values
            gamepadAPI.buttonsStatus = pressed;
            // console.log(pressed); // return buttons for debugging purposes
            return pressed;
        },
        buttonPressed: function (button, hold) {
            var newPress = false;
            for (var i = 0, s = gamepadAPI.buttonsStatus.length; i < s; i++) {// loop through pressed buttons
                if (gamepadAPI.buttonsStatus[i] == button) {// if we found the button we're looking for...
                    newPress = true;// set the boolean variable to true
                    if (!hold) {// if we want to check the single press
                        for (var j = 0, p = gamepadAPI.buttonsCache.length; j < p; j++) {// loop through the cached states from the previous frame
                            if (gamepadAPI.buttonsCache[j] == button) { // if the button was already pressed, ignore new press
                                newPress = false;
                            }
                        }
                    }
                }
            }
            return newPress;
        },
        buttons: [
            'A', 'B', 'X', 'Y', 'LB', 'RB', 'Left-Trigger', 'Right-Trigger', 'Back', 'Start', 'Axis-Left', 'Axis-Right', 'DPad-Up', 'DPad-Down', 'DPad-Left', 'DPad-Right', "Power"
        ],
        buttonsCache: [],
        buttonsStatus: [],
        axesStatus: []
    };
    let canvas
    let canvas_context
    let keysPressed = {}
    let FLEX_engine
    let TIP_engine = {}
    let XS_engine
    let YS_engine
    class Point {
        constructor(x, y) {
            this.x = x
            this.y = y
            this.radius = 0
        }
        pointDistance(point) {
            return (new LineOP(this, point, "transparent", 0)).hypotenuse()
        }
    }
    class Line {
        constructor(x, y, x2, y2, color, width) {
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        hypotenuse() {
            let xdif = this.x1 - this.x2
            let ydif = this.y1 - this.y2
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            return Math.sqrt(hypotenuse)
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.x1, this.y1)
            canvas_context.lineTo(this.x2, this.y2)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class LineOP {
        constructor(object, target, color, width) {
            this.object = object
            this.target = target
            this.color = color
            this.width = width
        }
        angle() {
            return Math.atan2(this.object.y - this.target.y, this.object.x - this.target.x)
        }
        hypotenuse() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            return Math.sqrt(hypotenuse)
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.moveTo(this.object.x, this.object.y)
            canvas_context.lineTo(this.target.x, this.target.y)
            // canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class Triangle {
        constructor(x, y, color, length, fill = 0, strokeWidth = 0, leg1Ratio = 1, leg2Ratio = 1, heightRatio = 1) {
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.x1 = this.x + this.length * leg1Ratio
            this.x2 = this.x - this.length * leg2Ratio
            this.tip = this.y - this.length * heightRatio
            this.accept1 = (this.y - this.tip) / (this.x1 - this.x)
            this.accept2 = (this.y - this.tip) / (this.x2 - this.x)
            this.fill = fill
            this.stroke = strokeWidth
        }
        draw() {
            canvas_context.strokeStyle = this.color
            canvas_context.stokeWidth = this.stroke
            canvas_context.beginPath()
            canvas_context.moveTo(this.x, this.y)
            canvas_context.lineTo(this.x1, this.y)
            canvas_context.lineTo(this.x, this.tip)
            canvas_context.lineTo(this.x2, this.y)
            canvas_context.lineTo(this.x, this.y)
            if (this.fill == 1) {
                canvas_context.fill()
            }
            canvas_context.stroke()
            canvas_context.closePath()
        }
        isPointInside(point) {
            if (point.x <= this.x1) {
                if (point.y >= this.tip) {
                    if (point.y <= this.y) {
                        if (point.x >= this.x2) {
                            this.accept1 = (this.y - this.tip) / (this.x1 - this.x)
                            this.accept2 = (this.y - this.tip) / (this.x2 - this.x)
                            this.basey = point.y - this.tip
                            this.basex = point.x - this.x
                            if (this.basex == 0) {
                                return true
                            }
                            this.slope = this.basey / this.basex
                            if (this.slope >= this.accept1) {
                                return true
                            } else if (this.slope <= this.accept2) {
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }
    }
    class Rectangle {
        constructor(x, y, width, height, color, fill = 1, stroke = 0, strokeWidth = 1) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
            this.stroke = stroke
            this.strokeWidth = strokeWidth
            this.fill = fill
        }
        draw() {
            canvas_context.fillStyle = this.color
            canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move() {
            this.x += this.xmom
            this.y += this.ymom
        }
        isPointInside(point) {
            if (point.x >= this.x) {
                if (point.y >= this.y) {
                    if (point.x <= this.x + this.width) {
                        if (point.y <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            if (point.x + point.radius >= this.x) {
                if (point.y + point.radius >= this.y) {
                    if (point.x - point.radius <= this.x + this.width) {
                        if (point.y - point.radius <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Circle {
        constructor(x, y, radius, color, xmom = 0, ymom = 0, friction = 1, reflect = 0, strokeWidth = 0, strokeColor = "transparent") {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.friction = friction
            this.reflect = reflect
            this.strokeWidth = strokeWidth
            this.strokeColor = strokeColor
        }
        draw() {
            canvas_context.lineWidth = this.strokeWidth
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath();
            if (this.radius > 0) {
                canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
                if(this==pinwheel.body){
                    canvas_context.arc(this.x+10, this.y, this.radius, 0, (Math.PI * 2), true)
                }
                canvas_context.fillStyle = this.color
                canvas_context.fill()
                canvas_context.stroke();
            } else {
                console.log("The circle is below a radius of 0, and has not been drawn. The circle is:", this)
            }
        }
        move() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
        }
        unmove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x -= this.xmom
            this.y -= this.ymom
        }
        frictiveMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
            this.xmom *= this.friction
            this.ymom *= this.friction
        }
        frictiveunMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.xmom /= this.friction
            this.ymom /= this.friction
            this.x -= this.xmom
            this.y -= this.ymom
        }
        isPointInside(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.radius * this.radius)) {
                return true
            }
            return false
        }
        doesPerimeterTouch(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= ((this.radius + point.radius) * (this.radius + point.radius))) {
                return true
            }
            return false
        }
    } class Polygon {
        constructor(x, y, size, color, sides = 3, xmom = 0, ymom = 0, angle = 0, reflect = 0) {
            if (sides < 2) {
                sides = 2
            }
            this.reflect = reflect
            this.xmom = xmom
            this.ymom = ymom
            this.body = new Circle(x, y, size - (size * .293), "transparent")
            this.nodes = []
            this.angle = angle
            this.size = size
            this.color = color
            this.angleIncrement = (Math.PI * 2) / sides
            this.sides = sides
            for (let t = 0; t < sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
        }
        isPointInside(point) { // rough approximation
            this.body.radius = this.size - (this.size * .293)
            if (this.sides <= 2) {
                return false
            }
            this.areaY = point.y - this.body.y
            this.areaX = point.x - this.body.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.body.radius * this.body.radius)) {
                return true
            }
            return false
        }
        move() {
            if (this.reflect == 1) {
                if (this.body.x > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.body.x < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.body.x += this.xmom
            this.body.y += this.ymom
        }
        draw() {
            this.nodes = []
            this.angleIncrement = (Math.PI * 2) / this.sides
            this.body.radius = this.size - (this.size * .293)
            for (let t = 0; t < this.sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
            canvas_context.strokeStyle = this.color
            canvas_context.fillStyle = this.color
            canvas_context.lineWidth = 0
            canvas_context.beginPath()
            canvas_context.moveTo(this.nodes[0].x, this.nodes[0].y)
            for (let t = 1; t < this.nodes.length; t++) {
                canvas_context.lineTo(this.nodes[t].x, this.nodes[t].y)
            }
            canvas_context.lineTo(this.nodes[0].x, this.nodes[0].y)
            canvas_context.fill()
            canvas_context.stroke()
            canvas_context.closePath()
        }
    }
    class Shape {
        constructor(shapes) {
            this.shapes = shapes
        }
        isPointInside(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].isPointInside(point)) {
                    return true
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].doesPerimeterTouch(point)) {
                    return true
                }
            }
            return false
        }
        isInsideOf(box) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (box.isPointInside(this.shapes[t])) {
                    return true
                }
            }
            return false
        }
        push(object) {
            this.shapes.push(object)
        }
    }
    class Spring {
        constructor(x, y, radius, color, body = 0, length = 1, gravity = 0, width = 1) {
            if (body == 0) {
                this.body = new Circle(x, y, radius, color)
                this.anchor = new Circle(x, y, radius, color)
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", width)
                this.length = length
            } else {
                this.body = body
                this.anchor = new Circle(x, y, radius, color)
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", width)
                this.length = length
            }
            this.gravity = gravity
            this.width = width
        }
        balance() {
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", this.width)
            if (this.beam.hypotenuse() < this.length) {
                this.body.xmom += (this.body.x - this.anchor.x) / this.length
                this.body.ymom += (this.body.y - this.anchor.y) / this.length
                this.anchor.xmom -= (this.body.x - this.anchor.x) / this.length
                this.anchor.ymom -= (this.body.y - this.anchor.y) / this.length
            } else {
                this.body.xmom -= (this.body.x - this.anchor.x) / this.length
                this.body.ymom -= (this.body.y - this.anchor.y) / this.length
                this.anchor.xmom += (this.body.x - this.anchor.x) / this.length
                this.anchor.ymom += (this.body.y - this.anchor.y) / this.length
            }
            let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
            let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
            this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
        }
        draw() {
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", this.width)
            this.beam.draw()
            this.body.draw()
            this.anchor.draw()
        }
        move() {
            this.anchor.ymom += this.gravity
            this.anchor.move()
        }

    }
    class Color {
        constructor(baseColor, red = -1, green = -1, blue = -1, alpha = 1) {
            this.hue = baseColor
            if (red != -1 && green != -1 && blue != -1) {
                this.r = red
                this.g = green
                this.b = blue
                if (alpha != 1) {
                    if (alpha < 1) {
                        this.alpha = alpha
                    } else {
                        this.alpha = alpha / 255
                        if (this.alpha > 1) {
                            this.alpha = 1
                        }
                    }
                }
                if (this.r > 255) {
                    this.r = 255
                }
                if (this.g > 255) {
                    this.g = 255
                }
                if (this.b > 255) {
                    this.b = 255
                }
                if (this.r < 0) {
                    this.r = 0
                }
                if (this.g < 0) {
                    this.g = 0
                }
                if (this.b < 0) {
                    this.b = 0
                }
            } else {
                this.r = 0
                this.g = 0
                this.b = 0
            }
        }
        normalize() {
            if (this.r > 255) {
                this.r = 255
            }
            if (this.g > 255) {
                this.g = 255
            }
            if (this.b > 255) {
                this.b = 255
            }
            if (this.r < 0) {
                this.r = 0
            }
            if (this.g < 0) {
                this.g = 0
            }
            if (this.b < 0) {
                this.b = 0
            }
        }
        randomLight() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 12) + 4)];
            }
            var color = new Color(hash, 55 + Math.random() * 200, 55 + Math.random() * 200, 55 + Math.random() * 200)
            return color;
        }
        randomDark() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 12))];
            }
            var color = new Color(hash, Math.random() * 200, Math.random() * 200, Math.random() * 200)
            return color;
        }
        random() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 16))];
            }
            var color = new Color(hash, Math.random() * 255, Math.random() * 255, Math.random() * 255)
            return color;
        }
    }
    class Softbody { //buggy, spins in place
        constructor(x, y, radius, color, members = 10, memberLength = 5, force = 10, gravity = 0) {
            this.springs = []
            this.pin = new Circle(x, y, radius, color)
            this.spring = new Spring(x, y, radius, color, this.pin, memberLength, gravity)
            this.springs.push(this.spring)
            for (let k = 0; k < members; k++) {
                this.spring = new Spring(x, y, radius, color, this.spring.anchor, memberLength, gravity)
                if (k < members - 1) {
                    this.springs.push(this.spring)
                } else {
                    this.spring.anchor = this.pin
                    this.springs.push(this.spring)
                }
            }
            this.forceConstant = force
            this.centroid = new Point(0, 0)
        }
        circularize() {
            this.xpoint = 0
            this.ypoint = 0
            for (let s = 0; s < this.springs.length; s++) {
                this.xpoint += (this.springs[s].anchor.x / this.springs.length)
                this.ypoint += (this.springs[s].anchor.y / this.springs.length)
            }
            this.centroid.x = this.xpoint
            this.centroid.y = this.ypoint
            this.angle = 0
            this.angleIncrement = (Math.PI * 2) / this.springs.length
            for (let t = 0; t < this.springs.length; t++) {
                this.springs[t].body.x = this.centroid.x + (Math.cos(this.angle) * this.forceConstant)
                this.springs[t].body.y = this.centroid.y + (Math.sin(this.angle) * this.forceConstant)
                this.angle += this.angleIncrement
            }
        }
        balance() {
            for (let s = this.springs.length - 1; s >= 0; s--) {
                this.springs[s].balance()
            }
            this.xpoint = 0
            this.ypoint = 0
            for (let s = 0; s < this.springs.length; s++) {
                this.xpoint += (this.springs[s].anchor.x / this.springs.length)
                this.ypoint += (this.springs[s].anchor.y / this.springs.length)
            }
            this.centroid.x = this.xpoint
            this.centroid.y = this.ypoint
            for (let s = 0; s < this.springs.length; s++) {
                this.link = new Line(this.centroid.x, this.centroid.y, this.springs[s].anchor.x, this.springs[s].anchor.y, 0, "transparent")
                if (this.link.hypotenuse() != 0) {
                    this.springs[s].anchor.xmom += (((this.springs[s].anchor.x - this.centroid.x) / (this.link.hypotenuse()))) * this.forceConstant
                    this.springs[s].anchor.ymom += (((this.springs[s].anchor.y - this.centroid.y) / (this.link.hypotenuse()))) * this.forceConstant
                }
            }
            for (let s = 0; s < this.springs.length; s++) {
                this.springs[s].move()
            }
            for (let s = 0; s < this.springs.length; s++) {
                this.springs[s].draw()
            }
        }
    }
    class Observer {
        constructor(x, y, radius, color, range = 100, rays = 10, angle = (Math.PI * .125)) {
            this.body = new Circle(x, y, radius, color)
            this.color = color
            this.ray = []
            this.rayrange = range
            this.globalangle = Math.PI
            this.gapangle = angle
            this.currentangle = 0
            this.obstacles = []
            this.raymake = rays
        }
        beam() {
            this.currentangle = this.gapangle / 2
            for (let k = 0; k < this.raymake; k++) {
                this.currentangle += (this.gapangle / Math.ceil(this.raymake / 2))
                let ray = new Circle(this.body.x, this.body.y, 1, "white", (((Math.cos(this.globalangle + this.currentangle)))), (((Math.sin(this.globalangle + this.currentangle)))))
                ray.collided = 0
                ray.lifespan = this.rayrange - 1
                this.ray.push(ray)
            }
            for (let f = 0; f < this.rayrange; f++) {
                for (let t = 0; t < this.ray.length; t++) {
                    if (this.ray[t].collided < 1) {
                        this.ray[t].move()
                        for (let q = 0; q < this.obstacles.length; q++) {
                            if (this.obstacles[q].isPointInside(this.ray[t])) {
                                this.ray[t].collided = 1
                            }
                        }
                    }
                }
            }
        }
        draw() {
            this.beam()
            this.body.draw()
            canvas_context.lineWidth = 1
            canvas_context.fillStyle = this.color
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath()
            canvas_context.moveTo(this.body.x, this.body.y)
            for (let y = 0; y < this.ray.length; y++) {
                canvas_context.lineTo(this.ray[y].x, this.ray[y].y)
                canvas_context.lineTo(this.body.x, this.body.y)
            }
            canvas_context.stroke()
            canvas_context.fill()
            this.ray = []
        }
    }
    function setUp(canvas_pass, style = "#11aaFF") {
        canvas = canvas_pass
        canvas_context = canvas.getContext('2d');
        canvas.style.background = style
        window.setInterval(function () {
            main()
        }, 34)
        document.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
        });
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });
        window.addEventListener('pointerdown', e => {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
            root.x = TIP_engine.x
            root.y = TIP_engine.y
            // strike.targets.push(new Circle(TIP_engine.x, TIP_engine.y, 10, "white"))
            // example usage: if(object.isPointInside(TIP_engine)){ take action }
            window.addEventListener('pointermove', continued_stimuli);
            flash = 1
        });
        window.addEventListener('pointerup', e => {
            flash = 0
            window.removeEventListener("pointermove", continued_stimuli);
        })
        function continued_stimuli(e) {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
            root.x = TIP_engine.x
            root.y = TIP_engine.y

            // strike.x = TIP_engine.x
            // strike.y = TIP_engine.y
        }
    }
    function gamepad_control(object, speed = 1) { // basic control for objects using the controler
        console.log(gamepadAPI.axesStatus[1] * gamepadAPI.axesStatus[0])
        if (typeof object.body != 'undefined') {
            if (typeof (gamepadAPI.axesStatus[1]) != 'undefined') {
                if (typeof (gamepadAPI.axesStatus[0]) != 'undefined') {
                    object.body.x += (gamepadAPI.axesStatus[2] * speed)
                    object.body.y += (gamepadAPI.axesStatus[1] * speed)
                }
            }
        } else if (typeof object != 'undefined') {
            if (typeof (gamepadAPI.axesStatus[1]) != 'undefined') {
                if (typeof (gamepadAPI.axesStatus[0]) != 'undefined') {
                    object.x += (gamepadAPI.axesStatus[0] * speed)
                    object.y += (gamepadAPI.axesStatus[1] * speed)
                }
            }
        }
    }
    function control(object, speed = 1) { // basic control for objects
        if (typeof object.body != 'undefined') {
            if (keysPressed['w']) {
                object.body.y -= speed
            }
            if (keysPressed['d']) {
                object.body.x += speed
            }
            if (keysPressed['s']) {
                object.body.y += speed
            }
            if (keysPressed['a']) {
                object.body.x -= speed
            }
        } else if (typeof object != 'undefined') {
            if (keysPressed['w']) {
                object.y -= speed
            }
            if (keysPressed['d']) {
                object.x += speed
            }
            if (keysPressed['s']) {
                object.y += speed
            }
            if (keysPressed['a']) {
                object.x -= speed
            }
        }
    }
    function getRandomLightColor() { // random color that will be visible on  black background
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 12) + 4)];
        }
        return color;
    }
    function getRandomColor() { // random color
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 16) + 0)];
        }
        return color;
    }
    function getRandomDarkColor() {// color that will be visible on a black background
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 12))];
        }
        return color;
    }
    function castBetween(from, to, granularity = 10, radius = 1) { //creates a sort of beam hitbox between two points, with a granularity (number of members over distance), with a radius defined as well
        let limit = granularity
        let shape_array = []
        for (let t = 0; t < limit; t++) {
            let circ = new Circle((from.x * (t / limit)) + (to.x * ((limit - t) / limit)), (from.y * (t / limit)) + (to.y * ((limit - t) / limit)), radius, "red")
            shape_array.push(circ)
        }
        return (new Shape(shape_array))
    }

    let setup_canvas = document.getElementById('canvas') //getting canvas from document
    let file = document.getElementById('thefile') //getting canvas from document


file.onchange = function() {

  let files = this.files;
  console.log(files)
//   let img = new Image()
//   img = files[0]
    imgfsm.src =  URL.createObjectURL(files[0]);
    // runner = 100
  };
  

    setUp(setup_canvas) // setting up canvas refrences, starting timer. 

    // object instantiation and creation happens here 


    class Lightning {
        constructor(x, y) {
            this.x = x
            this.y = y
            this.eye = new Circle(x, y, 20, "#DDFFFF")
            this.body = new Circle(x, y, 2, "cyan", (Math.random() - .5), (Math.random() - .5))
            this.body.friction = .98
            this.points = []
            this.targets = [root]
            this.target = 0
            this.counter = 0
            this.segrange = 20
            this.seg = Math.random() * this.segrange
            this.life = 1000000000
        }
        make() {
            this.target = 0
            if (this.life > 0) {

                this.body = new Circle(this.x, this.y, 2, "cyan")
                this.points = []
                for (let t = 0; !this.body.doesPerimeterTouch(this.targets[this.targets.length - 1]) && this.life > 0; t++) {

                    if (this.body.doesPerimeterTouch(this.targets[this.target])) {
                        this.target++
                    }
                    this.counter++
                    this.body.frictiveMove()
                    if (this.counter >= this.seg) {
                        this.life--
                        this.seg = Math.random() * this.segrange
                        this.counter = 0
                        let point = new Point(this.body.x, this.body.y)

                        this.points.push(point)
                        if (this.life < 10) {

                            let link = new LineOP(this.targets[this.target], this.body, "red", 1)
                            if (Math.random() < .5) {
                                let link = new LineOP(this.targets[this.target], this.body, "red", 1)
                                this.body.xmom = (this.targets[this.target].x - this.body.x) / (link.hypotenuse() * 100)
                                this.body.ymom = (this.targets[this.target].y - this.body.y) / (link.hypotenuse() * 100)
                            } else {
                                this.body.xmom += ((Math.random() - .5) / 2.7) + (this.targets[this.target].x - this.body.x) / (link.hypotenuse() * 10)
                                this.body.ymom += ((Math.random() - .5) / 2.7) + (this.targets[this.target].y - this.body.y) / (link.hypotenuse() * 10)
                                if (this.life == 3) {
                                    this.body.xmom *= 1.5
                                    this.body.ymom *= 1.5
                                }
                            }
                        } else {

                            if (Math.random() < .9) {
                                let link = new LineOP(this.targets[this.target], this.body, "red", 1)
                                this.body.xmom = (this.targets[this.target].x - this.body.x) / (link.hypotenuse() * 1000)
                                this.body.ymom = (this.targets[this.target].y - this.body.y) / (link.hypotenuse() * 1000)
                            } else {
                                this.body.xmom += (Math.random() - .5) / 10
                                this.body.ymom += (Math.random() - .5) / 10
                            }
                        }

                        if (Math.random() < .001 || (Math.random() < this.life * .06 && this.life < 4) || (Math.random() < this.life * .10 && this.life <= 1)) {
                            let striker = new Lightning(point.x, point.y)
                            striker.life = 9
                            strikes.push(striker)
                            striker.points.push(point)
                        }
                    }
                }
            }
        }
        hit() {
            this.body.radius *= 20
            for (let t = 0; t < pinwheel.people.length; t++) {
                if (this.body.doesPerimeterTouch(pinwheel.people[t].body)) {
                    // pinwheel.people[t].body.color = "transparent"
                    if(pinwheel.people[t].dead < 0){
                        pinwheel.people[t].dead = 0
                    }
                }
            }
        }
        draw() {
            // if (this.life > 100) {
            //     this.eye.draw()
            // }
            canvas_context.beginPath()
            if (this.points.length > 0) {
                let link = new Line(this.x, this.y, this.points[0].x, this.points[0].y, "#FF000088", 1)
                link.draw()
                for (let t = 1; t < this.points.length; t++) {
                    let link = new LineOP(this.points[t - 1], this.points[t], "#FF000088", 1)
                    link.draw()
                }
                canvas_context.stroke()
            }

        }

    }
    let strikes = []

    let root = new Circle(350, 600, 10, "white")
    let strike = new Lightning(640, 200)
    // strike.make()
    class World {
        constructor() {
            this.body = new Circle(640, 3000, 2400, "green")
            this.people = []
            this.buildings = []
            this.angle = 0
            for (let t = 0; t < 100; t++) {
                let person = new People()
                this.people.push(person)
            }
            for (let t = 0; t < 10; t++) {
                let person = new House()
                this.buildings.push(person)
            }
        }

        draw() {
            this.body.draw()
            for (let t = 0; t < this.buildings.length; t++) {
                this.buildings[t].draw()
            }
            for (let t = 0; t < this.people.length; t++) {
                this.people[t].draw()
            }
        }

    }

    class People {
        constructor() {
            this.body = new Circle(0, 0, 10, "tan")
            this.angle = Math.random() * Math.PI * 2
            this.dis = 2400 + this.body.radius
            this.step = 0
            this.count = 0
            this.rate = 1
            this.type = Math.floor(Math.random() * 6)
            if (Math.random() < .5) {
                this.rate = -1
            }
            this.dead = -1
        }
        draw() {
            this.count++
            if (this.count == 6) {
                this.count = 0
                this.step++
                this.step %= 6
                if (this.dead > -1) {
                    this.dead++
                    if (this.dead >= 3) {
                        if(this.type <2 || this.type > 3){
                            this.dead = 3
                        }else{
                            this.dead = 4
                        }
                    }
                }
            }
            if (this.dead == -1) {
                this.angle += 0.0005 * this.rate
            }
            this.body.x = (this.dis * (Math.cos(this.angle + pinwheel.angle))) + pinwheel.body.x
            this.body.y = (this.dis * (Math.sin(this.angle + pinwheel.angle))) + pinwheel.body.y
            // this.body.draw()
            if (this.dead == -1) {
                canvas_context.translate(this.body.x + this.body.radius, this.body.y + this.body.radius);
                canvas_context.rotate(this.angle + pinwheel.angle + (Math.PI / 2));
                if (this.rate > 0) {
                    if (this.type == 0) {
                        canvas_context.drawImage(womanwalkimg, this.step * womanwalkimg.width / 6, 0, womanwalkimg.width / 6, womanwalkimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    } else if(this.type == 1){
                        canvas_context.drawImage(Manwalkimg, this.step * Manwalkimg.width / 6, 0, Manwalkimg.width / 6, Manwalkimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 2){
                        canvas_context.drawImage(Girlwalkimg, this.step * Girlwalkimg.width / 6, 0, Girlwalkimg.width / 6, Girlwalkimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 3){
                        canvas_context.drawImage(Boywalkimg, this.step * Boywalkimg.width / 6, 0, Boywalkimg.width / 6, Boywalkimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 4){
                        canvas_context.drawImage(Old_manwalkimg, this.step * Old_manwalkimg.width / 6, 0, Old_manwalkimg.width / 6, Old_manwalkimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 5){
                        canvas_context.drawImage(Old_womanwalkimg, this.step * Old_womanwalkimg.width / 6, 0, Old_womanwalkimg.width / 6, Old_womanwalkimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }
                } else {
                    if (this.type == 0) {
                        canvas_context.drawImage(womanwalkimgL, this.step * womanwalkimgL.width / 6, 0, womanwalkimgL.width / 6, womanwalkimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    } else if(this.type == 1){
                        canvas_context.drawImage(ManwalkimgL, this.step * ManwalkimgL.width / 6, 0, ManwalkimgL.width / 6, ManwalkimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    } else if(this.type == 2){
                        canvas_context.drawImage(GirlwalkimgL, this.step * GirlwalkimgL.width / 6, 0, GirlwalkimgL.width / 6, GirlwalkimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 3){
                        canvas_context.drawImage(BoywalkimgL, this.step * BoywalkimgL.width / 6, 0, BoywalkimgL.width / 6, BoywalkimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 4){
                        canvas_context.drawImage(Old_manwalkimgL, this.step * Old_manwalkimgL.width / 6, 0, Old_manwalkimgL.width / 6, Old_manwalkimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 5){
                        canvas_context.drawImage(Old_womanwalkimgL, this.step * Old_womanwalkimgL.width / 6, 0, Old_womanwalkimgL.width / 6, Old_womanwalkimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }
                }
                canvas_context.rotate(-this.angle - pinwheel.angle - (Math.PI / 2));
                canvas_context.translate(-this.body.x - this.body.radius, -this.body.y - this.body.radius);
            } else {
                canvas_context.translate(this.body.x + this.body.radius, this.body.y + this.body.radius);
                canvas_context.rotate(this.angle + pinwheel.angle + (Math.PI / 2));
                if (this.dead > -1) {
                    if (this.rate > 0) {
                        if (this.type == 0) {
                            canvas_context.drawImage(womandeathimg, this.dead * womandeathimg.width / 4, 0, womandeathimg.width / 4, womandeathimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                        }else if(this.type == 1){
                            canvas_context.drawImage(Mandeathimg,this.dead *  Mandeathimg.width / 4, 0, Mandeathimg.width / 4, Mandeathimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                        }else if(this.type == 2){
                            canvas_context.drawImage(Girldeathimg, this.dead * Girldeathimg.width / 5, 0, Girldeathimg.width / 5, Girldeathimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                        }else if(this.type == 3){
                            canvas_context.drawImage(Boydeathimg, this.dead * Boydeathimg.width / 5, 0, Boydeathimg.width / 5, Boydeathimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                        }else if(this.type == 4){
                            canvas_context.drawImage(Old_mandeathimg, this.dead * Old_mandeathimg.width / 4, 0, Old_mandeathimg.width / 4, Old_mandeathimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                        }else if(this.type == 5){
                            canvas_context.drawImage(Old_womandeathimg, (this.dead * Old_womandeathimg.width / 4), 0, Old_womandeathimg.width / 4, Old_womandeathimg.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                        }
                    
                } else {
                    if (this.type == 0) {
                        canvas_context.drawImage(womandeathimgL, (3 - (this.dead)) * womandeathimgL.width / 4, 0, womandeathimgL.width / 4, womandeathimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 1){
                        canvas_context.drawImage(MandeathimgL, (3 - (this.dead)) * MandeathimgL.width / 4, 0, MandeathimgL.width / 4, MandeathimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 2){
                        canvas_context.drawImage(GirldeathimgL, (4 - (this.dead)) * GirldeathimgL.width / 5, 0, GirldeathimgL.width / 5, GirldeathimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 3){
                        canvas_context.drawImage(BoydeathimgL, (4 - (this.dead)) * BoydeathimgL.width / 5, 0, BoydeathimgL.width / 5, BoydeathimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 4){
                        canvas_context.drawImage(Old_mandeathimgL, (3 - (this.dead)) * Old_mandeathimgL.width / 4, 0, Old_mandeathimgL.width / 4, Old_mandeathimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }else if(this.type == 5){
                        canvas_context.drawImage(Old_womandeathimgL, ((3 - (this.dead)) * Old_womandeathimgL.width / 4), 0, (Old_womandeathimgL.width / 4), Old_womandeathimgL.height, 0, 0 - this.body.radius * scale, this.body.radius * scale, this.body.radius * scale)
                    }
                }
            }
            canvas_context.rotate(-this.angle - pinwheel.angle - (Math.PI / 2));
            canvas_context.translate(-this.body.x - this.body.radius, -this.body.y - this.body.radius);
        }
    }


}

    class Roof {
        constructor() {
            this.body = new Polygon(0, 0, 50, "red", 3)
        }
        draw() {
            this.body.draw()
        }

    }
    class House {
        constructor() {
            this.body = new Circle(0, 0, 0, 30, "tan", 50)
            this.angle = Math.random() * Math.PI * 2
            this.dis = 2400
            this.roof = new Roof()
            this.dead = -11
        }
        draw() {
            this.body.x = (this.dis * (Math.cos(this.angle + pinwheel.angle))) + pinwheel.body.x
            this.body.y = (this.dis * (Math.sin(this.angle + pinwheel.angle))) + pinwheel.body.y
            this.body.x2 = ((this.dis + 50) * (Math.cos(this.angle + pinwheel.angle))) + pinwheel.body.x
            this.body.y2 = ((this.dis + 50) * (Math.sin(this.angle + pinwheel.angle))) + pinwheel.body.y
            // this.body.draw()
            // // this.roof.body.body.x = this.body.x2
            // // this.roof.body.body.y = this.body.y2
            // this.roof.body.angle = pinwheel.angle + this.angle
            // this.roof.draw()

            if(this.body.doesPerimeterTouch(strike.body)){
                if(this.dead == -1){
                    if(flash === 1){
                        this.dead= 1
                    }
                }
            }else{
            }

            canvas_context.translate(this.body.x + this.body.radius, this.body.y + this.body.radius);
            canvas_context.rotate(this.angle + pinwheel.angle + (Math.PI / 2));
            if(this.dead == -1 ){
                canvas_context.drawImage(houseimg, 0, 0, houseimg.width, houseimg.height, 0, 0 - 70, 70, 70)

            if(Math.random()<.01){
                let per = new People()
                per.angle = this.angle
                pinwheel.people.push(per)
            }
            }else{
                canvas_context.drawImage(deadhouseimg, this.dead*deadhouseimg.width/3, 0, deadhouseimg.width/3, houseimg.height, 0, 0 - 70, 70, 70)
                if(Math.random()<.5){
                    this.dead++
                }
                this.dead%=3
                
            }


            canvas_context.rotate(-this.angle - pinwheel.angle - (Math.PI / 2));
            canvas_context.translate(-this.body.x - this.body.radius, -this.body.y - this.body.radius);
        }


    }
    let pinwheel = new World()


    let flash = 0

    let runner = -1
    function main() {
        if(runner < 0){
            canvas_context.clearRect(0, 0, canvas.width, canvas.height)  // refreshes the image
            gamepadAPI.update() //checks for button presses/stick movement on the connected controller)
            // game code goes here
            canvas_context.drawImage(imgfsm, 0,0, imgfsm.width, imgfsm.height, strike.eye.x-strike.eye.radius*scale/2,  strike.eye.y-strike.eye.radius*scale/2, strike.eye.radius*scale,strike.eye.radius*scale)
            // strike.eye.draw()
            // root.draw()
            pinwheel.draw()
            if (flash == 1) {
                // zap.play()
                strike.make()
                strike.draw()
                strike.hit()
                for (let t = 0; t < strikes.length; t++) {
                    strikes[t].make()
                    strikes[t].draw()
                }
                strikes = []
            }
    
            if (keysPressed['d']) {
                pinwheel.angle -= .008
            }
            if (keysPressed['a']) {
                pinwheel.angle += .008
            }
        }
        runner--
    }
})