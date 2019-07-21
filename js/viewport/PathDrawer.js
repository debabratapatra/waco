import Sprite from './../common/Sprite';
import Utility from './../common/Utility';

/**
 * Draws Path on Plane
 * 
 * @export
 * @class PathDrawer
 */
export default class PathDrawer extends Sprite {
    constructor(paths, managers) {
        super();
        this.plane = managers.plane;
        this.paths = paths;
        this.width = 20;

        //Queue for drawing children
        this.queue = [];
    }

    /**
     * Draw paths in Queue
     * 
     * @param {any} ctx 
     * @returns 
     * @memberof PathDrawer
     */
    manageQueue(ctx) {
        const plane = this.plane;

        // If Empty return
        if(this.queue.length === 0) {
            this.paths.forEach(path => {
                path.isDrawn = false;
            });
            return;
        }

        const path = this.paths[this.queue[0]],
              parent = this.paths[path.parent];

        // Remove first path.
        this.queue.shift();

        // Move to the parent of the path.
        ctx.moveTo(parent.point.x - plane.planeX, parent.point.y - plane.planeY);

        // Draw first path.
        this.drawPath(path, ctx);
    }

    /**
     * Draw Current Path
     * 
     * @param {any} path 
     * @param {any} ctx 
     * @returns 
     * @memberof PathDrawer
     */
    drawPath(path, ctx) {
        const plane = this.plane;        

        //Draw to make sure Line there is a line.
        ctx.lineTo(path.point.x - plane.planeX, path.point.y - plane.planeY);

        // If the Path is already drawn.
        if(path.isDrawn) {
            this.manageQueue(ctx);
            return;
        }

        // Mark as Drawn.
        path.isDrawn = true;

        // If children is undefined that mean its the end. Check Queue.
        if(path.children === undefined) {
            this.manageQueue(ctx);
            return;
        }

        // If there are multiple children then push the all except the first to the queue.
        if(path.children.length > 1) {
            this.queue = this.queue.concat(path.children.slice(1));
        }

        this.drawPath(this.paths[path.children[0]], ctx);
    }

    /**
     * 
     * 
     * @param {any} ctx 
     * @memberof PathDrawer
     */
    draw(ctx) {
        ctx.beginPath();
        let prevStroke = ctx.strokeStyle,
            prevLineWidth = ctx.lineWidth;

        this.drawPath(this.paths[0], ctx);

        ctx.lineWidth = this.width;
        ctx.strokeStyle = '#f7f7cc';
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = prevStroke;
        ctx.lineWidth = prevLineWidth;
        
        //Remove on Production
        this.paths.forEach(path => {
            ctx.fillText(path.index, path.point.x - this.plane.planeX, path.point.y -this.plane.planeY);
        });
    }
}