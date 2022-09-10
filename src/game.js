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
  subscriberMessage2 = 'You have access to the Lizard egg and chill mode!';
  isSubscriber = true;
}

async function startGame() {
  pet = createPet(W / 2);
  
  mainCamera.x = pet.x;
  mainCamera.y = pet.y;

  let conversation;
  if (gabyMode) {
    conversation = [
      "Ah, it's time to relax.",
      "This is a magical egg, take good care of it and a friend will hatch out of it.",
      "Use the left button to feed it, and clean its poo using the right button.",
      "This creature will live forever, as long as you give it your love!",
    ];
  } else if (selectedEgg == 0) {
    conversation = [
      "Hello! I am Gato, and I have a gift for you.",
      "This is a magical egg, take good care of it and a friend will hatch out of it.",
      "Use the left button to feed it, but only *exactly* when the green button lits.",
      "Its belly will hurt badly if you feed it before, and it'll slowly die of hunger if you take too long.",
      "Also, clean its poop using the right button, it'll harm it if you leave it there for too long.",
      "Are you ready?",
    ];
  } else {
    conversation = [
      "Ah, I see you've found the lizard egg.",
      "This egg is special, it's a bit harder to take care off, but it will pay off.",
      "Good luck!",
    ];
  }

  await showConversation (SHAPES.gato, conversation);
  gState = 2;
  
}

typed('Enter', () => {
  if (gState == 0) {
    if (musicLoaded) {
      title()
    }
  } else if (gState == 2) {
    pet.feed();
  } else if (gState == 10) {
    conversationNext();
  }

});

typed('KeyA', () => {
  if (gState != 1) return;
  playSound(1);
  selectedEgg = 0;
  startGame();
});

typed('KeyB', () => {
  if (gState != 1) return;
  if (!isSubscriber) {
    subscriberMessage1 = 'The lizard egg is only available for subscribers!';
    subscriberMessage2 = 'Please visit coil.com to activate your subscription :)';
    return;
  }
  playSound(1);
  selectedEgg = 1;
  startGame();
});

typed('KeyC', () => {
  if (gState != 1) return;
  if (!isSubscriber) {
    subscriberMessage1 = 'Chill mode is only available for subscribers!';
    subscriberMessage2 = 'Please visit coil.com to activate your subscription :)';
    return;
  }
  playSound(1);
  selectedEgg = 0;
  gabyMode = true;
  startGame();
});

typed('KeyZ', () => {
  if (gState == 2) {
    pet.clean();
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
