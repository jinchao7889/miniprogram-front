const wxRequest = require('../../utils/promise-util.js');
const forMatTime = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    piclist: [],
    piclength: 0,
    templist:[],
    controls: false
  },


  onLoad: function(options) {
    this.videoContext = wx.createVideoContext('myvideo', this)

  },

  addpic() {
    var that = this
    const value = wx.getStorageSync('access_token')
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.data.templist = that.data.templist.concat(tempFilePaths[0])

        var data={
          "url": tempFilePaths[0],
          "type":"image"
        }
        console.log(data)
        var list = that.data.piclist
        that.setData({
          piclist: list.concat(data),
          piclength: that.data.piclength + 1
        })
      }
    })
  },
  addvideo(){
    var that=this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePath
        var data = {
          "url": tempFilePaths,
          "type": "video"
        }
        console.log(data)
        var list = that.data.piclist
        that.setData({
          piclist: list.concat(data),
          piclength:that.data.piclength+1
        })
      }
    })
  },

  deletepic(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    console.log('长按了当前的图片，位置为：', index)
    wx.showModal({
      title: '提示',
      content: '是否确定要删除这个图片?',
      success(res) {
        if (res.confirm) {
          that.data.piclist.splice(index, 1) //删除当前选中的数组中的元素 splice(index,len,[item])
          that.setData({
            piclist: that.data.piclist,
            piclength: that.data.piclength - 1
          })
        }
      }
    })

  },

  previewimage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.templist // 需要预览的图片http链接列表  
    })
  },


  allscreen: function (e) {
    this.videoContext.requestFullScreen()
  },

  bindended() {
    this.videoContext.exitFullScreen()
  },

  screenChange(e) {
    let fullScreen = e.detail.fullScreen //值true为进入全屏，false为退出全屏
    if (!fullScreen) { //退出全屏
      this.setData({
        controls: false
      })
      this.videoContext.pause()
    } else { //进入全屏
      this.setData({
        controls: true
      })
    }
  }




})