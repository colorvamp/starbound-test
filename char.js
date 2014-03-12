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
		});

		_char.init(charElem,params);
		return charElem;
	},
	init: function(charElem,params){
		if(!params.x){params.x = 100;}
		if(!params.y){params.y = 300;}
		extend(charElem,{w:51,h:96,bottom:0,right:0,onGround:false});
		charElem.positionX = params.x;
		charElem.positionY = params.y;
		charElem.velocityY = 0;
		charElem.velocityX = 0;
		charElem.intervals = {};
		charElem.listeners = {};
		charElem.functions = {};
		//charElem.intervals.update = setInterval(function(){_char.update(charElem);},30);
		rAF(function(){_char.update(charElem);});
	},
	moveLeft: function(charElem,perc){
		charElem.velocityX = +(10.0*perc);
	},
	moveRight: function(charElem,perc){
		charElem.velocityX = -(10.0*perc);
	},
	moveStop: function(charElem){
		//charElem.velocityX = 0;
	},
	jumpStart: function(charElem){
		if(!charElem.onGround){return false;}
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
			if(Math.abs(charElem.velocityX) < 0.9){charElem.velocityX = 0;}
		}

		charElem.positionY += charElem.velocityY;
		charElem.positionX += charElem.velocityX;
		/* update character relative positions */
		extend(charElem,{'top':charElem.positionY,'right':charElem.positionX+charElem.w,'bottom':charElem.positionY+charElem.h,'left':charElem.positionX});


		/* retrieve all objects in the bounds of the hero */
		var blocks = q.retrieve({x:charElem.positionX-1,y:charElem.positionY-1,w:charElem.w+2,h:charElem.h+2});
		/* Vamos a hacer un casting rápido para ver el suelo de nuestro alrededor */
		for(var a in blocks){
//$_('log').innerHTML = charElem.left+' - '+charElem.right;
			blocks[a].elem.style.outline = 0;
			var b = {'left':blocks[a].x,'right':blocks[a].x+blocks[a].w};
			
			if(charElem.bottom >= blocks[a].y && (
				(charElem.left+1 > b.left && charElem.left+1 < b.right) || 
				(charElem.right-1 > b.left && charElem.right-1 < b.right)
			)){
				blocks[a].elem.style.outline = '1px solid red';
				charElem.positionY = parseInt(blocks[a].y-charElem.h);
				extend(charElem,{'top':charElem.positionY,'bottom':charElem.positionY+charElem.h});
				charElem.velocityY = 0.0;
				charElem.onGround = true;
			}
		}

		/* Por seguridad */
		if(charElem.bottom > 900){
			charElem.positionY = 600;
			charElem.velocityY = 0.0;
			charElem.onGround = true;
		}

if(charElem.positionX >= 800.0){
//FIXME: solo el personaje principal
var l = charElem.positionX-800.0;
document.body.scrollLeft = l;
}
    
		charElem.style.left = charElem.positionX+'px';
$_('log').innerHTML = charElem.velocityY;
		charElem.style.top = charElem.positionY+'px';
		rAF(function(){_char.update(charElem);});
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
