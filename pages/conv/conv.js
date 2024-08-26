// pages/gpt/gpt.js
const TextEncoding = require('text-encoding-shim')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        message: "",
        isLoading: true, // 判断是否尚在加载中
        article: {} // 内容数据
    },
    qingkong: function () {
        this.setData({
            zhantievalue: null
        })
    },
    Uint8ArrayToString: function (fileData) {
        var dataString = "";
        for (var i = 0; i < fileData.length; i++) {
            dataString += String.fromCharCode(fileData[i]);
        }
        return dataString

    },
    duquban: function () {
        wx.getClipboardData({
            success: (res) => {
                this.setData({
                    zhantievalue: res.data
                })
            },
        })
    },
    bandsubmit: function (e) {
        wx.vibrateShort();
        console.log(e.detail.value.message)
        this.setData({
            message: ""
        })
        wx.showLoading({
            title: '请求中...',
        })
        const requestTask = wx.request({
            url: 'https://zzyan.com:3000/v1/chat/completions',
            method: 'POST',
            enableChunked: true,
            header: {
                'content-type': 'application/json',
                'Authorization': 'sk-flLxNbXy19ug1tHa535bB44636D54e56A161D4F1Ea196982',
            },
            data: {
                "messages": [{
                    "role": "system",
                    "content": e.detail.value.message
                }],
                "stream": true,
                "model": "gpt-35-turbo",
                "presence_penalty": 0,
                "temperature": 0.5,
            },
            success: (response) => {
                wx.hideLoading();
                requestTask.abort()
            },
        })

        requestTask.onChunkReceived(response => {
            wx.hideLoading();
            let thistheme = wx.getAppBaseInfo().theme
            const uint8Array = new Uint8Array(response.data);
            let resultText = '';
            let arrayBuffer = new TextEncoding.TextDecoder('utf-8').decode(uint8Array);
            for (let i = 0; i < arrayBuffer.length; i++) {
                if (arrayBuffer[i] == '\n' && arrayBuffer[++i] == '\n') {
                    // console.log(i)
                    // console.log(resultText.substring(6, resultText.length));
                    const data = JSON.parse(resultText.substring(6, resultText.length));
                    const content = data.choices[0].delta.content;
                    if (content === undefined && data.choices[0].finish_reason == "stop")
                        break
                    if (content) {
                        let result = app.towxml(this.data.message + content, 'markdown', {
                            theme: thistheme
                        });
                        this.setData({
                            message: this.data.message + content,
                            article: result
                        })
                    }
                    resultText = '';
                }
                resultText += arrayBuffer[i];
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.onThemeChange((res) => {
            let result = app.towxml(this.data.message, 'markdown', {
                theme: res.theme
            });
            this.setData({
                article: result
            })
        })
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
})