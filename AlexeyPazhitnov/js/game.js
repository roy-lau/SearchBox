/**
 * Created by roy-lau on 2017/8/31 0031.
 * ��Ϸ�ĺ���
 */
var Game = function(){
    //domԪ��
    var gameDiv,
        nextDiv;
    //��Ϸ����
    var gameData = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    //��ǰ����
    var cur;
    //��һ������
    var next;
    //divs
    var nextDivs = [];
    var gameDivs = [];

    // ��ʼ��Div
    var initDiv = function(container,data,divs){
        for(var i = 0; i<data.length; i++){
            var div = [];
            for(var j=0; j<data[0].length; j++){
                /***
                 * @type {Element}
                 * @description{ ����һ��div,����div��classNameΪ��none��,����div��λ�ã��ϣ���,
                 * ��������div���뵽idΪgame��Ԫ����,��div push��div������}
                 */
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i*20) + 'px';
                newNode.style.left = (j*20) + 'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    };
    //ˢ��div
    var refreshDiv = function(data,divs){
        for(var i = 0; i < data.length;i++){
            for(var j = 0; j<data[0].length; j++) {
                if (data[i][j] === 0) {
                    divs[i][j].className = 'none';
                } else if (data[i][j] === 1) {
                    divs[i][j].className = 'done';
                } else if (data[i][j] === 2) {
                    divs[i][j].className = 'current';
                }
            }
        }
    };
    //��ʼ��
    var init = function(doms){
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = new Square();
        next = new Square();
        initDiv(gameDiv,gameData,gameDivs);
        initDiv(nextDiv,next.data,nextDivs);
        //����next��ķ��鵽game
        cur.origin.x = 10;
        cur.origin.y = 5;
        for(var i = 0; i<cur.data.length;i++){
            for(var j =0; j<cur.data[0].length;j++){
                gameData[cur.origin.x+i][cur.origin.y+j] = cur.data[i][j];
            }
        }
        refreshDiv(gameData,gameDivs);
        refreshDiv(next.data,nextDivs)
    };
    //����API
    this.init = init();
};
