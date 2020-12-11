<template>
    <div class="specification">
        <div class="logo">
            <img src="../../assets/img/logo.png" class="logo_img" />
        </div>
        <div class="price" v-if="priceNameShow">{{priceName}} {{priceCount}}</div>
        <div class="show">
            <img src="../../assets/img/defult.png" v-show="defultImgShow" />
            <template v-for="(item,key) in showImg">
                <img :key="key" v-if="item" :src="$url.baseImgUrl() + item" />
            </template>
        </div>
        <div class="choice">
            <!-- <div class="magnifying" v-if="magnifyingImg">
                <div class="diamond">
                    <img :src="$url.baseImgUrl() + magnifyingImg" />
                </div>
            </div> -->
            <div class="title">MAKE YOUR CHOICE HERE</div>
            <div class="container" ref="wrapper">
                <section v-for="(item,index) of pageList" :key="item.id" :id="item.id">
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
                                <!-- <el-popover
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
                                <div class="popDescribe">{{item1.endescribe}}</div>-->
                                <!-- <div
                                        class="popPrice"
                                        v-if="priceNameShow"
                                >Final Price - USD {{item1.enprice}}</div>-->
                                <!-- <div class="popFooter">
                                        <div
                                            class="ok"
                                            @click="popOk(item,index,item1,index1,$refs[`popover${index}-${index1}`][0])"
                                >CONFIRM</div>-->
                                <!-- <div
                                            class="cancel"
                                            @click="$refs[`popover${index}-${index1}`][0].doClose()"
                                >取消</div>-->
                                <!-- </div> -->
                                <!-- <div
                                        @click="itemClick(index,index1,item.id,$refs[`popover${index}-${index1}`][0])"
                                        slot="reference"
                                        class="li"
                                >-->
                                <div
                                    @click="itemClick(index,index1,item.id)"
                                    class="li"
                                    :key="item1.id"
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
                                        v-html="item1.enname"
                                    ></div>
                                    <div
                                        v-if="item.id == 'c62e951ec23d40199612121e3447ca15' || item.id == 'b19db927a77c4d4fa254c1fad9e7c1c6' || item.id == '07aefea35582424e928fd89fa612346c'"
                                        :class="item.classificationContentList[index1].active ? 'measure active' : 'measure'"
                                    >{{item1.enname}}</div>
                                </div>
                                <!-- </el-popover> -->
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
        <special-model
            ref="specialModel"
            @confirmChange="popOk"
            :swiperData="swiperData"
            :priceNameShow="priceNameShow"
            :modelEnprice="modelEnprice"
        ></special-model>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import specialModel from "./specialModel";
