<template>
    <el-col class="preview-item" :lg="3" :md="4" :sm="6" :xs="12">
        <div class="item" :class="{'drag': onDrag}"
             @dragenter="onDragenter" @dragleave="onDragleave" @drop="onDrop" @dragover="onDragover">
            <router-link :to="link">
                <el-image class="img" :style="{height: type === 'collection' ? '150px' : '175px'}"
                          :src="src" :title="name" fit="contain">
                </el-image>
                <p v-if="type === 'collection'" class="title text">{{item.group}}</p>
                <p class="text">{{name}}</p>
            </router-link>
        </div>
    </el-col>
</template>

<script>
    import urls from "../../utils/urls";

    export default {
        name: "PreviewItem",

        props: ["type", "item", "draggable", "redirect"],

        data() {
            return {
                onDrag: false,
                dragStack: 0
            }
        },

        computed: {
            name: function () {
                if (this.type === "circle")
                    return this.item["group"];
                else
                    return this.item[this.type];
            },

            link: function () {
                if (this.type === "collection") {
                    return {name:"pool", params:{seq: this.item.sequence}};
                } else if (this.type === "circle") {
                    return {name:"book", params:{name: this.item["group"]}};
                } else {
                    return {name:"work", params:{name: this.item[this.type]}};
                }
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

        mounted: function () {
            if (this.redirect)
                this.$router.push(this.link);
        },

        methods: {
            // 拖拽相关
            onDragenter: function (e) {
                if (!this.draggable) return;
                e.stopPropagation();
                e.preventDefault();

                ++this.dragStack;
                this.onDrag = true;
            },
            onDragleave: function (e) {
                if (!this.draggable) return;
                e.stopPropagation();
                e.preventDefault();

                --this.dragStack;
                if (this.dragStack <= 0)
                    this.onDrag = false;
            },
            onDrop: function (e) {
                if (!this.draggable) return;
                e.stopPropagation();
                e.preventDefault();

                this.$emit("drag-files", e.dataTransfer, e);
                this.dragStack = 0;
                this.onDrag = false;
            },
            // 想要让一个元素变成可释放区域，该元素必须设置 ondragover 和 ondrop 事件处理程序属性
            onDragover: function (e) {
                if (!this.draggable) return;
                e.stopPropagation();
                e.preventDefault();
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

            &.drag {
                background-color: #909399;
            }

            a {
                color: #606266;
                &:hover {
                    text-decoration: none;
                }
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
