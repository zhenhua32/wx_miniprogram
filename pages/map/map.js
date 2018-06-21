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
      latitude: 30.74501,
      longitude: 120.75,
      iconPath: '/image/location.png',
      width: 40,
      height: 40,
      // callout: {
      //   content: '原点',
      //   color: '#ffffff',
      //   display: 'ALWAYS',
      //   bgColor: '#ff0000',
      //   padding: 5,
      //   borderRadius: 20,
      // },
    }],
    department: '内科',
    ill: '感冒',
    region: ['浙江省', '嘉兴市', '南湖区']
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
          scale: 14
        })
      },
    })
  },
  chooseLocation: function(e) {
    wx.chooseLocation({
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 14,
          'markers[0].latitude': res.latitude,
          'markers[0].longitude': res.longitude
        })
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
  inputDepartment: function(e) {
    this.setData({
      department: e.detail.value
    })
  },
  inputIll: function(e) {
    this.setData({
      ill: e.detail.value
    })
  },
  regionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  init_mark: function() {
    return {
      id: 1,
      latitude: 30.74501,
      longitude: 120.75,
      iconPath: '/image/location.png',
      width: 40,
      height: 40,
      label: {
        content: '',
        color: '#ffffff',
        bgColor: '#0000ff',
        anchorX: 10,  // 原点是在左上角
        anchorY: -30,
        padding: 5,
        borderRadius: 20,
      }
    }
  },
  findDoctor: function() {
    let department = this.data.department
    let ill = this.data.ill
    let latitude = this.data.latitude
    let longitude = this.data.longitude

    wx.request({
      url: 'https://wx.lawyerstuan.com/test/recommend/doctor',
      method: 'POST',
      header: { 'session_id': 'oEHbW5X5wrlS1QOFqgJEGmSeeRtM'},
      data: {
        ill: this.data.ill,
        department: this.data.department,
        region: this.data.region[0],
        lat: this.data.latitude,
        lng: this.data.longitude
      },
      success: res=> {
        console.log(res)
        let data = res.data.data
        let markers = []
        for (let i=0; i<data.length; i++) {
          let mark = this.init_mark()
          mark['id'] = i 
          mark['latitude'] = data[i]['location']['lat']
          mark['longitude'] = data[i]['location']['lng']
          mark['label']['content'] = data[i]['姓名']
          markers.push(mark)
        }
        this.setData({
          markers: markers,
          scale: 10
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('myMap')
    this.getLocation()
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