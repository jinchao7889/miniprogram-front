// mycompent/trip/qindan/qindan.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,

  },
  properties: {
    qindancontent:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tableData: [],
    listcontent:[]
  },

  attached() {
    var qd = this.properties.qindancontent;
    console.log(qd);
    var list = this.data.tableData;
    var content=this.data.listcontent;
    for (var i = 0; i < qd.length; i++) {
      list.push(qd[i].inventoryType)
      content.push(qd[i].inventoryElements)
    }
    this.setData({
      tableData: list,
      listcontent: content
    })
    console.log(list)
    console.log(content)

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        currentTab: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    switchTab(event) {
      var cur = event.detail.current;
      var singleNavWidth = this.data.windowWidth / 5;
      this.setData({
        TabCur: cur,
        
        scrollLeft: (cur - 2) * singleNavWidth
      });
    }
  }
})
