var current_level =0,  levels = null,subLevelCount= null,flag=false,a_Elements=[],appeared=[], totalTimeText=null,countTimer=null;
var activeCons=null;
var gameTime={
    totalUsedTime:0,
    everyLevelTime:60,
    currentTime:60,
    minutes:null,
    seconds:null
}; //

function game_whoAppeared() {
    current_level=0,levels = null,subLevelCount= null,flag=false,a_Elements=[],appeared=[], totalTimeText=null,countTimer=null;
   gameTime={
        totalUsedTime:0,
        everyLevelTime:60,
        currentTime:60,
        minutes:null,
        seconds:null
    }; //

    game_current.removeAllChildren();
    createjs.Ticker.removeEventListener("tick", main_ticker);
    createjs.Ticker.addEventListener("tick", whoAppeared_tick);
    stage.removeChild(loadAnimation);
    homeBtn.visible = true;
    sndBtn.visible = true;
    // replayBtn.visible = true;
    handleLoadSprite("load-door", countDown);

    function countDown() {
        handleCountDown(function () {
            whoAppeared_init();
            // beginMove()
            countTime();

        });
        playEffectSound("countDown");
        // clearTimeout(timeOut);
    }

}
//
function whoAppeared_init(subelements) {

    game_current.removeAllChildren();
    //执行whoAppeared_init传参表示的是大关中小关的初始化，不传表示大关初始化
    levels = gameAllConfig["levels"];
    var elements,bg,position;
     activeCons =[];
    if(subelements) {
        a_Elements=subelements;
    }else
        {
            elements=levels[current_level]["elements"];
            for (var i = 0; i < elements.length; i++) {
            if (elements[i].type == "bitmap") {
                var element = new createjs.Bitmap(images[elements[i].id]);
                element.index=i;
                if(elements[i].targetScale) element.scaleX=element.scaleY=elements[i].targetScale;
                a_Elements.push(element);
                //add prop 区别
                // 　appearedFlag和出现过的元素
            }
        };
    }
    var hitPigCon=new createjs.Container();
    //区别第一次初始化和其他初始化，第一个小关不绑定事件
    var bgid= levels[current_level]["background"].id;
    var subBgId=levels[current_level]["subBackground"].id;

    var count=levels[current_level]["subLevelCount"];
    var pigs = levels[current_level]["pigs"];

    if(subLevelCount<=0||!subLevelCount){
        totalTimeText = new createjs.Text("01:00", "30px katong", "#3c3c3c");
        totalTimeText.x = 470;
        totalTimeText.y = 10;
    }
    if(!flag){
         bg=new createjs.Bitmap(images[subBgId]);
        position=levels[current_level]["subPosition"];

    }else{
       bg = new createjs.Bitmap(images[bgid]);
       position = levels[current_level]["position"];
    }

    game_current.addChild(bg, totalTimeText);
    //保存createjs 类产生的元素,appearedFlag表示上一关卡出现过的元素


    if(!flag){
        //ranIdx是一个随机索引的数组，给选中的三个索引
        var ranIdx=getAppearedEle(a_Elements,1);
        //appearedIdx
        for(var appearedIdx=0;appearedIdx<ranIdx.length;appearedIdx++){
            var a_Ele=a_Elements[ranIdx[appearedIdx]];
            a_Ele.appearedFlag=true;
            appeared.push(a_Ele);
        }


    }else{
        //返回的索引数组中一定有一个上一关出现的元素的索引
        var ranIdx=getAppearedEle(a_Elements,position.length,appeared);
        appeared=[];
        for(var appearedIdx=0;appearedIdx<ranIdx.length;appearedIdx++){
            for(var i=0;i<a_Elements.length;i++){
                if(ranIdx[appearedIdx]==a_Elements[i].index){
                    var a_Ele=a_Elements[i];
                    appeared.push(a_Ele);
                    break
                }
            }
        }

    }

    for (var i = 0; i < position.length; i++) {
        var stacticCon = new createjs.Container();
        var activeCon = new createjs.Container();
        var acitivePig = new createjs.Bitmap(images["whoAppeared-pige"]);
       var aEle=appeared[i];
        //设置mask
        var _x = position[i].x + 150;
        var _y = position[i].y + 45;
        var _w = 150;
        var _h = 195;
        var bmpMask = new createjs.Shape();
        bmpMask.graphics.beginStroke("blue")
            .moveTo(_x, _y)
            .lineTo(_x, _y + _h)
            .bezierCurveTo(_x, _y + _h + 90, _x + _w, _y + _h + 90, _x + _w, _y + _h)
            .lineTo(_x + _w, _y)
            .lineTo(_x, _y);
        activeCon.y=250;
        activeCon.addChild(acitivePig);
        var activeCon_bounds=activeCon.getBounds();
        var aEle_bounds= aEle.getBounds();
        activeCon.addChild(aEle);
        aEle.regX=aEle_bounds.width/2;
        aEle.regY=aEle_bounds.height/2;
        aEle.x=(activeCon_bounds.width-aEle_bounds.width)/2+aEle_bounds.width/2;
        aEle.y=100;
        stacticCon.x=position[i].x;
        stacticCon.y=position[i].y;

        activeCon.parent=stacticCon;
        stacticCon.addChild(activeCon);
        stacticCon.mask = bmpMask;
        activeCons.push(activeCon);
        hitPigCon.addChild(stacticCon);
        game_current.addChild(hitPigCon);
    }




   //第一关不绑定任何事件
    if(subLevelCount&&subLevelCount<count){
        for(var idx=0;idx<activeCons.length;idx++)
        activeCons[idx].addEventListener("click",hitPig.bind(activeCons[idx]));
        subLevelCount--;
    }
    else {
        //firstLevel每400秒执行一次，可以保证它在洞里的时候才改变元素
        var timer=setTimeout(function () {
            clearTimeout(timer);
            flag=true;
            var firstLevel=setInterval(function () {
                for(var i=0;i<activeCons.length;i++){
                    if(activeCons[i].isAnimated){
                        clearInterval(firstLevel);
                        subLevelCount=count;
                        subLevelCount--;
                        whoAppeared_init(a_Elements);
                        break;
                    }
                }
            },100);

        },10000);
    }
    beginMove(activeCons);

}
function beginMove(activeCons) {

    for (var i = 0; i < activeCons.length; i++) {
        createjs.Tween.get(activeCons[i], {loop: true}).wait(200)
            .to({x: 0, y: 0}, 2000, createjs.Ease.sineOut)
            .wait(400)
            .to({x: 0, y: 250}, 1000 , createjs.Ease.sineOut)
            .call(function () {
                this.isAnimated=true;
            })
    }
}
function hitPig() {
        if(this.children[1]["appearedFlag"]){
            var pigYes=new createjs.Sprite(spritesheets["pig-yes"],"play");
            pigYes.x=100;
            pigYes.y=80;
            var _parent=this.parent;
            _parent.addChild(pigYes);
            _parent.removeChild(this);
            var appearFlagIdx=this.children[1].index;
            console.log(appearFlagIdx);
            var arr=[];
            for(var j=0;j<appeared.length;j++){
                arr.push(appeared[j].index)

            }
            pigYes.addEventListener("animationend",function () {
                var hitEnd=new  createjs.Bitmap(images["faint"]);
                _parent.removeChild(pigYes);
                _parent.addChild(hitEnd);
                hitEnd.x=130;
                hitEnd.y=190;
                var isSelected=false;
                for(var i=0;i< a_Elements.length;i++){
                    if(a_Elements[i].index==appearFlagIdx){
                        a_Elements.splice(i,1);
                        i--;
                        continue;
                    }
                    if(arr.indexOf(a_Elements[i].index)!=-1&&!isSelected){
                        a_Elements[i].appearedFlag=true;
                        isSelected=true;
                        continue;

                    }


                }
                if(subLevelCount==0&&current_level<levels.length-1){
                    //等级切换
                    var waitTime=setTimeout(function () {
                        clearTimeout(waitTime);
                        current_level++;
                        flag=false;
                        a_Elements=[];
                        appeared=[];
                        clearInterval(countTimer);
                        gameTime.currentTime=gameTime.everyLevelTime;
                        for(var i=0;i<activeCons.length;i++){
                            createjs.Tween.removeTweens(activeCons[i]);
                        }
                         handleCountDown(function () {
                             whoAppeared_init();
                             countTime();
                       });
                    },2000)

                }
                else if(current_level==levels.length-1){
                    clearInterval(countTimer);
                    var waitTime=setTimeout(function () {
                        clearTimeout(waitTime);
                        toServerData({
                            time: gameTime.totalUsedTime,
                            score: gameScore
                        });
                    },2000)

                }else
                  {
                      clearInterval(countTimer);
                      var subWaitTime=setTimeout(function () {
                          clearTimeout(subWaitTime);
                          whoAppeared_init(a_Elements);
                      },1000);
                }

            });
        }else
            {
            var pigNo=new createjs.Sprite(spritesheets["pig-no"],"play");
            pigNo.x=85;
            pigNo.y=80;
            var _actionCon=this;
                var _parent=this.parent;
                _parent.addChild(pigNo);
                _parent.removeChild(this);

            pigNo.addEventListener("animationend",function () {
                _parent.removeChild(pigNo);
                _parent.addChild(_actionCon);
                clearInterval(countTimer);
                 toServerData({
                    time: gameTime.totalUsedTime,
                    score: gameScore
                });

            });

        }

}
function getAppearedEle(aElement,count,visited) {
   var appeared=[];
    if(!visited){
        var arr=[];
        for(var j=0;j<aElement.length;j++){
            arr.push(aElement[j].index)

        }
        appeared=getRandomArray(arr,count);
    } else{
        var forCount=count-1;
        var arr=[];
        for(var j=0;j<visited.length;j++){
            arr.push(visited[j].index)

        }
        for(var i=0;i<aElement.length;i++){
            if(aElement[i].appearedFlag) appeared.push(aElement[i].index);
            if(arr.indexOf(aElement[i].index)==-1&&forCount>0){
                appeared.push(aElement[i].index);
                  forCount--;
            }
        }
        appeared=getRandomArray(appeared,count);
    }
    //返回出现元素的索引
    return appeared
}
function getRandomArray(arr,count) {
    var appeared=arr.slice(0);
    var i = arr.length, min = i - count, temp, index;
    while (i-- > min ) {
        index = Math.floor((i + 1) * Math.random());
        temp = appeared[index];
        appeared[index] = appeared[i];
        appeared[i] = temp;
    }
    appeared=appeared.slice(min);
    return appeared;
}

function elementRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min)
}
function  countTime() {
      countTimer = setInterval(function () {
        if ( gameTime.currentTime> 0) {
            gameTime.currentTime--;
            gameTime.minutes = Math.floor( gameTime.currentTime/ 60);
            gameTime.seconds = Math.floor( gameTime.currentTime % 60);
            if(gameTime.minutes<10){
                if(gameTime.seconds<10){
                    gameTime.seconds="0"+gameTime.seconds;
                }
                totalTimeText.text="0"+gameTime.minutes+":"+gameTime.seconds;
            }
            gameTime.totalUsedTime++;

        } else{
            clearInterval(countTimer);
            toServerData({
                time: gameTime.totalUsedTime,
                score: gameScore
            });

        }
    }, 1000);



}

function whoAppeared_tick() {
    stage.update();
}

//倒计时
function handleCountDown(callback) {
    //
    var container = new createjs.Container();
    game_current.addChild(container);
    var mask = new createjs.Shape();
    mask.graphics.beginFill("#EEF0DC").drawRect(0, 0, canvas.width, canvas.height);
    mask.alpha = 0.5;
    game_current.addChild(mask);
    var countDown_number = new createjs.Sprite(spritesheets["countDown"], "play");
    countDown_number.regX = countDown_number.getBounds().width / 2;
    countDown_number.regY = countDown_number.getBounds().height / 2;
    countDown_number.x = canvas.width / 2;
    countDown_number.y = 300;
    container.addChild(mask, countDown_number);
    countDown_number.addEventListener("animationend", function () {
        game_current.removeChild(container);
        if (callback && typeof callback == "function") {
            callback();
        }
    })
}

