export default class EventManager {

    constructor(constants, canvasManager, backCanvasManager) {
        this.constants = constants;
        this.canvasManager = canvasManager;
        this.backCanvasManager = backCanvasManager;        
        this.init();
        this.listenEvents(this.canvasManager.canvas);
    }

    onMouseDown() {
        let me = this;
        let contacted = false;

        if(me.lookForGameCanvas) {
            contacted = me.canvasManager.onMouseDown(me.mouse.x, me.mouse.y);
        }

        // Only if Game Canvas not contacted.
        !contacted && me.backCanvasManager.onMouseDown(me.mouse.x, me.mouse.y);
    }

    listenMouseDown(canvas) {
        let me = this;

        canvas.addEventListener('mousedown', function(e) {
            me.updateMouseXY(e);
            e.preventDefault();
            me.onMouseDown();
        });
        canvas.addEventListener('touchstart', function(e) {
            me.updateMouseXY(e.touches[0]);
            e.preventDefault();
            me.onMouseDown();
        });
    }

    onMouseMove(canvas) {
        let me = this;

        canvas.addEventListener('mousemove', function(e) {
            me.updateMouseXY(e);
            e.preventDefault();
            me.backCanvasManager.onMouseMove(me.mouse.x, me.mouse.y);
        });
        canvas.addEventListener('touchmove', function(e) {
            me.updateMouseXY(e.touches[0]);
            e.preventDefault();
            me.backCanvasManager.onMouseMove(me.mouse.x, me.mouse.y);
        });
    }

    onMouseUp(canvas) {
        let me = this;

        document.addEventListener('mouseup', function(e) {
            me.updateMouseXY(e);
            e.preventDefault();
            me.backCanvasManager.onMouseUp(me.mouse.x, me.mouse.y);
        });
        canvas.addEventListener('touchend', function(e) {
            me.updateMouseXY(e.touches[0]);
            e.preventDefault();
            me.backCanvasManager.onMouseUp(me.mouse.x, me.mouse.y);
        });
    }

    onKeyUp() {
        let me = this;

        document.addEventListener('keyup', function(e) {
            let explorers = me.canvasManager.explorers,
                attackers = me.canvasManager.attackers;
 
            //Start on Up Arrow
            if(e.keyCode === 38) {
                explorers.forEach(explorer => {
                    explorer.moveForward();
                });
            }

            //Stop on Down Arrow
            if(e.keyCode === 40) {
                explorers.forEach(explorer => {
                    explorer.moveReverse();
                });
            }

            //Pause on Esc
            if(e.keyCode === 27) {
                explorers.forEach(explorer => {
                    explorer.pause = true;
                });
                attackers.forEach(attacker => {
                    attacker.pause = true;
                });
            }

            //Play on Enter
            if(e.keyCode === 13) {
                explorers.forEach(explorer => {
                    explorer.pause = false;
                });
                attackers.forEach(attacker => {
                    attacker.pause = false;
                });
            }
        });
    }

    listenEvents(canvas) {
        this.listenMouseDown(canvas);
        this.onMouseMove(canvas);
        this.onMouseUp(canvas);
        this.onKeyUp();        
    }

    updateMouseXY(e) {
        this.mouse.x = e.pageX - this.offsetLeft;
        this.mouse.y = e.pageY - this.offsetTop;
    }

    init() {
        this.mouse = {
            x: 0, //Initial position
            y: 0
        };
        this.lookForGameCanvas = false;
        this.offsetLeft = 0;
        this.offsetTop = 0;

        let canvasClone = this.canvasManager.canvas;
        do {  
            this.offsetLeft += canvasClone.offsetLeft;  
            this.offsetTop += canvasClone.offsetTop;  
        } while (canvasClone = canvasClone.offsetParent);
    }
}