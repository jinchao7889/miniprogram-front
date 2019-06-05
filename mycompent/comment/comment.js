// mycompent/comment/comment.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    comment:Object,
    comment_secComments:Object,
    travelid:String,
    likeNumber:Number,
    isFabulous:Boolean,
    replyNumber:Number


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
    goreply(e){
      var mes = { 'id':this.properties.comment.id}
      this.triggerEvent('goreply',mes, {})
    },
    godianzan(e){
      var mes = { 'id': this.properties.comment.id}
      this.triggerEvent('godianzan', mes, {})
    }
    
  }
})
