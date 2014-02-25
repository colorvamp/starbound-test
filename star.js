var _starbound = {
	vars: {zoom:3,gravity:0.8,players:{},keymap:{}},
	init: function(event){
		_options.init();
		addEventListener('keydown',_starbound.onkeydown);
		addEventListener('keyup',_starbound.onkeyup);
		$dropdown.init();
		_gamepad.init();
localStorage.name = 'star';

_char.create('main',{'x':100,'y':300});
_char.create('test',{'x':300,'y':300});
_starbound.weather.cloud.init();
	},
	onkeydown: function(e){
		//alert(e.which);
var charElem = $_('main');
		switch(e.which){
			case 32:/* SPACE */
				e.preventDefault();if(_starbound.vars.keymap[e.which]){return false;}_starbound.vars.keymap[e.which] = true;
				_char.jumpStart(charElem);
				break;
			case 65:/* A-KEY */
				e.preventDefault();if(_starbound.vars.keymap[e.which]){return false;}_starbound.vars.keymap[e.which] = true;
				_char.moveRight(charElem,1);
				break;
			case 68:/* D-KEY */
				e.preventDefault();if(_starbound.vars.keymap[e.which]){return false;}_starbound.vars.keymap[e.which] = true;
				_char.moveLeft(charElem,1);
				break;
			case 73:
				var elem = document.querySelector('.inventory');if(!elem){return false;}
				var p = ($E.classHas(elem,'hidden')) ? $E.classRemove(elem,'hidden') : $E.classAdd(elem,'hidden');
				break;
			case 49:/* 1-KEY */
				if(charElem.listeners.armFollowMouse !== false){
_char.arm.followMouseDisable(charElem);
}else{
_char.arm.followMouseEnable(charElem);
}
//				removeEventListener('mousemove',charElem.functions.armFollowMouse,false);
//				charElem.listeners.armFollowMouse = false;
//alert(1);
				break;
		}
	},
	onkeyup: function(e){
		//alert(e.which);
var charElem = $_('main');
		switch(e.which){
			case 32:
				e.preventDefault();_starbound.vars.keymap[e.which] = false;
				_char.jumpEnd(charElem);
				break;
			case 65:/* A-KEY */
				e.preventDefault();_starbound.vars.keymap[e.which] = false;
				_char.moveStop(charElem);
				break;
			case 68:/* D-KEY */
				e.preventDefault();_starbound.vars.keymap[e.which] = false;
				_char.moveStop(charElem);
				break;
		}
	},
};

addEventListener('load',_starbound.init);
