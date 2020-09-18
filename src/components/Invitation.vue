<template>
    <div class="wedding-invitation" :class="{ 'invitation-bounce':canOpen }" ref="fatherInvitation">
        <div class="invitation-container" :class="{ 'invitation-down':isOpening }">
            <div class="invitation-cover">
                <div class="cover-content" :class="{'invitation-up':isOpening}">
                    <div class="content-inside">

                        <swiper ref="mySwiper" :options="swiperOptions">
                            <swiper-slide>
                                <div class="content-inside-photo photo-1 swiper-slide"></div>
                            </swiper-slide>

                            <swiper-slide>
                                <div class="content-inside-photo photo-2 swiper-slide"></div>
                            </swiper-slide>

                            <div class="swiper-pagination" slot="pagination"></div>
                            <!-- <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div> -->
                        </swiper>
                        <p>我们结婚啦！</p>
                        <p>
                            <b>秦宇杰 & 金姝妮</b>
                        </p>
                        <p>时间：2020年10月5日</p>
                        <p>
                            地点：
                            <b>江苏省江阴市银河国际酒店</b>
                        </p>
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
                //     delay: 4000,
                //     disableOnInteraction: false
                // },
                // loop: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },
            }
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper
      }
    },
    methods: {
        // 打开邀请函
        openInvitation() {
            this.isOpening = true;
        },
        closeInvitation() {
            this.isOpening = false;
            setTimeout(() => {
                this.$emit("onClose");
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
            this.$wx.openLocation({
                latitude: 31.896669, // 纬度，浮点数，范围为90 ~ -90
                longitude: 120.313553, // 经度，浮点数，范围为180 ~ -180。
                name: '要导航的地方在哪里🧐?', // 位置名
                address: '江阴市银河国际酒店', // 地址详情说明
                scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '123'
            });
        },
        getLocation() {
            this.$wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                // var speed = res.speed; // 速度，以米/每秒计
                // var accuracy = res.accuracy; // 位置精度
                // eslint-disable-next-line no-console
                console.log(latitude)
            }
            });
        }
    },
    mounted() {
        this.swiper.slideTo(3, 1000, false);
        // 固定高度，防止键盘呼出后高度坍缩
        this.$refs.fatherInvitation.style.height = document.documentElement.clientHeight + 'px'
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

                    .content-inside-photo {
                        // width: 100%;
                        margin-bottom: 10px;
                        padding: 5px;
                        border: 1px solid #f7debb;
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: 50% 50%;
                        padding-bottom: 120%;
                        height: 0;
                    }
                    .photo-1 {
                        background-image: url('../images/photo.png');
                    }
                    .photo-2 {
                        background-image: url('../images/photo.jpg');
                        background-position: 50% 50%;
                        position: relative;
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

                        .navigation-icon {
                            display: inline-block;
                            width: 15px;
                            height: 15px;
                            margin-right: 5px;
                            background: url('../images/navigation.png') no-repeat;
                            background-size: cover;
                        }
                    }

                    // swiper组件的分液器
                    .swiper-pagination {
                        .swiper-pagination-bullet {
                            width: 15px;
                            height: 15px;
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
                            width: 60px;
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
                    opacity: 0;
                }
            }
        }
    }
}
</style>
