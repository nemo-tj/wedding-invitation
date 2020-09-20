<template>
    <div class="wedding-invitation" :class="{ 'invitation-bounce':canOpen }" ref="fatherInvitation">
        <div class="invitation-container" :class="{ 'invitation-down':isOpening }">
            <div class="invitation-cover">
                <div class="cover-content" :class="{'invitation-up':isOpening}">
                    <div class="content-inside" ref="contentInside" id="listen-dom">

                        <swiper ref="mySwiper" :options="swiperOptions" id="my-swiper" :key="ifAutoplay">
                            <swiper-slide>
                                <div class="content-inside-photo photo-1 swiper-slide"></div>
                            </swiper-slide>

                            <swiper-slide>
                                <div class="content-inside-photo photo-2 swiper-slide"></div>
                            </swiper-slide>
                            <swiper-slide>
                                <div class="content-inside-photo photo-3 swiper-slide"></div>
                            </swiper-slide>
                            <swiper-slide>
                                <div class="content-inside-photo photo-4 swiper-slide"></div>
                            </swiper-slide>
                            <swiper-slide>
                                <div class="content-inside-photo photo-5 swiper-slide"></div>
                            </swiper-slide>
                            <swiper-slide>
                                <div class="content-inside-photo photo-6 swiper-slide"></div>
                            </swiper-slide>
                            <swiper-slide>
                                <div class="content-inside-photo photo-7 swiper-slide"></div>
                            </swiper-slide>

                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                        <p>我们结婚啦！</p>
                        <p>
                            <b>秦宇杰 & 金姝妮</b>
                        </p>
                        <p>2020年10月5日 18:08</p>
                        <p>地点：<b>江苏省江阴市银河国际酒店</b></p>
                        <div class="navigation-button" @click="openMap()"><i class="navigation-icon"></i>点击导航</div>
                        <div class="content-inside-bless">
                            <input
                                placeholder="输入祝福"
                                @keyup.enter="sendBarrage"
                                @focus="isFocused = true"
                                @blur="isFocused = false, hasEntered = false"
                                v-model="wish"
                                ref="wishInput"
                            />

                            <button class="send-message" @click="sendBarrage">发送</button>
                        </div>

                        <button class="close-invitation" @click="closeInvitation">关闭看弹幕</button>

                        <div class="scroll-guide" v-show="showGuideScroll">
                            <div class="scroll-down-icon"></div>
                        </div>
                    </div>
                </div>
                <div class="cover-inside-left" :class="{'opening':isOpening}"></div>
                <div class="cover-inside-right" :class="{'opening':isOpening}"></div>
                <img
                    class="cover-inside-seal"
                    src="../images/seal.png"
                    @click="openInvitation"
                    :class="{'invitation-flight':isOpening}"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
