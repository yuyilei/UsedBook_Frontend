Page({
  data: {//data数据主要用于视图绑定
    text: "我是一条测试",
    array: [0, 1, 2, 3, 4],
    view: "APP",
    template: {
      staffA: { firstName: 'Hulk', lastName: 'Hu' },
      staffB: { firstName: 'Shang', lastName: 'You' }
    }
  },
  ViewTap: function () { console.log('额，点到我了了~') }//自定义事件，主要用于事件绑定
})