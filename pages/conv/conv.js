// pages/gpt/gpt.js
import * as TextEncoding from 'text-encoding-shim';
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        message: "",
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
            url: 'https://chat.zzyan.com:8080/v1/chat/completions',
            method: 'POST',
            enableChunked: true,
            header: {
                'content-type': 'application/json',
                "cookie": "123123",
            },
            data: {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user",
                        "content": e.detail.value.message
                    }
                ],
                "stream": true
            },
            success: (response) => {
                this.qingkong()
                wx.hideLoading();
                requestTask.abort()
            },
        })


        requestTask.onChunkReceived(response => {
            wx.hideLoading();
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
                        this.setData({
                            message: this.data.message + content
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
    onShareAppMessage() {

    }
})