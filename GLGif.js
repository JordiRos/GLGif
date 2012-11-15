//--------------------------------------------------------------------------------------------------------
// @author Jordi Ros: shine.3p@gmail.com
//
// GLGif.js
//
//--------------------------------------------------------------------------------------------------------

function loadGif(img, onload) {
	// Init
	var gif = {};
	gif.tex = [];
	gif.frame = 0;
	gif.loaded = false;
	gif.length = 1;
	gif.time = 0;
	gif.reset = function(time) {
		this.time = 0;
	}
	gif.setFps = function(fps) {
		this.length = this.tex.length / fps;
	}
	gif.setLength = function(length) {
		this.length = length;
	}
	gif.update = function(time) {
		var f = (time - this.time) % this.length;
		this.frame = Math.floor((f / this.length) * this.tex.length);
	};
	gif.getTexture = function() {
		return this.tex[this.frame];
	}

	// loadImage
	var canvas, ctx;
	var hdr;
	var tcanvas;

	// Do nothing
	var doNothing = function() {};

	// Do header
	var doHdr = function(_hdr) {
		hdr = _hdr;
	};
	
	var doGCE = function(gce) {
		canvas = document.createElement('canvas');
		canvas.width = hdr.width;
		canvas.height = hdr.height;				
		ctx = canvas.getContext('2d');				
	};

	// Do Image
	var doImg = function(img) {
		// Load pixels
		var ct = img.lctFlag ? img.lct : hdr.gct;
		var cData = ctx.getImageData(img.leftPos, img.topPos, img.width, img.height);
		img.pixels.forEach(function(pixel, i) {
			cData.data[i * 4 + 0] = ct[pixel][0];
			cData.data[i * 4 + 1] = ct[pixel][1];
			cData.data[i * 4 + 2] = ct[pixel][2];
			cData.data[i * 4 + 3] = 255;
		});
		ctx.putImageData(cData, img.leftPos, img.topPos);
		ctx.drawImage(canvas, 0, 0, img.width, img.height);

		// Create THREE texture
		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		gif.tex.push(texture);
	};

	var doEof = function(block) {
		gif.loaded = true;
		gif.reset(0);
		if (onload)
			onload();
	}

	// Gif Handler
	var gifHandler = {
		hdr: doHdr,
		gce: doGCE,
		com: doNothing,
		app: { NETSCAPE: doNothing },
		img: doImg,
		eof: doEof,
	};

	var xhr = new XMLHttpRequest();
	xhr.open("GET", img, true);
	xhr.overrideMimeType('text/plain; charset=x-user-defined');
	xhr.onload = function(e) {
		var buffer = xhr.responseText;
		parseGIF(new Stream(buffer), gifHandler);
	};
	xhr.send(null);

	return gif;
}
