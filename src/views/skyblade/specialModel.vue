<template>
    <div>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            :lock-scroll="true"
            top="auto"
        >
            <div class="swiperBox" v-if="dialogVisible && swiperData.length>0">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide
                        class="swiper-slide"
                        v-for="(item,index) of swiperData"
                        :key="index"
                    >
                        <div class="imgBox">
                            <img :src="$url.baseImgUrl() + item.detailsPhoto" />
                        </div>
                        <div class="container" v-html="item.remark"></div>
                    </swiper-slide>
                </swiper>
                <!-- 左右箭头 -->
                <div class="swiper-button-prev swiper-button-white" v-if="swiperData.length>1"></div>
                <div class="swiper-button-next swiper-button-white" v-if="swiperData.length>1"></div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="confirmChange">
                    <span class="iconfont">&#xe601;</span>CONFIRM
                </el-button>
                <div v-if="priceNameShow">{{modelEnprice}} ＄</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
    props: {
        swiperData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        priceNameShow: {
            type: Boolean,
            default: false
        },
        modelEnprice: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            dialogVisible: false,
            title: "",
            swiperOption1: {
                //设置点击箭头
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                //开启循环模式
                loop: true,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                speed: 1000
            },
            swiperOption2: {
                //设置点击箭头
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                //开启循环模式
                loop: false,
                observer: true,
                observeParents: true
            }
        };
    },
    computed: {
        swiperOption() {
            var len = this.swiperData.length;
            console.log("swiperOption list size:", len);
            if (len == 1) {
                return this.swiperOption2;
            } else {
                return this.swiperOption1;
            }
        }
    },
    methods: {
        confirmChange() {
            this.$emit("confirmChange");
            this.dialogVisible = false;
        }
    },
    components: {
        swiper,
        swiperSlide
    }
};
</script>

<style lang="scss">
@import "~@/assets/scss/mixin.scss";
.el-dialog {
    width: 1000px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    @include scrollBar();
    .el-dialog__header {
        padding: 28px 0 12px 130px;
        flex: 0 0 auto;
        .el-dialog__title {
            font-size: 25px;
            font-family: "AlibabaPuHuiTi-Heavy";
        }
        .el-dialog__headerbtn {
            margin-top: 10px;
            margin-right: 20px;
            .el-dialog__close {
                font-size: 20px;
                color: #000;
            }
        }
    }
    .el-dialog__body {
        padding: 24px 118px 0 130px;
        overflow-y: auto;
        flex: 1 1 auto;
        .el-scrollbar__wrap {
            overflow-x: hidden;
        }
        .swiperBox {
            position: relative;
            width: 100%;
            .swiper-container {
                .imgBox {
                    height: 415px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .swiper-button-prev,
            .swiper-button-next {
                width: 40px;
                height: 60px;
                background-color: #3e4146;
                background-size: 46%;
                top: 190px;
                &:focus {
                    outline: none;
                }
            }
            .swiper-button-prev {
                left: -40px;
            }
            .swiper-button-next {
                right: -38.5px;
            }
        }
        .container {
            margin-top: 32px;
            font-size: 16px;
        }
    }
    .el-dialog__footer {
        padding: 24px 130px 36px;
        flex: 0 0 auto;
        .el-button {
            width: 130px;
            height: 50px;
            background: #313639;
            color: #fff;
            border-radius: 0;
            border: none;
            font-size: 18px;
            padding: 0;
        }
        .dialog-footer {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>