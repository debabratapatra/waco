import Sprite from "./../common/Sprite";
import Utility from "./../common/Utility";

/**
 * Background 
 * 
 * @export
 * @class Plane
 * @extends {Sprite}
 */
export default class Plane extends Sprite {
    constructor(constants) {
        super();
        let me = this;
        this.x = 0;
        this.y = 0;
        this.width = constants.screenWidth;
        this.height = constants.screenHeight;
        this.constants = constants;
        this.plane = document.getElementById('plane');        
        this.planeX = 0;
        this.planeY = 2500;
        this.planeWidth = this.width;
        this.planeHeight = this.height;
        this.showPointer = false;
    }

    /**
     * Draws the plane
     * 
     * @param {any} ctx 
     * @memberof Plane
     */
    draw(ctx) {
        if(!this.bitMapPlane) {
            return;
        }
        ctx.drawImage(this.bitMapPlane, this.planeX, this.planeY, this.planeWidth, this.planeHeight,
            this.x, this.y, this.width, this.height);
    }

    startDrag(x, y) {
        
        //Remember mouse down points at start point
        this.startX = Utility.round(x);
        this.startY = Utility.round(y);
    };

    dragging(x, y) {
        
        //Get the current offset from the mouse down point
        this.planeX -= x - this.startX;
        this.planeY -= y - this.startY;

        if(this.planeX < 0) {
            this.planeX = 0;
        }

        if(this.planeY < 0) {
            this.planeY = 0;
        }
        
        //Update the start point
        this.startX = x;
        this.startY = y;
    };

    endDrag() {};

    hitTest(ctx, x, y) {
        return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
    };
}