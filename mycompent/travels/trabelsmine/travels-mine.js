const forMatTime = require('../../../utils/util.js');
var app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    covermap:String,
    title:String,
    releasetime:String,
    browseVolume:Number,
    commentVolume:Number,
    releaseTime:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    time:String
  },

  /**
   * 组件的方法列表
   */
  methods: {
 
  }
})
