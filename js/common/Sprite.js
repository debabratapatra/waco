import Observable from "./Observable";

export default class Sprite extends Observable{
    constructor() {
        super();
        this.draggable = true;
        this.animationPath = [];
        this.animationPointer = 0;
        this.showPointer = true;
    }

    animating(){}

    startDrag() {}
    dragging() {}
    endDrag() {}
    hitTest() {}
}   