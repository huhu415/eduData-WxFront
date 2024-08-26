//app.js
//在App.js 开头处写入如下立即执行函数表达式
(function () {
    var PageTmp = Page;
    Page = function (pageConfig) {
        // 设置全局默认分享
        pageConfig = Object.assign({
            onShareAppMessage: function () {
                return {
                    title: '快来用这个查课表吧',
                    path: '/pages/index/index',
                    imageUrl: '/图像小.png',
                };
            }
        }, pageConfig);
        PageTmp(pageConfig);
    };
})();
//解释下上述代码做了什么
//在小程序初始化启动时，在上下文中立即执行上述代码，Page函数被赋值给PageTmp变量
//然后Page函数被重写，该函数接受原有初始化Page的Object参数，并添加了onShareAppMessage参数（函数）
//然后再调用PageTmp（真正的Page函数），并传修改后的配置对象参数
//IIEF在初始化执行完后立即被销毁，所以功能上完成的重写Page的作用，类似于执行前的拦截
//当在某个页面写了onShareAppMessage时，由于assign在后面，所以页面配置会替换默认配置
App({
    towxml: require('/components/towxml/index'),
    globalData: {
        apiUrl: 'https://zzyan.com:8000',
        // apiUrl: 'http://127.0.0.1:8080',
        userInfo: null
    },
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
})