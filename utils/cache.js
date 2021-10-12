var dtime = '_deadtime';
function put(k, v, t) {
  wx.setStorageSync(k, v)
  var seconds = parseInt(t);
  if (seconds > 0) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + seconds;
    wx.setStorageSync(k + dtime, timestamp + "")
  } else {
    wx.removeStorageSync(k + dtime)
  }
}

function get(k, def) {
  var deadtime = parseInt(wx.getStorageSync(k + dtime))
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      if (def) { return def; } else { return; }
    }
  }
  var res = wx.getStorageSync(k);
  if (res) {
    return res;
  } else {
    return def;
  }
}

function remove(k) {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + dtime);
}

function clear() {
  wx.clearStorageSync();
}

module.exports = {
  put: put,
  get: get,
  remove: remove,
  clear: clear,
}

// 使用方法：在需要使用的js中引入改js文件（比如文件名为：cache.js），var util = require('../../utils/cache.js');

// 设置缓存：  util.put('key', 'value', 20) 表示设置缓存失效时间为20秒；

// 获取缓存：util.get('key')

// 清除缓存：util.remove('key')

// 清除所有缓存：util.clear()
