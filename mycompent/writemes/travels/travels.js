const wxRequest = require('../../../utils/promise-util.js');
const forMatTime = require('../../../utils/util.js');
var app = getApp();
var flag = false;

Component({
  /**
   * 组件的属性列表
   */



  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    travelId: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: String,
    html:null,
    flag:false

  },


  attached () {

    var tid = this.properties.travelId
    var that = this

    wx.getStorage({
      key: String('content' + tid),

      fail: function(res) {
        wxRequest.getRequest(app.globalData.get_travel_content + that.properties.travelId, null).then(res => {
          console.log(res.content)
          that.setData({
            html: res.content,
            title:res.title,
            flag:true
          })
          wx.setStorage({
            key: String('content' + tid),
            data: res
          })
          
        })
      },

      success: function(res) {
        console.log(res.data.content)
        that.setData({
          html: res.data.content,
          title: res.data.title,
          flag: true
        })
      }
    })
  },


  methods: {

    stepslast(e) {
        var mes = {
          'num': 1,
        }
        this.triggerEvent('gopublish', mes, {}) 
    },


    stepsnext(e) {
        var mes = {
          'num': 3,
        }
        this.triggerEvent('gopublish', mes, {})
    },


    goedit(){
      var title=this.data.title
      var tid = this.properties.travelId
      wx.navigateTo({
        url: `/pages/edittravels/index?title=${title}&&tid=${tid}`,
      })
    }
  }
})