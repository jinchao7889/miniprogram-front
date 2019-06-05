// mycompent/trip/jiehuo/jiehuo.js

const app = getApp();
Component({

  options: {
    addGlobalClass: true,

  },
  properties: {
    jiehuocontent:Object,
    myjiehuocontent:Object
  },

  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    tableData: ['全部问答', '我的提问']
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
    tabSelect(e) {
      var mes = { 'id': e.currentTarget.dataset.id}
      this.triggerEvent('gotabselect', mes, {})
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },

    godetailquestion(e){
      var questionid = e.currentTarget.dataset.id
      var mes = { 'qid': questionid }
      this.triggerEvent('godetailquestion', mes, {}) 
    }

  }
})