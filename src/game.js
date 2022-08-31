// --- Initialization
var pet;

function createPet(x){
  var p = new Pet([layers[2]]);
  p.x = x;
  p.y = H - 20;
  p.size = 8;
  p.scale = 1;
  p.rotation = -Math.PI / 2;
  p.blastRadius = 0;
  return p;
}

function startGame() {
  pet = createPet(W / 2);
  
  mainCamera.x = pet.x;
  mainCamera.y = pet.y;
  
  setTimeout(async () => {
    await showConversation (makeAnimal('fox'), [
      "Hello! I'm folonfo, your pet.",
      "Death looms everywhere, don't met me die!",
    ]);
    contextHint('Keep your pet alive.');
    gState = 2;
  }, 1);
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
    playMusic(1);
    playSound(4);
    startGame();
    gState = 2;
  } else if (gState == 2) {
    pet.feed();
  } else if (gState == 10) {
    conversationNext();
  }

});

typed('Comma', () => {
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
    petsHistory.push({
      lifetime: pet.lifetime
    });
    petsHistory.sort((a,b) => { return b.lifetime - a.lifetime});
    if (petsHistory.length > 10) {
      petsHistory.length = 10;
    }
    localStorage.setItem("deathgotchi.history", JSON.stringify(petsHistory));
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
