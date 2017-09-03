/**
 * Created by roy-lau on 2017/8/31 0031.
 * ������Ϸ��
 */
var Local = function(){
  //��Ϸ����
    var game;
    // ʱ����
    var INTERVAL = 200;
    // ��ʱ��
    var timer = null;
    // �󶨼����¼�
    var bindKeyEvent = function(){
        document.onkeydown = function(e){
            if(e.keyCode == 38){ // up
                game.rotate();
            }else if(e.keyCode == 39){ // right
                game.right(); 
            }else if(e.keyCode == 40){ // down
                game.down();
            }else if(e.keyCode == 37){ // left
                game.left();
            }else if(e.keyCode == 32){ // space
                game.fall();
            }
        }
    }
    // �Զ�����
    var move = function(){
        if(!game.down()){
            game.fixed();
            game.checkClear();
            var gameOver = game.checkGameOver();
            if(gameOver){
                stop();
            }else{
                game.performNext(generateType(),generateDir())
            }
        }
    }
    // �������һ����������
    var generateType = function(){
        return Math.ceil(Math.random() * 7) -1; // ���һ��0-6������
    }
    // �������һ����ת�Ĵ���
    var generateDir = function(){
        return Math.ceil(Math.random() * 4) -1; // ���һ��0-4������
    }
    // ��ʼ
    var start = function(){
        var doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next')
        };
        game = new Game();
        game.init(doms);
        bindKeyEvent();
        timer = setInterval(move, INTERVAL);
    };
    // ����
    var stop = function(){
        if(timer){
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }
    //����API
    this.start = start;
};
