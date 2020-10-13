<template>
    <div class="specification">
        <div class="logo">
            <img src="../../assets/img/logo.png" class="logo_img" />
        </div>
        <div class="price">Final Price - USD {{priceCount}}</div>
        <div class="show">
            <img src="../../assets/img/defult.png" v-show="defultImgShow" />
            <template v-for="(item,key) in showImg">
                <img :key="key" v-if="item" :src=" $url.baseImgUrl() + item" />
            </template>
            <div class="magnifying" v-if="magnifyingImg">
                <div class="circle"></div>
                <div class="diamond">
                    <img :src="$url.baseImgUrl() + magnifyingImg" />
                </div>
            </div>
        </div>
        <div class="choice">
            <div class="title">Make Your Choice Here</div>
            <div class="container" ref="wrapper">
                <div>
                    <section v-for="(item,index) of pageList" :key="item.id">
                        <div
                            class="subtitle"
                        >{{item.enname}} 【{{item.classificationContentList.length}} Selections】</div>
                        <div class="listData" ref="listWrapper">
                            <ul class="content">
                                <template v-for="(item1,index1) of item.classificationContentList">
                                    <el-popover
                                        :ref="`popover${index}-${index1}`"
                                        placement="top"
                                        width="360"
                                        trigger="click"
                                        :key="item1.id"
                                        :disabled="item1.isDetails == '0' || item.name == '颜色'"
                                    >
                                        <img
                                            :src="item1.detailsPhoto ? $url.baseImgUrl()+item1.detailsPhoto : ''"
                                            class="popDetailsPhoto"
                                        />
                                        <div class="popDescribe">{{item1.endescribe}}</div>
                                        <div class="popPrice">Final Price - USD {{item1.enprice}}</div>
                                        <div class="popFooter">
                                            <div
                                                class="ok"
                                                @click="popOk(item,index,item1,index1,$refs[`popover${index}-${index1}`][0])"
                                            >确定</div>
                                            <div
                                                class="cancel"
                                                @click="$refs[`popover${index}-${index1}`][0].doClose()"
                                            >取消</div>
                                        </div>
                                        <li
                                            :class="item.classificationContentList[index1].active && item.name == '颜色' ? 'item active colorItem' : item.name == '颜色' ? 'item colorItem' : item.classificationContentList[index1].active ? 'item active' : 'item'"
                                            @click="itemClick(index,index1,item.enname,$refs[`popover${index}-${index1}`][0])"
                                            slot="reference"
                                        >
                                            <div
                                                class="colorBox"
                                                v-if="item.name == '颜色'"
                                                :style="{background:item1.colour}"
                                            ></div>
                                            <img
                                                v-else
                                                :src="item1.wholePhoto ? $url.baseImgUrl()+item1.wholePhoto : ''"
                                            />
                                            <div
                                                class="serial"
                                                :title="item1.enname"
                                            >{{item1.enname}}</div>
                                        </li>
                                    </el-popover>
                                </template>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
            <div class="footer_btn">
                <div class="reset" @click="resetChange">RESET</div>
                <div class="create" @click="createChange">CREATE</div>
            </div>
        </div>
        <el-dialog
            title="保存"
            :visible.sync="dialogVisible"
            width="746px"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
        >
            <el-form ref="dialogForm" :model="form" label-width="110px">
                <el-form-item
                    label="锯片名称"
                    prop="sawBladeName"
                    :rules="[
      { required: true, message: '请输入锯片名称', trigger: 'blur' }
    ]"
                >
                    <el-input v-model="form.sawBladeName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item
                    label="客户名称"
                    prop="name"
                    :rules="[
      { required: true, message: '请输入客户名称', trigger: 'blur' }
    ]"
                >
                    <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item
                    label="联系电话"
                    prop="phone"
                    :rules="[
      { required: true, message: '请输入联系电话', trigger: 'blur' },
      { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入合法手机号/电话号', trigger: 'blur' }
    ]"
                >
                    <el-input v-model="form.phone" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogOkChange">确 定</el-button>
                <el-button @click="dialogCancelChange">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import BScroll from "better-scroll";
