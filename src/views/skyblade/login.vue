<template>
    <div class="contents">
        <div class="login_box">
            <div class="userName_box">
                <input type="text" v-model="userName" placeholder="Type your ID" />
            </div>
            <div class="password_box">
                <input type="password" v-model="password" placeholder="Password" />
            </div>
            <div class="btn_box">
                <div class="btn" @click="goIndex()">Login In</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "skyblade",
    data() {
        return {
            userName: "",
            password: ""
        };
    },
    computed: {},
    activated() {},
    created() {},
    methods: {
        goIndex() {
            if (this.userName == "") {
                this.$message.warning("请输入用户名");
                return;
            }
            if (this.password == "") {
                this.$message.warning("请输入密码");
                return;
            }
            this.$axios({
                url: "/login1",
                method: "POST",
                data: {
                    userName: this.userName,
                    password: this.password
                }
            }).then(res => {
                if (res.success) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("refreshToken", res.refreshToken);
                    localStorage.setItem("userNamesa", res.userName);
                    this.$message.success("登录成功！");
                    setTimeout(() => {
                        this.$router.push({
                            path: "/skyblade"
                        });
                    }, 1000);
                } else {
                    this.$message.error(res.msg);
                }
            });
            //   localStorage.setItem("access_token", "adsajdsadasdsdsd");
            //   this.$router.push({ path: "/skyblade" });
        }
    }
};
</script>

<style lang='scss'>
@import "~@/assets/scss/mixin.scss";
.contents {
    width: 100%;
    height: 100%;
    position: relative;
    background: url(../../assets/img/bg.png) no-repeat black top 0 left 0;
    background-size: cover;
    input:focus::-webkit-input-placeholder {
        color: transparent;
    }
    input:focus:-moz-placeholder {
        color: transparent;
    }
    input:focus::-moz-placeholder {
        color: transparent;
    }
    input:focus:-ms-input-placeholder {
        color: transparent;
    }
    .login_box {
        padding: 50px;
        border-radius: 10px;
        position: absolute;
        left: 100px;
        top: 40vh;
        width: 400px;
        height: 300px;
        background: #e0d4d5;
        .userName_box,
        .password_box {
            width: 100%;
            height: 50px;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            padding: 0 20px;
            input {
                text-align: center;
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
            }
        }
        .password_box {
            margin-top: 30px;
        }
        .btn_box {
            margin-top: 30px;
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            .btn {
                cursor: pointer;
                background: #fff;
                border-radius: 10px;
                height: 100%;
                width: 150px;
                line-height: 50px;
                text-align: center;
                font-weight: 900;
            }
        }
    }
}
</style>