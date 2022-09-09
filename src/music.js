const musics=[
    {songData:[{i:[2,53,128,0,3,127,128,0,0,0,0,32,0,0,0,0,0,195,6,0,2,88,0,0,32,0,4,16,2],p:[1,2],c:[{n:[123,,,,127,,118,,,,127,,,,123,,,,123,,,,127,,118,,,,127],f:[1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,2]},{n:[121,,,,125,,116,,,,125,,,,121,,,,121,,,,125,,116,,,,125],f:[]}]},{i:[1,100,128,0,2,150,128,0,0,0,0,8,44,0,0,0,0,195,6,0,2,91,68,10,37,0,2,36,3],p:[2,3],c:[{n:[],f:[]},{n:[139,,140,,142,,147,,,,,,,,,,,,139,,140,,142,,151,,149,,147],f:[]},{n:[145,,,,,,144,,,,,,142,,,,,,140,,,,,,,,140,,139,,137],f:[]}]},{i:[0,255,128,0,1,80,128,9,0,0,7,5,52,0,0,0,0,0,0,0,2,86,0,0,32,47,3,25,1],p:[1,2],c:[{n:[111,,,,,,,,106,,,,,,,,111,,,,,,,,106],f:[]},{n:[109,,,,,,,,104,,,,,,,,109,,,,,,,,104],f:[]}]},{i:[0,0,140,0,0,0,140,0,0,81,4,10,47,55,0,0,0,187,5,0,1,239,135,0,32,108,5,16,4],p:[1,1],c:[{n:[,,123,,123,,,,123,,,,123,,,,123,,123,,,,123,,,,123,,123],f:[]}]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[1,1],c:[{n:[],f:[]}]},],rowLen:4725,patternLen:32,endPattern:1,numChannels:5},
    {songData:[{i:[1,100,128,0,1,201,128,0,0,0,0,32,0,0,0,0,0,195,6,0,2,88,0,0,32,0,4,16,2],p:[1],c:[{n:[144,147,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,144],f:[,,,,,,,,,3,3,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,128,127]}]},],rowLen:4134,patternLen:32,endPattern:0,numChannels:1},
    {songData:[{i:[1,100,128,0,1,201,128,0,0,0,0,32,0,0,0,0,0,195,6,0,2,88,0,0,32,0,4,16,2],p:[1],c:[{n:[161,158,154,150,147],f:[]}]},],rowLen:4134,patternLen:16,endPattern:0,numChannels:1},
    {songData:[{i:[1,100,128,0,1,201,128,0,0,0,0,32,0,0,0,0,0,195,6,0,2,88,0,0,32,0,4,16,2],p:[1],c:[{n:[137,141,144,149,153,156,161,156,153,156,149],f:[]}]},],rowLen:4134,patternLen:16,endPattern:0,numChannels:1}, // Fanfare
    {songData:[{i:[1,100,128,0,1,201,128,0,0,0,0,32,0,0,0,0,0,195,6,0,2,88,0,0,32,0,4,16,2],p:[1],c:[{n:[137,,142,,146,142,137,,149,,147,,146,,144,146,142],f:[]}]},],rowLen:4134,patternLen:24,endPattern:0,numChannels:1}, // Fanfare 2
    {songData:[{i:[1,100,128,0,1,201,128,0,0,0,0,32,0,0,0,0,0,195,6,0,2,88,0,0,32,0,4,16,2],p:[1],c:[{n:[137,133,129,126,,,,,,,,,,,,,,,,,,,,,136,132,128,125],f:[]}]},],rowLen:4134,patternLen:24,endPattern:0,numChannels:1} // Angry beep
];


let song;
function playMusic(i) {
    if (song) {
        song.stop();
    }
    var wave = musicBuffers[i].createWave();
    song = document.createElement("audio");
    song.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
    song.loop = true;
    song.play();
}

let sfxBuffers = [];
function playSound(i) {
    if (!sfxBuffers[i]) {
        var wave = musicBuffers[i].createWave();
        var audio = document.createElement("audio");
        audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
        sfxBuffers[i] = audio;
    } else {
        sfxBuffers[i].currentTime = 0;
    }
    sfxBuffers[i].play();
}

// Generate music...
let musicBuffers;
var musicLoaded = false;
setTimeout(() => {
    musicBuffers = musics.map(m => {
        var player = new CPlayer();
        player.init(m);
        let loaded;
        do {
            loaded = player.generate();
        } while (loaded < 1);
        return player;
    })
    musicLoaded = true;
}, 50);