// pages/zmyself/zmyself.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        buttonhidden: true,
        user: " ",
        studentType: " ",
    },

    // 跳转到登录页面
    getUserProfile: function () {
        wx.vibrateShort();
        wx.navigateTo({
            url: '/pages/zhuce/zhuce',
        })
    },

    // 拉取成绩
    pullAllCoureGrade: function () {
        wx.vibrateShort();
        wx.getStorage({
            key: 'key', // 指定要获取的数据的 key
            encrypt: true,
            success: (res) => {
                // 成功获取到数据
                wx.showLoading({
                    title: '拉取中...',
                })
                console.log(res.data.user)
                wx.request({
                    url: app.globalData.apiUrl+'/updataGrade',
                    method: "POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        username: res.data.user,
                        password: res.data.password,
                        school: res.data.school,
                        studentType: res.data.studentType,
                    },
                    success: function (res) {
                        wx.hideLoading();
                        console.log(res)
                        if (res.statusCode == 200) {
                            //成功后跳转到index页面
                            wx.switchTab({
                                url: '/pages/CheckScores/CheckScores',
                                success: function (e) {
                                    var page = getCurrentPages().pop();
                                    if (page == undefined || page == null) return;
                                    page.onLoad();
                                }
                            })
                        } else {
                            // 大概率是小程序登陆后, 改密码了, 然后用登陆的账户和密码失效了
                            wx.showToast({
                                title: "拉取失败.." + res.data.message,
                                icon: 'none',
                                duration: 2500
                            })
                        }
                    },
                    fail: function (err) {
                        wx.hideLoading();
                        // 请求失败时的处理逻辑
                        console.error('请求失败', err);
                        wx.showToast({
                            title: "网络请求失败",
                            icon: 'none',
                            duration: 2500
                        })
                    },
                })
            },
            fail: function (err) {
                wx.showToast({
                    title: "请检查是否登陆",
                    icon: 'none',
                    duration: 1800
                })
            }
        });
    },

    // 拉取课程
    pullAllCoure: function () {
        wx.vibrateShort();
        wx.getStorage({
            key: 'key', // 指定要获取的数据的 key
            encrypt: true,
            success: (res) => {
                // 成功获取到数据
                wx.showLoading({
                    title: '拉取中...',
                })
                console.log(res.data.user)
                wx.request({
                    url: app.globalData.apiUrl+'/updata',
                    method: "POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        username: res.data.user,
                        password: res.data.password,
                        school: res.data.school,
                        studentType: res.data.studentType,
                    },
                    success: function (res) {
                        wx.hideLoading();
                        console.log(res)
                        if (res.statusCode == 200) {
                            //成功后跳转到index页面
                            wx.switchTab({
                                url: '/pages/index/index',
                                success: function (e) {
                                    var page = getCurrentPages().pop();
                                    if (page == undefined || page == null) return;
                                    page.onLoad();
                                }
                            })
                        } else {
                            // 大概率是小程序登陆后, 改密码了, 然后用登陆的账户和密码失效了
                            wx.showToast({
                                title: "拉取失败.." + res.data.message,
                                icon: 'none',
                                duration: 1800
                            })
                        }
                    },
                    fail: function (err) {
                        wx.hideLoading();
                        // 请求失败时的处理逻辑
                        console.error('请求失败', err);
                        wx.showToast({
                            title: "网络请求失败",
                            icon: 'none',
                            duration: 1800
                        })
                    },
                })
            },
            fail: function (err) {
                wx.showToast({
                    title: "请检查是否登陆",
                    icon: 'none',
                    duration: 1800
                })
            }
        });
    },

    // 清楚缓存
    clearCatch: function () {
        wx.vibrateShort();
        wx.showModal({
            content: '确定要重新登陆么？',
            success: function (res) {
              if (res.confirm) {
                wx.getStorage({
                    key: 'key', // 指定要获取的数据的 key
                    encrypt: true,
                    success: (res) => {
                        wx.clearStorageSync()
                        wx.navigateTo({
                            url: '/pages/zhuce/zhuce',
                        })
                    },
                    fail: (err) => {
                        wx.showToast({
                            title: "请检查是否登陆",
                            icon: 'none',
                            duration: 1800
                        })
                    }
                })
              }
            }
          })
    },

    // 开源按钮
    openSoure: function () {
        // 登陆后, 才可以访问开源网页
        wx.getStorage({
            key: 'key', // 指定要获取的数据的 key
            encrypt: true,
            success: (res) => {
                wx.navigateTo({
                    url: '/pages/opensoure/opensoure',
                })
            },
            fail: (err) => {
                wx.showToast({
                    title: "请检查是否登陆",
                    icon: 'none',
                    duration: 1800
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        wx.getStorage({
            key: 'key', // 指定要获取的数据的 key
            encrypt: true,
            success: (res) => {
                // 成功获取到数据
                // console.log(res);
                this.setData({
                    buttonhidden: false,
                    user: res.data.user,
                })
                // this.setData.buttonhidden = false;
                // this.setData.user = res.data.user;
            },
            fail: () => {
                this.setData({
                    buttonhidden: true,
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
})