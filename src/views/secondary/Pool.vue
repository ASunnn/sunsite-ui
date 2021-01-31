<template>
    <div class="pool with-footer">
        <div class="head">
            <el-row class="head-line">
                <el-col :span="20">
                    <span class="title">{{collection}}</span>
                </el-col>
                <el-col :span="4">
                    <span class="more">{{post}}</span>
                </el-col>
            </el-row>
            <el-row class="head-line">
                <el-col :sm="18" :xs="12">
                    <span class="circle" @click="onCircleClick">{{circle}}</span>
                </el-col>
                <el-col :sm="6" :xs="12">
                    <span class="more">{{lastUpdate}}</span>
                </el-col>
            </el-row>
        </div>
        <div :class="{'drag': onDrag}" class="list" @dragenter="onDragenter" @dragleave="onDragleave" @drop="onDrop" @dragover="onDragover">
            <pic-list url="/gallery/listByCollection" :params="{seq: seq}"></pic-list>
        </div>
        <bottom>
            <span @click="showModifyModal = true">Modify</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="onDownload">Download</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="onDelete">Delete</span>
        </bottom>
        <progress-bar :show="uploading" :percentage="progress" :complete="isComplete" @cancel="cancelUpload" @complete="completeUpload"></progress-bar>
        <modal :show="showModifyModal" @submit="onModalSubmit" @close="showModifyModal = false">
            <el-form class="modify-form" label-position="right" label-width="100px" :model="modifyForm">
                <el-form-item label="Name">
                    <el-input v-model="modifyForm.name"></el-input>
                </el-form-item>
            </el-form>
        </modal>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import Bottom from "../../components/Bottom";
    import Modal from "../../components/Modal";
    import PicList from "../../components/pic/PicList";
    import ProgressBar from "../../components/Progress";
    import time from "../../utils/time";
    import Uploader from "../../mixin/Uploader";
    import urls from "../../utils/urls";

    export default {
        name: "Pool",

        components: {Bottom, Modal, PicList, ProgressBar},

        mixins: [Uploader],

        data() {
            return {
                seq: "",
                circle: "",
                collection: "",
                post: "",
                lastUpdate: "",

                onDrag: false,
                dragStack: 0,

                showModifyModal: false,
                modifyForm: {
                    name: ""
                }
            }
        },

        created: function () {
            this.seq = this.$route.params.seq;
            this.init();
        },

        watch: {
            $route(to, from) {
                this.seq = to.params.seq;
                this.init();
            }
        },

        methods: {
            init: function () {
                const self = this;
                axios.get("/collection/" + this.seq).then(function (data) {
                    self.collection = data.collection;
                    self.circle = data.group;
                    self.post = data.post;
                    self.lastUpdate = time(data.lastUpdate);

                    self.modifyForm.name = self.collection;
                });
            },

            // 拖拽相关
            onDragenter: function (e) {
                e.stopPropagation();
                e.preventDefault();

                ++this.dragStack;
                this.onDrag = true;
            },
            onDragleave: function (e) {
                e.stopPropagation();
                e.preventDefault();

                --this.dragStack;
                if (this.dragStack <= 0)
                    this.onDrag = false;
            },
            onDrop: function (e) {
                e.stopPropagation();
                e.preventDefault();

                this.doUpload(e.dataTransfer.files);
                this.dragStack = 0;
                this.onDrag = false;
            },
            // 想要让一个元素变成可释放区域，该元素必须设置 ondragover 和 ondrop 事件处理程序属性
            onDragover: function (e) {
                e.stopPropagation();
                e.preventDefault();
            },

            onCircleClick: function () {
                this.$router.push({name:"book", params:{name: this.circle}});
            },

            doUpload: function (files) {
                this.$prompt("Illustrator：", {
                    showClose: false,
                    showCancelButton: false,
                    inputValue: this.circle
                }).then(({ value }) => {
                    let formData = new FormData();
                    files.forEach(function(f) {
                        formData.append("file", f);
                    });
                    formData.append("illustrator", value ? value.split("，") : []);
                    formData.append("group", this.circle);
                    formData.append("collection", this.collection);

                    this.upload(formData);
                }).catch(() => {});
            },

            cancelUpload: function() {
                this.cancel.cancel();
                this.uploading = false;
            },

            completeUpload: function() {
                window.location.reload();
            },

            onModalSubmit: function () {
                const self = this;
                let opts = {
                    data: {
                        newName: this.modifyForm.name,
                    }
                };
                axios.post("/collection/modify/" + this.seq, opts).then(function (data) {
                    self.$notify({
                        message: data.msg,
                        type: "success"
                    });
                    self.$router.push({name:"pool", params:{seq: data.newLink}});
                });
                this.showModifyModal = false;
            },

            onDownload: function () {
                window.location.href = urls("/collection/download/" + this.seq);
            },

            onDelete: function () {
                const self = this;
                this.$confirm("Delete?", {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    axios.post("/collection/delete/" + this.seq).then(function (data) {
                        self.$notify({
                            message: data.msg,
                            type: "success"
                        });
                        self.$router.push({name:"book", params:{name: self.circle}});
                    });
                }).catch(() => {
                });
            }
        }
    }
</script>

<style lang="less">
    .pool {
        .head {
            margin-bottom: 10px;
            .head-line {
                padding: 5px 20px;

                .title {
                    font-size: large;
                    font-weight: bold;
                }
                .circle {
                    &:hover {
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
                .more {
                    float: right;
                    font-size: small;
                    line-height: 22px;
                }
            }
        }

        .list {
            transition: 0.3s all;
            border-radius: 8px;
            &.drag {
                background-color: #f4f4f5;
            }
        }
    }
</style>