export default {
    name: "specification",
    data() {
        return {
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
            magnifyingImg: "",
            priceObj: {},
            priceCount: 0,
            dtcx: [],
            btkx: [],
            dtcxindex: null,
            btkxindex: null,
            dtcxindex1: null,
            btkxindex1: null,
            priceName: "",
            priceNameShow: false,
            itemDisabled: false,
            defaultCheckArr: [],
            currentDialogData: {
                father: {},
                son: {}
            },
            swiperData: [],
            modelEnprice: 0
        };
    },
    computed: {
        ...mapState(["pageList"]),
        defultImgShow() {
            var show = true;
            for (var key in this.showImg) {
                this.showImg[key] !== "" && (show = false);
            }
            return show;
        }
    },
    components: {
        specialModel
    },
    activated() {
        var hash = this.$route.hash.slice(1);
        if (hash) {
            this.$nextTick(() => {
                document.getElementById(hash) &&
                    document.getElementById(hash).scrollIntoView({
                        behavior: "smooth"
                    });
            });
        } else {
            this.getListData();
            this.getSelectPriceSetting();
        }
    },
    created() {
        this.getListData();
        this.getSelectPriceSetting();
    },
    methods: {
        ...mapMutations([
            "updateBladeData",
            "updatePageList",
            "updateDefaultImg",
            "updateDetailImg",
            "updateDetailDesc",
            "updatePriceCount"
        ]),
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
        },
        createChange() {
            var Outer = "";
            var Bore = "";
            var Teeth = "";
            var arr = [];
            this.pageList.forEach(item => {
                var obj = {};
                // if (item.id == "c62e951ec23d40199612121e3447ca15") {
                //     for (var item2 of item.classificationContentList) {
                //         if (item2.active) {
                //             Outer = item2.enname;
                //             break;
                //         }
                //     }
                //     return;
                // }
                // if (item.id == "b19db927a77c4d4fa254c1fad9e7c1c6") {
                //     for (var item2 of item.classificationContentList) {
                //         if (item2.active) {
                //             Bore = item2.enname;
                //             break;
                //         }
                //     }
                //     return;
                // }
                // if (item.id == "07aefea35582424e928fd89fa612346c") {
                //     for (var item2 of item.classificationContentList) {
                //         if (item2.active) {
                //             Teeth = item2.enname;
                //             break;
                //         }
                //     }
                //     return;
                // }
                obj[item.name] = "None";
                obj["id"] = item.id;
                obj["enprice"] = 0;
                for (var item2 of item.classificationContentList) {
                    if (item2.active) {
                        obj[item.name] = item2.enname;
                        obj["id"] = item.id;
                        obj["enprice"] = item2.enprice;
                    }
                }
                arr.push(obj);
            });
            this.updateBladeData(arr);
            var imgUrl1 = "";
            var desc = "";
            //8a323f445ccd4328aad6e84b2523b35b
            a: for (var item1 of this.pageList) {
                if (item1.id == "8a323f445ccd4328aad6e84b2523b35b") {
                    b: for (var item2 of item1.classificationContentList) {
                        if (item2.active) {
                            imgUrl1 = item2.wholePhoto;
                            desc = item2.endescribe;
                            break b;
                        }
                    }
                    break a;
                }
            }
            this.updateDetailImg(imgUrl1);
            this.updateDetailDesc(desc);
            this.$router.push({ path: "/create" });
            // var a = [];
            // if (Outer) {
            //     a.push(Outer);
            // }
            // if (Bore) {
            //     a.push(Bore);
            // }
            // if (Teeth) {
            //     a.push(Teeth);
            // }
            // var s = "None";
            // if (a.length > 0) {
            //     s = a.join(" X ");
            // }
            // this.bladeData.unshift({
            //     SPECIFICATIONS: s
            // });
            // this.dialogVisible = true;
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
            this.setPriceCount();
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
        popOk(superior, index, data, index1, el) {
            // this.colorInit();
            var superior = this.currentDialogData.father;
            var data = this.currentDialogData.son;
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
            // var list = this.pageList[index];
            superior.classificationContentList.forEach(item => {
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
            this.seekColorItem();
        },
        itemClick(index, index1, id) {
            var data = this.pageList[index];
            // if(data.id != '8a323f445ccd4328aad6e84b2523b35b') return
            var classList = data.classificationContentList[index1];
            var f = classList.active;
            if (f && id !== "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                this.pitchChange1(id, f, classList);
            }
            if (!f && id !== "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                this.pitchChange2(id, classList, data);
            }
            if (id === "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
                this.pitchColorChange(id, classList, data, f);
            }
            this.$set(this.pageList, index, data);
        },
        // colorInit() {
        //     this.dtcx = [];
        //     this.btkx = [];
        //     this.dtcxindex = null;
        //     this.btkxindex = null;
        //     this.dtcxindex1 = null;
        //     this.btkxindex1 = null;
        //     this.$set(this.priceObj, "f3d847cde26c4d02ac0a6d0c37ae9c2f", 0);
        //     this.setPriceCount();
        //     this.$set(this.showImg, "f3d847cde26c4d02ac0a6d0c37ae9c2f", "");
        //     for (var item of this.pageList) {
        //         if (item.id === "f3d847cde26c4d02ac0a6d0c37ae9c2f") {
        //             //颜色id
        //             for (var item1 of item.classificationContentList) {
        //                 item1.active = false;
        //             }
        //         }
        //         item.classificationContentList.forEach(item1 => {
        //             if (item1.active && item1.isAppearance == "1") {
        //                 this.$set(this.showImg, item.id, item1.wholePhoto);
        //             }
        //         });
        //     }
        // },
        pitchChange1(id, f, classList) {
            this.$set(this.showImg, id, "");
            this.magnifyingImg = "";
            this.$set(this.priceObj, id, 0);
            this.setPriceCount();
            classList.active = !f;
            this.seekColorItem();
        },
        pitchChange2(id, classList, data) {
            this.$set(this.showImg, id, "");
            if (classList.isDetails == "0") {
                data.classificationContentList.forEach(item => {
                    item.active = false;
                });
                classList.active = true;
                this.seekColorItem();
                if (
                    data.id != "a0a897acabc948789fa70d2eb4a309e5" &&
                    data.id != "8a323f445ccd4328aad6e84b2523b35b" &&
                    data.id != "c62e951ec23d40199612121e3447ca15" &&
                    data.id != "07aefea35582424e928fd89fa612346c" &&
                    data.id != "b19db927a77c4d4fa254c1fad9e7c1c6"
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
                    this.showImg["f3d847cde26c4d02ac0a6d0c37ae9c2f"] == "" &&
                    !this.showImg["3d63ce5188764149a58a4d339e29eb65"]
                ) {
                    this.$set(this.showImg, id, classList.wholePhoto);
                }
                if (id != "a0a897acabc948789fa70d2eb4a309e5") {
                    this.$set(
                        this.showImg,
                        "f3d847cde26c4d02ac0a6d0c37ae9c2f",
                        classList.wholePhoto
                    );
                    this.$set(this.showImg, id, classList.wholePhoto);
                }
            }
            if (
                id == "8a323f445ccd4328aad6e84b2523b35b" &&
                classList.isDetails == "1"
            ) {
                // data.classificationContentList.forEach(item=>{
                //     item.active = false;
                // })
                // classList.active = true;
                this.currentDialogData.father = data;
                this.currentDialogData.son = classList;
                let list = classList.contentPhoneRelList;
                if (list.length > 0) {
                    list.forEach(item => {
                        item.remark = item.remark.replace(
                            /(\r\n|\n|\r)/gm,
                            "<br>"
                        );
                    });
                }
                this.swiperData = list;
                this.modelEnprice = classList.enprice;
                this.$refs.specialModel.title = classList.name;
                this.$refs.specialModel.dialogVisible = true;
            }
            if (
                id == "8a323f445ccd4328aad6e84b2523b35b" &&
                classList.isDetails == "0"
            ) {
                this.currentDialogData.father = data;
                this.currentDialogData.son = classList;
                this.popOk();
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
                var f = true;
                this.updateDefaultImg(currentList.wholePhoto);
                this.showImg["3d63ce5188764149a58a4d339e29eb65"] && (f = false);
                if (f) {
                    this.$set(
                        this.showImg,
                        "a0a897acabc948789fa70d2eb4a309e5",
                        ""
                    );
                    this.$set(
                        this.showImg,
                        "f3d847cde26c4d02ac0a6d0c37ae9c2f",
                        currentList.wholePhoto
                    );
                }
            }
        },
        setMagnifying(kx, cx) {
            var data = this.pageList;
            var f = true;
            for (var item1 of data) {
                if (
                    item1.id != "f3d847cde26c4d02ac0a6d0c37ae9c2f" &&
                    item1.id != "8a323f445ccd4328aad6e84b2523b35b" &&
                    item1.id != "a0a897acabc948789fa70d2eb4a309e5" &&
                    item1.id != "c62e951ec23d40199612121e3447ca15" &&
                    item1.id != "07aefea35582424e928fd89fa612346c" &&
                    item1.id != "b19db927a77c4d4fa254c1fad9e7c1c6"
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
                    this.magnifyingImg = cx.wholePhoto;
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
                this.$message.warning("没有找到对应的锯片,请重新选择");
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
                this.updateDefaultImg(contentSubList[subListIndex].wholePhoto);
                var f = true;
                this.showImg["3d63ce5188764149a58a4d339e29eb65"] && (f = false);
                if (
                    this.dtcxindex != null &&
                    this.btkxindex != null &&
                    this.dtcxindex1 != null &&
                    this.btkxindex1 != null &&
                    f
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
                this.updateDefaultImg("");
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
                                    if (item1["active"]) {
                                        this.$set(
                                            this.priceObj,
                                            item.id,
                                            item1.enprice
                                        );
                                        this.setPriceCount();
                                    }
                                }
                            });
                            item.classificationContentList = arr;
                        });
                        this.updatePageList(pageList);
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
@import "~@/assets/scss/mixin.scss";
.specification {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1920px;
    height: 1080px;
    max-height: 95vh;
    background: #efefef;
    @include scrollBar();
    .logo {
        position: absolute;
        left: 35px;
        top: 40px;
        .logo_img {
            width: 150px;
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
        left: 190px;
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
                    &.ts {
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
                                background: #313639;
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
                    background: #313639;
                    margin-right: 12px;
                }
            }
        }
    }
}
</style>