let textData = `Demo`;
let img, myFont;
let fontssss = ['fontText', 'fontText1'];

let fontIndex = 1;
let fontsize = 0.3;
let xaxis = 104;
let yaxis = 81;
let w = 619;
let linespacing = 89;

let fontText = [];

tmpOffsetMap = [
	6,
	-2,
	-1.11111111,
	-0.22222222,
	0.66666667,
	1.55555556,
	2.44444444,
	3.33333333,
	4.22222222,
	5.11111111,
];

// elements of list(range(32, 126)) minus the element '96'
let dataAvailable = Array.from(new Array(94), (x, i) => i + 32);
dataAvailable.splice(64, 1); // remove item '96'

// this function has binding in index.html
function incrementor() {
	fontIndex = (fontIndex + 1) % fontssss.length;
	// console.log(fontIndex);
	changeFont();
}

function textChanged(text) {
	textData = text;
	loop();
}

function preload() {
	changeFont();
	img = loadImage('assets/images/pg1lines.jpg');
	loop();
}

function setup() {
	canvas = createCanvas(750, 1000);
	canvas.parent('contributing');
	rectMode(CORNER);
	noLoop();
}

function draw() {
	noLoop();
	image(img, 0, 0, width, height);
	if (linespacing) textLeading(linespacing);
	pos = createVector(xaxis, yaxis);

	for (var i = 0; i <= textData.length; i++) {
		if (pos.x >= xaxis + w || textData[i] === '\n') {
			pos.x = xaxis + Math.round(getrand(-4, 4));

			pos.y += linespacing * fontsize;
		}

		let y_offset = 0;
		let y_scale = 1;
		let y_shift_flag = 0;
		let randScale = getrand(0.9, 1);

		if ('textImage' + textData[i] in fontText) {
			if (fontIndex < 2 && !isNaN(textData[i])) {
				y_shift_flag = 1;
				y_scale = 2;
				y_offset =  tmpOffsetMap[Number(textData[i])];
			}
			if (
				textData[i].charCodeAt(0) > 96 &&
				textData[i].charCodeAt(0) < 123
			) {
				y_offset = 6;
			}
			if (textData[i].charCodeAt(0) == 46) {
				pos.x += 1;
			}

			if (textData[i]) {
				tint(128, 128, 128);

				image(
					fontText['textImage' + textData[i]],
					pos.x,
					pos.y + -20 * y_shift_flag + y_offset,
					fontText['textImage' + textData[i]].width *
						fontsize *
						randScale,
					fontText['textImage' + textData[i]].height *
						fontsize *
						y_scale *
						randScale
				);
				noTint();
			}
			pos.x += fontText['textImage' + textData[i]].width * fontsize;
			if (textData[i].charCodeAt(0) == 46) {
				pos.x += 2;
			}
		}
	}
}

function getrand(min, max) {
	return (Math.random() * (max - min) + min).toFixed(4);
}

function changeFont() {
	dataAvailable.forEach((i) => {
		try {
			// console.log(str(fontssss[fontIndex]) + '/' + str(i) + '_t.png');
			fontText['textImage' + String.fromCharCode(i)] = loadImage(
				str(fontssss[fontIndex]) + '/' + str(i) + '_t.png'
			);
		} catch (error) {}
	});
	loop();
}
