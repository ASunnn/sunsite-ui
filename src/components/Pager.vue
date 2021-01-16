<template>
    <div class="pager" v-show="show" @click="click">
        <i class="el-icon-caret-bottom icon" v-show="!loading" ></i>
        <i class="el-icon-loading load" v-show="loading" ></i>
    </div>
</template>

<script>
    export default {
        name: "Pager",

        // page相當於數組下標，count相當於數組長度
        props: ["page", "count"],

        data() {
            return {
                loading: false,
                timeout: null
            }
        },

        computed: {
            show: function () {
                return this.page + 1 < this.count;
            }
        },

        watch: {
            page: function (val) {
                this.loading = false;
                clearTimeout(this.timeout);
            }
        },

        methods: {
            click: function () {
                if (this.show) {
                    this.$emit("page-click", this.page + 1);
                    this.loading = true;

                    const self = this;
                    this.timeout = setTimeout(function () {
                        self.loading = false;
                    }, 10 * 1000)
                }
            }
        }
    }
</script>

<style lang="less">
    .pager {
        height: 25px;
        width: 40%;
        text-align: center;
        margin: 10px auto;
        padding: 2px;
        border: 1px solid #DCDFE6;
        border-radius: 15px;
        cursor: pointer;
        transition: 0.2s all;
        &:hover {
            border-color: #66afe9;
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
        }

        .icon {
            font-size: x-large;
        }
        .load {
            font-size: large;
            color: #5cb6ff;
            line-height: 25px;
        }
    }
</style>
