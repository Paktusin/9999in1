class SeaGull {

    fly() {
        this.frame = (this.isDown()) ? ((this.frame < 2) ? this.frame + 1 : 0) : 1;

        this.directionX = (this.position.x <= this.size.xTo - this.speed && this.directionX > 0 || this.position.x <= this.size.xFrom && this.directionX < 0) ? this.speed : -this.speed;
        this.directionY = (this.position.y <= this.size.yTo - this.speed && this.directionY > 0 || this.position.y <= this.size.yFrom && this.directionY < 0) ? this.speed : -this.speed;

        this.position.x = this.position.x + this.directionX;
        this.position.y = this.position.y + this.directionY;

        this.sprite.css({
            backgroundPositionX: -(this.frame * 48),
            transform: `scaleX(${(this.directionX > 0) ? 1 : -1})`
        });
        this.sprite.animate({left: this.position.x, top: this.position.y}, 0);
    }

    isDown() {
        return this.directionY < 0;
    }

    setIsNight(isIt) {
        this.isNight = (!!isIt);
        this.sprite.css({backgroundPositionY: (this.isNight ? -this.height : 0)});
    }

    constructor(parentEl) {
        this.speed = 3;
        this.frame = 0;
        this.isNight = false;
        this.width = 48;
        this.height = 16;
        this.canvas = parentEl;
        this.sprite = $('<div class="seagull"></div>').css({width: this.width, height: this.height});
        this.resize();
        $(window).on('resize', this.resize.bind(this));
    }

    resize() {
        this.stop();
        this.directionX = this.random(1, 0) > 0 ? this.speed : -this.speed;
        this.directionY = this.random(1, 0) > 0 ? this.speed : -this.speed;
        this.size = {
            xFrom: this.canvas.offset().left,
            xTo: this.canvas.offset().left + this.canvas.innerWidth() - this.width,
            yFrom: this.canvas.offset().top,
            yTo: this.canvas.offset().top + this.canvas.innerHeight() - 180,
        };
        this.position = {
            x: this.random(this.size.xTo, this.size.xFrom),
            y: this.random(this.size.yTo, this.size.yFrom)
        };
        this.start();
    }

    render() {
        this.sprite.css({
            top: this.position.y,
            left: this.position.x,
        });
        this.canvas.append(this.sprite);
    }

    stop() {
        clearInterval(this.interval);
        this.sprite.remove();
    }

    start() {
        this.render();
        this.interval = setInterval(this.fly.bind(this), 100);
    }

    random(max, min = 1) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default SeaGull;