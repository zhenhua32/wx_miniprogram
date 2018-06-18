// pages/map/map.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    scale: 5,
    markers: [{
      id: 1,
      latitude: 0,
      longitude: 0,
      // iconPath: '/image/location.png',
      callout: {
        content: '原点',
        color: '#000',
        display: 'ALWAYS',
        bgColor: 'rgba(0, 0, 0, 0)'
      },
      
    }]
  },
  // 事件绑定函数
  getLocation: function(e) {
    wx.getLocation({
      type: 'gcj02',
      altitude: false,
      success: res => {
        console.log(res)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 18
        })
      },
    })
  },
  chooseLocation: function(e) {
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
      },
    })
  },
  subtractScale: function() {
    if (this.data.scale > 5) {
      this.setData({
        scale: this.data.scale - 1
      })
    } else {
      wx.showToast({
        title: '不能再缩小了',
        icon: 'none'
      })
    }
  },
  addScale: function() {
    if (this.data.scale < 18) {
      this.setData({
        scale: this.data.scale + 1
      })
    } else{
      wx.showToast({
        title: '不能再放大了',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('myMap')
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
  
  }
})