<template>
    <div class="wedding">
        <Editor />
    </div>
</template>

<script>
import Editor from "./components/Editor.vue"

export default {
    props: [],
    data() {
        return {
            appId: 'wxe0e65e72672a7c5d',
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
            return this.axios.get('http://127.0.0.1:5000/wx/signature?url=' + location.href.split('#')[0])
        }
    },
    mounted() {
        this.getWxSignature().then(res => {
            // eslint-disable-next-line no-console
            console.log((res))
            this.$wx.config({
                debug: true, //生产环境需要关闭debug模式
                appId: this.appId, //appId通过微信服务号后台查看
                timestamp: res.data.timestamp, //生成签名的时间戳
                nonceStr: res.data.nonceStr, //生成签名的随机字符串
                signature: res.data.signature, //签名
                jsApiList: [
                    //需要调用的JS接口列表
                    "checkJsApi",
                    "onMenuShareTimeline", //分享给好友
                    "onMenuShareAppMessage", //分享到朋友圈 
                    "openLocation", //查看地理位置
                    "getLocation"
                ]
            });
            //获取定位信息
            this.$wx.ready(function () {
                // eslint-disable-next-line no-console
                console.log('init')
            });
            this.$wx.error(function (res) {
                // eslint-disable-next-line no-console
                console.log(res)
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