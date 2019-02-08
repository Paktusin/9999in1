import seagulImage from '../img/seagull.png';

class SeaGull {

    fly() {
        this.frame = (this.isDown()) ? ((this.frame < 2) ? this.frame + 1 : 0) : 1;

        this.directionX = (this.position.x <= this.box.toX - this.speed && this.directionX > 0 || this.position.x <= this.box.x && this.directionX < 0) ? this.speed : -this.speed;
        this.directionY = (this.position.y <= this.box.toY - this.speed && this.directionY > 0 || this.position.y <= this.box.y && this.directionY < 0) ? this.speed : -this.speed;

        this.position.x = this.position.x + this.directionX;
        this.position.y = this.position.y + this.directionY;

    }

    isDown() {
        return this.directionY < 0;
    }

    setIsNight(isIt) {
        this.isNight = (!!isIt);
    }

    constructor(box = {}) {
        this.loaded = false;
        this.image = new Image();
        this.image.onload = (e) => {
            this.loaded = true; 
        };
        this.image.src = seagulImage;
        this.box = Object.assign({ x: 0, toX: 100, y: 0, toY: 100 }, box);
        this.speed = 3;
        this.frame = 0;
        this.isNight = false;
        this.width = 48;
        this.height = 16;
        this.resize();
    }

    resize() {
        this.stop();
        this.directionX = this.random(1, 0) > 0 ? this.speed : -this.speed;
        this.directionY = this.random(1, 0) > 0 ? this.speed : -this.speed;
        this.position = {
            x: this.random(this.box.toX, this.box.x),
            y: this.random(this.box.toY, this.box.y)
        };
        this.start();
    }

    render(canvasContext) {
        if (this.loaded) {
            canvasContext.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }

    stop() {
        clearInterval(this.interval);
    }

    start() {
        this.interval = setInterval(this.fly.bind(this), 100);
    }

    random(max, min = 1) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default SeaGull;