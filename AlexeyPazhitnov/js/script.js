/**
 * Created by roy-lau on 2017/8/31 0031.
 */
var nextData = [
    [2,2,0,0],
    [0,2,2,0],
    [0,0,0,0],
    [0,0,0,0]
];
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
    [0,0,0,0,0,2,1,0,0,0],
    [0,0,0,2,2,2,1,0,0,0],
    [0,0,1,1,1,1,1,0,0,0]
];

var nextDivs = [];
var gameDivs = [];

//根据 gameData 循环创建 gameDivs
var initGame = function(){
    for(var i = 0; i<gameData.length; i++){
        var gameDiv = [];
        for(var j=0; j<gameData[0].length; j++){
            /***
             * @type {Element}
             * @description{ 创建一个div,设置div的className为‘none’,设置div的位置（上，左）,
             * 将创建的div插入到id为game的元素中,将div push到gameDiv中}
             */
            var newNode = document.createElement('div');
            newNode.classname = 'none';
            newNode.style.top = (i*20) + 'px';
            newNode.style.left = (j*20) + 'px';
            document.getElementById('game').appendChild(newNode);
            gameDiv.push(newNode);
        }
        gameDivs.push(gameDiv);
    }
};
//根据 nextData循环创建 nestDivs
var initNext = function(){
    for(var i = 0; i<nextData.length; i++){
        var nextDiv = [];
        for(var j=0; j<nextData[0].length; j++){
            /***
             * @type {Element}
             * @description{ 创建一个div,设置div的className为‘none’,设置div的位置（上，左）,
             * 将创建的div插入到id为next的元素中,将div push到nextDiv中}
             */
            var newNode = document.createElement('div');
            newNode.classname = 'none';
            newNode.style.top = (i*20) + 'px';
            newNode.style.left = (j*20) + 'px';
            document.getElementById('next').appendChild(newNode);
            nextDiv.push(newNode);
        }
        nextDivs.push(nextDiv);
    }
};
var refreshGame = function(){
    for(var i = 0; i < gameData.length;i++){
        for(var j = 0; j<gameData[0].length; j++) {
            if (gameData[i][j] === 0) {
                gameDivs[i][j].className = 'none';
            } else if (gameData[i][j] === 1) {
                gameDivs[i][j].className = 'done';
            } else if (gameData[i][j] === 2) {
                gameDivs[i][j].className = 'current';
            }
        }
    }
};
var refreshNext = function(){
    for(var i = 0; i < nextData.length;i++) {
        for (var j = 0; j < nextData[0].length; j++) {
            if (nextData[i][j] === 0) {
                nextDivs[i][j].className = 'none';
            } else if (nextData[i][j] === 1) {
                nextDivs[i][j].className = 'done';
            } else if (nextData[i][j] === 2) {
                nextDivs[i][j].className = 'current';
            }
        }
    }
};
initGame();
initNext();
refreshGame();
refreshNext();