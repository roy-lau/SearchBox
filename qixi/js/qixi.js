var Qixi = function () {
    // 配置
    var config = {
        keepZoomRatio: false,
        layer: { "width": "100%", "height": "100%", "top": 0, "left": 0 },
        audio: {
            enable: true,
            // 无法播放，需要在 cdn 路径上
            playURl: "./music/happy.wav",
            cycleURL: "./music/circulation.wav"
        },
        setTime: {
            walkToThird: 6000,
            walkToMiddle: 6500,
            walkToEnd: 6500,
            walkTobridge: 2000,
            bridgeWalk: 2000,
            walkToShop: 1500,
            walkOutShop: 1500,
            openDoorTime: 800,
            shutDoorTime: 500,
            waitRotate: 850,
            waitFlower: 800
        },
        // 几种不同的花瓣
        snowflakeURl: ["http://img.mukewang.com/55adde120001d34e00410041.png",
            "http://img.mukewang.com/55adde2a0001a91d00410041.png",
            "http://img.mukewang.com/55adde5500013b2500400041.png",
            "http://img.mukewang.com/55adde62000161c100410041.png",
            "http://img.mukewang.com/55adde7f0001433000410041.png",
            "http://img.mukewang.com/55addee7000117b500400041.png"]
    };
    var debug = 1;
    if (debug) { $.each(config.setTime, function (key, val) { config.setTime[key] = 500 }) }
    if (config.keepZoomRatio) {
        var proportionY = 900 / 1440;
        var screenHeight = $(document).height();
        var zooomHeight = screenHeight * proportionY;
        var zooomTop = (screenHeight - zooomHeight) / 2;
        config.layer.height = zooomHeight;
        config.layer.top = zooomTop
    }
    var instanceX;
    var container = $("#content");
    container.css(config.layer);
    var visualWidth = container.width();
    var visualHeight = container.height();
    var getValue = function (className) {
        var $elem = $("" + className + "");
        return { height: $elem.height(), top: $elem.position().top }
    };
    var pathY = function () {
        var data = getValue(".a_background_middle");
        return data.top + data.height / 2
    }();
    var bridgeY = function () {
        var data = getValue(".c_background_middle");
        return data.top
    }();
    var animationEnd = (function () {
        var explorer = navigator.userAgent;
        if (~explorer.indexOf("WebKit")) {
            return "webkitAnimationEnd"
        }
        return "animationend"
    })();
    if (config.audio.enable) {
        var audio1 = Hmlt5Audio(config.audio.playURl);
        audio1.end(function () { Hmlt5Audio(config.audio.cycleURL, true) })
    }
    var swipe = Swipe(container);

    function scrollTo(time, proportionX) {
        var distX = visualWidth * proportionX;
        swipe.scrollTo(distX, time)
    }
    var girl = {
        elem: $(".girl"),
        getHeight: function () {
            return this.elem.height()
        },
        rotate: function () {
            this.elem.addClass("girl-rotate")
        },
        setOffset: function () { this.elem.css({ left: visualWidth / 2, top: bridgeY - this.getHeight() }) },
        getOffset: function () {
            return this.elem.offset()
        },
        getWidth: function () {
            return this.elem.width()
        }
    };
    var bird = {
        elem: $(".bird"), fly: function () {
            this.elem.addClass("birdfly");
            this.elem.transition({ right: visualWidth }, 15000, "linear")
        }
    };
    var logo = { elem: $(".logo"), run: function () { this.elem.addClass("logolightSpeedIn").on(animationEnd, function () { $(this).addClass("logoshake").off() }) } };
    var boy = BoyWalk();
    boy.walkTo(config.setTime.walkToThird, 0.6).then(function () {
        scrollTo(config.setTime.walkToMiddle, 1);
        return boy.walkTo(config.setTime.walkToMiddle, 0.5)
    }).then(function () { bird.fly() }).then(function () {
        boy.stopWalk();
        return BoyToShop(boy)
    }).then(function () {
        girl.setOffset();
        scrollTo(config.setTime.walkToEnd, 2);
        return boy.walkTo(config.setTime.walkToEnd, 0.15)
    }).then(function () {
        return boy.walkTo(config.setTime.walkTobridge, 0.25, (bridgeY - girl.getHeight()) / visualHeight)
    }).then(function () {
        var proportionX = (girl.getOffset().left - boy.getWidth() - instanceX + girl.getWidth() / 5) / visualWidth;
        return boy.walkTo(config.setTime.bridgeWalk, proportionX)
    }).then(function () {
        boy.resetOriginal();
        setTimeout(function () {
            girl.rotate();
            boy.rotate(function () {
                logo.run();
                snowflake()
            })
        }, config.setTime.waitRotate)
    });

    function BoyWalk() {
        var $boy = $("#boy");
        var boyWidth = $boy.width();
        var boyHeight = $boy.height();
        $boy.css({ top: pathY - boyHeight + 25 });

        function pauseWalk() { $boy.addClass("pauseWalk") }

        function restoreWalk() { $boy.removeClass("pauseWalk") }

        function slowWalk() { $boy.addClass("slowWalk") }

        function stratRun(options, runTime) {
            var dfdPlay = $.Deferred();
            restoreWalk();
            $boy.transition(options, runTime, "linear", function () { dfdPlay.resolve() });
            return dfdPlay
        }

        function walkRun(time, dist, disY) {
            time = time || 3000;
            slowWalk();
            var d1 = stratRun({ "left": dist + "px", "top": disY ? disY : undefined }, time);
            return d1
        }

        function walkToShop(doorObj, runTime) {
            var defer = $.Deferred();
            var doorObj = $(".door");
            var offsetDoor = doorObj.offset();
            var doorOffsetLeft = offsetDoor.left;
            var offsetBoy = $boy.offset();
            var boyOffetLeft = offsetBoy.left;
            instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffetLeft + $boy.width() / 2);
            var walkPlay = stratRun({ transform: "translateX(" + instanceX + "px),scale(0.3,0.3)", opacity: 0.1 }, 2000);
            walkPlay.done(function () {
                $boy.css({ opacity: 0 });
                defer.resolve()
            });
            return defer
        }

        function walkOutShop(runTime) {
            var defer = $.Deferred();
            restoreWalk();
            var walkPlay = stratRun({ transform: "translate(" + instanceX + "px,0px),scale(1,1)", opacity: 1 }, runTime);
            walkPlay.done(function () { defer.resolve() });
            return defer
        }

        function calculateDist(direction, proportion) {
            return (direction == "x" ? visualWidth : visualHeight) * proportion
        }
        return {
            walkTo: function (time, proportionX, proportionY) {
                var distX = calculateDist("x", proportionX);
                var distY = calculateDist("y", proportionY);
                return walkRun(time, distX, distY)
            }, stopWalk: function () { pauseWalk() }, resetOriginal: function () {
                this.stopWalk();
                $boy.removeClass("slowWalk slowFlolerWalk").addClass("boyOriginal")
            }, toShop: function () {
                return walkToShop.apply(null, arguments)
            }, outShop: function () {
                return walkOutShop.apply(null, arguments)
            }, rotate: function (callback) {
                restoreWalk();
                $boy.addClass("boy-rotate");
                if (callback) {
                    $boy.on(animationEnd, function () {
                        callback();
                        $(this).off()
                    })
                }
            }, getWidth: function () {
                return $boy.width()
            }, getDistance: function () {
                return $boy.offset().left
            }, talkFlower: function () { $boy.addClass("slowflolerwalk") }
        }
    }
    var BoyToShop = function (boyObj) {
        var defer = $.Deferred();
        var $door = $(".door");
        var doorLeft = $(".door-left");
        var doorRight = $(".door-right");

        function doorAction(left, right, time) {
            var defer = $.Deferred();
            var count = 2;
            var complete = function () {
                if (count == 1) {
                    defer.resolve();
                    return
                }
                count--
            };
            doorLeft.transition({ "left": left }, time, complete);
            doorRight.transition({ "left": right }, time, complete);
            return defer
        }

        function openDoor(time) {
            return doorAction("-50%", "100%", time)
        }

        function shutDoor(time) {
            return doorAction("0%", "50%", time)
        }

        function talkFlower() {
            var defer = $.Deferred();
            boyObj.talkFlower();
            setTimeout(function () { defer.resolve() }, config.setTime.waitFlower);
            return defer
        }
        var lamp = {
            elem: $(".b_background"),
            bright: function () {
                this.elem.addClass("lamp_bright")
            },
            dark: function () { this.elem.removeClass("lamp_bright") }
        };
        var waitOpen = openDoor(config.setTime.openDoorTime);
        waitOpen.then(function () {
            lamp.bright();
            return boyObj.toShop($door, config.setTime.walkToShop)
        }).then(function () {
            return talkFlower()
        }).then(function () {
            return boyObj.outShop(config.setTime.walkOutShop)
        }).then(function () {
            shutDoor(config.setTime.shutDoorTime);
            lamp.dark();
            defer.resolve()
        });
        return defer
    };

    function snowflake() {
        var $flakeContainer = $("#snowflake");

        function getImagesName() {
            return config.snowflakeURl[[Math.floor(Math.random() * 6)]]
        }

        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({ "width": 41, "height": 41, "position": "absolute", "backgroundSize": "cover", "zIndex": 100000, "top": "-41px", "backgroundImage": "url(" + url + ")" }).addClass("snow_roll")
        }
        setInterval(function () {
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity = 1;
            endPositionTop = visualHeight - 40, endPositionLeft = startPositionLeft - 100 + Math.random() * 500, duration = visualHeight * 10 + Math.random() * 5000;
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;
            var $flake = createSnowBox();
            $flake.css({ left: startPositionLeft, opacity: randomStart });
            $flakeContainer.append($flake);
            $flake.transition({ top: endPositionTop, left: endPositionLeft, opacity: 0.7 }, duration, "ease-out", function () { $(this).remove() })
        }, 200)
    }
    /**
     * 创建一个 H5 播放器
     * @param {String} url 路径
     * @param {Boolean} loop 是否循环播放
     */
    function Hmlt5Audio(url, loop) {
        try {
            var audio = new Audio(url);
            audio.autoplay = true;
            audio.loop = loop || false;
            audio.play();
            return {
                end: function (callback) {
                    audio.addEventListener("ended", function () { callback() }, false)
                }
            }
        }catch(e){
            console.error("音频播放失败："+e)
        }
   
    }
};
$(function () { Qixi() });

function Swipe(container, options) {
    var element = container.find(":first");
    var swipe = {};
    var slides = element.find(">");
    var width = container.width();
    var height = container.height();
    element.css({ width: (slides.length * width) + "px", height: height + "px" });
    $.each(slides, function (index) {
        var slide = slides.eq[index];
        slides.eq(index).css({ width: width + "px", height: height + "px" })
    });
    var isComplete = false;
    var timer;
    var callbacks = {};
    container[0].addEventListener("transitionend", function () { isComplete = true }, false);

    function monitorOffet(element) {
        timer = setTimeout(function () {
            if (isComplete) {
                clearInterval(timer);
                return
            }
            callbacks.move(element.offset().left);
            monitorOffet(element)
        }, 500)
    }
    swipe.watch = function (eventName, callback) { callbacks[eventName] = callback };
    swipe.scrollTo = function (x, speed) {
        element.css({ "transition-timing-function": "linear", "transition-duration": speed + "ms", "transform": "translate3d(-" + x + "px,0px,0px)" });
        return this
    };
    return swipe
};
