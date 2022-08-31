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
  return Math.round(num * 100) / 100;
}
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
    c.font = font(16);
    c.textAlign="left"; 
    c.fillStyle= "#ffffff";
    c.fillText("Health: " + format(pet.health), W/2 - 30, 120);
    c.fillText("Hunger: " + format (pet.hunger), W/2 - 30, 140);
    c.fillText("Poop: " + (pet.hasPoop ? "Poop" : "No"), W/2 - 30, 160);
    c.fillText("Life (years): " + format (pet.lifetime), W/2 - 30, 180);

    for (let i = 0; i < petsHistory.length; i++) {
      c.fillText("#" + (i+1) + ": " + format (petsHistory[i].lifetime), W/2 + 200, 80 + i * 20);
    }
  }
  if (gState == 2) {
    c.font = font(16);
    c.textAlign="center"; 
    c.fillStyle= "#ffffff";
    c.fillText("[Enter] to feed", W/2, 220);
    c.fillText("[Space] to clean", W/2, 240);
  } 
  if (gState == 3) {
    c.font = font(16);
    c.textAlign="center"; 
    c.fillStyle= "#ffffff";
    c.fillText("[X] to retry", W/2, 220);
    c.fillText("DEATH",W/2,380);
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

let curCtxHint, curCtxTime;
function contextHint(msg) {
  curCtxTime = 5;
  curCtxHint = msg;
}