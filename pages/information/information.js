// pages/information/information.js
let isInitSelfshow=true;
const app = getApp()
Page({
  data: {
    array1:["数学与统计学学院","外语学院","管理学院","电子信息工程学院","计算机科学学院","民族与社会学学院","教育学院","公共管理学院","马克思主义学院","资源环境学院","生科学院","体育学院","预科学院"],
    gifUrl:"",
    index:"",
    activeIdx:2,
    ishide:true,
    change:2,
    usernumber:"",
    college:"",
    region: "",
    userName:""
  },
try:function(e){
  this.setData({
    index:e.detail.value,

  })
},
storage:function(e){
this.setData({
  userName:e.detail.value
})
},
uNumber(e){
  this.setData({ usernumber: e.detail.value });
},
gifImgLoad(e) {
  var gifurl = this.data.gifUrl;
  var nowTime = +new Date();
  setTimeout(() => {
    this.setData({
      gifUrl: gifurl + '?' + nowTime
  })
}, 1000)},
changeRegin(e){
  this.setData({ region: e.detail.value });
},
  /**
   * 生命周期函数--监听页面加载
   */
  
  f1:function(){
    var that=this;
    if(that.data.index!=""&&that.data.region!=""&&that.data.userName!=""&&that.data.id!=""&&that.data.userName!=""){
    wx.request({
      url: 'https://api.pomelo072.top/personal/edit',
      method:"POST",
      data: {
        NAME:that.data.userName,
        SCUECID:that.data.usernumber,
        ADDRESS:that.data.region[1],
        USERID:that.data.id,
        COLLEGE:that.data.index
      },     
      success:function(res){ 
        console.log(that.data.region[1]);
        wx.showToast({
        title: '您已经填写信息成功',
        icon:"success",duration:3000,
      })
      app.username=that.data.userName;
      app.change=2;
      app.USERID=that.data.id;
    }
    })
  }
  else{
      wx.showToast({
      title: '信息未填写完整',
      icon:"loading",duration:500,
      success:{

      }
    })
  }
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  
  onReady: function () {

  },

  onShow:function(){
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.pomelo072.top/personal/login',
            data: {
              code: res.code,
            },
            success:function(res){
          that.setData({
            list:res.data,
            id:res.data.Data.USERID
          })
            }
          })
        
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

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

  }
})