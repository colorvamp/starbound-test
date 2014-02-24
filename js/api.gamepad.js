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
    var buttons = d.getElementsByClassName("button");
			for(var i=0;i<controller.buttons.length;i++){
				var b = buttons[i];
				var val = controller.buttons[i];
				var pressed = val == 1.0;
				if(typeof(val) == "object"){pressed = val.pressed;val = val.value;}
				if(i == 0 && pressed){
_char.jumpStart(charElem);
				}

				var pct = Math.round(val * 100) + "%"
				b.style.backgroundSize = pct + " " + pct;
				if(pressed){b.className = "button pressed";}else{b.className = "button";}
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

var d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);
  d.setAttribute("class","controller" + gamepad.index);
  var t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
  d.appendChild(t);
  var b = document.createElement("div");
  b.className = "buttons";
  for (var i=0; i<gamepad.buttons.length; i++) {
    var e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    b.appendChild(e);
  }
  d.appendChild(b);
  var a = document.createElement("div");
  a.className = "axes";
  for (var i=0; i<gamepad.axes.length; i++) {
    var e = document.createElement("progress");
    e.className = "axis";
    //e.id = "a" + i;
    e.setAttribute("max", "2");
    e.setAttribute("value", "1");
    e.innerHTML = i;
    a.appendChild(e);
  }
  d.appendChild(a);
  document.body.appendChild(d);

		rAF(_gamepad.updateStatus);
	},
	onGamepadConnect: function(event){
		if(!event.gamepad){return false;}
alert(1);
		//gamepad.vars.gamepads.push(event.gamepad);
		//gamepadSupport.startPolling();
	}
};
addEventListener('load',_gamepad.init);
