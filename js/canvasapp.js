$().ready(function () {
    
    var $ca = $('canvas');
    var ctx = $ca[0].getContext('2d');
    var caw = $ca.width();
    var cah = $ca.height();
    var img = new Image();
    var imgk = new Image();
    var imgbk = new Image();
    var ryu = new Player(img, 6, 80, 120, 0, 0, 120, 180);
    var ken = new Enemi(imgk,7, 60, 93, 0, 8, 90, 142,"KEN");
    var theme = new Audio();
    var key = 0;
    
    console.log(ryu);
    console.log(ken);
       
    loadAssets();

    function loadAssets() {
        theme.src = 'sounds/scene.mp3';
        theme.oncanplaythrough = function () {
            theme.volume = 1;
            theme.loop = true;
        };

        img.src = "img/sprite_ryu.png";
        img.onload = function () {
            imgk.src = "img/sprites_ken.png";
            imgk.onload = function () {
                imgbk.src = "img/background.jpg";
                imgbk.onload = start;
            };
        };
    }

    function start() {
        ctx.fillStyle = "white";
        ctx.font = "28px arial";
        let text = "Click na Tela Para Iniciar!";
        let tw = ctx.measureText(text).width;
        let tx = caw/2-tw/2;
        ctx.fillText(text,tx, 50);        
        
        ryu.dy = 120;
        ryu.dx = 100;

        ken.dy = 130;
        ken.dx = 300;
        
        $ca.click(function () {
            $ca.off('click');
            theme.play();
            mainLoop();
        });
    }

    function mainLoop() {

        ctx.drawImage(imgbk, 0, 0, caw, cah);
        
        ken.control(key);
        
        ken.move();

        ryu.draw(ctx);
        ken.draw(ctx);
        
        
        requestAnimationFrame(mainLoop);
    }
    
    $(document).keydown(function (e){
        key = e.which;
        console.log(key);
    });
    $(document).keyup(function(e){
        key = 0;
    });
});