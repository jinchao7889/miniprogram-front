const app = getApp();
var WxParse = require("../../../../wxParse/wxParse.js")
Page({
  data: {
    StatusBar: app.globalData.StatusBar + 6,
    TabbarBot: app.globalData.tabbar_bottom,
    swiperlist: [
      'https://img.alicdn.com/imgextra/i3/1773095659/O1CN01ZTgfy11rfrqH00B9p_!!1773095659.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i1/1773095659/O1CN01dSWy871rfrqsim906_!!1773095659.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i4/1773095659/O1CN01tZ7Mcy1rfrqKR5iuD_!!1773095659.jpg_430x430q90.jpg',
    ],
    TabCur: 0,
    scrollLeft: 0
  },
  onLoad: function (options) {
    const that = this;
    var data = `<p style="text-align:center;">
	阿萨大大啦阿拉山口了阿斯兰的<img src="http://kindeditor.net/ke4/plugins/emoticons/images/21.gif" border="0" alt="" /><img src="http://kindeditor.net/ke4/plugins/emoticons/images/22.gif" border="0" alt="" /><img src="http://kindeditor.net/ke4/plugins/emoticons/images/42.gif" border="0" alt="" />，阿萨的阿松大<img src="https://img.alicdn.com/imgextra/i1/1773095659/TB2Eny9olHH8KJjy0FbXXcqlpXa_!!1773095659.jpg" alt="" />
</p>
<p style="text-align:center;">
	<img src="https://img.alicdn.com/imgextra/i1/1773095659/TB2_nPjogLD8KJjSszeXXaGRpXa_!!1773095659.jpg" alt="" />
</p>
<p style="text-align:center;">
	<img src="https://img.alicdn.com/imgextra/i2/1773095659/TB26DYjogLD8KJjSszeXXaGRpXa_!!1773095659.jpg" alt="" />
</p>
<p style="text-align:center;">
	<img src="https://img.alicdn.com/imgextra/i4/1773095659/TB2i9D8ogDD8KJjy0FdXXcjvXXa_!!1773095659.jpg" alt="" />
</p>`;

    var temp = WxParse.wxParse('article', 'html', data, that, 5); 
  } ,
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
});
