<template>
    <div id="app">
        <keep-alive :include="[KEEPALIVES]">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "App",
    computed: {
        ...mapGetters(["KEEPALIVES"]) 
    }
};
</script>

<style lang='scss'>
@import "~@/assets/scss/base.scss";
#app {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
.v-modal {
    opacity: 0.75 !important;
}
</style>