import "../../utils/rem.js";
export default {
    data() {
        return {
            pageList: [],
            options: {
                scrollbar: {
                    fade: false,
                    interactive: true
                },
                stopPropagation: true,
                mouseWheel: true,
                bounce: false
            },
            form: {
                sawBladeName: "",
                name: "",
                phone: "",
                remarks: ""
            },
            showImg: {},
            priceObj: {},
            priceCount: 0,
            magnifyingImg: "",
            dtcx: [],
            btkx: [],
            dtcxindex: null,
            btkxindex: null,
            dtcxindex1: null,
            btkxindex1: null,
            dialogVisible: false
        };
    },
    computed: {
        defultImgShow() {
            var show = true;
            for (var key in this.showImg) {
                this.showImg[key] !== "" && (show = false);
            }
            return show;
        }
    },
    methods: {
        dialogCancelChange() {
            this.dialogVisible = false;
            for (var key in this.form) {
                this.form[key] = "";
            }
            this.$refs.dialogForm.resetFields();
        },
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
                    data["offer"] = this.priceCount;
                    data["offerStatisticsSubList"] = dataArr;
                    this.$axios({
                        url: "/offerStatistics/add",
                        method: "POST",
                        data
                    }).then(res => {
                        if (res.success) {
                            this.$message.success(res.msg);
                            this.resetChange();
                            this.dialogVisible = false;
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
            });
        },
        createChange() {
            this.dialogVisible = true;
        },
        resetChange() {
            this.dtcx = [];
            this.btkx = [];
            this.dtcxindex = null;
            this.btkxindex = null;
            this.dtcxindex1 = null;
            this.btkxindex1 = null;
            this.priceCount = 0;
            this.magnifyingImg = "";
            for (var key in this.showImg) {
                this.$set(this.showImg, key, "");
            }
            for (var key in this.showImg) {
                this.priceObj[key] = 0;
            }
            this.pageList.forEach(item => {
                item.classificationContentList.forEach(item1 => {
                    item1.active = false;
                });
            });
        },
        setPriceCount() {
            this.priceCount = 0;
            var count = 0;
            var obj = this.priceObj;
            for (var key in obj) {
                count += obj[key];
            }
            this.priceCount = count;
        },
        popOk(superior, index, data, index1, el) {
            this.colorInit();
            var name = superior.enname;
            // if(data.isAppearance == '1'){
            //     this.$set(this.showImg, name, data.wholePhoto);
            //     this.magnifyingImg = data.detailsPhoto;
            // }else{
            //     this.$set(this.showImg, name, "");
            //     this.magnifyingImg = "";
            // }
            // this.showImg = Object.assign(this.showImg, {});
            this.$set(this.priceObj, name, data.enprice);
            this.setPriceCount();
            var list = this.pageList[index];
            list.classificationContentList.forEach(item => {
                item.active = false;
            });
            data.active = true;
            this.$forceUpdate();
            el.doClose();
        },
        itemClick(index, index1, enname, el) {
            var data = this.pageList[index];
            var classList = data.classificationContentList[index1];
            var f = classList.active;
            if (
                enname !== "colour" &&
                (classList.isDetails !== "1" || classList.isAppearance == "0")
            ) {
                this.colorInit();
            }
            if (f && enname !== "colour") {
                this.pitchChange1(enname, f, classList, el);
            }
            if (
                !f &&
                (classList.isAppearance == "0" || classList.isDetails == "0")
            ) {
                this.pitchChange2(enname, classList, data, el);
            }
            if (enname === "colour") {
                this.pitchColorChange(enname, classList, data, f);
            }
            this.$set(this.pageList, index, data);
        },
        colorInit() {
            this.dtcx = [];
            this.btkx = [];
            this.dtcxindex = null;
            this.btkxindex = null;
            this.dtcxindex1 = null;
            this.btkxindex1 = null;
            this.$set(this.priceObj, "colour", 0);
            this.setPriceCount();
            this.$set(this.showImg, "colour", "");
            for (var item of this.pageList) {
                if (item.id === "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                    //颜色id
                    for (var item1 of item.classificationContentList) {
                        item1.active = false;
                    }
                }
                // item.classificationContentList.forEach(item1 => {
                //     if (item1.active) {
                //         this.$set(this.showImg, item.enname, item1.wholePhoto);
                //     }
                // });
            }
        },
        pitchChange1(enname, f, classList, el) {
            // this.$set(this.showImg, enname, "");
            this.magnifyingImg = "";
            this.$set(this.priceObj, enname, 0);
            this.setPriceCount();
            classList.active = !f;
            setTimeout(() => {
                el.doClose();
            }, 1);
        },
        pitchChange2(enname, classList, data, el) {
            if (classList.isDetails == "0") {
                setTimeout(() => {
                    el.doClose();
                }, 1);
                data.classificationContentList.forEach(item => {
                    item.active = false;
                });
                classList.active = true;
            }
            if (classList.isAppearance == "0" && classList.isDetails == "0") {
                // this.$set(this.showImg, enname, "");
            }
            if (classList.isAppearance == "1") {
                // this.$set(this.showImg, enname, classList.wholePhoto);
            }
            this.magnifyingImg = "";
            this.$set(this.priceObj, enname, classList.enprice);
            this.setPriceCount();
        },
        pitchColorChange(enname, classList, data, f) {
            data.classificationContentList.forEach(item => {
                item.active = false;
            });
            classList.active = !f;

            var contentSubList = classList.contentSubList;
            if(contentSubList.length == 0){
                this.$message.warning('没有找到对应的锯片,请重新选择')
                return
            }
            for (var i = 0; i < this.pageList.length; i++) {
                if (this.pageList[i].id == "8a323f445ccd4328aad6e84b2523b35b") {
                    //刀头齿形
                    this.dtcx = this.pageList[i].classificationContentList;
                    this.dtcxindex = i;
                }
                if (this.pageList[i].id == "a0a897acabc948789fa70d2eb4a309e5") {
                    //本体孔型
                    this.btkx = this.pageList[i].classificationContentList;
                    this.btkxindex = i;
                }
            }
            var subListIndex = null;
            var currentDtcx = null;
            var currentBtkx = null;
            for (var k = 0; k < contentSubList.length; k++) {
                var pass = contentSubList[k].pass;
                var toothProfile = contentSubList[k].toothProfile;
                for (var i = 0; i < this.dtcx.length; i++) {
                    if (this.dtcx[i].id == toothProfile) {
                        for (var j = 0; j < this.btkx.length; j++) {
                            if (this.btkx[j].id == pass) {
                                this.dtcxindex1 = i;
                                this.btkxindex1 = j;
                                subListIndex = k;
                                console.log(i, j, k);
                                currentDtcx = this.dtcx[i]
                                currentBtkx = this.btkx[j]
                            }
                        }
                    }
                }
            }
            if (classList.active === true && subListIndex !== null) {
                if(!currentDtcx.active || !currentBtkx.active){
                    this.$message.warning('没有找到对应的锯片,请重新选择')
                    return
                }
                this.$set(this.priceObj, enname, classList.enprice);
                this.setPriceCount();
                if (
                    this.dtcxindex != null &&
                    this.btkxindex != null &&
                    this.dtcxindex1 != null &&
                    this.btkxindex1 != null
                ) {
                    this.magnifyingImg =
                        contentSubList[subListIndex].detailsPhoto;
                    this.$set(
                        this.showImg,
                        this.pageList[this.dtcxindex].enname,
                        ""
                    );
                    this.$set(
                        this.showImg,
                        this.pageList[this.btkxindex].enname,
                        ""
                    );
                    this.$set(
                        this.showImg,
                        "colour",
                        contentSubList[subListIndex].wholePhoto
                    );
                }
            } else {
                this.$set(this.priceObj, enname, 0);
                this.setPriceCount();
                this.magnifyingImg = "";
                // var wholePhoto1 = "";
                // var wholePhoto2 = "";
                // for (var item of this.dtcx) {
                //     if (item.active) {
                //         wholePhoto1 = item.wholePhoto;
                //         break;
                //     }
                // }
                // for (var item of this.btkx) {
                //     if (item.active) {
                //         wholePhoto2 = item.wholePhoto;
                //         break;
                //     }
                // }
                // this.$set(
                //     this.showImg,
                //     this.pageList[this.dtcxindex].enname,
                //     wholePhoto1
                // );
                // this.$set(
                //     this.showImg,
                //     this.pageList[this.btkxindex].enname,
                //     wholePhoto2
                // );
                this.$set(this.showImg, "colour", "");
            }
        },
        getListData() {
            this.$axios
                .get("/classification/classificationAndContenList")
                .then(res => {
                    if (res.success) {
                        var pageList = res.page;
                        pageList.sort((a, b) => a.sort - b.sort);
                        pageList = pageList.filter(
                            item => item.useable === "1"
                        );
                        pageList.forEach(item => {
                            this.$set(this.showImg, item.enname, "");
                            this.priceObj[item.enname] = 0;
                            var arr = [];
                            item.classificationContentList.forEach(item1 => {
                                item1["active"] = false;
                                if (item1.isEnable === "1") {
                                    arr.push(item1);
                                }
                            });
                            item.classificationContentList = arr;
                        });
                        this.pageList = pageList;
                    }
                });
        }
    },
    created() {
        this.getListData();
    }
};
</script>

