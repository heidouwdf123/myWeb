/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(nowGraTime,nowSelectCity) {
  var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
  var objItemNum = 0,width1,max = 1;
  var hei = [];
  for(var ele in chartData[nowGraTime][nowSelectCity]){
    ++objItemNum;
    max = max < chartData[nowGraTime][nowSelectCity][ele] ? chartData[nowGraTime][nowSelectCity][ele]:max;
  } 
  width1 = 1400/objItemNum;
  var c1 = 0;
  for(var ele in chartData[nowGraTime][nowSelectCity]){
    var div = document.createElement('div');
    div.className = 'div1';
    hei[c1] = 400 * chartData[nowGraTime][nowSelectCity][ele] / max;
    div.style.width = width1 + 'px';
    div.style.height = 0 + 'px';
    div.style.left = c1 * (width1+Math.ceil(width1/4)) + 15 + 'px';
    ++c1;
    aqiChartWrap.appendChild(div);
    // console.log(div);
  } 
  setTimeout(function(){
    var div1Elements = document.getElementsByClassName('div1');
    for(var i = 0,len = div1Elements.length;i < len;i++){
      div1Elements[i].style.transition = 'height ' + 0.7 + 's';
      div1Elements[i].style.height = hei[i] + 'px';
    }
  },0);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
  // 确定是否选项发生了变化 
  if(pageState.nowGraTime != value){
    pageState.nowGraTime = value;
  }
  // 设置对应数据
  // 调用图表渲染函数
  var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
  aqiChartWrap.innerHTML = '';
  renderChart(pageState.nowGraTime,pageState.nowSelectCity);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(value1) {
  // 确定是否选项发生了变化 
  if(pageState.nowSelectCity != value1){
    pageState.nowSelectCity = value1;
  }
  // 设置对应数据
  console.log(pageState);
  // 调用图表渲染函数
  var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
  aqiChartWrap.innerHTML = '';
  renderChart(pageState.nowGraTime,pageState.nowSelectCity);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var formGraTime = document.getElementById('form-gra-time');
  formGraTime.onclick = function(e){
      for(var ele in chartData){
        if(ele == e.target.value){
           graTimeChange(e.target.value);
        }
      }
  }; 
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById('city-select');
    for(var ele in aqiSourceData){
        citySelect.add(new Option(ele,ele));    
    }   
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange = function(e){
    for(var ele in aqiSourceData){
      if(ele == e.target.value){
        citySelectChange(e.target.value);
      }
    }
  };
}

/**
 * 初始化图表需要的数据格式
 */
var obj = {};
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式

  var objTemp = {}, objTemp1 = {};
  var temp, temp1, weekNum, monthNum, count, count1, wek, mon, monStr, preMonStr;
  // week data and month data
  for(var oneCity in aqiSourceData){
    count = 1,count1 = 0;
    wek = 1, mon = 1;
    weekSum = 0, monthSum = 0;
    monStr = '',preMonStr = '2016-01';
    temp = {};
    temp1 = {};
    weekNum = 0;
    monthNum = 0;
    for(var oneDate in aqiSourceData[oneCity] ){
      monStr = oneDate.substring(0,7);
      if (monStr == preMonStr){
          monthSum += aqiSourceData[oneCity][oneDate]; 
      }else{       
        temp1[preMonStr] = monthSum;
        preMonStr = monStr;
        monthSum = aqiSourceData[oneCity][oneDate];
      }
      weekSum += aqiSourceData[oneCity][oneDate];
      if(count == 7){
        weekNum = '第' + wek + '周';
        temp[weekNum] = weekSum;
        weekSum = 0;
        count = 0;
        ++wek;
      }
      ++count;    
    }
    temp1[preMonStr] = monthSum;
    objTemp[oneCity] = temp;

    obj['week'] = objTemp; 
    objTemp1[oneCity] = temp1;
    obj['month'] = objTemp1;
  }
  obj['day'] = aqiSourceData;
  // 处理好的数据存到 chartData 中
  chartData = obj;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart(pageState.nowGraTime,pageState.nowSelectCity);
}

init();
