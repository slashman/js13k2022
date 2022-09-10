fws = [];

function wrapText(txt) {
  wi = W - (mo ? 200 : 310);
  y = H - (mo ? 200 : 130);
  theX = mo ? 170 : 290;
  words = txt.split(' ');
  line = '';
  var lineLength = 0;
  while (words.length) {
    w = words.splice(0,1)[0]
    const wordLength = ctx.measureText(w + ' ').width;
    if (lineLength + wordLength > wi) {
      ctx.fillText(line, theX, y);
      y += mo ? 30 : 40;
      line = '';
      lineLength = 0;
    }
    line += w + ' ';
    lineLength += wordLength;
    if (!words.length) {
      ctx.fillText(line, theX, y);
    }
  }
}

function format(num) {
  return Math.floor(num);
}

function formatLong(num) {
  return (Math.floor(num * 100) / 100) + 'y';
}

function healthScale(num) {
  return num * 0.015;
}

let POOP_PLACES_X = [90, 110, 80, 100, 120];
let POOP_PLACES_Y = [170, 170, 190, 190, 190];
let LED_PLACES= [235, 232, 230, 245, 245, 245, 230, 232, 235];

// let lastDelta = -1; // FPS
function renderUI(c,d) {
  if (gState == 0) {
    c.font = font(20);
    c.textAlign="center"; 
    c.fillStyle= "#000000";
    c.fillText("Loading...",W/2,50);
    if (musicLoaded) {
      c.fillText("Tap to continue",W/2,150);
    }
  } else if (gState == 1) {
    c.font = "64px 'Comic Sans MS'";
    c.textAlign="center"; 
    c.fillStyle= "#cf3436";
    c.fillText("TenderGotchi",W/2,80);
    c.font = font(20);
    c.fillStyle= "#000";
    c.fillText("Select a magic egg",W/2,150);

    Renderer.renderShapes(c, SHAPES.egg, W/2 - 100, 300, 3, 1, 0, 50, 50, undefined, true);
    Renderer.renderShapes(c, isSubscriber ? SHAPES.lizardEgg : SHAPES.disabledEgg, W/2 + 100, 300, 3, 1, 0, 50, 50, undefined, true);

    c.fillStyle= "#000";
    c.fillText(subscriberMessage1,W/2,380);
    c.fillText(subscriberMessage2,W/2,410);
    
    c.fillText("Made by @slashie_", W/2, H - 120);
    c.fillText("Art by Mateo Robayo", W/2, H - 90);
    c.fillText("Music by Ryan Malm", W/2, H - 60);
    c.fillText("js13k22", W/2,H - 30);
  } else if (gState == 2 || gState == 3 || gState == 10) {
    Renderer.renderShapes(c, SHAPES.gotchi, W/2, 200, 4, 1, 0, 50, 50, undefined, true);
    Renderer.renderShapes(c, SHAPES.heart, W/2 - 100, 170, healthScale(pet.health), 1, 0, 50, 50, undefined, true);
    for (let i = 0; i < 9; i++) {
      let isOn = pet.hunger > (i + 1);
      let shape;
      if (isOn) {
        if (i === 4) {
          shape = SHAPES.ledGreen;
        } else {
          shape = SHAPES.ledRed;
        }
      } else {
        shape = SHAPES.ledOff;
      }
      Renderer.renderShapes(c, shape, W/2 - 160 + i * 40, LED_PLACES[i], 1, 1, 0, 50, 50, undefined, true);
    }
    Renderer.renderShapes(c, isDown('Enter') ? SHAPES.buttonPressed : SHAPES.button, W/2 - 100, 300, 7, 1, 0, 50, 50, undefined, true);
    Renderer.renderShapes(c, isDown('KeyZ') ? SHAPES.buttonPressed : SHAPES.button, W/2 + 100, 300, 7, 1, 0, 50, 50, undefined, true);
    Renderer.renderShapes(c, isDown('KeyX') ? SHAPES.buttonPressed : SHAPES.button, W/2, 40, 7, 1, 0, 50, 50, undefined, true);
    c.font = font(32);
    c.textAlign="center"; 
    c.fillStyle= "#000";
    c.fillText("🍴", W/2 - 100, 312);
    c.fillText("🧹", W/2 + 100, 312);
    c.fillText("✨", W/2, 52);
    
    c.font = font(24);
    c.textAlign="center"; 
    c.fillStyle= "#000";
    for (let i = 0; i < pet.poopQuantity; i++) {
      c.fillText("💩", W/2 + POOP_PLACES_X[i], POOP_PLACES_Y[i]);
    }
    if (pet.poopQuantity > 0 && pet.dirtyCounter < 0) {
      c.fillText("☠️", W/2 + 50, 100);
    }
    /*c.fillText("Happy:  " + happyBar(pet.happyCounter), W/2 - 30, 120);
    */
    c.textAlign="center"; 
    c.fillText(format (pet.lifetime), W/2, 105);

    if (gState != 10) {
      c.textAlign= mo ? "center": "left"; 
      for (let i = 0; i < petsHistory[selectedEgg].length; i++) {
        c.fillText("#" + (i+1) + ": " + formatLong (petsHistory[selectedEgg][i].lifetime), mo ? W / 2 : 20, (mo ? 600 : 80) + i * 30);
      }
    }
  }
  if (gState == 2) {
    if (pet.happyCounter > 0) {
      c.font = font(24);
      c.textAlign="center"; 
      c.fillStyle= "#000";
      c.fillText("Paused, starting in " + Math.floor(pet.happyCounter), W/2, 420);
    }
    /*c.fillText("[Enter] to feed", W/2, 340);
    c.fillText("[Z] to clean poo", W/2, 360);*/
  } 
  if (gState == 3) {
    c.font = font(24);
    c.textAlign="center"; 
    c.fillStyle= "#000";
    c.fillText(pet.deathCause,W/2, 420);
    c.fillText("Tap the Sparkles button", W/2, 450);
  }
  if (gState == 10) {
    c.fillStyle = "#000";
    c.globalAlpha = 0.5;
    c.fillRect(0, H - (mo ? 250 : 180), W, (mo ? 195 : 125));
    c.globalAlpha = 1;
    if (mo) {
      Renderer.renderShapes(c, conversationApp, 80, H - 180, 2, 1, 0, 49, 49, undefined, true);
      c.font = font(24);
    } else {
      Renderer.renderShapes(c, conversationApp, 150, H - 120, 4, 1, 0, 49, 49, undefined, true);
      c.font = font(28);
    }
    c.fillStyle= "#FFF";
    c.textAlign="left"; 
    wrapText(conversationText);
    c.textAlign="right"; 
    c.fillText("[Tap]", W - 20, H - 65);
  }
}

