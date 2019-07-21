export default class CanvasManager {   

    constructor(constants) {
        this.constants = constants;
        this.canvas = constants.canvas;
        this.ctx = constants.ctx;
        this.explorers = [];
        this.attackers = [];
        this.components = [];
        this.init();
    }

    pushSprite(obj, order = 'end') {
        if(order == 'end') {
            this.components.push(obj);
        } else {
            this.components.unshift(obj);
        }
        
        if(obj.type === 'explorers') {
            this.explorers.push(obj);
        }
        if(obj.type === 'attackers') {
            this.attackers.push(obj);
        }
    }

    destroy(component) {
        let name;

        // Check if the name of the component has been sent.
        if(typeof component === 'string') {
            name = component;
        } else {
            name = component.name;
        }

        this.components.forEach((comp, index) => {
            if(comp.name === name) {
                this.components.splice(index, 1);
            }
        });
        this.attackers.forEach((attacker, index) => {
            if(attacker.name === name) {
                this.attackers.splice(index, 1);
            }
        });
        this.explorers.forEach((explorer, index) => {
            if(explorer.name === name) {
                this.explorers.splice(index, 1);
            }
        });
    }

    onMouseDown(x, y) {
        let contacted = false;
        this.components.forEach((component, index) => {
            if(component.hitTest(this.ctx, x, y)) {
                component.startDrag(x, y);
                component.drag = true;
                contacted = true;
            }
        });

        return contacted;
    }

    init() {
    }
}