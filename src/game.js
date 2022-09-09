// --- Initialization
var pet;

function createPet(x){
  var p = new Pet([layers[2]]);
  p.x = x;
  p.y = 180;
  p.scale = 3;
  p.rotation = 0;
  return p;
}

async function startGame() {
  pet = createPet(W / 2);
  
  mainCamera.x = pet.x;
  mainCamera.y = pet.y;
  
  await showConversation (makeAnimal('fox'), [
    "Hello! I'm folonfo, your pet.",
    "Death looms everywhere, don't let me die!",
    "Use the left button to feed me, but only if my hunger is *exactly* 5.",
    "My belly will hurt badly if you feed me before,",
    "and I'll slowly die of hunger if you let it go over.",
    "Also remember to clean my poo using the right button,",
    "it'll damage me if you leave it there for too long",
    "Are you ready?",
  ]);
  gState = 2;
  
}

typed('Enter', () => {
  if (gState == 0) {
    if (musicLoaded) {
      // zzfxX - the common audio context
      zzfxX=new(window.AudioContext||webkitAudioContext);
      title()
    }
  } else if (gState == 1) {
    zzfxX=new(window.AudioContext||webkitAudioContext);
    //playMusic(1);
    playSound(1);
    startGame();
  } else if (gState == 2) {
    pet.feed();
  } else if (gState == 10) {
    conversationNext();
  }

});

typed('KeyZ', () => {
  if (gState == 2) {
    pet.clean();
  }
});

let petsHistory = [];
const petHistoryData = localStorage.getItem("deathgotchi.history");
if (petHistoryData) {
  petsHistory = JSON.parse(petHistoryData);
}

typed('KeyX', () => {
  if (gState == 3) {
    pet.reset();
    gState = 2;
  }
});

function title(){
  playMusic(0);
  mainCamera.x = W/2;
  mainCamera.y = H/2;
  gState = 1;
}

function victory() {
  p1.won = true;
  completeTime = Math.floor((Date.now() - startTime) / 10)/100;
}
