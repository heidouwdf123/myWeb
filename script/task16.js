/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value.trim();
	var aqiValue = document.getElementById('aqi-value-input').value.trim();
	var cityPattern = /^[a-zA-Z\u4e00-\u9fa5 ]{1,20}$/;
	var aqiValuePattern =  /^[0-9]*[1-9][0-9]*$/;
	if(cityPattern.test(city)){
		if(aqiValuePattern.test(aqiValue)){
			aqiData[city] = aqiValue;
		}else{
			alert('空气质量指数必须为正整数');
		}		
	}else{
		if(city.length == 0){
			alert('城市名称不能为空');
		}else{
			alert('城市名称只能为中英文字符！');
		}		
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqiTable = document.getElementById('aqi-table');
	var str =  '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for(var item in aqiData){
	str += '<tr><td>' + item + '</td><td>' + aqiData[item] + '</td><td><button>删除</button></td></tr>';
	}
	aqiTable.innerHTML = (item != undefined)?str:'';
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  	delete aqiData[city];
	renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var addbtn = document.getElementById('add-btn');
    addbtn.onclick = function(e){
    	addBtnHandle();   	
	};
	var tb = document.getElementById('aqi-table');
	tb.onclick = function(e){
		if(e.target.tagName.toLowerCase() === 'button'){
			var city = e.target.parentNode.previousSibling.previousSibling.innerHTML;
			delBtnHandle(city);
		}
	};
}

init();