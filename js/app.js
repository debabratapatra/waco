import Constants from './common/Constants';
import CanvasManager from './common/CanvasManager';
import BackCanvasManager from './common/BackCanvasManager';
import EventManager from './common/EventManager';
// import AttackManager from './attackers/AttackManager';
import Plane from './viewport/Plane';
import PathDrawer from './viewport/PathDrawer';
// import Fighter from './explorers/Fighter/Fighter';
// import Tree from './attackers/Tree';

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 17 /*~ 1000/60*/);
        }
    );
}

const constants = new Constants();
const plane = new Plane(constants);
const canvasManager = new CanvasManager(constants);
const backCanvasManager = new BackCanvasManager(constants);
const eventManager = new EventManager(constants, canvasManager, backCanvasManager);

const managers = {
    constants: constants,
    canvasManager: canvasManager,
    backCanvasManager: backCanvasManager,
    eventManager: eventManager,
    plane: plane
};

// const path = [[{x:20,y:2900}, {x:500,y:2900}], [{x:500,y:2900}, {x:900,y:2800}]];
const path = [{
    index: 0,
    parent: undefined,
    point: {x:350,y:2900},
    children: [1]
}, {
    index: 1,
    parent: [0],
    point: {x:500,y:2900},
    children: [2,3,5]
}, {
    index: 2,
    parent: [1, 3],
    point: {x:900,y:2800},
    children: [4]
}, {
    index: 3,
    parent: [1],
    point: {x:900,y:3000},
    children: [2]
}, {
    index: 4,
    parent: [2,6],
    point: {x:1100,y:2900},
    children: undefined
}, {
    index: 5,
    parent: [1],
    point: {x:520,y:3000},
    children: undefined
}];

const pathDrawer = new PathDrawer(path, managers);
// const carrier = new Carrier();
// const fighter = new Fighter(managers);
// const tree = new Tree(managers);
// const tiger = new Tiger();

// attackManager.push(tree);

backCanvasManager.push(plane);
backCanvasManager.push(pathDrawer);
// backCanvasManager.push(tree);

// canvasManager.pushSprite(carrier);
// canvasManager.pushSprite(fighter);
// canvasManager.pushSprite(tiger);

// carrier.animationPath = Utility.createAnimationPath([[{x:50, y: 50}, {x: 300, y: 300}], [{x:300, y: 300}, {x: 55, y: 200}], [{x:55, y: 200}, {x: 300, y: 250}]]);
// carrier.animating = true;
// fighter.go(path);
// tiger.go(fighter);

function draw() {
    window.requestAnimationFrame(draw);
    constants.ctx.clearRect(0, 0, constants.screenWidth, constants.screenHeight);

    // constants.canvas.width = constants.canvas.width
    let components = canvasManager.components;
    for(var i = 0; i < components.length; i++) {
        components[i].visible && components[i].draw(canvasManager.ctx);
    }
}
alert('hi');
window.document.body.onload = function() {
    // plane.bitMapPlane = bitmap;
        backCanvasManager.draw();
        draw();
    // createImageBitmap(plane.plane)
    // .then(function(bitmap) {
        
    // }, function(reason) {

    //     //Memory allocation issue
    //     window.location.reload();
    // });
}
