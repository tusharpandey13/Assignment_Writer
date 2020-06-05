window.onload = function () {
	var fileupload = document.getElementById('file-input');
	fileupload.onchange = function () {
		// var reader = new FileReader();
		// reader.readAsDataURL(fileupload.files[0]);
		// reader.onload = function (e) {
		// 	let urlOfImageFile = URL.createObjectURL(myImageFile);
		// 	img = loadImage(e.target.result);
		// 	loop();
		// };
		const myImageFile = fileupload.files[0];
		let urlOfImageFile = URL.createObjectURL(myImageFile);
		imgurl = urlOfImageFile;
		// loop();
	};
};
