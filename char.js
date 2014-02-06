var _char = {
	vars: {'index':{}},
	create: function(id,params){
		var holder = $_('chars');
		var charElem = $C('DIV',{'id':id,'className':'char'},holder);
		if(!params){params = {};}
//FIXME: depender de params.body para el estilo

		_canvas.imageLoad('chars/body.png',function(img){
			var fwidth = img.width*_starbound.vars.zoom;
			var fheight = img.height*_starbound.vars.zoom;
			var canvas = $C('CANVAS',{className:'body','width':fwidth,'height':fheight},charElem);
			var ctx = _canvas.getContext(canvas);
			ctx.webkitImageSmoothingEnabled = false;
			ctx.mozImageSmoothingEnabled = false;
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(img,0,0,fwidth,fheight);
			_char.arm.load(charElem);
			_char.init(charElem,params);
		});
	},
	init: function(charElem,params){
		if(!params.x){params.x = 100;}
		if(!params.y){params.y = 300;}
		charElem.positionX = params.x;
		charElem.positionY = params.y;
		charElem.velocityY = 0;
		charElem.velocityX = 0;
		charElem.intervals = {};
		charElem.listeners = {};
		charElem.functions = {};
		charElem.intervals.update = setInterval(function(){_char.update(charElem);},30);
	},
	moveLeft: function(charElem){
		charElem.velocityX = +10.0;
	},
	moveRight: function(charElem){
		charElem.velocityX = -10.0;
	},
	moveStop: function(charElem){
		//charElem.velocityX = 0;
	},
	jumpStart: function(charElem){
		charElem.velocityY = -16.0;
		charElem.onGround = false;
	},
	jumpEnd: function(charElem){
		if(charElem.velocityY < -6.0){charElem.velocityY = -6.0;}
	},
	update: function(charElem){
		charElem.velocityY += _starbound.vars.gravity;
if(charElem.velocityX && !_starbound.vars.keymap[65] && !_starbound.vars.keymap[68]){
if(charElem.velocityX > 0){charElem.velocityX -= 1;}
if(charElem.velocityX < 0){charElem.velocityX += 1;}
}
		charElem.positionY += charElem.velocityY;
		charElem.positionX += charElem.velocityX;
		if(charElem.positionY >= 300.0){
			charElem.positionY = 300.0;
			charElem.velocityY = 0.0;
			charElem.onGround = true;
			//clearInterval(charElem.intervalJump);
		}
    
		//if(charElem.positionX < 10 || charElem.positionX > 190){charElem.velocityX *= -1;}
		//if(charElem.positionX < 10 || charElem.positionX > 190){charElem.velocityX *= -1;}
$_('log').innerHTML = charElem.velocityX+' '+charElem.positionX;
		charElem.style.left = charElem.positionX+'px';
		charElem.style.top = charElem.positionY+'px';
	}
}

_char.arm = {
	load: function(charElem){
		_canvas.imageLoad('chars/arm.png',function(img){
			var fwidth = img.width*_starbound.vars.zoom;
			var fheight = img.height*_starbound.vars.zoom;
			var canvas = $C('CANVAS',{className:'arm','width':fwidth,'height':fheight},charElem);
			var ctx = _canvas.getContext(canvas);
			ctx.webkitImageSmoothingEnabled = false;
			ctx.mozImageSmoothingEnabled = false;
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(img,0,0,fwidth,fheight);

			canvas.style.left = '0px';
			canvas.style.top = '37px';
			charElem.appendChild(canvas);
			charElem.arm = canvas;
			charElem.arm.style.transformOrigin = '15px 6px';
			charElem.arm.style.webkitTransformOrigin = '15px 6px';

			_char.arm.followMouseEnable(charElem);
		});
	},
	followMouseEnable: function(charElem){
//FIXME: hay que sumar las posiciones de centrado del brazo multiplicado por el zoom
//FIXME: cachearlas en charElem
		if(!charElem.functions.armFollowMouse){charElem.functions.armFollowMouse = function(e){
			var p1 = [charElem.offsetLeft+charElem.arm.offsetLeft,charElem.offsetTop+charElem.arm.offsetTop];
			var p2 = [e.clientX,e.clientY];
			var dY = p1[1] - p2[1];
			var dX = p1[0] - p2[0];
			var an = Math.atan2(dY,dX)*180/Math.PI;
			charElem.arm.style.transform = 'rotate('+(an+90)+'deg)';
			charElem.arm.style.webkitTransform = 'rotate('+(an+90)+'deg)';
		};}
		charElem.listeners.armFollowMouse = addEventListener('mousemove',charElem.functions.armFollowMouse);
	},
	followMouseDisable: function(charElem){
		removeEventListener('mousemove',charElem.functions.armFollowMouse,false);
		charElem.listeners.armFollowMouse = false;
	},
}
