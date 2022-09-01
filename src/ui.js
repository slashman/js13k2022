fws = [];

const ve = () => mo ? 'Tap' : 'Enter'; 

function wrapText(txt) {
  wi = Math.floor((W - 270) / ctx.measureText('m').width);
  y = H - (mo ? 220 : 150);
  words = txt.split(' ');
  line = '';
  while (words.length) {
    w = words.splice(0,1)[0]
    if (line.length + w.length > wi) {
      ctx.fillText(line, 250, y);
      y += 30;
      line = '';
    }
    line += w + ' ';
    if (!words.length) {
      ctx.fillText(line, 250, y);
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
    c.font = font(18);
    c.fillStyle= "#00ff00";
    c.fillText("Loading...",10,50);
    if (musicLoaded) {
      c.fillText(ve()+ " to start",10,70);
    }
  } else if (gState == 1) {
    c.font = "64px 'Brush Script MT'";
    c.textAlign="center"; 
    c.fillStyle= "#cf3436";
    c.fillText("DeathGotchi",W/2,80);
    c.font = font(20);
    c.fillStyle= "#ffffff";
    
    c.fillText(ve()+ " to start",W/2,350);
    c.fillText("by Slashie", W/2, H - 50);
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
    c.font = font(24);
    c.textAlign="left"; 
    c.fillStyle= "#000";
    for (let i = 0; i < pet.poopQuantity; i++) {
      c.fillText("💩", W/2 + POOP_PLACES_X[i], POOP_PLACES_Y[i]);
    }
    /*c.fillText("Happy:  " + happyBar(pet.happyCounter), W/2 - 30, 120);
    */
    c.textAlign="center"; 
    c.fillText(format (pet.lifetime), W/2, 90);

    c.textAlign="left"; 
    for (let i = 0; i < petsHistory.length; i++) {
      c.fillText("#" + (i+1) + ": " + formatLong (petsHistory[i].lifetime), 20, 80 + i * 30);
    }
  }
  if (gState == 2) {
    c.font = font(16);
    c.textAlign="center"; 
    c.fillStyle= "#000";
    if (pet.happyCounter > 0) {
      c.fillText("Paused, starting in " + Math.floor(pet.happyCounter), W/2, 320);
    }
    c.fillText("[Enter] to feed", W/2, 340);
    c.fillText("[Z] to clean poo", W/2, 360);
  } 
  if (gState == 3) {
    c.font = font(16);
    c.textAlign="center"; 
    c.fillStyle= "#000";
    c.fillText(pet.deathCause,W/2,340);
    c.fillText("[X] to retry", W/2, 360);
  }
  if (gState == 10) {
    c.fillStyle = "#000";
    c.globalAlpha = 0.5;
    c.fillRect(0, H - (mo ? 250 : 180), W, (mo ? 195 : 125));
    c.globalAlpha = 1;
    Renderer.renderShapes(c, conversationApp, 150, H - (mo ? 190 : 120), 2, 1, -Math.PI / 2, 49, 49, undefined, true);
    c.font = font(24);
    c.fillStyle= "#FFF";
    c.textAlign="left"; 
    wrapText(conversationText);
    c.textAlign="right"; 
    c.fillText("["+ve()+"]", W - 20, H - 65);
  }
}

