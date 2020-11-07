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
    imgurl:[],
    imgurl1:[],
    index:0,
    pinglun:"",
    arr:[],
    arr1:[],
    url:"../../images/like1.png",
    url1:"../../images/like.png",
    l:[],
    l1:[]
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
    for(var i=0;i<that.data.list1.length;i++){
      that.setData({
        'arr1':that.data.arr1.concat(that.data.list1[i].msg_id),
        'imgurl1':that.data.imgurl1.concat(that.data.url),
        'l1':that.data.l1.concat(0),
    })}
    for(var i=0;i<that.data.list.length;i++){
      that.setData({
        'arr':that.data.arr.concat(that.data.list[i].msg_id),
        'imgurl':that.data.imgurl.concat(that.data.url),
        'l':that.data.l.concat(0),
    })}
    
  }})
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
  f5(e){
    var id =e.currentTarget.dataset.id;
    var that=this;
    let arr=that.data.arr;
    let a=that.data.current;
    if(app.USERID==""){
    wx.showModal({
      title:"民大应援,点亮地图",
      content:"请先填写信息"
    })}
    else{
    if(this.data.l[id]=="0" || this.data.l1[id]=="0"){
    this.setData({
      [`l[${id}]`]:1,
      [`l1[${id}]`]:1,
    })
    if(a==0){
    wx.request({
      url: 'https://api.pomelo072.top/msg/well',
      data:{
        msg_id:that.data.arr[id],
        username:app.username
      },
      success:function(res){
    that.setData({
      [`imgurl[${id}]`]:'../../images/like.png',
      [`list[${id}].replywell`]:that.data.list[id].replywell+1
    })
  }})}
  else{wx.request({
    url: 'https://api.pomelo072.top/msg/well',
    data:{
      msg_id:res.data.arr1[id],
      username:app.username
    },
    success:function(res){
  that.setData({
    [`imgurl1[${id}]`]:'../../images/like.png',
    [`list1[${id}].replywell`]:that.data.list1[id].replywell+1
  })
}})}
}
    else{
      wx.showToast({
        title: "您已经点赞过了!",
      })
  }}}
})
