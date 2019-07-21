export default class BackCanvasManager {

    constructor(constants) {
        this.constants = constants;
        this.canvas = constants.backCanvas;
        this.ctx = constants.backCtx;
        this.components = [];
        this.init();
    }

    onMouseDown(x, y) {
        this.components.forEach((component, index) => {
            if(component.hitTest(this.ctx, x, y)) {
                component.startDrag(x, y);
                component.drag = true;
            }
        });
    }

    onMouseMove(x, y) {
        this.canvas.style.cursor = 'default';
        this.components.forEach((component, index) => {
            if(component.hitTest(this.ctx, x, y) && component.showPointer) {
                this.canvas.style.cursor = 'pointer';
            }
            if(component.drag) {
                component.dragging(x, y);
                this.draw();
            }
        });
    }

    onMouseUp(x, y) {
        this.components.forEach((component, index) => {
            // component.endDrag(x, y);
            component.drag = false;
        });
    }

    destroy(component) {
        this.components.forEach((comp, index) => {
            if(comp.name === component.name) {
                this.components.splice(index, 1);
            }
        });
    }

    push(component) {
        this.components.push(component);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.constants.screenWidth, this.constants.screenHeight);
        this.components.forEach((component, index) => {
            component.draw(this.ctx);
        });
    }

    init() {
    }
}