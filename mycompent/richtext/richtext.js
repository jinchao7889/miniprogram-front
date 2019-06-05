// mycompent/richtext/richtext.js
var WxParse = require("../../wxParse/wxParse.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rich_data:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready(){

    var temp = WxParse.wxParse('article', 'html', this.properties.rich_data, this, 5); 
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
