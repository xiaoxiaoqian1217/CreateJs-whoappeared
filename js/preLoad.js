var stage, game_current, canvas;
var replayBtn = null, homeBtn = null, sndBtn, nosndBtn, replayBtn_click, homeBtn_click, current_level = 0, current_answerIndex = 0, gradeTime = 0,
  loadEffectSound = false, gameTime = 0, gameTimer = null, gameScore = 0, reward = {}, totalTime = 60, totalTimeText = null;
canvas = document.getElementById("gameCanvas");
stage = new createjs.Stage(canvas);
stage.setBounds(0, 0, canvas.width, canvas.height);
var gameName = null, gameManifest, function_prepWorld = null;
var spritesheets = new Array();

game_current = new createjs.Container();
stage.addChild(game_current);
var allSounds = {
  sndUrl: "sounds/",
  sndBgId: "soundBg",
  sndBgSrc: "snake_bg.mp3",
  sndBgInstance: null,//游戏背景音函数
  effectSoundInstance: null,//游戏音效函数
  effectSoundsId: "effectSound",
  effectSoundsFile: gameAllConfig.effectSoundsFile,//游戏音效文件,
  effectData: gameAllConfig.effectSoundsFile,
  isMute: false
}

createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
createjs.Touch.enable(stage, true, false);
createjs.Ticker.setFPS(15);

var load_preload = new createjs.LoadQueue(false);
var main_preload = new createjs.LoadQueue(false);
createjs.Ticker.addEventListener("tick", main_ticker);

//一些静态文件
var images = [];
var loadAnimation = null;

function addSoundsEffect() {
  createjs.HTMLAudioPlugin.enableIOS = true;
  var sounds = [
    {
      id: allSounds.sndBgId,
      src: allSounds.sndBgSrc
    },
    {
      src: allSounds.effectSoundsFile,
      data: {
        audioSprite: allSounds.effectData
      }
    }
  ]

  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.addEventListener("fileload", function (o) {
      if(isIOS()){
          allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.2});
      }
  });
    createjs.Sound.registerSounds(sounds, allSounds.sndUrl);  // register sounds, which preloads by default
}

function playBgSound() {
  allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.2});
}

function stopBgSound() {
  allSounds.sndBgInstance.stop();
}

function playEffectSound(id, callback) {
  if (allSounds.effectSoundInstance) {
    allSounds.effectSoundInstance.stop();
  }
  allSounds.effectSoundInstance = createjs.Sound.play(id);
  if (callback) {
    allSounds.effectSoundInstance.addEventListener("complete", callback);
  }
}

function muteBgSound() {
  if (allSounds.isMute) {
    nosndBtn.visible = false;
    sndBtn.visible = true;
    playBgSound();
  } else {
    nosndBtn.visible = true;
    sndBtn.visible = false;
    stopBgSound();
  }
  allSounds.isMute = !allSounds.isMute;
}

load_preload.addEventListener("complete", handleMainLoad);
load_preload.loadManifest(gameAllConfig.loadMainFest);

