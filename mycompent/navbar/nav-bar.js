const app = getApp();
const wxRequest = require('../../utils/promise-util.js');
const forMatTime = require('../../utils/util.js');
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true

  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    userhead:String,
    username:String,
    isfollow:Boolean,
    userid:String,
    releaseTime: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom

  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },

 

    isFollow() {
      
      var that=this
      if (that.properties.isfollow== false) {
        wxRequest.getRequest(app.globalData.isFollowadd + that.properties.userid, null).then(res => {
        
          that.setData({
            isfollow: true
          })
        })
      } else {

        wx.showModal({
          title: '操作提醒',
          content: '确定要对 '+this.properties.username+' 取消关注吗？',
          success(res) {
            if (res.confirm) {
              wxRequest.getRequest(app.globalData.isFollowcancel + that.properties.userid, null).then(res => {
                that.setData({
                  isfollow:false
                })
              })
            } else if (res.cancel) {
              console.log('用户点击取消操作')
            }
          }
        }) 
      }

    }
  }
})