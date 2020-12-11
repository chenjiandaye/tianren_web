<template>
    <div class="createInfo">
        <div class="leftInfo">
            <div class="blade">
                <div class="title">PREVIEW OF YOUR BLADE</div>
                <div class="imgBox">
                    <img src="../../assets/img/defult.png" v-if="defaultImg == ''" />
                    <img :src="$url.baseImgUrl() + defaultImg" v-else />
                </div>
            </div>
            <div class="specila" v-if="detailImg">
                <div class="title">SPECIAL FUNCTION</div>
                <div class="detail">
                    <div class="left">
                        <img :src="$url.baseImgUrl() + detailImg" />
                    </div>
                    <div class="right" v-html="detailDesc"></div>
                </div>
            </div>
        </div>
        <div class="rightInfo">
            <el-form ref="dialogForm" label-position="left" :model="form" label-width="45%">
                <div class="title">YOUR BLADE INFORMATION</div>
                <el-form-item
                    :label="Object.keys(item)[0]"
                    v-for="(item,index) of bladeData"
                    :key="index"
                >
                    <div :class="priceNameShow ? 'numberValue showP' : 'numberValue'">
                        <span class="name">{{Object.values(item)[0]}}</span>
                        <span @click="lineModify(item.id)" class="iconfont">&#xe608;</span>
                        <span
                            v-if="priceNameShow"
                            style="margin-left:55%;"
                        >{{item.enprice ? item.enprice : 0}}＄</span>
                    </div>
                </el-form-item>
                <div class="title">YOUR INFORMATION</div>
                <el-form-item
                    label="Name"
                    prop="name"
                    :rules="[
                        { required: true, message: 'name is required', trigger: 'blur' }
                    ]"
                >
                    <el-input v-model="form.name" placeholder="Please enter the content"></el-input>
                </el-form-item>
                <el-form-item
                    label="Email"
                    prop="email"
                    :rules="[
                        { required: true, message: 'email is required', trigger: 'blur' },
                        {type: 'email', message: 'Please enter the correct email address', trigger: 'blur'}
                    ]"
                >
                    <el-input v-model="form.email" placeholder="Please enter the content"></el-input>
                </el-form-item>
                <el-form-item
                    label="Country"
                    prop="country"
                    :rules="[
                        { required: true, message: 'country is required', trigger: 'blur' }
                    ]"
                >
                    <el-input v-model="form.country" placeholder="Please enter the country"></el-input>
                </el-form-item>
            </el-form>
            <div class="price" v-if="priceNameShow">{{priceName}} {{priceCount}}＄</div>
            <div class="footerBtn">
                <el-button type="primary" @click="dialogOkChange">SAVE AND EXIT</el-button>
                <el-button @click="dialogCancelChange">BACK TO RESET</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "create",
    data() {
        return {
            form: {
                name: "",
                email: "",
                country: ""
            },
            priceName: "",
            priceNameShow: false
        };
    },
    computed: {
        ...mapState([
            "bladeData",
            "pageList",
            "defaultImg",
            "detailImg",
            "detailDesc"
        ]),
        priceCount() {
            var count = 0;
            this.bladeData.forEach(item => {
                count += item.enprice;
            });
            return count;
        }
    },
    created() {
        // console.log(this.bladeData);
        this.getSelectPriceSetting();
    },
    methods: {
        dialogOkChange() {
            this.$refs.dialogForm.validate(valid => {
                if (valid) {
                    var dataArr = [];
                    this.pageList.forEach(item => {
                        var has = false;
                        var dataObj = {};
                        item.classificationContentList.forEach(item1 => {
                            if (item1.active) {
                                has = true;
                                dataObj["contentId"] = item1.id;
                            }
                        });
                        if (has) {
                            dataObj["classificationId"] = item.id;
                            dataArr.push(dataObj);
                        }
                    });
                    var data = Object.assign(this.form, {});
                    data["quotedPrice"] = this.priceCount;
                    data["offerStatisticsSubList"] = dataArr;
                    this.$axios({
                        url: "/offerStatistics/add",
                        method: "POST",
                        data
                    }).then(res => {
                        if (res.success) {
                            this.$message.success(res.msg);
                            // this.resetChange();
                            this.dialogVisible = false;
                            for (var key in this.form) {
                                this.form[key] = "";
                            }
                            setTimeout(() => {
                                this.$router.push({
                                    path: "/specification"
                                });
                            }, 1000);
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
            });
        },
        dialogCancelChange() {
            for (var key in this.form) {
                this.form[key] = "";
            }
            this.$refs.dialogForm.resetFields();
            this.$router.push({
                path: "/specification"
            });
        },
        lineModify(id) {
            this.$router.push({
                path: "/specification#" + id
            });
        },
        getSelectPriceSetting() {
            this.$axios.get("/priceSetting/selectPriceSetting").then(res => {
                if (res.success) {
                    if (res.page.length == 0 || res.page[0].useable == "0") {
                        this.priceName = "";
                        this.priceNameShow = false;
                    } else {
                        this.priceName = res.page[0].name;
                        this.priceNameShow = true;
                    }
                }
            });
        }
    }
};
</script>

<style lang='scss'>
@import "~@/assets/scss/mixin.scss";
.createInfo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1920px;
    height: 1080px;
    max-height: 95vh;
    display: flex;
    padding-right: 200px;
    .leftInfo {
        width: 950px;
        padding-left: 200px;
        padding-top: 20px;
        .blade {
            .title {
                font-size: 25px;
                margin-bottom: 8px;
            }
            .imgBox {
                width: 500px;
                height: 500px;
                border-radius: 15px;
                background: #eae9e9;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: 470px;
                }
            }
        }
        .specila {
            .title {
                font-size: 25px;
                margin-bottom: 8px;
                padding: 15px 0 8px;
            }
            .detail {
                display: flex;
                width: 500px;
                .left {
                    flex: 1;
                    img {
                        width: 100%;
                    }
                }
                .right {
                    flex: 1;
                    padding-left: 20px;
                    font-size: 14px;
                    height: 300px;
                    overflow-y: auto;
                }
                @include scrollBar();
            }
        }
    }
    .rightInfo {
        flex: 1;
        padding-top: 10px;
        .price {
            height: 35px;
            line-height: 35px;
            font-size: 25px;
            margin-top: 10px;
        }
        .title {
            font-size: 32px;
            font-weight: 500;
            font-family: "AlibabaPuHuiTi-Heavy";
            text-align: center;
            line-height: 65px;
            border-bottom: 1px solid #efefef;
        }
        .el-form-item {
            height: 65px;
            margin: 0;
            border-bottom: 1px solid #efefef;
            .numberValue {
                padding-left: 12px;
                line-height: 65px;
                text-align: right;
                font-size: 20px;
                position: relative;
                &.showP {
                    text-align: center;
                    .name {
                        display: inline-block;
                        width: 25%;
                    }
                }
            }
            .el-form-item__label {
                font-size: 20px;
                line-height: 65px;
            }
            .el-input {
                padding-top: 5px;
                width: 80%;
                float: right;
                input {
                    text-align: right;
                    font-size: 20px;
                }
            }
            .el-form-item__error {
                right: 0;
                left: auto;
                top: 65%;
            }
            .iconfont {
                position: absolute;
                right: -40px;
                top: 0;
                cursor: pointer;
                font-size: 20px;
                &:hover {
                    color: #d5001c;
                }
            }
        }
        .footerBtn {
            text-align: center;
            padding-top: 70px;
            .el-button {
                padding: 0 20px;
                height: 60px;
                font-size: 25px;
                border-radius: 0;
                & + .el-button {
                    margin-left: 60px;
                }
            }
            .el-button--primary {
                background: #313639;
                border: none;
            }
            .el-button--default {
                background: #efefef;
                border: none;
                color: #333333;
            }
            .el-button.el-button--default:focus,
            .el-button.el-button--default:hover {
                color: #333333;
            }
        }
    }
}
</style>