// components/xing-editor.js
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true

  },

  /**
   * 组件的属性列表
   */


  properties: {
    //图片上传相关属性，参考wx.uploadFile

   

    //输入内容
    nodes: Array,
    html: String,

    //内容输出格式，参考rich-text组件，默认为节点列表
    outputType: {
      type: String,
      value: 'html',
    },

    buttonBackgroundColor: {
      type: String,
      value: '#409EFF',
    },

    buttonTextColor: {
      type: String,
      value: '#fff',
    },
  },


  /**
   * 组件的初始数据
   */


  data: {
    windowHeight: 0,
    nodeList: [],
    textBufferPool: [],
    attackIndex: 0
  },


  attached: function () {
    const windowHeight = wx.getSystemInfoSync();
    console.log(windowHeight.screenHeight)
    this.setData({
      windowHeight: windowHeight.screenHeight
    })


    if (this.properties.nodes && this.properties.nodes.length > 0) {
      const textBufferPool = [];
      this.properties.nodes.forEach((node, index) => {
        if (node.name === 'p') {
          textBufferPool[index] = node.children[0].text;
        }
      })
      this.setData({
        textBufferPool,
        nodeList: this.properties.nodes,
      })
    } else if (this.properties.html) {
      const nodeList = this.HTMLtoNodeList();
      console.log(nodeList)
      const textBufferPool = [];
      nodeList.forEach((node, index) => {
        if (node.name === 'p' || node.name === 'h') {
          textBufferPool[index] = node.children[0].text;
        }
      })
      this.setData({
        textBufferPool,
        nodeList,
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 预览图片
     */
    previewImg: function (e) {
      let index = e.currentTarget.dataset.index
      let curentUrl = e.currentTarget.dataset.url
      let nodeList = this.data.nodeList;
      console.log(e)
      wx.previewImage({
        current: curentUrl, // 当前显示图片的http链接
        urls: [curentUrl]
      })
    },

    /**
     * 方法：HTML转义
     */
    htmlEncode: function (str) {
      var s = "";
      if (str.length == 0) return "";
      s = str.replace(/&/g, "&gt;");
      s = s.replace(/</g, "&lt;");
      s = s.replace(/>/g, "&gt;");
      s = s.replace(/ /g, "&nbsp;");
      s = s.replace(/\'/g, "&#39;");
      s = s.replace(/\"/g, "&quot;");
      s = s.replace(/\n/g, "<br>");
      return s;
    },

    /**
     * 方法：HTML转义
     */
    htmlDecode: function (str) {
      var s = "";
      if (str.length == 0) return "";
      s = str.replace(/&gt;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "\'");
      s = s.replace(/&quot;/g, "\"");
      s = s.replace(/<br>/g, "\n");
      return s;
    },

    /**
     * 方法：将缓冲池的文本写入节点
     */
    writeTextToNode: function (e) {
      const textBufferPool = this.data.textBufferPool;
      const nodeList = this.data.nodeList;
      nodeList.forEach((node, index) => {
        if (node.name === 'p' || node.name === 'h') {
          node.children[0].text = textBufferPool[index];
        }
      })
      this.setData({
        nodeList,
      })

    },

    /**
     * 方法：将HTML转为节点
     */
    HTMLtoNodeList: function () {
      let html = this.properties.html;
      let htmlNodeList = [];
      while (html.length > 0) {
        const endTag = html.match(/<\/[a-z0-9]+>/);
        if (!endTag) break;
        const htmlNode = html.substring(0, endTag.index + endTag[0].length);
        htmlNodeList.push(htmlNode);
        html = html.substring(endTag.index + endTag[0].length);
      }

      return htmlNodeList.map(htmlNode => {
        let node = { attrs: {} };
        const startTag = htmlNode.match(/<[^<>]+>/);
        const startTagStr = startTag[0].substring(1, startTag[0].length - 1).trim();
        node.name = startTagStr.split(/\s+/)[0];
        var stm = startTagStr.match(/[^\s]+="[^"]+"/g);

        if (stm != null) {
          stm.forEach(attr => {
            const [name, value] = attr.split('=');
            node.attrs[name] = value.replace(/"/g, '');
          })
        } else {
          console.log("为null")
        }
        if (node.name === 'p' || node.name === 'h') {
          const endTag = htmlNode.match(/<\/[a-z0-9]+>/);
          const text = this.htmlDecode(htmlNode.substring(startTag.index + startTag[0].length, endTag.index).trim());
          node.children = [{
            text,
            type: 'text',
          }]
        }
        return node;
      })
    },

    /**
     * 方法：将节点转为HTML
     */
    nodeListToHTML: function () {
      return this.data.nodeList.map(node => `<${node.name} ${Object.keys(node.attrs).map(key => `${key}="${node.attrs[key]}"`).join(' ')}>${node.children ? this.htmlEncode(node.children[0].text) : ''}</${node.name}>`).join('');
    },

   
  }
})
