// generally horizontal limit of col 50

let textData = `Demo`;
// let textdelta = '';
let img = [undefined, undefined];
let myFont;
let imgindex = 0;
let fontssss = ['fontText', 'fontText1'];

let fontIndex = 1;
let fontsize = 0.3;
let xaxis = 62;
let yaxis = 5;
let w = 670;
let linespacing = 89;
let fontText = [];

// y_offset, y_shift_flag, y_scale, x_inc_mul_post, x_inc_mul_pre
tmpOffsetMap = {
  '/': [4, 0, 1, 1, 0],
  0: [10, 1, 2, 1.2, 2],
  1: [4, 1, 2, 1.2, 2],
  2: [1, 1, 2.4, 1.2, 2],
  3: [8, 1, 2, 1.2, 2],
  4: [6, 1, 2, 1.2, 2],
  5: [7, 1, 2, 1.2, 2],
  6: [9, 1, 2, 1.2, 2],
  7: [13, 1, 1.75, 1.2, 2],
  8: [14, 1, 1.75, 1.2, 2],
  9: [15, 1, 1.6, 1.2, 2],
  ',': [4, 0, 1, 1.7, 4],
  ';': [0, 0, 1, 3, 3],
  ':': [0, 0, 1, 3, 4],
  '[': [0, 0, 1, 1, 1],
  '}': [0, 0, 1, 2, 3],
  '{': [0, 0, 1, 1, 1],
  '-': [6, 0, 1, 1.5, 1.5],
  ')': [22, 1, 1, 1, 1],
  '(': [22, 1, 1, 1, 1],
};

// elements of list(range(32, 126)) minus the element '96'
let dataAvailable = Array.from(new Array(93), (x, i) => i + 33);
dataAvailable.splice(63, 1); // remove item '96'

// this function has binding in index.html
function incrementor() {
  fontIndex = (fontIndex + 1) % fontssss.length;
  // console.log(fontIndex);
  changeFont();
}

function textChanged(text) {
  if (text !== textData) {
    textData = text;
    loop();
  }
}

function preload() {
  changeFont();
  img[0] = loadImage(`assets/images/pg0.jpg`);
  img[1] = loadImage(`assets/images/pg1.jpg`);
  loop();
}

function setup() {
  canvas = createCanvas(750, 1000);
  canvas.parent('CC');
  rectMode(CORNER);
  noLoop();
}

function draw() {
  noLoop();
  image(img[imgindex], 0, 0, width, height);
  if (linespacing) textLeading(linespacing);
  let pos = createVector(xaxis, yaxis);
  let headerflag = 1;
  // const i = textData.length - 1;
  for (var i = 0; i < textData.length; i++) {
    if (textData[i]) {
      let y_offset = 0;
      let y_scale = 1;
      let x_scale = 1;
      let x_inc_mul_post = 1;
      let x_inc_mul_pre = 0;
      let y_shift_flag = 0;
      let randScale = getrand(0.9, 1);

      if (pos.x >= xaxis + w || textData[i] === '\n') {
        pos.x = xaxis + Math.round(getrand(-4, 4));
        pos.y += linespacing * fontsize + Math.round(getrand(-1, 1));
      }

      if (pos.y > 45 && headerflag) {
        pos.y = 81;
        headerflag = 0;
      }

      // console.log(textData[i]);
      if (textData[i].charCodeAt(0) === 32) {
        pos.x += Math.round(getrand(8, 12));
      }

      if ('textImage' + textData[i] in fontText) {
        // console.log(pos.y);
        if (fontIndex < 2 && textData[i] in tmpOffsetMap) {
          y_offset = tmpOffsetMap[textData[i]][0];
          y_shift_flag = tmpOffsetMap[textData[i]][1];
          y_scale = tmpOffsetMap[textData[i]][2];
          x_inc_mul_post = tmpOffsetMap[textData[i]][3];
          pos.x += tmpOffsetMap[textData[i]][4];
        }
        if (textData[i].charCodeAt(0) > 96 && textData[i].charCodeAt(0) < 123) {
          y_offset = 6;
        }
        if (textData[i].charCodeAt(0) > 64 && textData[i].charCodeAt(0) < 91) {
          x_inc_mul_post = 0.8;
          y_offset = 8;
          y_scale = 0.7;
          x_scale = 0.7;
        }
        if (textData[i].charCodeAt(0) == 46) {
          pos.x += 1;
        }
        if (textData[i] && !(textData[i].charCodeAt(0) == 32)) {
          tint(128, 128, 128);

          image(
            fontText['textImage' + textData[i]],
            pos.x,
            pos.y + -20 * y_shift_flag + y_offset,
            fontText['textImage' + textData[i]].width * fontsize * x_scale * randScale,
            fontText['textImage' + textData[i]].height * fontsize * y_scale * randScale
          );
          noTint();
        }
        pos.x +=
          fontText['textImage' + textData[i]].width * fontsize * x_inc_mul_post +
          Math.round(getrand(0, 1)) * Math.floor(x_inc_mul_post);
        if (textData[i].charCodeAt(0) == 46) {
          pos.x += 2;
        }
      }
    }
  }
}

function getrand(min, max) {
  return (Math.random() * (max - min) + min).toFixed(4);
}

function changeFont() {
  dataAvailable.forEach(i => {
    try {
      fontText['textImage' + String.fromCharCode(i)] = loadImage(
        'assets/fonts/' + str(fontssss[fontIndex]) + '/' + str(i) + '_t.png'
      );
    } catch (error) {}
  });
  loop();
}

function save() {
  saveCanvas();
}

function changeimg() {
  imgindex = 1 - imgindex;
  // img = await loadImage(`assets/images/pg${imgindex}.jpg`);
  console.log(imgindex, img);
  loop();
}
