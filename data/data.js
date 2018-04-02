var gameAllConfig = {
    "name":"whoAppeared",
    "sndBgSrc":"snake_bg.mp3",
    "effectSoundsFile":"snake_game_effect.mp3",
    "effectData":[
        {'duration': 1150, 'id': 'broken', 'startTime': 0},
        {'duration': 4076, 'id': 'countDown', 'startTime': 1650},
        {'duration': 4703, 'id': 'gameover', 'startTime': 6226},
        {'duration': 575, 'id': 'snake_die', 'startTime': 11429},
        {'duration': 392, 'id': 'snake_eat', 'startTime': 12504},
        {'duration': 523, 'id': 'snake_graphical', 'startTime': 13396},
        {'duration': 601, 'id': 'snake_hit', 'startTime': 14419},
        {'duration': 2613, 'id': 'snake_yun', 'startTime': 15520}
    ],
    "loadMainFest":[
        {id:"huhu-out",src:"img/huhu_out.png"},
        {id:"replay-btn",src:"img/btn_replay.png"},
        {id:"home-btn",src:"img/btn_home.png"},
        {id:"snd-btn",src:"img/btn_snd.png"},
        {id:"nosnd-btn",src:"img/btn_nosnd.png"},
        {id:"replay-click",src:"img/replay_click.png"},
        {id:"home-click",src:"img/home_click.png"},
        {id:"pop", src :"img/pop.png"},
        {id:"sure", src:"img/sure.png"},
        {id:"cancle", src :"img/cancle.png"}
    ],
    "loadSprite":function(){
        spritesheets["game-load"] = new createjs.SpriteSheet({
            "images": [load_preload.getResult("huhu-out")],
            "frames": [
                [1, 1, 233, 127, 0, 0, 0],
                [1, 130, 233, 127, 0, 0, 0],
                [1, 259, 233, 127, 0, 0, 0],
                [1, 388, 233, 127, 0, 0, 0],
                [1, 517, 233, 127, 0, 0, 0],
                [1, 646, 233, 127, 0, 0, 0],
                [1, 775, 233, 127, 0, 0, 0],
                [1, 904, 233, 127, 0, 0, 0],
                [1, 1033, 233, 127, 0, 0, 0],
                [1, 1162, 233, 127, 0, 0, 0],
                [1, 1291, 233, 127, 0, 0, 0],
                [1, 1420, 233, 127, 0, 0, 0]
            ],
            "animations": {
                "play": { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],speed:1.4 }
            },
        });
    },
    "loadSpriteInfo":{
        "x":400,
        "y":300
    },
    "rewardPosition":[
        [650,420],//milk
        [540,420],//juice
        [440,420],//mineral
        [430,525],//end_home
        [590,525]//end_replay
    ],
    "whoAppeared_mainfest": [
        {src: "img/game_bg1.jpg", id: "bg1"},
        {src: "img/game_bg2.jpg", id: "bg2"},
        {src: "img/game_bg3.jpg", id: "bg3"},
        {src: "img/game_bg4.jpg", id: "bg4"},
        {src:"img/countDown.png",id:"countDown"},
        {src:"img/door.png",id:"load-door"},
        {src: "img/result.png", id: "result"},
        {src: "img/countDown.png", id: "number"},
        {src: "img/faint.png", id: "faint"},
        {src: "img/home.png", id: "end-home"},
        {src: "img/replay.png", id: "end-replay"},
        {src: "img/pige/pig.png", id: "whoAppeared-pige"},
        {src: "img/pige/pigNo.png", id: "pig-no"},
        {src: "img/pige/pigYes.png", id: "pig-yes"},
        {src: "img/pige/pig.png", id: "pig"},
        {src: "img/pige/pigNo.png", id: "pig-no"},
        {src: "img/pige/pigYes.png", id: "pig-yes"},

        {src: "img/figure/bug.png", id: "bug"},
        {src: "img/figure/car.png", id: "car"},
        {src: "img/figure/dDang.png", id: "dDang"},
        {src: "img/figure/grass.png", id: "grass"},
        {src: "img/figure/doctor.png", id: "doctor"},
        {src: "img/figure/pig.png", id: "pig"},
        {src: "img/figure/cow.png", id: "cow"},
        {src: "img/figure/dog.png", id: "dog"},
        {src: "img/figure/panda.png", id: "panda"},
        {src: "img/figure/rabbit.png", id: "rabbit"},
        {src: "img/figure/sheep.png", id: "sheep"},

        {src: "img/fruit/banana.png", id: "banana"},
        {src: "img/fruit/cherry.png", id: "cherry"},
        {src: "img/fruit/pear.png", id: "pear"},
        {src: "img/fruit/peach.png", id: "peach"},
        {src: "img/fruit/persimmon.png", id: "persimmon"},
        {src: "img/fruit/strawberry.png", id: "strawberry"},
        {src: "img/fruit/watermelon.png", id: "watermelon"},

        {src: "img/xingzhuang/circle.png", id: "circle"},

        {src: "img/xingzhuang/pxsbxing.png", id: "para"},
        {src: "img/xingzhuang/rectangle.png", id: "rectangle"},
        {src: "img/xingzhuang/sector.png", id: "sector"},
        {src: "img/xingzhuang/trap.png", id: "trap"},
        {src: "img/xingzhuang/triangle.png", id: "triangle"},
        {src: "img/xingzhuang/tuoyuan.png", id: "ellipse"}



    ],
    "whoAppeared_spritesheets":function(){
        spritesheets["load-door"] = new createjs.SpriteSheet({
            "images":[images["load-door"]],
            "frames":[
                [1, 1, 1016, 632, 0, 0, 0],
                [1019, 1, 1016, 632, 0, 0, 0],
                [2037, 1, 1016, 632, 0, 0, 0],
                [3055, 1, 1016, 632, 0, 0, 0],
                [4073, 1, 1016, 632, 0, 0, 0],
                [5091, 1, 1016, 632, 0, 0, 0],
                [6109, 1, 1016, 632, 0, 0, 0],
                [7127, 1, 1016, 632, 0, 0, 0],
                [1, 635, 1016, 632, 0, 0, 0],
                [1019, 635, 1016, 632, 0, 0, 0],
                [2037, 635, 1016, 632, 0, 0, 0],
                [3055, 635, 1016, 632, 0, 0, 0],
                [4073, 635, 1016, 632, 0, 0, 0],
                [5091, 635, 1016, 632, 0, 0, 0],
                [6109, 635, 1016, 632, 0, 0, 0],
                [7127, 635, 1016, 632, 0, 0, 0],
                [1, 1269, 1016, 632, 0, 0, 0],
                [1019, 1269, 1016, 632, 0, 0, 0],
                [2037, 1269, 1016, 632, 0, 0, 0],
                [3055, 1269, 1016, 632, 0, 0, 0],
                [4073, 1269, 1016, 632, 0, 0, 0],
                [5091, 1269, 1016, 632, 0, 0, 0],
                [6109, 1269, 1016, 632, 0, 0, 0],
                [7127, 1269, 1016, 632, 0, 0, 0],
                [1, 1903, 1016, 632, 0, 0, 0],
                [1019, 1903, 1016, 632, 0, 0, 0],
                [2037, 1903, 1016, 632, 0, 0, 0],
                [3055, 1903, 1016, 632, 0, 0, 0],
                [4073, 1903, 1016, 632, 0, 0, 0],
                [5091, 1903, 1016, 632, 0, 0, 0],
                [6109, 1903, 1016, 632, 0, 0, 0],
                [7127, 1903, 1016, 632, 0, 0, 0],
                [1, 2537, 1016, 632, 0, 0, 0],
                [1019, 2537, 1016, 632, 0, 0, 0],
                [2037, 2537, 1016, 632, 0, 0, 0],
                [3055, 2537, 1016, 632, 0, 0, 0],
                [4073, 2537, 1016, 632, 0, 0, 0],
                [5091, 2537, 1020, 632, 0, 0, 0]
            ],
            'animations': {
                'play': { 'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37] ,next : false}
            },
        });
        spritesheets["countDown"] = new createjs.SpriteSheet({
            "images":[images["countDown"]],
            "frames": [
                [1, 1, 318, 326, 0, 0, 0],
                [321, 1, 318, 326, 0, 0, 0],
                [641, 1, 318, 326, 0, 0, 0],
                [961, 1, 318, 326, 0, 0, 0],
                [1281, 1, 318, 326, 0, 0, 0],
                [1601, 1, 318, 326, 0, 0, 0],
                [1921, 1, 318, 326, 0, 0, 0],
                [2241, 1, 318, 326, 0, 0, 0],
                [2561, 1, 318, 326, 0, 0, 0],
                [2881, 1, 318, 326, 0, 0, 0],
                [3201, 1, 318, 326, 0, 0, 0],
                [3521, 1, 318, 326, 0, 0, 0],
                [3841, 1, 318, 326, 0, 0, 0],
                [4161, 1, 318, 326, 0, 0, 0],
                [4481, 1, 318, 326, 0, 0, 0],
                [4801, 1, 318, 326, 0, 0, 0],
                [5121, 1, 318, 326, 0, 0, 0],
                [5441, 1, 318, 326, 0, 0, 0],
                [5761, 1, 318, 326, 0, 0, 0],
                [6081, 1, 318, 326, 0, 0, 0],
                [6401, 1, 318, 326, 0, 0, 0],
                [6721, 1, 318, 326, 0, 0, 0],
                [7041, 1, 318, 326, 0, 0, 0],
                [7361, 1, 318, 326, 0, 0, 0],
                [7681, 1, 318, 326, 0, 0, 0],
                [8001, 1, 318, 326, 0, 0, 0],
                [8321, 1, 318, 326, 0, 0, 0],
                [8641, 1, 318, 326, 0, 0, 0],
                [8961, 1, 318, 326, 0, 0, 0],
                [9281, 1, 318, 326, 0, 0, 0],
                [9601, 1, 318, 326, 0, 0, 0],
                [9921, 1, 318, 326, 0, 0, 0],
                [10241, 1, 318, 326, 0, 0, 0],
                [10561, 1, 318, 326, 0, 0, 0],
                [10881, 1, 318, 326, 0, 0, 0],
                [11201, 1, 318, 326, 0, 0, 0],
                [11521, 1, 318, 326, 0, 0, 0],
                [11841, 1, 318, 326, 0, 0, 0],
                [12161, 1, 318, 326, 0, 0, 0],
                [12481, 1, 318, 326, 0, 0, 0],
                [12801, 1, 318, 326, 0, 0, 0],
                [13121, 1, 318, 326, 0, 0, 0],
                [13441, 1, 318, 326, 0, 0, 0],
                [13761, 1, 318, 326, 0, 0, 0],
                [14081, 1, 318, 326, 0, 0, 0]
            ],
            "animations": {
                "play": { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],speed:1.2 }
            },
        });
        spritesheets["pig-no"] = new createjs.SpriteSheet({
            "images": [
                images["pig-no"]
            ],
            "frames": [
                [1, 1, 117, 183, 0, -85, 0],
                [120, 1, 103, 143, 0, -92, -40],
                [120, 146, 103, 131, 0, -92, -52],
                [1, 186, 101, 133, 0, -91, -50],
                [104, 279, 119, 176, 0, -81, -7],
                [1, 321, 101, 133, 0, -92, -49],
                [1, 456, 101, 133, 0, -89, -50],
                [104, 457, 97, 132, 0, -94, -50],
                [104, 457, 97, 132, 0, -92, -50]
            ],
            "animations": {
                "play": {"frames": [0, 4, 1, 3, 7, 5, 8, 6, 2, 5, 8, 6, 2],speed:0.5},
            }
        });
        spritesheets["pig-yes"] = new createjs.SpriteSheet({
            "images": [
                images["pig-yes"]
            ],
            "frames": [
                [1, 1, 264, 181, 0, -19, -39],
                [1, 184, 275, 161, 0, -9, -59],
                [267, 1, 225, 145, 0, 0, -75],
                [1, 347, 148, 131, 0, -30, -89],
                [151, 347, 144, 134, 0, -30, -86],
                [278, 148, 214, 194, 0, 0, -26],
                [297, 344, 144, 134, 0, -30, -86],
                [443, 344, 144, 134, 0, -30, -86],
                [494, 1, 158, 170, 0, -33, -50],
                [494, 173, 144, 117, 0, -29, -103],
                [589, 292, 119, 184, 0, -49, -36],
                [654, 1, 129, 130, 0, -45, -90]
            ],
            "animations": {
                "play": {"frames": [10, 8, 0, 5, 1, 2, 3, 9, 4, 11,6,7], next: false},
            }
        });
    },
    "levels": [{
        sound: "",
        subLevelCount:4,
        background:{
            id:"bg2"
        },
        pigs: [
            {
                "id": "whoAppeared-pige",
                "name": "pige",
            },{
                "id": "whoAppeared-pige",
                "name": "pige"
            }
        ],
        elements: [
            {
                id: "circle",
                type:"bitmap",
                targetScale:0.7,
                label: 2

            },
            {
                id: "ellipse",
                type:"bitmap",
                x: 500,
                y: 400,
                targetScale:0.7,
                label: 1
            },
            {
                id: "para",
                type:"bitmap",
                x: 800,
                y: 460,
                targetScale:0.7,
                label: 0
            },
            {
                id: "rectangle",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.7,
                label: 0
            },
            {
                id: "sector",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.7,
                label: 0
            },
            {
                id: "trap",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.7,
                label: 0
            },
            {
                id: "triangle",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.7,
                label: 0
            }
        ],
        position:[
            {
                "x":50,
                "y":155
            },
            {
                "x":495,
                "y":155
            }

        ],
        grade: "easy",
        levelsTime:3600,
        subBackground:{
            id:"bg1"
        },
        subPosition:[ {
            "x":290,
            "y":155
        }]
    },
        {
        sound: "",
        subLevelCount:4,
        background:{
            id:"bg3"
        },
        position:[
            {
                "x":50,
                "y":95
            },
            {
                "x":495,
                "y":95
            },
            {
                "x":290,
                "y":240
            }

        ],
        elements: [
            {
                id: "banana",
                type:"bitmap",
                x: 200,
                y: 370,
                targetScale:0.8,
                label: 1
            },
            {
                id: "cherry",
                type:"bitmap",
                x: 400,
                y: 400,
                targetScale:0.8,
                label: 0
            },
            {
                id: "peach",
                type:"bitmap",
                x: 600,
                y: 440,
                targetScale:0.8,
                label: 2
            },
            {
                id: "pear",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.8,
                label: 3
            },
            {
                id: "persimmon",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.8,
                label: 3
            },
            {
                id: "strawberry",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.8,
                label: 3
            },
            {
                id: "watermelon",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.8,
                label: 3
            }
        ],
        grade: "normal",
        levelsTime:3600,
       subBackground:{
                id:"bg1"
            },
            subPosition:[ {
                "x":290,
                "y":145
            }]

    },
        {
        sound: "",
        subLevelCount:4,
        background:{
            id:"bg4"
        },
        elements: [
            {
                id: "bug",
                type:"bitmap",

                x: 200,
                y: 370,
                targetScale:0.8,
                label: 1
            },
            {
                id: "car",
                type:"bitmap",
                x: 400,
                y: 400,
                targetScale:0.8,
                label: 0
            },
            {
                id: "dDang",
                type:"bitmap",
                x: 600,
                y: 440,
                targetScale:0.8,
                label: 2
            },
            {
                id: "doctor",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.8,
                label: 3
            },
            {
                id: "grass",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.8,
                label: 3
            },
            {
                id: "pig",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.8,
                label: 3
            },
            {
                id: "robot",
                type:"bitmap",
                x: 800,
                y: 480,
                targetScale:0.8,
                label: 3
            }

        ],
        position:[
            {
                "x":180,
                "y":75
            },
            {
                "x":625,
                "y":75
            },
            {
                "x":-60,
                "y":260
            },
            {
                "x":405,
                "y":260
            }

        ],
        grade: "difficult",
        levelsTime:3600,
            subBackground:{
            id:"bg1"
        },
            subPosition:[ {
                "x":290,
                "y":155
            }]
    }]
}