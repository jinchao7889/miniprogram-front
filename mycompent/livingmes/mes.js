// mycompent/comment/comment.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    comment_secComments: Object,
    content:String,
    activityid: String,
    parentid:Number,
    replyNumber: Number,
    answerhead:String,
    answernickname:String,
    creattime:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goreply(e) {
      var mes = { 'pid': this.properties.parentid }
      this.triggerEvent('goreply', mes, {})
    }
  }
})
