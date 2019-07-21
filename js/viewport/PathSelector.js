import Sprite from './../common/Sprite';
import Utility from './../common/Utility';

/**
 * Select Path on Plane
 * 
 * @export
 * @class PathDrawer
 */
export default class PathSelector extends Sprite {
    constructor(parentPath, childrenPaths, callee) {
        super();
        this.parentPath = parentPath;
        this.childrenPaths = childrenPaths;
        this.name = 'pathSelector';
        this.width = 20;
        this.callee = callee;
        this.canvasManager = callee.managers.canvasManager;
        this.eventManager = callee.managers.eventManager;
        this.plane = callee.managers.plane;
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
            prevLineWidth = ctx.lineWidth,
            plane = this.plane;

        this.childrenPaths.forEach(childPath => {
            ctx.moveTo(this.parentPath.point.x - plane.planeX, 
                this.parentPath.point.y - plane.planeY);
            ctx.lineTo(childPath.point.x - plane.planeX, childPath.point.y - plane.planeY);
        });

        ctx.lineWidth = this.width;
        ctx.strokeStyle = '#7a7af3';
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = prevStroke;
        ctx.lineWidth = prevLineWidth;
    }

    startDrag(ctx, x, y) {
        this.eventManager.lookForGameCanvas = false;
        this.callee.onSelectPath(this.parentPath, this.selectedPath);
        this.canvasManager.destroy(this);
    }

    inbetween(point0, point1, point) {
        let lower = point0,
            greater = point1;

        if(point0 > point1) {
            lower = point1;
            greater = point0;
        }

        if(point > lower && point < greater) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Check if one of the Path is Hit.
     * 
     * @param {any} childPath 
     * @param {any} x 
     * @param {any} y 
     * @returns 
     * @memberof PathSelector
     */
    contact(childPath, x, y) {
        let parent = this.parentPath.point,
            plane = this.plane,
            parentX = parent.x - plane.planeX,
            parentY = parent.y - plane.planeY,
            child = childPath.point,            
            childX = child.x - plane.planeX,
            childY = child.y - plane.planeY;

        //Find the Perpendicular Distance from the click point to the Line using Euclidean geometry.
        //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
        //Here ax+by+c = mx-y+c = 0
        let dy = childY - parentY,
            dx = childX - parentX,
            slope = dy / dx,
            c = childY - slope * childX,
            a = slope,
            b = -1;

        //Equation for vertical line is x = a.
        if(slope == Infinity) {
            a = 1,
            b = 0;
            c = -childX;
        }

        const perpendicularDistance = Math.abs(a * x + b*y + c) / Math.sqrt(a * a + b * b),
              lineLength = Math.sqrt(dy * dy + dx * dx),

              //Distance of click from one end of the line
              distance1 = Math.sqrt((childX - x) * (childX -x) + (childY - y) * (childY - y)),

              //Distance of click from another end of the line
              distance2 = Math.sqrt((parentX - x) * (parentX -x) + (parentY - y) * (parentY - y)),

              //Click is within the the two end of the line
              within = distance1 < lineLength && distance2 < lineLength;        

        return perpendicularDistance < 20 && within;
    }

    /**
     * Check if Path Selector is Hit.
     * 
     * @param {any} ctx 
     * @param {any} x 
     * @param {any} y 
     * @returns 
     * @memberof PathSelector
     */
    hitTest(ctx, x, y) {
        for(let i = 0, length = this.childrenPaths.length; i < length; i++) {
            const childPath = this.childrenPaths[i],
                contacted = this.contact(childPath, x, y);

            if(contacted) {
                this.selectedPath = childPath;
                return true;
            }
        }

        return false;        
    }
}