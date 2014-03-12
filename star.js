var q = false;
var rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;
var _starbound = {
	vars: {zoom:3,gravity:0.8,players:[],keymap:{}},
	init: function(event){
		_options.init();
		addEventListener('keydown',_starbound.onkeydown);
		addEventListener('keyup',_starbound.onkeyup);
		$dropdown.init();
		_gamepad.init();
		//FIXME: por poner algo
		q = new _quadtree(2000,2000);
localStorage.name = 'star';

		var x = 100;
//FIXME
		for(var i = 0;i < 1;i++){
			var id = new Date().getTime();
			_starbound.player.add(id,x,200);
			x += 200;
		}
_starbound.weather.cloud.init();
_starbound.paintMap();
	},
	paintMap: function(){
		var h = document.querySelector('.map-fg');
		for(var y in map){for(var x in map[y]){
			if(!map[y][x].tile){continue;}
			//alert(map[y][x].tile);
			q.insert({'x':(x*24),'y':(y*24),'w':24,'h':24,'elem':
				$C('IMG',{'.top':(y*24)+'px','.left':(x*24)+'px',src:'assets/wood/plank.1.png'},h)
			});
		}}
	},
	player: {
		add: function(id,x,y){
			var charElem = _char.create(id,{'x':x,'y':y});
			_starbound.vars.players.push(charElem);
		},
		get: {
			main: function(){if(_starbound.vars.players.length < 1){return false;}return _starbound.vars.players[0];},
			second: function(){if(_starbound.vars.players.length < 2){return false;}return _starbound.vars.players[1];},
		}
	},
	onkeydown: function(e){
		//alert(e.which);
var charElem = _starbound.player.get.main();
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
var charElem = _starbound.player.get.main();
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
