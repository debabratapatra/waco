export default class Utility {
    static createAnimationPath(points, velocity) {
        let path = [];

        points.forEach(point => {
            let dx = point[1].x - point[0].x,
                dy = point[1].y - point[0].y,

                //Magnitude/Distance of the line
                distance = Math.sqrt(dy * dy + dx * dx),
                currentPosition = 0,

                //Percent in 0 to 1
                percent = 0;            

            //Until 100%
            while (percent <= 1) {

                currentPosition += velocity;

                //Current Pecentage covered
                percent = currentPosition / distance;

                path.push({
                    x: point[0].x + dx * percent,
                    y: point[0].y + dy * percent
                }); 
            } 
        });
        return path;
    }

    static getLineParams(x1, y1, x2, y2) {
        let dx = x2 - x1,
            dy = y2 - y1,
            slope = dy / dx,
            angle = Math.atan(slope);

        return {
            slope: slope,
            angle: angle,
            distance: Math.sqrt(dy * dy + dx * dx)
        };
    }   

    static round(num) {
        return Math.floor(num);
    }
}