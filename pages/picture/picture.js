// pages/picture/picture.js
var url = require('../../utils/config.js');
var jumpFlag = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,    //控制页面的显示与隐藏
    loadingMore: false,   //加载更多的显示与隐藏
    loadingOver: false,   //加载完的显示与隐藏
    data: [],   //接收接口返回的数据
    color: ['one', 'two', 'three'],  //颜色类名
    pageNum: 1,   //请求的是第几页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    });
   
   this.request();
   console.log(this.data)
  },
  request:function(){
    var self =this;
    var time = new Date().getTime();
    wx.request({
      url: url.imgJoke,
      data:{
        page: this.data.pageNum,
        maxResult: 40   //每页的笑话个数（记录数）
      },
      success:function(e){
        console.log(e);
        var data=e.data.showapi_res_body.contentlist;
        var length=data.length
        if(length == 0){
          self.setData({
            loadingMore: false,
            loadingOver: true
          });

          return;
        };
        var list=self.data.data.concat(data);
        self.setData({
          data:list
        });
        
        wx.hideLoading();
        wx.stopPullDownRefresh();//请求到数据后关闭我们的刷新动画
      }
    })
  },
  //去Html标签
  removeHtml: function (str) {
    return str.replace(/<[^>]+>/g, '');
  },
  jump:function(e){
    if(jumpFlag){
      jumpFlag=false;
      var id=e.currentTarget.id;
      var temp=JSON.stringify(this.data.data[id]);
      var temp = encodeURIComponent(temp);
      wx.navigateTo({
        url: '../picturejpg/picturejpg?data=' + temp,
      })
    }
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
    jumpFlag = true;  //当页面再次显示时，更新一下值
    wx.showToast({
      title: '开发中',
      icon: 'loading'
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
    this.request();   //重新请求数据实现更新
    console.log(11111111)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //当触底事件触发时、让pageNum加1后、请求数据实现加载数据
    this.setData({
      loadingMore: true,
      loadingOver: false,
      pageNum: this.data.pageNum + 1,
    });
    this.request();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})