<style lang='scss'>
#app {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
.specification {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1920px;
    height: 1080px;
    background: url("~@/assets/img/bg.jpg");
    background-size: 100% 100%;
    ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #cecece;
    }
    ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 10px;
        background: #ebebeb;
    }
    .el-dialog {
        border-radius: 20px;
        overflow: hidden;
        width: 750px !important;
        .el-dialog__header {
            height: 60px;
            background: #efefef;
            padding: 20px 20px 10px 40px;
            font-size: 24px;
            font-weight: 400;
            .el-dialog__title {
                font-size: 24px;
                color: #333333;
            }
            .el-dialog__close {
                font-size: 30px;
            }
        }
        .el-dialog__body {
            padding: 30px 50px;
            .el-input__inner,
            textarea {
                border: none;
                background: #f7f7f7;
            }
            textarea {
                height: 155px;
            }
            .el-form-item {
                margin-bottom: 22px;
            }
            .el-form-item__label {
                font-size: 20px;
            }
        }
        .el-dialog__footer {
            text-align: center;
            font-size: 24px;
            padding: 0 0 50px 0;
            .el-button {
                width: 108px;
                height: 45px;
            }
            .el-button--primary {
                background: #1d5adc;
            }
        }
    }
    .logo {
        position: absolute;
        left: 42px;
        top: 35px;
        .logo_img {
            width: 221px;
            height: 110px;
        }
    }
    .price {
        position: absolute;
        left: 52px;
        bottom: 41px;
        font-size: 24px;
        font-weight: 400;
        color: #ffffff;
    }
    .show {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 145px;
        width: 780px;
        height: 780px;
        & > img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        .magnifying {
            position: absolute;
            top: 637px;
            left: 538px;
            .circle {
                position: absolute;
                left: 0;
                top: 0;
                width: 105px;
                height: 105px;
                border: 14px solid #df0000;
                border-radius: 50%;
                &::after {
                    content: "";
                    display: block;
                    width: 10px;
                    height: 1px;
                    background: #fff;
                    position: absolute;
                    right: 0px;
                    bottom: -7px;
                    transform: rotate(45deg);
                }
            }
            .diamond {
                position: absolute;
                left: 79px;
                top: 96px;
                width: 222px;
                height: 163px;
                border: 14px solid #df0000;
                border-radius: 20px;
                background: #fff;
                text-align: center;
                img {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
    }
    .choice {
        float: right;
        width: 850px;
        height: 100%;
        border-radius: 20px 0px 0px 20px;
        background: #fff;
        .title {
            height: 100px;
            line-height: 100px;
            text-align: center;
            font-size: 24px;
            font-weight: 400;
        }
        .container {
            position: relative;
            padding-left: 40px;
            padding-right: 15px;
            height: 850px;
            overflow-y: auto;

            /deep/ .bscroll-vertical-scrollbar {
                background: #ebebeb !important;
                .bscroll-indicator {
                    background: #cfcfcf !important;
                    border: none !important;
                }
            }
            section {
                margin-top: 10px;
                .subtitle {
                    height: 42px;
                    font-size: 22px;
                    font-weight: 400;
                    color: #1f2531;
                }
                .listData {
                    position: relative;
                    max-height: 466px;
                    overflow-y: auto;
                    border: 1px solid transparent;
                    /* 或者是添加 padding: 1px*/
                    box-sizing: border-box;
                    .content {
                        overflow: hidden;
                        .item {
                            float: left;
                            width: 110px;
                            height: 120px;
                            background: #f7f7f7;
                            border-radius: 22px;
                            margin-right: 20px;
                            margin-bottom: 15px;
                            text-align: center;
                            display: flex;
                            justify-content: center;
                            flex-wrap: wrap;
                            padding: 5px 0;
                            position: relative;
                            border: 1px solid transparent;
                            outline: none;
                            cursor: pointer;
                            &.colorItem {
                                background: #fff;
                                height: 80px;
                                .colorBox {
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                }
                            }
                            &.active {
                                border: 1px solid #246faf;
                                background: #f0f3fa;
                            }
                            img {
                                max-width: 85px;
                                max-height: 85px;
                            }
                            .serial {
                                position: absolute;
                                bottom: 4px;
                                width: 100%;
                                font-size: 16px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }
        .footer_btn {
            display: flex;
            justify-content: center;
            margin-top: 30px;
            & > div {
                width: 207px;
                height: 49px;
                font-size: 18px;
                font-weight: 400;
                line-height: 49px;
                cursor: pointer;
                text-align: center;
                &.reset {
                    background: url("~@/assets/img/btn_bg1.png");
                    background-size: 100% 100%;
                    margin-right: 15px;
                    color: #ffffff;
                }
                &.create {
                    background: url("~@/assets/img/btn_bg2.png");
                    background-size: 100% 100%;
                    margin-left: 15px;
                    color: #909090;
                }
            }
        }
    }
}
.el-popover {
    padding: 30px;
    width: 360px !important;
}
.popDetailsPhoto {
    width: 206px;
}
.popDescribe {
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
    margin-bottom: 10px;
    margin-top: 20px;
}
.popPrice {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #da0000;
    line-height: 20px;
    margin-bottom: 23px;
}
.popFooter {
    display: flex;
    justify-content: center;
    & > div {
        width: 80px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border: 1px solid #cccccc;
        border-radius: 10px;
        font-size: 14px;
        letter-spacing: 5px;
        cursor: pointer;
        &.cancel {
            color: #333333;
        }
        &.ok {
            color: #ffffff;
            background: #246faf;
            margin-right: 20px;
            border: 0;
        }
    }
}
</style>