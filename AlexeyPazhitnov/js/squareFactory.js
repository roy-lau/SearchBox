/**
 * Created by roy-lau on 2017/8/31 0031.
 * �������ɷ���
 */
var Square1 = function(){
    Square.call(this); // ?�Ժ���ϸ�о�
    // ��ת����
    this.rotates = [
        [
           [0,2,0,0],
           [2,2,2,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,0,0,0],
           [2,2,0,0],
           [2,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,2,2,0],
           [0,2,0,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [0,2,0,0],
           [2,2,0,0],
           [0,2,0,0],
           [0,0,0,0]
         ],
    ];
};
// ԭ�ͼ̳�
Square1.prototype = Square.prototype;

var Square2 = function(){
    Square.call(this)
    // ��ת����
    this.rotates = [
        [
           [0,2,0,0],
           [0,2,0,0],
           [0,2,0,0],
           [0,2,0,0]
         ],
        [
           [0,0,0,0],
           [2,2,2,2],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [0,2,0,0],
           [0,2,0,0],
           [0,2,0,0],
           [0,2,0,0]
         ],
        [
           [0,0,0,0],
           [2,2,2,2],
           [0,0,0,0],
           [0,0,0,0]
         ],
    ];
};
// ԭ�ͼ̳�
Square2.prototype = Square2.prototype;

var Square3 = function(){
    Square.call(this)
    // ��ת����
    this.rotates = [
        [
           [2,2,2,0],
           [0,0,2,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [0,2,0,0],
           [0,2,0,0],
           [2,2,0,0],
           [0,0,0,0]
         ],
        [
           [2,0,0,0],
           [2,2,2,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,2,0,0],
           [2,0,0,0],
           [2,0,0,0],
           [0,0,0,0]
         ],
    ];
};
// ԭ�ͼ̳�
Square3.prototype = Square.prototype;

var Square4 = function(){
    Square.call(this)
    // ��ת����
    this.rotates = [
        [
           [2,2,2,0],
           [2,0,0,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,2,0,0],
           [0,2,0,0],
           [2,2,0,0],
           [0,0,0,0]
         ],
        [
           [0,0,2,0],
           [2,2,2,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,0,0,0],
           [2,0,0,0],
           [2,2,0,0],
           [0,0,0,0]
         ],
    ];
};
// ԭ�ͼ̳�
Square4.prototype = Square.prototype;

var Square5 = function(){
    Square.call(this)
    // ��ת����
    this.rotates = [
        [
           [2,2,0,0],
           [2,2,0,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,2,0,0],
           [2,2,0,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,2,0,0],
           [2,2,0,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,2,0,0],
           [2,2,0,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
    ];
};
// ԭ�ͼ̳�
Square5.prototype = Square.prototype;
  
var Square6 = function(){
    Square.call(this)
    // ��ת����
    this.rotates = [
        [
           [0,2,2,0],
           [2,2,0,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,0,0,0],
           [2,2,0,0],
           [0,2,0,0],
           [0,0,0,0]
         ],
        [
           [0,2,2,0],
           [2,2,0,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,0,0,0],
           [2,2,0,0],
           [0,2,0,0],
           [0,0,0,0]
         ],
    ];
};
// ԭ�ͼ̳�
Square6.prototype = Square.prototype;

var Square7 = function(){
    Square.call(this)
    // ��ת����
    this.rotates = [
        [
           [2,2,0,0],
           [0,2,2,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [0,2,0,0],
           [2,2,0,0],
           [2,0,0,0],
           [0,0,0,0]
         ],
        [
           [2,2,0,0],
           [0,2,2,0],
           [0,0,0,0],
           [0,0,0,0]
         ],
        [
           [0,2,0,0],
           [2,2,0,0],
           [2,0,0,0],
           [0,0,0,0]
         ],
    ];
};
// ԭ�ͼ̳�
Square7.prototype = Square.prototype;

var SquareFactory = function(){};
SquareFactory.prototype.make = function(index,dir){
    var s;
    index = index + 1;
    switch(index){
        case 1:
            s = new Square1();
            break;
        case 2:
            s = new Square2();
            break;
        case 3:
            s = new Square3();
            break;
        case 4:
            s = new Square4();
            break;
        case 5:
            s = new Square5();
            break;
        case 6:
            s = new Square6();
            break;
        case 7:
            s = new Square7();
            break;
        default:
            break;
    }
    s.origin.x = 0;
    s.origin.y = 3;
    s.rotate(dir);
    return s;
}
