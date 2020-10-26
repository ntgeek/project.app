const app = getApp()
var template = require('../../template/tab.js');
import * as echarts from '../../ec-canvas/echarts'; //导入组件
import geoJson from './mapData.js';  //导入中国地图信息
var geoCoordMap = {     //绘制gps坐标，作用于散点图
  '台湾': [121.5135,25.0308],
  '黑龙江': [127.9688, 45.368],
  '内蒙古': [110.3467, 41.4899],
  "吉林": [125.8154, 44.2584],
  '北京': [116.4551, 40.2539],
  "辽宁": [123.1238, 42.1216],
  "河北": [114.4995, 38.1006],
  "天津": [117.4219, 39.4189],
  "山西": [112.3352, 37.9413],
  "陕西": [109.1162, 34.2004],
  "甘肃": [103.5901, 36.3043],
  "宁夏": [106.3586, 38.1775],
  "青海": [101.4038, 36.8207],
  "新疆": [87.9236, 43.5883],
  "西藏": [91.11, 29.97],
  "四川": [103.9526, 30.7617],
  "重庆": [108.384366, 30.439702],
  "山东": [117.1582, 36.8701],
  "河南": [113.4668, 34.6234],
  "江苏": [118.8062, 31.9208],
  "安徽": [117.29, 32.0581],
  "湖北": [114.3896, 30.6628],
  "浙江": [119.5313, 29.8773],
  "福建": [119.4543, 25.9222],
  "江西": [116.0046, 28.6633],
  "湖南": [113.0823, 28.2568],
  "贵州": [106.6992, 26.7682],
  "云南": [102.9199, 25.4663],
  "广东": [113.12244, 23.009505],
  "广西": [108.479, 23.1152],
  "海南": [110.3893, 19.8516],
  '上海': [121.4648, 31.2891],
  '香港':[114.204522,22.263085],
  '澳门':[113.58206,22.14282],
};
var convertData = function(data) { //将坐标取到数组里
  var res = [];
  for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
          res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
          });
      }
  }
  return res;
};
function randomData() {
  return Math.round(Math.random() * 1000);
} //随机生成数据，因为没有后台接口- -。
function initChartMap(canvas, width, height) {
  let myMap = echarts.init(canvas, null, {
    width: width,
    height: height
  });//绘制地图入口函数
  canvas.setChart(myMap);
  echarts.registerMap('china', geoJson);  // 绘制中国地图
 
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: "#FFF", //文本框的背景颜色
      padding: [   //文本的位置
        10,  // 上
        15, // 右
        8,  // 下
        15, // 左
      ],
      extraCssText: 'box-shadow: 2px 2px 10px rgba(21, 126, 245, 0.35);',//文本框
      textStyle: {  ////点击后出现的文本的样式
        fontFamily: "'Microsoft YaHei', Arial, 'Avenir', Helvetica, sans-serif",
        color: '#005dff', 
        fontSize: 12,
      },
      //点击后出现的文本
      formatter: `{b} :  {c}次点亮`
    },
    geo: [
      {
        // 地理坐标系组件
        map: "china",
        roam: true, // 可以缩放和平移
        aspectScale: 0.8, // 比例true
        layoutCenter: ["50%", "38%"], //中心的position位置
        layoutSize: 370, // 地图大小
        label: {
          // 图形上的文本标签
          normal: {
            show: false,
            textStyle: {
              color: "rgba(0, 0, 0, 0.9)",
              fontSize: '8'
            }
          }},
          emphasis: { // 高亮时的地图上的文本样式
            label: {
              show: true,//选中状态是否显示省份名称
          },
          areaColor:" #90c31d",
       
        },

        itemStyle: {
          // 图形上的地图区域
          normal: {
            borderColor: "rgba(0,0,0,0.2)", //边界之间的颜色样式
            areaColor: "rgb(156,198,185)"  //整个地图的颜色
          },
          emphasis:{ areaColor:" #90c31d"}, 
        },
        visualMap: {
          show: true,
          min: 0,
          max: 100,
          left: 'left',
          top: 'bottom',
          realtime:false,
          calculable: true, // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
          hoverLink: false,
          text: ['high',"low"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // inRange (object)定义 在选中范围中 的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）1、symbol: 图元的图形类别。2、symbolSize: 图元的大小。3、color: 图元的颜色。4、colorAlpha: 图元的颜色的透明度。5、opacity: 图元以及其附属物（如文字标签）的透明度。6、
            color: ['#0494e1', '#004098']
        }
      }}],
      series: [
   {
     name: '散点',
     type: 'scatter',
     coordinateSystem: 'geo',
    // data: convertData(data),
     symbolSize: function(val) {
         return val[2] / 100;
     },
     label: {
         normal: {
             formatter: '{b}',
             position: 'left',
             show: false,
             textStyle: {
               color: "rgba(0, 0, 0, 0.9)",
               fontSize: '8'
             }
         },
         emphasis: {
             show: true,
             textStyle: {
               color: "rgba(0, 0, 0, 0.9)",
               fontSize: '8'
             }
         }
     },
     itemStyle: {
         normal: {
             color: '#FFD700'
         }
     }
 },
 
   {
     type: 'map',
     mapType: 'china',
     geoIndex: 0,
     roam: false, // 鼠标是否可以缩放
     label: {
       normal: {
         show: false,
       },
       emphasis: {
         show: false
       }
     },
     itemStyle: {
       normal: {
           color: '#05C3F9',
           fontSize: '8'
       },
     },
    // data:citydata
 },

 
 {
   name: '气泡点',
   type: 'scatter',
   coordinateSystem: 'geo',
   symbol: 'pin', //气泡
   symbolSize: function(val) {
       var a = (maxSize4Pin - minSize4Pin) / (max - min);
       var b = minSize4Pin - a * min;
       b = maxSize4Pin - a * max;
       return (a * val[2] + b)/3;
   },
   label: {
       normal: {
           show: false,
           textStyle: {
               color: '#fff',
               fontSize: 8,
           }
       },
       formatter: '{@[6]}',
   },
  
   itemStyle: {
       normal: {
           color: '#F62157', //标志颜色
           fontSize: 8,
       }
   },
   //zlevel: 6,
  // data: convertData(citydata.sort(function(a, b) {return b.value - a.value;})),
},

{
   name: 'Top 5',
   type: 'effectScatter',
   coordinateSystem: 'geo',
   //data: convertData(citydata.sort(function(a, b) {return b.value - a.value; }).slice(0, 5)),
   symbolSize: function(val) {
       return val[2]/80;
   },
   showEffectOn: 'render',
   rippleEffect: {
       brushType: 'stroke'
   },
   hoverAnimation: true,
   label: {
       normal: {
           formatter: '{b}',
           position: 'right',
           show: false
       }
   },
  
   endcode:{
     label:2
   },
   itemStyle: {
       normal: {
           color: 'yellow',
           shadowBlur: 10,
           shadowColor: 'yellow'
       }
   },
  // zlevel: 1
}],
 // data:citydata
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        type: 'map',
        mapType: 'china',
        geoIndex: 0,
        roam: false, // 鼠标是否可以缩放
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        
        //设置弹窗数据，要从后台接入数据
        data: [
          { name: '北京', value: randomData(),seleted:true },
          { name: '天津', value: randomData() },
          { name: '上海', value: randomData() },
          { name: '重庆', value: randomData() },
          { name: '河北', value: randomData() },
          { name: '河南', value: randomData() },
          { name: '云南', value: randomData() },
          { name: '辽宁', value: randomData() },
          { name: '黑龙江', value: randomData() },
          { name: '湖南', value: randomData() },
          { name: '安徽', value: randomData() },
          { name: '山东', value: randomData() },
          { name: '新疆', value: randomData() },
          { name: '江苏', value: randomData() },
          { name: '浙江', value: randomData() },
          { name: '江西', value: randomData() },
          { name: '湖北', value: randomData() },
          { name: '广西', value: randomData() },
          { name: '甘肃', value: randomData() },
          { name: '山西', value: randomData() },
          { name: '内蒙古', value: randomData() },
          { name: '陕西', value: randomData() },
          { name: '吉林', value: randomData() },
          { name: '福建', value: randomData() },
          { name: '贵州', value: randomData() },
          { name: '广东', value: randomData() },
          { name: '青海', value: randomData() },
          { name: '西藏', value: randomData() },
          { name: '四川', value: randomData() },
          { name: '宁夏', value: randomData() },
          { name: '海南', value: randomData() },
          { name: '台湾', value: randomData() },
          { name: '香港', value: randomData() },
          { name: '澳门', value: randomData() },
          {name:"南沙诸岛",value: randomData()}
        ]
      }]
  };
 
  myMap.setOption(option);
  return myMap
}

Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    ecMap:{
      onInit:initChartMap
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 0, this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }})