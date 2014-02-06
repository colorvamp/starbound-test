_starbound.weather = {
	
};

_starbound.weather.cloud = {
	init: function(params){
		if(!params){params = {};}
		var holder = document.querySelector('.weather');
		_canvas.imageLoad('assets/weather/clouds/cloud1.png',function(img){
			var fwidth = img.width*_starbound.vars.zoom;
			var fheight = img.height*_starbound.vars.zoom;
			var cloudElem = $C('CANVAS',{className:'cloud','width':fwidth,'height':fheight},holder);
			var ctx = _canvas.getContext(cloudElem);
			ctx.webkitImageSmoothingEnabled = false;
			ctx.mozImageSmoothingEnabled = false;
			ctx.imageSmoothingEnabled = false;
			ctx.save();
			ctx.globalAlpha = 0.4;
			ctx.drawImage(img,0,0,fwidth,fheight);
			ctx.restore();

			if(!params.x){params.x = 0;}
			if(!params.y){params.y = 0;}
			extend(cloudElem,{'positionX':params.x,'positionY':params.y,'velocityY':0,'velocityX':0,'intervals':{},'listeners':{},'functions':{}});
cloudElem.velocityX = 4;
			//cloudElem.intervals.update = setInterval(function(){_starbound.weather.cloud.update(cloudElem);},30);
		});
	},
	update: function(cloudElem){
		cloudElem.positionY += cloudElem.velocityY;
		cloudElem.positionX += cloudElem.velocityX;

		cloudElem.style.left = cloudElem.positionX+'px';
		cloudElem.style.top = cloudElem.positionY+'px';
	}
};
