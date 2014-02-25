var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;
var _gamepad = {
	vars: {'gamepads':[]},
	init: function(){
		//window.addEventListener("gamepadconnected", connecthandler);
		//window.addEventListener("gamepaddisconnected", disconnecthandler);
		_gamepad.animationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;
		if(navigator.webkitGetGamepads){setInterval(_gamepad.scanGamepads,500);}
	},
	animationFrame: false,
	updateStatus: function(){
		if(navigator.webkitGetGamepads){_gamepad.scanGamepads();}
		for(j in _gamepad.vars.gamepads){
			var controller = _gamepad.vars.gamepads[j];

//FIXME: no siempre va a ser este personaje
if(j == 0){
var charElem = $_('main');
}
if(j == 1){
var charElem = $_('test');
}

    var d = document.getElementById("controller" + j);
if(!d){continue;}
    var buttons = d.getElementsByClassName("button");
			for(var i=0;i<controller.buttons.length;i++){
				var b = buttons[i];
				var val = controller.buttons[i];
				var pressed = val == 1.0;
				if(typeof(val) == "object"){pressed = val.pressed;val = val.value;}
				if(i == 0 && pressed){
_char.jumpStart(charElem);
				}

				if(pressed){b.className = "square button pressed";}else{b.className = "square button";}
			}

			var axes = d.getElementsByClassName("axis");
			for(var i=0;i<controller.axes.length;i++){
				var a = Math.abs(controller.axes[i]);
				if(i == 0 && a > 0.2){
					if(controller.axes[i] > 0){_char.moveLeft(charElem,a);}
					else{_char.moveRight(charElem,a);}
				}

				/* Update api */
				var a = axes[i];
				a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
				a.setAttribute("value", controller.axes[i] + 1);
			}
		}
		rAF(_gamepad.updateStatus);
	},
	scanGamepads: function(){
		var gamepads = navigator.webkitGetGamepads();
		for(var i = 0;i < gamepads.length;i++){
			if(!gamepads[i]){return false;}
			if(!(gamepads[i].index in _gamepad.vars.gamepads)){return _gamepad.addGamepad(gamepads[i]);}
		}
	},
	addGamepad: function(gamepad) {
		_gamepad.vars.gamepads[gamepad.index] = gamepad;

		if(gamepad.index+1 > _options.get.players()){return false;}
//FIXME: lanzar evento
		var c = document.querySelector('.option-controllers');if(!c){return false;}

		var d = $C('DIV',{className:'controller','id':'controller'+gamepad.index},c);
		var t = $C('DIV',{className:'controller-id',innerHTML:'gamepad:'+gamepad.id},d);
		var b = $C('DIV',{className:'buttons'},d);
		for(var i=0;i<gamepad.buttons.length;i++){var e = $C('SPAN',{innerHTML:i},$C('SPAN',{className:'square button button'+i},b));}

		var b = $C('DIV',{className:'axes axes'+gamepad.axes.length},d);
		for(var i=0;i<gamepad.axes.length;i++){
    var e = $C('progress',{className:'axis'},b);
    e.setAttribute("max", "2");
    e.setAttribute("value", "1");
  }

		rAF(_gamepad.updateStatus);
	},
	onGamepadConnect: function(event){
		if(!event.gamepad){return false;}
alert(1);
		//gamepad.vars.gamepads.push(event.gamepad);
		//gamepadSupport.startPolling();
	}
};
//addEventListener('load',_gamepad.init);