function handleMainLoad() {
    addSoundsEffect();
    gameName = "whoAppeared";
    gameManifest = gameAllConfig[gameName+ "_mainfest"];
    gameAllConfig.loadSprite();

    gameLevels = gameAllConfig["levels"];
    document.getElementById("coverImg").style.zIndex = -2;
    document.getElementById("gameCanvas").style.zIndex = 100;

    loadAnimation = new createjs.Sprite(spritesheets["game-load"],"play");
    if(gameAllConfig.loadSpriteInfo){
        var info = gameAllConfig.loadSpriteInfo;
        if(info.x)loadAnimation.x = info.x;
        if(info.y)loadAnimation.y = info.y;
        if(info.scaleX)loadAnimation.scaleX = info.scaleX;
        if(info.scaleY)loadAnimation.scaleY = info.scaleY;
    }
    stage.addChild(loadAnimation);
  //重玩按钮
  // replayBtn = new createjs.Bitmap(load_preload.getResult("replay-btn"));
  // replayBtn.visible = true;
  // replayBtn.regX = replayBtn.image.width / 2;
  // replayBtn.regY = replayBtn.image.height / 2;
  // replayBtn.x = 830;
  // replayBtn.y = 50;
  // replayBtn.addEventListener("click", function () {
  //   gameReplay();
  //   replayBtn_click.visible = true;
  //   createjs.Tween.get(this)
  //     .call(function () {
  //       replayBtn.visible = false;
  //       replayBtn_click.visible = true;
  //     })
  //     .wait(500)
  //     .call(function () {
  //       replayBtn.visible = true;
  //       replayBtn_click.visible = false;
  //     })
  // })
  //
  // replayBtn_click = new createjs.Bitmap(load_preload.getResult("replay-click"));
  // replayBtn_click.visible = false;
  // replayBtn_click.regX = replayBtn_click.image.width / 2;
  // replayBtn_click.regY = replayBtn_click.image.height / 2;
  // replayBtn_click.x = 830;
  // replayBtn_click.y = 50;

  //返回主页
  homeBtn = new createjs.Bitmap(load_preload.getResult("home-btn"));
  homeBtn.visible = true;
  homeBtn.regX = homeBtn.image.width / 2;
  homeBtn.regY = homeBtn.image.height / 2;
  homeBtn.x = 970;
  homeBtn.y = 50;
  homeBtn.addEventListener("click", function () {
    homeBtn.visible = true;
    createjs.Tween.get(this)
      .call(function () {
        homeBtn.visible = false;
        homeBtn_click.visible = true;
      })
      .wait(500)
      .call(function () {
        homeBtn.visible = true;
        homeBtn_click.visible = false;
        // location = "www.baidu.com";
        // console.log("主页")
      })
  })

  homeBtn_click = new createjs.Bitmap(load_preload.getResult("home-click"));
  homeBtn_click.visible = false;
  homeBtn_click.regX = homeBtn_click.image.width / 2;
  homeBtn_click.regY = homeBtn_click.image.height / 2;
  homeBtn_click.x = 970;
  homeBtn_click.y = 50;

  //背景音乐按钮
  sndBtn = new createjs.Bitmap(load_preload.getResult("snd-btn"));
  sndBtn.regX = sndBtn.getBounds().width / 2;
  sndBtn.regY = sndBtn.getBounds().height / 2;
  sndBtn.x = 900;
  sndBtn.y = 50;
  sndBtn.addEventListener("click", muteBgSound)

  nosndBtn = new createjs.Bitmap(load_preload.getResult("nosnd-btn"));
  nosndBtn.visible = false;
  nosndBtn.regX = nosndBtn.getBounds().width / 2;
  nosndBtn.regY = nosndBtn.getBounds().height / 2;
  nosndBtn.x = 900;
  nosndBtn.y = 50;
  nosndBtn.addEventListener("click", muteBgSound);

  main_preload.addEventListener("fileload", handleFileLoad);
  main_preload.addEventListener("complete", handleComplete);
  main_preload.loadManifest(gameManifest);

}

function handleFileLoad(o) {
  //加载图片等静态文件资源
  if (o.item.type == createjs.LoadQueue.IMAGE) {
    images[o.item.id] = o.result;
    images.push(o.result);
    images[images.length - 1].id = o.item.id;
  }
}

function handleComplete() {
  document.getElementById("coverImg").style.display = "none";
  if (!isIOS()) {
    playBgSound();
  }
  gameSprites();

  stage.addChild(sndBtn);
  stage.addChild(nosndBtn)
  // stage.addChild(replayBtn);
  stage.addChild(homeBtn);
  // stage.addChild(replayBtn_click);
  stage.addChild(homeBtn_click);
  // stage.setChildIndex(replayBtn, stage.children.length - 1);
  stage.setChildIndex(homeBtn, stage.children.length - 1);

  function_prepWorld = "game_" + gameName;
  mainWorld();
}

