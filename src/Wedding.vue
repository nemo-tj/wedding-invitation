<template>
    <div class="wedding">
        <Editor />
        <audio id="myaudio" src="../src/music/bgsound.mp3" controls="controls" autoplay loop="true" hidden="true"></audio>
    </div>
</template>

<script>
import Editor from "./components/Editor.vue"
import Wxdebug from './wx'

export default {
    props: [],
    data() {
        return {
            // 飞快的香港记者的appid
            // appId: 'wx5654d7882a1bdf03',
            // 测试号的appid
            appId: Wxdebug.appid,
            // 布丁与画家的appid
            // appId: 'wxe5c5c54c8f4ebfe9',
            timestamp: 'orgin',
            nonceStr: 'orgin',
            signature: 'orgin'
        }
    },
    components: {
        Editor
    },
    name: 'Wedding',
    methods: {
        getWxSignature() {
            return this.axios.get(Wxdebug.backendUrl + '/wx/signature?url=' + location.href.split('#')[0])
        }
    },
    mounted() {
        this.getWxSignature().then(res => {
            // console.log(res)
            // console.log('net wx ready')

            this.$wx.config({
                debug: false, //生产环境需要关闭debug模式
                appId: this.appId, //appId通过微信服务号后台查看
                timestamp: res.data.timestamp, //生成签名的时间戳
                nonceStr: res.data.nonceStr, //生成签名的随机字符串
                signature: res.data.signature, //签名
                jsApiList: [
                    //需要调用的JS接口列表
                    "checkJsApi",
                    "openLocation", //查看地理位置
                    "updateAppMessageShareData", //分享给好友
                    "updateTimelineShareData", //分享到朋友圈 
                ]
            });

            //设置微信api
            this.$wx.ready(() => {
                // console.log('init');

                // 分享给好友（新接口）
                this.$wx.updateAppMessageShareData({ 
                    title: '诚邀您出席金姝妮&秦宇杰婚礼', // 分享标题
                    desc: '静候光临', // 分享描述
                    link: Wxdebug.backendUrl + '/invitation', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:  Wxdebug.backendUrl + '/static/dist/img/photo1.jpg', // 分享图标
                    success: function () {
                        // console.log('分享功能设置成功')
                    }
                });
                // 分享到朋友圈（新接口）
                this.$wx.updateTimelineShareData({ 
                    title: '诚邀您出席金姝妮&秦宇杰婚礼', // 分享标题
                    desc: '静候光临', // 分享描述
                    link: Wxdebug.backendUrl + '/invitation', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: Wxdebug.backendUrl + '/static/dist/img/photo1.jpg', // 分享图标
                    success: function () {
                        // console.log('分享功能设置成功')
                    }
                });
                // 自动播放背景音乐
                document.getElementById('myaudio').play()
            });

            // eslint-disable-next-line no-unused-vars
            this.$wx.error(function (res) {
                // console.log('log error')
                // console.log(res)
            });
        })
    }
}
</script>

<style lang="less">
@import './assets/base.less';

html, body {
    height: 100%;
}

.wedding {
    position: relative;
    max-width: 568px !important;
    height: 100%;
    min-height: 100%;
    margin: 0 auto;
    background: #2B2B48;
    perspective: 500px;
}
</style>