var data = [];
var a;
var stack1 = document.getElementById('stack1');
var tb = document.createElement('table');

function getInput(){
	var num = document.getElementById('num').value;
	return num;
}
function leftInto(){
	a = getInput();
	data.unshift(a);
}

function rightInto(){
	a = getInput();
	data.push(a);
}

function leftOut(){
	a = data.shift();
	document.getElementById('num').innerHTML = a;
}

function rightOut(){
	a = data.pop();
	document.getElementById('num').innerHTML = a;
}

function render(){
	var str = '';
	for(var i = 0;i < data.length;i++){
		str = str + '<td>' + data[i] +'</td>';
	}
	str = '<tr>' + str + '</tr>';
	tb.innerHTML = str;
	stack1.appendChild(tb);
}

function init(){
	var btn1 = document.getElementById('btn1');
	var btn2 = document.getElementById('btn2');
	var btn3 = document.getElementById('btn3');
	var btn4 = document.getElementById('btn4');
	btn1.onclick = function(){
		leftInto();
		render();
	}
	btn2.onclick = function(){
		rightInto();
		render();
	}
	btn3.onclick = function(){
		leftOut();
		render();
	}
	btn4.onclick = function(){
		rightOut();
		render();
	}
	tb.onclick = function(e){
		console.log(e.target);
	}
}
init();