function main_ticker() {
  stage.update();
}

function mainWorld() {
  game_current.removeAllChildren();
  if (typeof(window[function_prepWorld]) === "function") window[function_prepWorld]();
}

//加载loading 同时执行init
function handleLoadSprite(spriteSheet, callback) {
  var sprite = new createjs.Sprite(spritesheets[spriteSheet], "play");
  var spriteBounds = sprite.getBounds();
  sprite.regX = spriteBounds.width / 2;
  sprite.regY = spriteBounds.height / 2;
  sprite.scaleX = canvas.width / spriteBounds.width;
  sprite.scaleY = canvas.height / spriteBounds.height;
  sprite.x = canvas.width / 2;
  sprite.y = canvas.height / 2;
    game_current.addChild(sprite);
    game_current.setChildIndex(sprite,game_current.children.length - 1);

    sprite.addEventListener("animationend",function(){
        if (callback) {
            callback();
        }
        game_current.removeChild(this);
    })
}

//切关的动画
function switchAnimation(spritesheet, callback) {
  if (callback) {
    callback();
  }
  if (spritesheet) {
    var animate = new createjs.Sprite(spritesheet, "play");
    animate.scaleX = stage.canvas.width / animate.getBounds().width;
    animate.scaleY = stage.canvas.height / animate.getBounds().height;
    game_current.addChild(animate);
    animate.addEventListener("animationend", function () {
      game_current.removeChild(this);
    })
  }
}

//创建mask
function createMask() {
  var mask = new createjs.Shape();
  mask.graphics.beginFill("#000000").drawRect(0, 0, canvas.width, canvas.height)
  mask.alpha = 0.5;
  game_current.addChild(mask);
  game_current.setChildIndex(mask, game_current.children.length - 1);
  game_current.mask = mask;
  stage.update();
}

//重玩
function gameReplay() {
  mainWorld();
}

function isIOS() {
  var UA = navigator.userAgent;
  if (UA.match(/iPad/i) || UA.match(/iPhone/i) || UA.match(/iPod/i)) {
    return true;
  } else {
    return false;
  }
}

//所有动图
function gameSprites() {
    if(typeof(gameAllConfig[gameName+"_spritesheets"]) == "function"){
        gameAllConfig[ gameName+"_spritesheets"]();
    }
}
function gotoHome(url){
    createjs.Ticker.removeEventListener("tick",main_ticker);
    if(game_current.getChildByName("maskContainer")){
        game_current.removeChild(game_current.getChildByName("maskContainer"))
    }
    var container = new createjs.Container();
    container.name = "maskContainer";
    game_current.addChild(container);
    var  mask = new createjs.Shape();
    mask.graphics.beginFill("#000000").drawRect(0,0,canvas.width,canvas.height)
    mask.alpha = 0.5;
    container.addChild(mask);


    var pop = new createjs.Bitmap(load_preload.getResult("pop"));
    pop.regX = pop.image.width / 2;
    pop.regY = pop.image.height / 2;
    pop.x = canvas.width / 2;
    pop.y = canvas.height / 2;

    var sure = new createjs.Bitmap(load_preload.getResult("sure"));
    sure.x = 450;
    sure.y = 350;
    sure.addEventListener("click",function(){
        // console.log("返回主页")
        window.location.href = "http://dodobaike.com"+url;
    })

    var cancle = new createjs.Bitmap(load_preload.getResult("cancle"));
    cancle.x = 640;
    cancle.y = 210;
    cancle.addEventListener("click",function(){
        game_current.removeChild(container);
        createjs.Ticker.addEventListener("tick",main_ticker);
        createjs.Ticker.addEventListener("tick", tick);
    })
    container.addChild(pop,sure,cancle);
    stage.update();
}
//重玩
function gameReplay(){
    mainWorld();
    replayScore();
}
//设置时间
function setTimeData() {
    clearInterval(timer);
    var timer = setInterval(function () {
        everyGameTime.second++;
        if (everyGameTime.second > 59) {
            everyGameTime.second = 0;
            everyGameTime.minute++;
        }
        if (everyGameTime.minute > 59) {
            everyGameTime.minute = 0;
            everyGameTime.hour++;
        }
    }, 1000);
}