export default {
    components: {
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
    props: ["canOpen"],
    data() {
        return {
            isOpening: false,
            wish: "",
            isFocused: false,
            hasEntered: false,
            // swiper
            swiperOptions: {
                spaceBetween: 30,
                centeredSlides: true,
                // autoplay: {
                //     delay: 2000,
                //     disableOnInteraction: true
                // },
                autoplay: false,
                pagination: {
                    el: '.swiper-pagination',
                    // 点击图片隐藏分页器
                    hideOnClick :true,
                    dynamicBullets: true,
                    dynamicMainBullets: 1
                },
            },
            // 用来判断要不要显示scroll guide
            showGuideScroll: false,
            scrollHeight: null,
            clientHeight: null,
            scrollTop: null,
            // 判断什么时候开始自动播放图片，这是一个key，改变可以可以重新渲染组件
            ifAutoplay: false
        };
    },
    computed: {
        swiper: function() {
            return this.$refs.mySwiper.$swiper
        }
    },

    methods: {
        // 打开邀请函
        openInvitation() {
            this.isOpening = true;
            // 修改swiper的设置，改成自动播放
            this.swiperOptions.autoplay = {
                delay: 2000,
                disableOnInteraction: true
            };
            // 修改key值，重新渲染组件，开始自动播放
            this.ifAutoplay = true;
        },
        closeInvitation() {
            this.isOpening = false;
            setTimeout(() => {
                this.$emit("onClose");
                this.$emit("sendBarrage", null);
            }, 660);
        },
        // 发送弹幕
        sendBarrage() {
            this.$nextTick(() => {
                this.hasEntered = true;
                if (!this.wish) {
                    return;
                }
                this.isOpening = false;
                this.$refs.wishInput.blur();
                setTimeout(() => {
                    this.$emit("sendBarrage", this.wish);
                }, 660);
            });
        },
        openMap() {
            // console.log('open map');
            this.$wx.openLocation({
                latitude: 31.896669, // 纬度，浮点数，范围为90 ~ -90
                longitude: 120.313553, // 经度，浮点数，范围为180 ~ -180。
                name: '婚宴地点', // 位置名
                address: '江阴市银河国际酒店', // 地址详情说明
                scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
            });
        },
        // 在渲染页面时判断要不要引导滚动
        ifGuideScroll() {
            // 如果这个元素有很多是溢出的
            if (this.$refs.contentInside.scrollHeight - this.$refs.contentInside.clientHeight > 30) {
                return true
            } else {
                return false
            }
        },
        // 给一个方法，来主动隐藏滚动引导
        hideGuideScroll() {
            this.showGuideScroll = false
        }
    },
    mounted() {
        // 默认从第一张开始
        this.swiper.slideTo(0, 1000, false);
        // 固定高度，防止键盘呼出后高度坍缩
        this.$refs.fatherInvitation.style.height = document.documentElement.clientHeight + 'px';
        // 渲染页面时，调用ifGuideScroll函数判断要不要显示滚动引导
        this.showGuideScroll = this.ifGuideScroll();
        // 监听 id="listen-dom"，如果滚动就调用hideGuideScroll函数，用来隐藏引导
        document.querySelector('#listen-dom').addEventListener('scroll', this.hideGuideScroll, true);
    },
};
</script>

<style lang="less">
.wedding-invitation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 30px 20px;
    padding-top: 60px;
    z-index: 4;
    transform: scale(0.05);
    -webkit-transform: scale(0.05);
    opacity: 0;
    transition: transform 0.8s cubic-bezier(0.26, 1.84, 0.39, 0.61),
        opacity 0.5s linear;
    -webkit-transition: -webkit-transform 0.8s
            cubic-bezier(0.26, 1.84, 0.39, 0.61),
        opacity 0.5s linear;
    background-size: 100%;
    overflow: hidden;
    &.invitation-bounce {
        opacity: 1;
        transform: scale(1);
        -webkit-transform: scale(1);
    }
    .invitation-container {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
        -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);
        &.invitation-down {
            transform: translateY(20px);
            -webkit-transform: translateY(20px);
        }
        .invitation-cover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #d65047;
            border-radius: 10px;
            perspective: 500px;
            box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);
            .cover-content {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                padding: 10px 20px;
                transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
                -webkit-transition: -webkit-transform 0.6s
                    cubic-bezier(0.4, 0, 1, 1);
                &.invitation-up {
                    transform: translateY(-60px);
                    -webkit-transform: translateY(-60px);
                }
                .content-inside {
                    height: 100%;
                    padding: 20px;
                    color: #a9895d;
                    background-color: #fff1de;
                    text-align: center;
                    overflow: auto;
                    --swiper-navigation-color: OrangeRed;/* 单独设置前进后退按钮颜色 */
                    position: relative; /* 用于给滚动引导条定位 */

                    .content-inside-photo {
                        width: 95%;
                        // margin-bottom: 15px;
                        margin: 5px auto 15px auto;
                        padding: 5px;
                        // border: 1px solid #f7debb;
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: 50% 50%;
                        padding-bottom: 150%;
                        height: 0;
                        border-radius: 8px;
                        box-shadow: 0 3px 5px 0 rgba(0,0,0,0.3), 0px 4px 10px 0px rgba(0,0,0,0.2);
                    }
                    .photo-1 {
                        background-image: url('../images/photo1.jpg');
                        // background-position: 70% 50%;
                        // position: relative;
                    }
                    .photo-2 {
                        background-image: url('../images/photo2.jpg');
                        // background-position: 50% 50%;
                        // position: relative;
                    }
                    .photo-3 {
                        background-image: url('../images/photo3.jpg');
                        // background-position: 50% 50%;
                        // position: relative;
                    }
                    .photo-4 {
                        background-image: url('../images/photo4.jpg');
                        // background-position: 50% 50%;
                        // position: relative;
                    }
                    .photo-5 {
                        background-image: url('../images/photo5.jpg');
                        background-position: 70% 50%;
                        position: relative;
                    }
                    .photo-6 {
                        background-image: url('../images/photo6.jpg');
                        // background-position: 50% 50%;
                        // position: relative;
                    }
                    .photo-7 {
                        background-image: url('../images/photo7.jpg');
                        // background-position: 50% 50%;
                        // position: relative;
                    }

                    // 导航按钮
                    .navigation-button {
                        border: 2px solid;
                        width: 80%;
                        height: 30px;
                        margin: 30px auto;
                        border-radius: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;

                        .navigation-icon {
                            display: inline-block;
                            width: 15px;
                            height: 15px;
                            margin-right: 5px;
                            background: url('../images/navigation.png') no-repeat;
                            background-size: cover;
                        }
                    }

                    // swiper组件的分页器
                    .swiper-pagination {
                        position: absolute;
                        bottom: 20px;
                        .swiper-pagination-bullet {
                            width: 10px;
                            height: 10px;
                            background-color: MediumVioletRed;
                        }
                    }

                    p {
                        margin-top: 0;
                        margin-bottom: 5px;
                    }

                    .content-inside-bless {
                        display: flex;
                        
                        input {
                            width: 100%;
                            height: 35px;
                            margin-bottom: 10px;
                            outline: none;
                            border: none;
                            border-bottom: 1px solid #f7debb;
                            color: #a9895d;
                            background: transparent;
                            &::-webkit-input-placeholder {
                                color: #e8d1b1;
                                font-size: 12px;
                            }
                            &::-moz-placeholder {
                                color: #e8d1b1;
                                font-size: 12px;
                            }
                            &:-ms-input-placeholder {
                                color: #e8d1b1;
                                font-size: 12px;
                            }
                            &:-moz-placeholder {
                                color: #e8d1b1;
                                font-size: 12px;
                            }
                        }

                        .send-message {
                            width: 70px;
                            height: 35px;
                            color: #a9895d;
                            background: #f7debb;
                            border: none;
                            outline: none;
                            margin-left: 10px;
                            &:disabled {
                                opacity: 0.8;
                            }
                        }

                        > div {
                            display: flex;
                            button {
                                width: 100%;
                                height: 35px;
                                color: #a9895d;
                                background: #f7debb;
                                border: none;
                                outline: none;
                                &:disabled {
                                    opacity: 0.8;
                                }
                                &:first-child {
                                    margin-right: 10px;
                                    flex: 1;
                                }
                                &:last-child {
                                    width: 60px;
                                    border: 1px solid #f7debb;
                                    background: transparent;
                                }
                            }
                        }
                    }

                    .close-invitation {
                        height: 35px;
                        width: 100%;
                        color: #a9895d;
                        background: #f7debb;
                        border: none;
                        outline: none;
                    }

                    // 当屏幕不够长时，引导滚动
                    .scroll-guide {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 60px;
                        background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(80, 80, 80, 1));
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1;

                        // 这是引导滚动的图标
                        .scroll-down-icon {
                            width: 30px;
                            height: 30px;
                            background-image: url('../images/scroll-down.png');
                            background-size: cover;
                            animation: up-and-down 1s infinite;
                            @keyframes up-and-down {
                                0% {
                                    transform: translateY(-5px);
                                } 
                                100% {
                                    transform: translateY(5px);
                                } 
                            }
                        }

                    }
                }
            }
            .cover-inside-left {
                position: absolute;
                left: 0;
                top: 0;
                width: 70%;
                height: 100%;
                border-radius: 10px;
                background-color: #d65047;
                box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
                z-index: 6;
                transition: transform 0.5s;
                -webkit-transition: -webkit-transform 0.5s;
                transform-origin: 0 50%;
                -webkit-transform-origin: 0 50%;
                &.opening {
                    transform: rotate3d(0, 1, 0, -140deg);
                    -webkit-transform: rotate3d(0, 1, 0, -140deg);
                }
            }
            .cover-inside-right {
                position: absolute;
                right: 0;
                top: 0;
                width: 40%;
                height: 100%;
                border-radius: 10px;
                background-color: #d65047;
                box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
                z-index: 5;
                transition: transform 0.5s;
                -webkit-transition: -webkit-transform 0.5s;
                transform-origin: 100% 50%;
                -webkit-transform-origin: 100% 50%;
                &.opening {
                    transform: rotate3d(0, 1, 0, 140deg);
                    -webkit-transform: rotate3d(0, 1, 0, 140deg);
                }
            }
            .cover-inside-seal {
                position: absolute;
                left: 70%;
                bottom: 100px;
                width: 80px;
                height: 80px;
                margin-left: -40px;
                z-index: 7;
                transform-origin: 50% 50%;
                -webkit-transform-origin: 50% 50%;
                transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
                -webkit-transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
                &.invitation-flight {
                    // opacity: 0;
                    display: none;
                    border: 1px solid;
                }
            }
        }
    }
}
</style>
