function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/liuyan/liuyan",
      "iconPath": "/images/talk.png",
      "selectedIconPath": "/images/talk.png",
      "id":"d1"
    },
    {
      "current": 0,
      "pagePath": "/pages/home/home",
      "iconPath": "/images/light.png",
      "selectedIconPath": "/images/light.png",
      "id":"d2",
    },
    {
      "current": 0,
      "pagePath": "/pages/information/information",
      "iconPath": "/images/people.png",
      "selectedIconPath": "/images/people1.png",
      "id":"d3",
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}
