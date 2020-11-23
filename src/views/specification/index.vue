<template>
    <div class="specification">
        <div class="logo">
            <img src="../../assets/img/logo.png" class="logo_img" />
        </div>
        <!-- <div class="price" v-if="priceNameShow">{{priceName}} {{priceCount}}</div> 暂时不开放价格显示的功能 -->
        <div class="show">
            <img src="../../assets/img/defult.png" v-show="defultImgShow" />
            <template v-for="(item,key) in showImg">
                <img :key="key" v-if="item" :src=" $url.baseImgUrl() + item" />
            </template>
        </div>
        <div class="choice">
            <div class="magnifying" v-if="magnifyingImg">
                <div class="diamond">
                    <img :src="$url.baseImgUrl() + magnifyingImg" />
                </div>
            </div>
            <div class="title">MAKE YOUR CHOICE HERE</div>
            <div class="container" ref="wrapper">
                <section v-for="(item,index) of pageList" :key="item.id">
                    <div
                        class="subtitle"
                    >{{item.enname}} ({{item.classificationContentList.length}} Selections)</div>
                    <div
                        :class="item.id == 'f3d847cde26c4d02ac0a6d0c37ae9c2f' ? 'listData colorL' : 'listData'"
                        ref="listWrapper"
                    >
                        <div 
                            :class="item.id == 'c62e951ec23d40199612121e3447ca15' || item.id == 'b19db927a77c4d4fa254c1fad9e7c1c6' || item.id == '07aefea35582424e928fd89fa612346c' ? 'content ts' : 'content'"
                        >
                            <template v-for="(item1,index1) of item.classificationContentList">
                                <el-popover
                                    :ref="`popover${index}-${index1}`"
                                    placement="top"
                                    width="360"
                                    trigger="hover"
                                    :key="item1.id"
                                    :disabled="item1.isDetails == '0' || item.id == 'f3d847cde26c4d02ac0a6d0c37ae9c2f'"
                                >
                                    <img
                                        :src="item1.detailsPhoto ? $url.baseImgUrl()+item1.detailsPhoto : ''"
                                        class="popDetailsPhoto"
                                    />
                                    <div class="popDescribe">{{item1.endescribe}}</div>
                                    <!-- <div
                                        class="popPrice"
                                        v-if="priceNameShow"
                                    >Final Price - USD {{item1.enprice}}</div>-->
                                    <div class="popFooter">
                                        <div
                                            class="ok"
                                            @click="popOk(item,index,item1,index1,$refs[`popover${index}-${index1}`][0])"
                                        >CONFIRM</div>
                                        <!-- <div
                                            class="cancel"
                                            @click="$refs[`popover${index}-${index1}`][0].doClose()"
                                        >取消</div>-->
                                    </div>
                                    <div
                                        @click="itemClick(index,index1,item.id,$refs[`popover${index}-${index1}`][0])"
                                        slot="reference"
                                        class="li"
                                    >
                                        <div
                                            v-if="item.id != 'c62e951ec23d40199612121e3447ca15' && item.id != 'b19db927a77c4d4fa254c1fad9e7c1c6' && item.id != '07aefea35582424e928fd89fa612346c'"
                                            :class="item.classificationContentList[index1].active && item.id == 'f3d847cde26c4d02ac0a6d0c37ae9c2f' ? 'item active colorItem' : item.id == 'f3d847cde26c4d02ac0a6d0c37ae9c2f' ? 'item colorItem' : item.classificationContentList[index1].active ? 'item active' : 'item'"
                                        >
                                            <div
                                                class="colorBox"
                                                v-if="item.id == 'f3d847cde26c4d02ac0a6d0c37ae9c2f'"
                                                :style="{background:item1.colour}"
                                            ></div>
                                            <img
                                                v-else
                                                :src="item1.wholePhoto ? $url.baseImgUrl()+item1.wholePhoto : ''"
                                            />
                                        </div>

                                        <div
                                            v-if="item.id != 'c62e951ec23d40199612121e3447ca15' && item.id != 'b19db927a77c4d4fa254c1fad9e7c1c6' && item.id != '07aefea35582424e928fd89fa612346c'"
                                            :class="item.id == 'f3d847cde26c4d02ac0a6d0c37ae9c2f' ? 'colorS serial' : 'serial'"
                                            :title="item1.enname"
                                        >{{item1.enname}}</div>
                                        <div
                                            v-if="item.id == 'c62e951ec23d40199612121e3447ca15' || item.id == 'b19db927a77c4d4fa254c1fad9e7c1c6' || item.id == '07aefea35582424e928fd89fa612346c'"
                                            :class="item.classificationContentList[index1].active ? 'measure active' : 'measure'"
                                        >{{item1.enname}}</div>
                                    </div>
                                </el-popover>
                            </template>
                        </div>
                    </div>
                </section>
            </div>
            <div class="footer_btn">
                <div class="create" @click="createChange">CREATE</div>
                <div class="reset" @click="resetChange">RESET</div>
            </div>
        </div>
        <el-dialog
            title="Save"
            :visible.sync="dialogVisible"
            width="746px"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
        >
            <!-- <div class="bladeInfo">
                <div class="infoBox">
                    <div class="info" v-for="(item,index) of bladeData" :key="index">
                        <div class="infoName">{{Object.keys(item)[0]}}</div>
                        <div class="infoMessage">{{Object.values(item)[0]}}</div>
                    </div>
                </div>
            </div>-->
            <el-form ref="dialogForm" :model="form" label-width="auto">
                <div class="title">YOUR BLADE INFORMATIONS</div>
                <el-form-item
                    :label="Object.keys(item)[0]"
                    v-for="(item,index) of bladeData"
                    :key="index"
                >
                    <div style="padding-left:12px;">{{Object.values(item)[0]}}</div>
                </el-form-item>
                <div class="title">YOUR INFORMATIONS</div>
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
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogOkChange">Save and exit</el-button>
                <el-button @click="dialogCancelChange">Back to reset</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
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
                name: "",
                email: "",
                country: ""
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
            dialogVisible: false,
            bladeData: [],
            priceName: "",
            priceNameShow: false,
            itemDisabled: false,
            defaultCheckArr: []
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
    created() {
        this.getListData();
        this.getSelectPriceSetting();
    },
    methods: {
        getSelectPriceSetting() {
            this.$axios.get("/priceSetting/selectPriceSetting").then(res => {
                if (res.success) {
                    if (res.success) {
                        if (
                            res.page.length == 0 ||
                            res.page[0].useable == "0"
                        ) {
                            this.priceName = "";
                            this.priceNameShow = false;
                        } else {
                            this.priceName = res.page[0].name;
                            this.priceNameShow = true;
                        }
                    }
                }
            });
        },
        dialogCancelChange() {
            this.dialogVisible = false;
            for (var key in this.form) {
                this.form[key] = "";
            }
            this.$refs.dialogForm.resetFields();
            this.resetChange();
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
                    data["quotedPrice"] = this.priceCount;
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
                            for (var key in this.form) {
                                this.form[key] = "";
                            }
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
            });
        },
        createChange() {
            this.bladeData = [];
            var Outer = "";
            var Bore = "";
            var Teeth = "";
            this.pageList.forEach(item => {
                var obj = {};
                if (item.id == "c62e951ec23d40199612121e3447ca15") {
                    for (var item2 of item.classificationContentList) {
                        if (item2.active) {
                            Outer = item2.enname;
                            break;
                        }
                    }
                    return;
                }
                if (item.id == "b19db927a77c4d4fa254c1fad9e7c1c6") {
                    for (var item2 of item.classificationContentList) {
                        if (item2.active) {
                            Bore = item2.enname;
                            break;
                        }
                    }
                    return;
                }
                if (item.id == "07aefea35582424e928fd89fa612346c") {
                    for (var item2 of item.classificationContentList) {
                        if (item2.active) {
                            Teeth = item2.enname;
                            break;
                        }
                    }
                    return;
                }
                obj[item.name] = "None";
                for (var item2 of item.classificationContentList) {
                    if (item2.active) {
                        obj[item.name] = item2.enname;
                    }
                }
                this.bladeData.push(obj);
            });
            var a = [];
            if (Outer) {
                a.push(Outer);
            }
            if (Bore) {
                a.push(Bore);
            }
            if (Teeth) {
                a.push(Teeth);
            }
            var s = "None";
            if (a.length > 0) {
                s = a.join(" X ");
            }
            this.bladeData.unshift({
                SPECIFICATIONS: s
            });
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
            var colorIsDefaultData = null;
            var colorIsDefaultList = null;
            this.pageList.forEach(item => {
                item.classificationContentList.forEach(item1 => {
                    var b = false;
                    for (var item2 of this.defaultCheckArr) {
                        if (item2.id == item1.id) {
                            b = true;
                            if (item.id == "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                                colorIsDefaultData = item;
                                colorIsDefaultList = item1;
                            }
                            break;
                        }
                    }
                    item1.active = b;
                });
            });
            colorIsDefaultData &&
                colorIsDefaultList &&
                this.pitchColorChange(
                    colorIsDefaultData.id,
                    colorIsDefaultList,
                    colorIsDefaultData,
                    false
                );
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
            // this.colorInit();
            var name = superior.id;
            // if (data.isAppearance == "1" && name != '8a323f445ccd4328aad6e84b2523b35b') {
            //     this.$set(this.showImg, name, data.wholePhoto);
            // } else {
            //     this.$set(this.showImg, name, "");
            // }
            // if (
            //     superior.id == "a0a897acabc948789fa70d2eb4a309e5" ||
            //     superior.id == "8a323f445ccd4328aad6e84b2523b35b"
            // ) {
            //     //刀头 孔型id
            //     this.magnifyingImg = data.detailsPhoto;
            // }
            // this.showImg = Object.assign(this.showImg, {});
            this.$set(this.priceObj, name, data.enprice);
            this.setPriceCount();
            var list = this.pageList[index];
            list.classificationContentList.forEach(item => {
                item.active = false;
            });
            data.active = true;
            if (name == "8a323f445ccd4328aad6e84b2523b35b") {
                var ff = 0;
                for (var item1 of this.pageList) {
                    if (item1.id == "a0a897acabc948789fa70d2eb4a309e5") {
                        for (var item2 of item1.classificationContentList) {
                            if (item2.active) {
                                ff = 1;
                            }
                        }
                    }
                }
                for (var item1 of this.pageList) {
                    if (item1.id == "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                        for (var item2 of item1.classificationContentList) {
                            if (item2.active) {
                                ff = 2;
                                break;
                            }
                        }
                    }
                }
                if (ff === 1) {
                    for (var item1 of this.pageList) {
                        if (item1.id == "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                            for (var item2 of item1.classificationContentList) {
                                if (
                                    item2.id ==
                                    "8016fea7875a4a14ab26d98771ad3f5c"
                                ) {
                                    item2.active = true;
                                }
                            }
                        }
                    }
                }
            }
            this.$forceUpdate();
            el.doClose();
            this.seekColorItem();
        },
        itemClick(index, index1, id, el) {
            var data = this.pageList[index];
            var classList = data.classificationContentList[index1];
            var f = classList.active;
            if (f && id !== "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                this.pitchChange1(id, f, classList, el);
            }
            if (!f && id !== "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                this.pitchChange2(id, classList, data, el);
            }
            if (id === "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                this.pitchColorChange(id, classList, data, f);
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
            this.$set(
                this.priceObj,
                "colf3d847cde26c4d02ac0a6d0c37ae9c2four",
                0
            );
            this.setPriceCount();
            this.$set(this.showImg, "f3d847cde26c4d02ac0a6d0c37ae9c2f", "");
            for (var item of this.pageList) {
                if (item.id === "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                    //颜色id
                    for (var item1 of item.classificationContentList) {
                        item1.active = false;
                    }
                }
                item.classificationContentList.forEach(item1 => {
                    if (item1.active && item1.isAppearance == "1") {
                        this.$set(this.showImg, item.id, item1.wholePhoto);
                    }
                });
            }
        },
        pitchChange1(id, f, classList, el) {
            this.$set(this.showImg, id, "");
            this.magnifyingImg = "";
            this.$set(this.priceObj, id, 0);
            this.setPriceCount();
            classList.active = !f;
            this.seekColorItem();
            setTimeout(() => {
                el.doClose();
            }, 1);
        },
        pitchChange2(id, classList, data, el) {
            this.$set(this.showImg, id, "");
            if (classList.isDetails == "0") {
                setTimeout(() => {
                    el.doClose();
                }, 1);
                data.classificationContentList.forEach(item => {
                    item.active = false;
                });
                classList.active = true;
                this.seekColorItem();
                if (
                    data.id != "a0a897acabc948789fa70d2eb4a309e5" &&
                    data.id != "8a323f445ccd4328aad6e84b2523b35b"
                ) {
                    //刀头 孔型id
                    this.magnifyingImg = "";
                }
            }
            if (
                classList.isAppearance == "1" &&
                id != "8a323f445ccd4328aad6e84b2523b35b" //this.showImg["f3d847cde26c4d02ac0a6d0c37ae9c2f"] == "" &&
            ) {
                if (
                    id == "a0a897acabc948789fa70d2eb4a309e5" &&
                    this.showImg["f3d847cde26c4d02ac0a6d0c37ae9c2f"] == ""
                ) {
                    this.$set(this.showImg, id, classList.wholePhoto);
                }
                if (id != "a0a897acabc948789fa70d2eb4a309e5") {
                    this.$set(this.showImg, id, classList.wholePhoto);
                }
            }
            if (classList.isDetails != "1") {
                this.$set(this.priceObj, id, classList.enprice);
                this.setPriceCount();
            }
        },
        seekColorItem() {
            var colorData = null;
            var dtcxData = null;
            var btkxData = null;
            for (var i = 0; i < this.pageList.length; i++) {
                if (this.pageList[i].id == "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                    //颜色
                    colorData = this.pageList[i];
                }
                if (this.pageList[i].id == "8a323f445ccd4328aad6e84b2523b35b") {
                    //刀头齿形
                    dtcxData = this.pageList[i].classificationContentList;
                }
                if (this.pageList[i].id == "a0a897acabc948789fa70d2eb4a309e5") {
                    //本体孔型
                    btkxData = this.pageList[i].classificationContentList;
                }
            }
            if (!colorData) return;
            var activeColor = null;
            for (var item of colorData.classificationContentList) {
                if (item.active) {
                    activeColor = item;
                    break;
                }
            }
            if (!activeColor) return;
            var activeColorList = activeColor.contentSubList;
            var currentDtcx = {};
            var currentBtkx = {};
            var currentList = {};
            for (var item1 of activeColorList) {
                var pass = item1.pass;
                var toothProfile = item1.toothProfile;
                for (var item2 of dtcxData) {
                    if (item2.id == toothProfile && item2.active) {
                        for (var item3 of btkxData) {
                            if (item3.id == pass && item3.active) {
                                currentDtcx = item2;
                                currentBtkx = item3;
                                currentList = item1;
                            }
                        }
                    }
                }
            }
            if (
                Object.keys(currentDtcx).length == 0 ||
                Object.keys(currentBtkx).length == 0
            ) {
                this.$message.warning("没有找到对应的锯片,请重新选择");
                this.itemDisabled = true;
                this.magnifyingImg = "";
                this.$set(this.priceObj, colorData.id, 0);
                this.setPriceCount();
                this.$set(this.showImg, colorData.id, "");
                var wholePhoto1 = "";
                var wholePhoto2 = "";
                // for (var item of dtcxData) {
                //     if (item.active && item.isAppearance == "1") {
                //         wholePhoto1 = item.wholePhoto;
                //         break;
                //     }
                // }
                for (var item of btkxData) {
                    if (item.active && item.isAppearance == "1") {
                        wholePhoto2 = item.wholePhoto;
                        break;
                    }
                }
                // this.$set(this.showImg, '8a323f445ccd4328aad6e84b2523b35b', wholePhoto1);
                this.$set(
                    this.showImg,
                    "a0a897acabc948789fa70d2eb4a309e5",
                    wholePhoto2
                );
            } else {
                this.itemDisabled = false;
                this.setMagnifying(currentBtkx, currentDtcx);
                this.$set(this.priceObj, colorData.id, activeColor.enprice);
                this.setPriceCount();
                // this.$set(this.showImg, '8a323f445ccd4328aad6e84b2523b35b', '');
                this.$set(this.showImg, "a0a897acabc948789fa70d2eb4a309e5", "");
                this.$set(
                    this.showImg,
                    "f3d847cde26c4d02ac0a6d0c37ae9c2f",
                    currentList.wholePhoto
                );
            }
        },
        setMagnifying(kx, cx) {
            var data = this.pageList;
            var f = true;
            for (var item1 of data) {
                if (
                    item1.id != "f3d847cde26c4d02ac0a6d0c37ae9c2f" &&
                    item1.id != "8a323f445ccd4328aad6e84b2523b35b" &&
                    item1.id != "a0a897acabc948789fa70d2eb4a309e5"
                ) {
                    //颜色，齿形，孔型
                    for (var item2 of item1.classificationContentList) {
                        if (item2.active) {
                            f = false;
                            break;
                        }
                    }
                }
            }
            if (f) {
                if (kx.detailsPhoto && kx.isDetails == "1") {
                    this.magnifyingImg = kx.detailsPhoto;
                }
                if (cx.detailsPhoto && cx.isDetails == "1") {
                    this.magnifyingImg = cx.detailsPhoto;
                }
            } else {
                this.magnifyingImg = "";
            }
        },
        pitchColorChange(id, classList, data, f) {
            var contentSubList = classList.contentSubList;
            if (contentSubList.length == 0) {
                this.$message.warning("没有找到对应的锯片,请重新选择");
                return;
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
            var currentDtcx = {};
            var currentBtkx = {};
            for (var k = 0; k < contentSubList.length; k++) {
                var pass = contentSubList[k].pass;
                var toothProfile = contentSubList[k].toothProfile;
                for (var i = 0; i < this.dtcx.length; i++) {
                    if (
                        this.dtcx[i].id == toothProfile &&
                        this.dtcx[i].active
                    ) {
                        for (var j = 0; j < this.btkx.length; j++) {
                            if (
                                this.btkx[j].id == pass &&
                                this.btkx[j].active
                            ) {
                                this.dtcxindex1 = i;
                                this.btkxindex1 = j;
                                subListIndex = k;
                                console.log(i, j, k);
                                currentDtcx = this.dtcx[i];
                                currentBtkx = this.btkx[j];
                            }
                        }
                    }
                }
            }
            if (
                (classList.active === true && !currentDtcx.active) ||
                !currentBtkx.active
            ) {
                this.$message.warning("没有找到对应的锯片,请重新选择2");
                return;
            }
            data.classificationContentList.forEach(item => {
                item.active = false;
            });
            classList.active = !f;
            if (classList.active === true && subListIndex !== null) {
                this.$set(this.priceObj, id, classList.enprice);
                this.setPriceCount();
                this.setMagnifying(currentBtkx, currentDtcx);
                if (
                    this.dtcxindex != null &&
                    this.btkxindex != null &&
                    this.dtcxindex1 != null &&
                    this.btkxindex1 != null
                ) {
                    // this.$set(
                    //     this.showImg,
                    //     this.pageList[this.dtcxindex].id,
                    //     ""
                    // );
                    this.$set(
                        this.showImg,
                        this.pageList[this.btkxindex].id,
                        ""
                    );
                    this.$set(
                        this.showImg,
                        "f3d847cde26c4d02ac0a6d0c37ae9c2f",
                        contentSubList[subListIndex].wholePhoto
                    );
                }
            } else {
                this.$set(this.priceObj, id, 0);
                this.setPriceCount();
                this.magnifyingImg = "";
                var wholePhoto1 = "";
                var wholePhoto2 = "";
                for (var item of this.dtcx) {
                    if (item.active && item.isAppearance == "1") {
                        wholePhoto1 = item.wholePhoto;
                        break;
                    }
                }
                for (var item of this.btkx) {
                    if (item.active && item.isAppearance == "1") {
                        wholePhoto2 = item.wholePhoto;
                        break;
                    }
                }
                // this.$set(
                //     this.showImg,
                //     this.pageList[this.dtcxindex].id,
                //     wholePhoto1
                // );
                this.$set(
                    this.showImg,
                    this.pageList[this.btkxindex].id,
                    wholePhoto2
                );
                this.$set(this.showImg, "f3d847cde26c4d02ac0a6d0c37ae9c2f", "");
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
                        var colorIsDefaultData = null;
                        var colorIsDefaultList = null;
                        pageList.forEach(item => {
                            this.$set(this.showImg, item.id, "");
                            this.priceObj[item.id] = 0;
                            var arr = [];
                            item.classificationContentList.forEach(item1 => {
                                if (item1.defaultCheck == 0) {
                                    item1["active"] = true;
                                    this.defaultCheckArr.push(item1);
                                    if (
                                        item.id ==
                                        "f3d847cde26c4d02ac0a6d0c37ae9c2f"
                                    ) {
                                        colorIsDefaultData = item;
                                        colorIsDefaultList = item1;
                                    }
                                } else {
                                    item1["active"] = false;
                                }
                                if (item1.isEnable === "1") {
                                    arr.push(item1);
                                }
                            });
                            item.classificationContentList = arr;
                        });
                        this.pageList = pageList;
                        colorIsDefaultData &&
                            colorIsDefaultList &&
                            this.pitchColorChange(
                                colorIsDefaultData.id,
                                colorIsDefaultList,
                                colorIsDefaultData,
                                false
                            );
                    }
                });
        }
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
    max-height: 95vh;
    background: #efefef;
    ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 12px; /*高宽分别对应横竖滚动条的尺寸*/
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
            padding: 10px 35px;
            font-size: 18px;
            .el-input__inner {
                border: none;
                background: #efefee;
                font-size: 18px;
            }
            .el-form-item {
                margin-bottom: 22px;
                display: flex;
            }
            .el-form-item__label {
                font-size: 18px;
                text-align: left;
                padding-left: 5px;
                border-radius: 5px;
                height: 100%;
            }
            .el-form-item__content {
                flex: 1;
                height: 100%;
                margin-left: 12px !important;
                background: #efefee;
            }
            .title {
                background: #efefee;
                padding: 10px;
                border-radius: 7px;
                margin-bottom: 15px;
            }
            .el-form {
                margin-top: 15px;
            }
            // .bladeInfo{
            //     .infoBox{
            //         .info{
            //             display: flex;
            //             margin: 15px 0;
            //             .infoName{
            //                 width: 110px;
            //                 background: #efefee;
            //                 padding: 5px;
            //                 border-radius: 5px;
            //             }
            //             .infoMessage{
            //                 flex: 1;
            //                 margin-left: 12px;
            //                 background: #efefee;
            //                 padding: 5px;
            //                 border-radius: 5px;
            //             }
            //         }
            //     }
            // }
        }
        .el-dialog__footer {
            text-align: center;
            font-size: 24px;
            padding: 0 0 50px 0;
            .el-button {
                height: 45px;
                border-radius: 0;
            }
            .el-button--primary {
                background: #e70010;
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
    .logo {
        position: absolute;
        left: 35px;
        top: 40px;
        .logo_img {
            width: 124px;
            height: 152px;
        }
    }
    .price {
        position: absolute;
        left: 53px;
        bottom: 47px;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        letter-spacing: 1px;
    }
    .show {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 180px;
        width: 780px;
        height: 780px;
        & > img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
    .choice {
        float: right;
        position: relative;
        width: 760px;
        height: 100%;
        background: #fff;
        .magnifying {
            position: absolute;
            bottom: 220px;
            left: -220px;
            .diamond {
                position: absolute;
                left: 0px;
                top: 0px;
                width: 220px;
                height: 220px;
                text-align: center;
                background-color: #fff;
                background-image: radial-gradient(#151957, #080a21);
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
        .title {
            padding-left: 84px;
            font-size: 32px;
            font-weight: 500;
            height: 42px;
            line-height: 1;
            letter-spacing: 1px;
            margin-bottom: 20px;
            font-family: AlibabaPuHuiTi-Heavy;
        }
        .container {
            position: relative;
            padding-left: 84px;
            padding-right: 100px;
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
                padding-bottom: 25px;
            }
            .subtitle {
                height: 38px;
                width: 516px;
                font-weight: 400;
                font-size: 24px;
                color: #333333;
                font-family: AlibabaPuHuiTi-Bold;
                border-bottom: 1px solid #d1d2d2;
                margin-bottom: 18px;
            }
            .listData {
                position: relative;
                border: 1px solid transparent;
                box-sizing: border-box;
                max-height: 420px;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    /*滚动条整体样式*/
                    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
                    height: 1px;
                }
                .content {
                    overflow: hidden;
                    &.ts{
                        width: 528px;
                    }
                    .li {
                        float: left;
                        cursor: pointer;
                        .item {
                            width: 54px;
                            height: 54px;
                            background: #f7f7f7;
                            border-radius: 5px;
                            margin-right: 12px;
                            text-align: center;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-wrap: wrap;
                            border: 1px solid transparent;
                            outline: none;
                            background-color: #fff;
                            background-image: radial-gradient(#151957, #080a21);
                            &.colorItem {
                                background: #fff;
                                height: 54px;
                                width: 54px;
                                margin-right: 12px;
                                .colorBox {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            &.active {
                                position: relative;
                                background: #dcdddd;
                                border: 2px dashed #f00;
                            }
                            img {
                                max-width: 45px;
                                max-height: 45px;
                            }
                        }
                        .serial {
                            width: 54px;
                            font-size: 12px;
                            word-break: break-all;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            text-align: center;
                            margin-right: 12px;
                            margin-bottom: 8px;
                            color: #898989;
                            font-family: AlibabaPuHuiTi-Light;
                        }
                        .measure {
                            height: 54px;
                            padding: 0 15px;
                            background: #efefef;
                            margin-right: 13px;
                            margin-bottom: 30px;
                            text-align: center;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-wrap: wrap;
                            border: 1px solid transparent;
                            outline: none;
                            &.active {
                                background: #e60012;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }

        .footer_btn {
            display: flex;
            margin-top: 30px;
            padding-left: 84px;
            & > div {
                width: 252px;
                height: 52px;
                font-size: 24px;
                line-height: 52px;
                letter-spacing: 1px;
                cursor: pointer;
                text-align: center;
                &.reset {
                    background: #efefef;
                }
                &.create {
                    color: #ffffff;
                    background: #e70010;
                    margin-right: 12px;
                }
            }
        }
    }
}
.el-popover {
    padding: 12px;
    width: 410px !important;
    font-size: 12px;
    background-color: #fff;
    background-image: radial-gradient(#151957, #080a21);
}
.popDetailsPhoto {
    width: 100%;
}
.popDescribe {
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    margin-bottom: 10px;
    margin-top: 20px;
}
.popPrice {
    font-family: PingFang SC;
    font-weight: 400;
    color: #da0000;
    line-height: 20px;
    margin-bottom: 23px;
}
.popFooter {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    & > div {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        &.cancel {
            color: #333333;
            background: #efefef;
        }
        &.ok {
            color: #ffffff;
            background: #e70010;
            border: 0;
        }
    }
}
</style>