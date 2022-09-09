// --- Initialization
var pet;

function createPet(x){
  var p = new Pet(selectedEgg, [layers[2]]);
  p.x = x;
  p.y = 180;
  p.scale = 2;
  p.rotation = 0;
  return p;
}

// Coil thing
if(document.monetization) {
  function checkMon() {
    if (document.monetization.state === 'started') {
      activateCoilPowerup();
      return true;
    }
    return false;
  }
  if (!checkMon()) {
    document.monetization.addEventListener('monetizationstart', checkMon);
  }
}

let isSubscriber = false;
let selectedEgg = 0;
let subscriberMessage1 = "";
let subscriberMessage2 = "";

function activateCoilPowerup() {
  subscriberMessage1 = 'Thank you for subscribing.';
  subscriberMessage2 = 'You have access to the Purple egg!';
  isSubscriber = true;
}

async function startGame() {
  pet = createPet(W / 2);
  
  mainCamera.x = pet.x;
  mainCamera.y = pet.y;
  
  await showConversation (SHAPES.gato, [
    "Hello! I am Gato, and I have a gift for you.",
    "This is a magical egg, take good care of it and a friend will hatch out of it.",
    "Use the left button to feed it, but only if its hunger is *exactly* 5.",
    "Its belly will hurt badly if you feed it before, and it'll slowly die of hunger if you let it go over.",
    "Also remember to clean its poo using the right button, it'll harm if you leave it there for too long.",
    "Are you ready?",
  ]);
  gState = 2;
  
}

typed('Enter', () => {
  if (gState == 0) {
    if (musicLoaded) {
      title()
    }
  } else if (gState == 1) {
    playSound(1);
    selectedEgg = 0;
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
  } else if (gState == 1) {
    if (!isSubscriber) {
      subscriberMessage1 = 'This egg is only available for subscribers!';
      subscriberMessage2 = 'Please visit coil.com to activate your subscription :)';
      return;
    }
    playSound(1);
    selectedEgg = 1;
    startGame();
  }

});

let petsHistory = [];
petsHistory[0] = [];
petsHistory[1] = [];
const petHistoryData = localStorage.getItem("deathgotchi.history.2");
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
