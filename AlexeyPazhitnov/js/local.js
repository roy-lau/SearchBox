/**
 * Created by roy-lau on 2017/8/31 0031.
 * ������Ϸ��
 */
var Local = function(){
  //��Ϸ����
    var game;
    //��ʼ
    var start = function(){
        var doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next')
        };
        game = new Game();
        game.init(doms);
    };
    //����API
    this.start = start();
};

