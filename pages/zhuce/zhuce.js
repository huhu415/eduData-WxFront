// pages/zhuce/zhuce.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        multiIndex: [0, 0], // 默认值
        multiArray: [
            [
                { value: "hrbust", name: '哈尔滨理工大学' },
                { value: "neau", name: "东北农业大学" }
            ], // 年级
            [
                { value: "1", name: '本科生' },
                { value: "2", name: '研究生' },
            ] // 这里对应年级的第一个元素的班级，也就是一年级的班级
        ],
        classArray: [
            [
                { value: "1", name: '本科生' },
                { value: "2", name: '研究生' },
            ],
            [
                { value: "1", name: '本科生' },
            ]
        ],
    },
    // 点击确认时触发
    bindMultiPickerChange(event) {
        console.log(event)
        this.setData({
            multiIndex: event.detail.value
        })
    },

    // 列改变时触发
    bindMultiPickerColumnChange(event) {
        const data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        }
        // 获取滚动的是哪一列
        data.multiIndex[event.detail.column] = event.detail.value

        // 遍历 classArray
        this.data.classArray.forEach((item, index) => {
            // 滚动第一列
            if (event.detail.column === 0) {
                // 如果滚动到二年级 则将第二列的班级 替换成二年级对应的班级
                if (data.multiIndex[0] === index) {
                    data.multiArray[1] = item
                }
                // 每次滚动 就把第二列默认设置为第一个
                data.multiIndex[1] = 0
            }
            this.setData(data)
        })
    },

    // 表单提交
    submit: function (e) {
        wx.vibrateShort()
        var orderInfo = e.detail.value
        console.log(orderInfo)
        if (String(orderInfo.password).length < 4 || String(orderInfo.user).length < 4) {
            wx.showToast({
                title: '请检查表单是否填写正确',
                icon: 'none',
                duration: 1800
            })
            return
        }
        wx.showLoading({
            title: '请求中...',
        })
        orderInfo.school = this.data.multiArray[0][orderInfo.selector[0]].value,
        orderInfo.studentType = this.data.multiArray[1][orderInfo.selector[1]].value,
        delete orderInfo.selector;
        wx.request({
            // url: 'http://127.0.0.1:8080/signin',
            url: 'https://zzyan.com/signin',
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                username: orderInfo.user,
                password: orderInfo.password,
                school: orderInfo.school,
                studentType: orderInfo.studentType,
            },
            success: function (res) {
                wx.hideLoading();
                // 请求成功时的处理逻辑
                console.log('请求成功', res);
                if (res.data.status == "fail") {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 1800
                    })
                } else if (res.data.status == "success") {
                    console.log('请求成功', res);
                    orderInfo.authentication = res.cookies[0]
                    console.log(orderInfo)
                    wx.setStorage({
                        key: "key",
                        data: orderInfo,
                        encrypt: true,
                    })
                    // 登陆成功后返回上一页, 并刷新页面
                    wx.navigateBack({
                        delta: 1,
                        success: function (e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onLoad();
                        }

                    })
                    // 跳转后刷新页面
                    // wx.switchTab({
                    //     url: '/pages/zmyself/zmyself',
                    //     success: function(){
                    //         wx.showToast({
                    //           title: '登陆成功',
                    //           icon: 'success',
                    //           duration: 2000
                    //         })
                    //       }
                    //   })
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