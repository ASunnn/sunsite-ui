<template>
    <div class="book with-footer">
        <div class="head">
            <el-row class="head-line">
                <el-col :span="20">
                    <span class="title">{{name}}</span>
                </el-col>
                <el-col :span="4">
                    <span class="more">{{book}}</span>
                </el-col>
            </el-row>
            <el-row class="head-line">
                <template v-for="a in alias">
                    <span class="alias">{{a}}</span>
                </template>
                <span class="more">{{lastUpdate}}</span>
            </el-row>
        </div>
        <preview-list url="/collection/listByGroup" :params="{n: name}" type="collection" :draggable="true" @drag-files="onDragFiles"></preview-list>
        <bottom>
            <span @click="showModifyModal = true">Modify</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="onDelete">Delete</span>
        </bottom>
        <progress-bar :show="uploading" :percentage="progress" :complete="isComplete" @cancel="cancelUpload" @complete="completeUpload"></progress-bar>
        <modal :show="showModifyModal" @submit="onModalSubmit" @close="showModifyModal = false">
            <el-form class="modify-form" label-position="right" label-width="100px" :model="modifyForm">
                <el-form-item label="Name">
                    <el-input v-model="modifyForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Aliases">
                    <el-input v-model="modifyForm.aliases"></el-input>
                </el-form-item>
            </el-form>
        </modal>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import Bottom from "../../components/Bottom";
    import Modal from "../../components/Modal";
    import PreviewList from "../../components/pic/PreviewList";
    import ProgressBar from "../../components/Progress";
    import time from "../../utils/time";
    import Uploader from "../../mixin/Uploader";

    export default {
        name: "Book",

        components: {Bottom, Modal, PreviewList, ProgressBar},

        mixins: [Uploader],

        data() {
            return {
                name: "",
                alias: [],
                book: "",
                lastUpdate: "",

                showModifyModal: false,
                modifyForm: {
                    name: "",
                    aliases: ""
                }
            }
        },

        created: function () {
            this.name = this.$route.params.name;
            this.init();
        },

        watch: {
            $route(to, from) {
                this.name = to.params.name;
                this.init();
            }
        },

        methods: {
            init: function () {
                const self = this;
                axios.get("/circle/" + this.name).then(function (data) {
                    self.alias = data.alias;
                    self.book = data.book;
                    self.lastUpdate = time(data.lastUpdate);

                    self.modifyForm.name = self.name;
                    self.modifyForm.aliases = data.alias.join("，");
                });
            },

            onDragFiles: function (files, e) {
                let target = e.path.find(function (p) {
                    return p.className === "item" || p.className === "item drag";
                });

                if (target) {
                    // 拿到上传的collection
                    let collection = target.firstChild.childNodes[2].innerText; // div -> a -> p

                    this.$prompt("Illustrator：", {
                        showClose: false,
                        showCancelButton: false,
                        inputValue: this.name
                    }).then(({ value }) => {
                        this.doUpload(files, value, this.name, collection);
                    }).catch(() => {});
                } else {
                    this.$notify({
                        message: "Invalid Target",
                        type: "warning"
                    });
                }
            },

            doUpload: function (files, illustrator, circle, collection) {
                let formData = new FormData();
                files.forEach(function(f) {
                    formData.append("file", f);
                });
                formData.append("illustrator", illustrator ? illustrator.split("，") : []);
                formData.append("group", circle);
                formData.append("collection", collection);

                this.upload(formData);
            },

            cancelUpload: function() {
                this.cancel.cancel();
                this.uploading = false;
            },

            completeUpload: function() {
                const self = this;
                this.uploading = false;
                // 点击确定进度条消失后 防止取消键那么快冒出来
                setTimeout(function () {
                    self.isComplete = false;
                }, 150);
            },

            onModalSubmit: function () {
                const self = this;
                let opts = {
                    data: {
                        newName: this.modifyForm.name,
                        alias: this.modifyForm.aliases ? this.modifyForm.aliases.split("，") : []
                    }
                };
                axios.post("/circle/modify/" + this.name, opts).then(function (data) {
                    self.$notify({
                        message: data.msg,
                        type: "success"
                    });
                    if (self.name == data.newLink)
                        self.init();
                    else
                        self.$router.push({name:"book", params:{name: data.newLink}});
                });
                this.showModifyModal = false;
            },

            onDelete: function () {
                const self = this;
                this.$confirm("Delete?", {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    axios.post("/circle/delete/" + this.name).then(function (data) {
                        self.$notify({
                            message: data.msg,
                            type: "success"
                        });
                        self.$router.push(path + "/circle");
                    });
                }).catch(() => {
                });
            }
        }
    }
</script>

<style lang="less">
    .book {
        .head {
            margin-bottom: 10px;
            .head-line {
                padding: 5px 20px;

                .title {
                    font-size: large;
                    font-weight: bold;
                }
                .alias {
                    padding: 5px 10px;
                    border-radius: 5px;
                    background-color: #f4f4f5;
                    margin-right: 10px;
                    font-size: small;
                }
                .more {
                    float: right;
                    font-size: small;
                    line-height: 24px;
                }
            }
        }
    }
</style>
