class Player {
    constructor(img, fd, sw, sh, dx, dy, dw, dh) {
        this.cf = 0; //contador de frames
        this.fd = fd; //frame delay
//        this.ns = ns; //numero de sprites
        this.sw = sw; //largura de recorte
        this.sh = sh; //altura de recorte
        this.dx = dx;   //posicao x no canvas
        this.dy = dy;   //posicao y no canvas
        this.dw = dw;   //largura no canvas
        this.dh = dh;   //altura no canvas
        this.img = img;  //imagem do objeto
        this.state = 'stop';
        console.log("Player");
    }

    draw(ctx) {
        if (Math.floor(this.cf / this.fd) * this.sw ===
                this.img.naturalWidth)
            this.cf = 0;
        ctx.drawImage(this.img, //OBJETO IMAGEM EM MEMORIA
                //POSICAO X DE CORTE
                Math.floor(this.cf / this.fd) * this.sw,
                0, //POSICAO Y DE CORTE
                this.sw, //LARGURA DE CORTE NO SPRITE
                this.sh, //ALTURA DE CORTE DO SPRITE
                this.dx, //POSICAO X NO CANVAS(DESTINO)
                this.dy, //POSICAO Y NO CANVAS
                this.dw, //LARGURA NO CANVAS
                this.dh  //ALTURA NO CANVAS
                );
        this.cf++;
    }

    print() {
        console.log('teste');
    }

    
}

class Enemi extends Player{
    
    constructor(img, fd, sw, sh, dx, dy, dw, dh,nome){
        super(img, fd, sw, sh, dx, dy, dw, dh);
        this.name = nome;
        console.log(this.name);
    }
    
   jump() {
        if (this.state === 'up') {
            this.dy -= 10;
            if (this.dy < 0) {
                this.state = 'down';
            }
        }

        if (this.state === 'down') {
            this.dy += 10;
        }

        if (this.dy > 130) {
            this.state = 'stop';
        }
    }

    control(key) {
        if (key === 32) {
            if (this.state !== 'down')
                this.state = 'up';
        }
        if (key === 37) {
            this.state = 'left';

        }

        if (key === 0 && (this.state !== 'up' && this.state !== 'down')) {
            this.state = 'stop';
        }
    }

    move() {
        console.log(this.state);
        if (this.state === 'up' || this.state === 'down') {
            this.jump();
        }
        if (this.state === 'left') {
            this.dx -= 10;
            if (this.dy < 130) {
                this.state = 'up';
            }
        }
    }
}