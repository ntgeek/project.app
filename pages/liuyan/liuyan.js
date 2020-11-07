const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIdx:0,
    like:123,
    door:0,
    current:0,
    imgurl:"../../images/like1.png",
    index:0,
    pinglun:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
 
    },
    function(){
      var _this = this
      wx.request({
        url: 'https://api.pomelo072.top/msg/add',
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        success: function (res) {
          self.setdata({
            proList: res.data
          })
        }
    })
  },
  
  goback:function(){
    wx.switchTab({
      url: '../home/home',
    })
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
    var that=this;
    wx.request({
      url: 'https://api.pomelo072.top/msg/list',
      data:{
        type:"well",
        pages:"1",
        pagesize:"20"
      },
      success:function(res){
    that.setData({
      list:res.data.Data,
    })
  }}),
    wx.request({
      url: 'https://api.pomelo072.top/msg/list',
      data:{
        type:"time",
        pages:"1",
        pagesize:"20"
      },
      success:function(res){
    that.setData({
      list1:res.data.Data,
      USERID:app.USERID,
      REPLYNAME:app.username,
    })
  }})
  this.setData({
    msgid1:that.data.list1.msg_id,
    msgid:that.data.list.msg_id
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
    wx.reLaunch({
      url: '../liuyan/liuyan',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  
  cm1(e){
    this.setData({
      comment:e.detail.value
    })
    var that=this;
  if(app.USERID==""){
      wx.showModal({
        title:"民大应援,点亮地图",
        content:"请先填写个人信息",
        success:function(res){
          if(res.confirm){
            wx.switchTab({
              url: "/pages/information/information",
            }),
             console.log('弹框后点取消')
          }
          else{
             console.log('弹框后点取消')
          }}
       })
  }
 else{ 
  if(e.detail.value=="")
  { wx.showModal({
   title:"民大应援,点亮地图",
   content:"评论不得为空",
  })}
   else{
     wx.request({
    url: 'https://api.pomelo072.top/msg/add',
    method:"POST",
    data: {
      REPLYNAME:that.data.REPLYNAME,
      USERID:that.data.USERID,
      REPLYMSG:e.detail.value
    },
    success:function(res){
      wx.showModal({
       title:"民大应援,点亮地图",
       content:"已成功提交评论,正在后台审核请稍后"
      })
      wx.request({
        url: 'https://api.pomelo072.top/msg/list',
        data:{
          type:"well",
          pages:"1",
          pagesize:"20"
        },
        success:function(res){
      that.setData({
        list:res.data.Data,
      })
    }}),
      wx.request({
        url: 'https://api.pomelo072.top/msg/list',
        data:{
          type:"time",
          pages:"1",
          pagesize:"20"
        },
        success:function(res){
      that.setData({
        list1:res.data.Data
      })
    
    }})
  that.setData({
    list:res.data.Data,
  })

}})
  }}},
  doSomething(){
    app.$$data.username="username";
      app.$$data.USERID="USERID";
  },
  onbindfocus(e) {
    console.log(e)
    this.setData({
        bottom: e.detail.height,
    })
},
  onReachBottom: function () {

  },
  f1(){
this.setData({current:0})
  },
  f2(){
this.setData({current:1})
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  f5(){
    var that=this;
    if(app.USERID==""){
    wx.showModal({
      title:"民大应援,点亮地图",
      content:"请先填写信息"
    })}
    else{
    if(this.data.door==0){
    this.setData({
        door:1,
        imgurl:"../../images/like.png"
    })
    wx.request({
      url: 'https://api.pomelo072.top/msg/well',
      data:{
        type:"time",
        pages:"1",
        pagesize:"20"
      },
      success:function(res){
    that.setData({
      list1:res.data.Data
    })
  }})}
    else{
      wx.showToast({
        title: "您已经点赞过了!",
      })
  }}}
})
