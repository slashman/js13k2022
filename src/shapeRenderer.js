const WH = '#ffffff';
const GREY = '#888';

var starCamera = {x : 0, y : 0};
var mainCamera = {x : 0, y : 0};

function cameraX(camera, x) { return x - camera.x + W / 2}
function cameraY(camera, y) { return y - camera.y + H / 2}

const Renderer = {
    // Skew alters the X scale
    renderShapes(c, shapes, x, y, scale, skew, rotation, pivotX, pivotY, camera, fixedToCamera) {
      if (!camera) {
        camera = mainCamera;
      }
      //c.lineCap = "round"; // TODO: Check how this affects performance?

      shapes.forEach(sh => {
        if (sh[0] == "C") {
          this.renderCircle(c, sh[3], sh[4], sh[5], sh[6], sh [1] * scale + x, sh[2]  * scale + y, scale, pivotX, pivotY, false, camera, fixedToCamera);
          if (!sh[7]) {
            this.renderCircle(c, sh[3], sh[4], sh[5], sh[6], -sh [1] * scale + x, sh[2]  * scale + y, scale, pivotX, pivotY, true, camera, fixedToCamera);
          }
        } else {
          this.renderPath(c, sh[0], sh[1], sh[2], sh[3], x, y, scale, skew, rotation, pivotX, pivotY, false, camera, fixedToCamera);
          if (!sh[4]) {
            this.renderPath(c, sh[0], sh[1], sh[2], sh[3], x, y, scale, 1 + (1 - skew), rotation, pivotX, pivotY, true, camera, fixedToCamera);
          }
        }
      });
    },
    renderPath(c, path, strokeStyle, lineWidth, fillStyle, x, y, scale, skew, rotation, pivotX, pivotY, flip, camera, fixedToCamera) {
      c.strokeStyle = strokeStyle;
      c.lineWidth = lineWidth;
      c.fillStyle = fillStyle;
      if (!fixedToCamera) {
        x = cameraX(camera, x);
        y = cameraY(camera, y);
      }
      let scaleX = scale / skew;
      pivotX = pivotX * scaleX;
      pivotY = pivotY * scale;
      const transPivotX = flip ? x + pivotX : x - pivotX;
      c.translate(transPivotX, y - pivotY);
      const rotaPivotX = flip ? -pivotX : pivotX;
      c.translate(rotaPivotX, pivotY);
      c.rotate(rotation + Math.PI / 2);
      c.translate(-rotaPivotX, -pivotY);
      c.scale(scaleX * (flip ? -1 : 1), scale);
      const p2d = new Path2D(path);
      c.stroke(p2d);
      if (fillStyle)
        c.fill(p2d);
      c.setTransform(1, 0, 0, 1, 0, 0);
    },
    renderCircle(c, radius, strokeStyle, lineWidth, fillStyle, x, y, scale, pivotX, pivotY, flip, camera, fixedToCamera) {
      c.strokeStyle = strokeStyle;
      c.lineWidth = lineWidth;
      c.fillStyle = fillStyle;
      if (!fixedToCamera) {
        x = cameraX(camera, x);
        y = cameraY(camera, y);
      }
      pivotX = pivotX * scale;
      pivotY = pivotY * scale;
      const transPivotX = flip ? x + pivotX : x - pivotX;
      c.translate(transPivotX, y - pivotY);
      /*const rotaPivotX = flip ? -pivotX : pivotX;
      c.translate(rotaPivotX, pivotY);
      c.rotate(rotation + Math.PI / 2);
      c.translate(-rotaPivotX, -pivotY);*/
      c.scale(scale * (flip ? -1 : 1), scale);
      c.beginPath();
      c.arc(0, 0, radius, 0, Math.PI*2);
      c.stroke();
      c.fill();
      c.setTransform(1, 0, 0, 1, 0, 0);
    }
  }