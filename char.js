var _char = {
	init: function(charElem){
//FIXME: hardcoded
		charElem.positionX = 100;
		charElem.positionY = 300;
		charElem.velocityY = 0;
		charElem.velocityX = 0;
		charElem.intervals = {};
		charElem.intervals.update = setInterval(function(){_char.update(charElem);},33);
	},
	moveLeft: function(charElem){
		charElem.velocityX = +10.0;
	},
	moveRight: function(charElem){
		charElem.velocityX = -10.0;
	},
	moveStop: function(charElem){
		charElem.velocityX = 0;
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
	load: function(){
		var charElem = $_('char1');
		_canvas.imageLoad('chars/arm.png',function(img){
			img.style.width = (img.width*_starbound.vars.zoom)+'px';
			img.style.left = '0px';
			img.style.top = '37px';
			charElem.appendChild(img);
			charElem.arm = img;
			charElem.armFollowMouse = addEventListener('mousemove',function(e){_char.arm.followMouse(e,charElem);});
		});
	},
	followMouse: function(e,charElem){
//FIXME: hay que sumar las posiciones de centrado del brazo multiplicado por el zoom
//FIXME: cachearlas en charElem
		var p1 = [charElem.offsetLeft+charElem.arm.offsetLeft,charElem.offsetTop+charElem.arm.offsetTop];
		var p2 = [e.clientX,e.clientY];
		var dY = p1[1] - p2[1];
		var dX = p1[0] - p2[0];
		var an = Math.atan2(dY,dX)*180/Math.PI;
		charElem.arm.style.transformOrigin = '15px 6px';
		charElem.arm.style.transform = 'rotate('+(an+90)+'deg)';
	}
}