// 获取每关时间
function getTimeDate() {
    return copy(everyGameTime);
}

// 1级赋值
function copy(obj) {
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

// 积分
function recordScore(score) {
    var time = getTimeDate();
    gameScores["id"] = getQueryString("id");
    if (gameScores) {
        gameScores["score"] = score;
        gameScores["time"] = time.hour * 60 * 60 + time.minute * 60 + time.second;
        gameScores["id"] = getQueryString("id");
    } else {
        gameScores["score"] = score;
        gameScores["time"] = time.hour * 60 * 60 + time.minute * 60 + time.second;
    }
}
// 清除积分
function replayScore() {
    if (gameScores) {
        gameScores["score"] = 0;
        gameScores["time"] = 0;
    }
    everyGameTime = {hour: 0, minute: 0, second: 0};
}

//向服务器传送数据
function toServerData(scoreData){
    if(scoreData){
        if(scoreData.score > 100){
            scoreData.score = 100;
        }
        $.ajax({
            type:"POST",
            url:"/learning/create_game_record/",
            data:scoreData,
            success:function(result){
                if(result.success){
                    console.log("data to server success");
                    reward.url = result.redirect_url;
                    reward.waterList = result.waterList;
                    show.gameReward(gameOverAnimation,reward,gameAllConfig.rewardPosition)
                }
            }
        })
    }
}

//获取游戏ID
function getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


var show = {
    //游戏分数,计时,内容显示
    gameBg:function(bitmap){
        var gameBg = new createjs.Bitmap(images[bitmap]);
        gameBg.scaleX = canvas.width / gameBg.image.width ;
        gameBg.scaleY = canvas.height / gameBg.image.height ;
        gameBg.cache(0,0,gameBg.image.width,gameBg.image.height);
        game_current.addChild(gameBg);
    },
    gameScore:function(bitmap,x,y){
        var scoreBlank = new createjs.Bitmap(images[bitmap]);
        scoreBlank.regX = scoreBlank.image.width / 2 ;
        scoreBlank.regY = scoreBlank.image.height / 2;
        // scoreBlank.x = 700;scoreBlank.y = 35;
        scoreBlank.x = x;scoreBlank.y = y;
        scoreBlank.cache(0,0,scoreBlank.image.width,scoreBlank.image.height);
        game_current.addChild(scoreBlank);
    },
    gameTime:function(bitmap,x,y){
        var timeBlank = new createjs.Bitmap(images[bitmap]);
        timeBlank.regX = timeBlank.image.width / 2 ;
        timeBlank.regY = timeBlank.image.height / 2;
        timeBlank.x = x;timeBlank.y = y;
        timeBlank.cache(0,0,timeBlank.image.width,timeBlank.image.height);
        game_current.addChild(timeBlank);
    },
    gameContent:function(bitmap,x,y){
        var content = new createjs.Bitmap(images[bitmap]);
        content.regX = content.image.width / 2 ;
        content.regY = content.image.height / 2;
        content.x = x;content.y = y;
        content.cache(0,0,content.image.width,content.image.height);
        game_current.addChild(content);
    },
    //游戏奖励 —— 水 和 按钮
    gameReward:function(gameCallBack,data,position,fontSize,fontColor){
        if(gameCallBack)gameCallBack();
        if(!fontSize) fontSize = 36;
        if(!fontColor)fontColor = "#ffffff";
        var milk = new createjs.Text("0",fontSize+"px katong",fontColor);
        var juice = new createjs.Text("0",fontSize+"px katong",fontColor);
        var mineral = new createjs.Text("0",fontSize+"px katong",fontColor);
        milk.textBaseline = "top";
        milk.textAlign = "center";
        juice.textBaseline = "top";
        juice.textAlign = "center";
        mineral.textBaseline = "top";
        mineral.textAlign = "center";
        /*    milk.x = 650;milk.y = 420;
            juice.x = 540;juice.y = 420;
            mineral.x = 440;mineral.y = 420;*/

        if(data){
            var my_waterObj = {
                "milk":{"count":0},
                "juice":{"count":0},
                "mineral":{"count":0}
            }
            for(var i = 0; i < data.waterList.length;i++){
                var water = data.waterList[i];
                my_waterObj[water.type].count = water.count;
            }
            mineral.text = my_waterObj["mineral"].count.toString();
            milk.text = my_waterObj["milk"].count.toString();
            juice.text = my_waterObj["juice"].count.toString();
        }

        var end_home = new createjs.Bitmap(images["end_home"]);
        end_home.regX = end_home.image.width / 2;
        end_home.regY = end_home.image.height / 2;
        // end_home.x = 430,end_home.y = 525;
        end_home.addEventListener("click",function(){
            gotoHome(data.url)
        })
        var end_replay = new createjs.Bitmap(images["end_replay"]);
        end_replay.regX = end_replay.image.width / 2;
        end_replay.regY = end_replay.image.height / 2;
        // end_replay.x = 590,end_replay.y = 525;
        end_replay.addEventListener("click",gameReplay)

        if(position){
            milk.x = position[0][0];milk.y = position[0][1];
            juice.x = position[1][0];juice.y = position[1][1];
            mineral.x = position[2][0];mineral.y = position[2][1];
            end_home.x = position[3][0],end_home.y = position[3][1];
            end_replay.x = position[4][0],end_replay.y = position[4][1];
        }

        game_current.addChild(mineral);
        game_current.addChild(juice);
        game_current.addChild(milk);
        game_current.addChild(end_home,end_replay);
    }
}

var FPS = {};
FPS.time = 0;
FPS.FPS = 0;
FPS.showText = "ct:";
FPS.startFPS = function (stage){
    FPS.shape = new createjs.Shape();
    FPS.shape.graphics.beginFill("#8EE5EE").drawRect(0, 0, 200, 70);
    FPS.txt = new createjs.Text("", "30px Arial", "#000");
    FPS.container = new createjs.Container();
    stage.addChild(FPS.container);
    FPS.container.addChild(FPS.shape)
    FPS.container.addChild(FPS.txt);
    FPS.container.cache(0,0, 200,70);
    createjs.Ticker.addEventListener("tick", FPS.TickerFPS);
//    setInterval(FPS.TickerFPS,18)
}
FPS.TickerFPS = function (event)
{
    FPS.date = new Date();
    FPS.currentTime = FPS.date.getTime();
    if(FPS.time!=0)
    {
        FPS.FPS = Math.ceil(1000/(FPS.currentTime -  FPS.time));
    }
    FPS.time = FPS.currentTime;
    FPS.txt.text = "FPS: "+FPS.FPS + "\n" + FPS.showText;
    FPS.container.cache(0,0, 200,70);
}
FPS.startFPS2 = function (stage)
{
    FPS.txt = document.getElementById("fps");
    createjs.Ticker.addEventListener("tick", FPS.TickerFPS2);
}
FPS.TickerFPS2 = function (event)
{
    FPS.date = new Date();
    FPS.currentTime = FPS.date.getTime();
    if(FPS.time!=0)
    {
        FPS.FPS = Math.ceil(1000/(FPS.currentTime -  FPS.time));
    }
    FPS.time = FPS.currentTime;
    FPS.txt.innerText = "FPS: "+FPS.FPS;
}
