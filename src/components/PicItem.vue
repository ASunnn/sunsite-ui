<template>
    <el-col class="pic-item" :lg="3" :md="4" :sm="6" :xs="12">
        <div class="item">
            <el-image class="img" :src="src" :alt="alt" :title="title" fit="contain" @click="onClick">
            </el-image>
        </div>
    </el-col>
</template>

<script>
    export default {
        name: "PicItem",

        props: ["seq", "src", "alt", "title"],

        methods: {
            onClick: function () {
                this.$router.push({name:"post", params:{seq: this.seq}});
            }
        }
    }
</script>

<style lang="less">
    .pic-item {
        padding: 10px 5px;

        .item {
            /*padding: 3px;*/
            /*border-radius: 3px;*/
            /*background-color: #f4f4f5;*/
            height: 180px;
            text-align: center;
            .img {
                cursor: pointer;
                .el-image__inner {
                    max-height: 180px;
                }
            }
        }
    }
</style>