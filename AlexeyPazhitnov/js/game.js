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
    // �����Ƿ�Ϸ�
    var check = function(pos, x,y){
        if(pos.x + x <0){
            return false;
        }else if(pos.x + x >= gameData.length){
            return false;
        }else if(pos.y + y < 0){
            return false;
        }else if(pos.y + y >= gameData[0].length){
            return false;
        }else if(gameData[pos.x + x][pos.y + y] ==1){
            return false;
        }else {
            return true;
        }
    }
    // ��������Ƿ�Ϸ�
    var isValid = function(pos, data){
        for(var i = 0; i<data.length;i++){
            for(var j = 0; j<data[0].length; j++){
                if(data[i][j] != 0){
                    if(!check(pos, i, j)){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    // �������
    var clearData = function(){ 
        for(var i = 0; i<cur.data.length;i++){
            for(var j =0; j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    gameData[cur.origin.x+i][cur.origin.y+j] = 0;
                }
            }
        }
    }
    // ��������
    var setData = function(){ 
        for(var i = 0; i<cur.data.length;i++){
            for(var j =0; j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    gameData[cur.origin.x+i][cur.origin.y+j] = cur.data[i][j];
                }
            }
        }
    }
    // ����
    var down = function(){
        if(cur.canDown(isValid)){
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData,gameDivs);
            return true;
        }else{
            return false;
        }
    }
    // ��ת
    var rotate = function(){
        if(cur.canRotate(isValid)){
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    }
    // ����
    var left = function(){
        if(cur.canLeft(isValid)){
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    }
    // ����
    var right = function(){
        if(cur.canRight(isValid)){
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    }
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
        setData();
        refreshDiv(gameData,gameDivs);
        refreshDiv(next.data,nextDivs)
    };
    //����API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function(){ while(down());}
};
