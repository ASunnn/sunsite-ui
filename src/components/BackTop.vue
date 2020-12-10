<template>
    <div class="back-top" :class="{'back-top__show': show}" @click="backTop">
        <i class="el-icon-top"></i>
    </div>
</template>

<script>
    export default {
        name: "BackTop",

        props: ["show"],

        methods: {
            backTop: function () {
                if (!this.show) return;
                window.scrollTo(window.scrollX, 0);
            }
        }
    }
</script>

<style lang="less">
    .back-top {
        position: fixed;
        right: 30px;
        bottom: 50px;
        transition: all 0.4s;
        opacity: 0;
        border-radius: 27px;
        border: 1px solid #ebeef5;
        background-color: white;
        box-shadow: 0 0 2px #606266;
        &:hover {
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
        }

        i {
            font-size: xx-large;
            transform: translate(-1px, 2px);
        }
    }

    .back-top__show {
        cursor: pointer;
        opacity: 1;
    }
</style>