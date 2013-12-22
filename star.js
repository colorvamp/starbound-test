var _starbound = {
	vars: {zoom:3,gravity:0.5,keymap:{}},
	init: function(event){
		addEventListener('keydown',_starbound.onkeydown);
		addEventListener('keyup',_starbound.onkeyup);
_char.arm.load();
	},
	onkeydown: function(e){
		//alert(e.which);
		switch(e.which){
			case 32:
				e.preventDefault();
				if(_starbound.vars.keymap[e.which]){return false;}
				_starbound.vars.keymap[e.which] = true;
var charElem = $_('char1');
				_char.jumpStart(charElem);
				break;
			case 73:
				var elem = document.querySelector('.inventory');if(!elem){return false;}
				var p = ($E.classHas(elem,'hidden')) ? $E.classRemove(elem,'hidden') : $E.classAdd(elem,'hidden');
				break;
		}
	},
	onkeyup: function(e){
		//alert(e.which);
		switch(e.which){
			case 32:
				e.preventDefault();
				_starbound.vars.keymap[e.which] = false;
var charElem = $_('char1');
				_char.jumpEnd(charElem);
				break;
		}
	},
};

addEventListener('load',_starbound.init);
