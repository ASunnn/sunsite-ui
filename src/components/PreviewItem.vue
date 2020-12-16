<template>
    <el-col class="preview-item" :lg="3" :md="4" :sm="6" :xs="12" @click="onClick">
        <div class="item">
            <el-image class="img" :style="{height: type === 'collection' ? '150px' : '175px'}"
                      :src="src" :title="name" fit="contain" @click="onClick">
            </el-image>
            <p v-if="type === 'collection'" class="title text">{{item.group}}</p>
            <p class="text">{{name}}</p>
        </div>
    </el-col>
</template>

<script>
    import urls from "../utils/urls";

    export default {
        name: "PreviewItem",

        props: ["type", "item"],

        computed: {
            name: function () {
                if (this.type === "circle")
                    return this.item["group"];
                else
                    return this.item[this.type];
            },

            src: function () {
                if (this.type === "circle")
                    return urls(`/${this.type}/m/${this.item["group"]}`);
                else if (this.type === "collection")
                    return urls(`/${this.type}/m/${this.item.sequence}`);
                else
                    return urls(`/${this.type}/m/${this.item[this.type]}`);
            }
        },

        methods: {
            onClick: function () {
                if (this.type === "collection") {
                    this.$router.push({name:"pool", params:{seq: this.item.sequence}});
                } else {
                    this.$router.push({name:"book", params:{name: this.item["group"]}});
                }
            }
        }
    }
</script>

<style lang="less">
    .preview-item {
        padding: 10px 5px;

        .item {
            cursor: pointer;
            padding: 3px;
            border-radius: 3px;
            background-color: #f4f4f5;
            text-align: center;
            height: 205px;
            transition: 0.3s all;
            &:hover {
                background-color: #e9e9eb;
            }

            .img {
                height: 175px;
                .el-image__inner {
                    max-height: 175px;
                }
            }

            .title {
                font-weight: bold
            }

            .text {
                font-size: small;
                margin: 0;
                line-height: 25px;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
</style>
