let img, myFont;
let fontssss = ['fontText', 'fontText1'];

// let fontIndex = 1;
// let xaxis = 20;
// let yaxis = 20;
// let fontsize = 0.4;
// let w = 700;
// let linespacing = 70;

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

settings = {
	fontIndex: 1,
	fontsize: 0.3,
	linespacing: 89,
	w: 619,
	xaxis: 104,
	yaxis: 81,
};

// elements of list(range(32, 126)) minus the element '96'
let dataAvailable = Array.from(new Array(94), (x, i) => i + 32);
dataAvailable.splice(64, 1); // remove item '96'

// this function has binding in index.html
function incrementor() {
	settings.fontIndex = (settings.fontIndex + 1) % fontssss.length;
	// console.log(fontIndex);
	changeFont();
}

function textChanged(text) {
	textData = text;
	loop();
}

function printJSON() {
	console.log({
		fontIndex: settings.fontIndex,
		xaxis: settings.xaxis,
		yaxis: settings.yaxis,
		fontsize: settings.fontsize,
		w: settings.w,
		linespacing: settings.linespacing,
	});
}

function loadJSON() {}

function preload() {
	changeFont();
	loadPage();
	loop();
}

function setup() {
	canvas = createCanvas(750, 1000);
	canvas.parent('contributing');
	rectMode(CORNER);
	// noLoop();
}

function draw() {
	noLoop();
	//background(255);
	image(img, 0, 0, width, height);
	// textSize(settings.fontsize);
	// fill('#264180');
	// fill('#000000');
	if (settings.linespacing) textLeading(settings.linespacing);
	pos = createVector(settings.xaxis, settings.yaxis);

	// text(data, xaxis, yaxis, w, 900);

	for (var i = 0; i <= textData.length; i++) {
		if (pos.x >= settings.xaxis + settings.w || textData[i] == '\n') {
			pos.x = settings.xaxis;
			pos.y += settings.linespacing * settings.fontsize;
		}

		let y_offset = 0;
		let y_scale = 1;
		let y_shift_flag = 0;
		let randScale = getrand(0.9, 1);
		if ('textImage' + textData[i] in fontText) {
			// console.log(fontText);
			if (settings.fontIndex < 2 && !isNaN(textData[i])) {
				y_shift_flag = 1;
				y_scale = 2;
				// y_offset = y_scale * tmpOffsetMap[Number(textData[i])];
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
						settings.fontsize *
						randScale,
					fontText['textImage' + textData[i]].height *
						settings.fontsize *
						y_scale *
						randScale
				);
				noTint();
			}
			pos.x +=
				fontText['textImage' + textData[i]].width * settings.fontsize;
			if (textData[i].charCodeAt(0) == 46) {
				pos.x += 2;
			}
		}
	}
}

function changeFont(custom_change = undefined) {
	console.log(settings.fontIndex);
	if (custom_change) settings.fontIndex = custom_change;
	dataAvailable.forEach((i) => {
		try {
			fontText['textImage' + String.fromCharCode(i)] = loadImage(
				str(fontssss[settings.fontIndex]) + '/' + str(i) + '_t.png'
			);
		} catch (error) {}
	});
	loop();
}

function loadPage() {
	img = loadImage('assets/images/pg1lines.jpg');
	loop();
}

function getrand(min, max) {
	return (Math.random() * (max - min) + min).toFixed(4);
}

let textData = `              Experiment No. 1

1. A) Create a Java class called Student with the following details as variables within it.
(i) USN
(ii) Name
(iii) Branch
(iv) Phone
Write a Java program to create nStudent objects and print the USN, Name, Branch,
and Phone of these objects with suitable headings.
import java.util.Scanner;
public class student {
    String USN;
    String Name;
    String branch;
    int phone;
    void insertRecord(String reg,String name, String brnch,int ph){
        USN=reg;
        Name=name;
        branch=brnch;
        phone=ph;
    }
    void displayRecord(){
        System.out.println(USN+" "+Name+" "+branch+" "+phone);
    }

`;
