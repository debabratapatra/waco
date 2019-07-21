export default class Constants {
    constructor() {
        this.renderCanvas();
        this.setConstants();
        this.init();
    }

    renderCanvas() {
        this.canvas = document.createElement('canvas');
        this.backCanvas = document.createElement('canvas');
        this.getScreenSize();

        this.canvas.setAttribute('width',this.screenWidth + 'px');
        this.canvas.setAttribute('height',this.screenHeight + 'px');
        this.canvas.setAttribute('id','game-canvas');
        this.canvas.style['z-index'] = 2;

        this.backCanvas.setAttribute('width',this.screenWidth + 'px');
        this.backCanvas.setAttribute('height',this.screenHeight + 'px');
        this.backCanvas.setAttribute('id','background-canvas');
        this.backCanvas.style['z-index'] = 1;

        document.body.appendChild(this.canvas);
        document.body.appendChild(this.backCanvas);

        this.ctx = this.canvas.getContext('2d');
        this.backCtx = this.backCanvas.getContext('2d');
    }

    getScreenSize() {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

        let width = w.innerWidth || e.clientWidth || g.clientWidth;
        this.screenHeight = (w.innerHeight|| e.clientHeight|| g.clientHeight) - 4;
        this.screenWidth = parseInt(1.6 * this.screenHeight);
    }

    setConstants() {
        this.fighterName = 'Sesa';
    }

    init() {
        
    }
}