//向服务器传送数据
function toServerData(data) {
    if (data) {
        // var gameData = JSON.stringify(data)
        var gameData = data;
        console.log(gameData);
        $.ajax({
            type: "POST",
            url: "/learning/create_game_record/",
            data: gameData,
            success: function (result) {
                if (result.success) {
                    console.log("data to server success");
                    reward.url = result.redirect_url;
                    reward.waterList = result.waterList;
                    replay(reward)
                }
            },
            error: function () {
                console.log("data to server fail");
                reward.url = "http://baidu.com";
                reward.waterList = [{
                    type: "milk",
                    count: 1
                }, {
                    type: "juice",
                    count: 2
                }, {
                    type: "mineral",
                    count: 5
                }];
                replay(reward)
            }
        })
    }
}

//每人自定义一个暂停、重玩、返回主页的一个函数
function replay(data) {
    //重完时停止所有动画
    for(var i=0;i<activeCons.length;i++){
        createjs.Tween.removeTweens(activeCons[i]);
    }
    homeBtn.visible = false;
    sndBtn.visible = false;
//     replayBtn.visible = false;
    var mask = new createjs.Shape();
    mask.graphics.beginFill("#EEF0DC").drawRect(0, 0, canvas.width, canvas.height);
    mask.alpha = 0.5;
    mask.name = "endMask";
    game_current.addChild(mask);
    var endContainer = new createjs.Container();
    endContainer.x = canvas.width / 2;
    endContainer.y = -(canvas.height / 2);
    game_current.addChild(endContainer);

    var result = new createjs.Bitmap(images["result"]);
    result.regX = result.getBounds().width / 2;
    result.regY = result.getBounds().height / 2;
    result.x = 0;
    result.y = 0;
    endContainer.addChild(result);
   var usedMinutes=  Math.floor( gameTime.totalUsedTime/ 60);
   var usedSeconds=Math.floor( gameTime.totalUsedTime % 60);
    var endTime = new createjs.Text("总用时: " + usedMinutes+ " 分"+usedSeconds+" 秒","24px katong", "#3c3c3c");
    endTime.regX = endTime.getBounds().width / 2;
    endTime.regY = endTime.getBounds().height / 2;
    endTime.x = 0;
    endTime.y = -105;
    endContainer.addChild(endTime);

    var replay = new createjs.Bitmap(images["end-replay"]);
    replay.regX = replay.getBounds().width / 2;
    replay.regY = replay.getBounds().height / 2;
    replay.x = 60;
    replay.y = 70;
    endContainer.addChild(replay);
    replay.addEventListener("click", function () {
        gameReplay();
    })
    var home = new createjs.Bitmap(images["end-home"]);
    home.regX = home.getBounds().width / 2;
    home.regY = home.getBounds().height / 2;
    home.x = -55;
    home.y = 70;
    endContainer.addChild(home);

    if (data) {
        var milk = new createjs.Text("0", "36px katong", "#3c3c3c");
        var juice = new createjs.Text("0", "36px katong", "#3c3c3c");
        var mineral = new createjs.Text("0", "36px katong", "#3c3c3c");
        milk.textBaseline = "top";
        milk.textAlign = "center";
        juice.textBaseline = "top";
        juice.textAlign = "center";
        mineral.textBaseline = "top";
        mineral.textAlign = "center";
        milk.x = 160;
        milk.y = -20;
        juice.x = 40;
        juice.y = -20;
        mineral.x = -80;
        mineral.y = -20;
        var my_waterObj = {
            "milk": {"count": 0},
            "juice": {"count": 0},
            "mineral": {"count": 0}
        }
        for (var i = 0; i < data.waterList.length; i++) {
            var water = data.waterList[i];
            my_waterObj[water.type].count = water.count;
        }
        mineral.text = my_waterObj["mineral"].count.toString();
        milk.text = my_waterObj["milk"].count.toString();
        juice.text = my_waterObj["juice"].count.toString();
        endContainer.addChild(mineral);
        endContainer.addChild(juice);
        endContainer.addChild(milk);

        home.addEventListener("click", function () {
            gotoHome(data.url);
        })
    }

    createjs.Tween.get(endContainer)
        .to({y: canvas.height / 2}, 3000, createjs.Ease.bounceOut)
}

function gotoHome(url) {
    var container = new createjs.Container();
    game_current.addChild(container);
    var mask = new createjs.Shape();
    mask.graphics.beginFill("#000000").drawRect(0, 0, canvas.width, canvas.height);
    mask.alpha = 0.5;
    container.addChild(mask);
    createjs.Ticker.removeEventListener("tick", main_ticker);

    var pop = new createjs.Bitmap(images["pop"]);
    pop.regX = pop.image.width / 2;
    pop.regY = pop.image.height / 2;
    pop.x = canvas.width / 2;
    pop.y = canvas.height / 2;

    var sure = new createjs.Bitmap(images["sure"]);
    sure.x = 450;
    sure.y = 350;
    sure.addEventListener("click", function () {
        window.location.href = "http://dodobaike.com" + url;
    })

    var cancle = new createjs.Bitmap(images["cancle"]);
    cancle.x = 640;
    cancle.y = 210;
    cancle.addEventListener("click", function () {
        game_current.removeChild(container);
        createjs.Ticker.addEventListener("tick", main_ticker);
        createjs.Ticker.addEventListener("tick", tick);
    })
    container.addChild(pop, sure, cancle);
    stage.update();
}

//重玩
function gameReplay() {
    mainWorld();
}


