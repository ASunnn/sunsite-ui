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
        <pic-list url="/gallery/listByCollection" :params="{seq: seq}"></pic-list>
        <bottom>
            <span @click="showModifyModal = true">Modify</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="onDownload">Download</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="onDelete">Delete</span>
        </bottom>
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
    import time from "../../utils/time";
    import urls from "../../utils/urls";

    export default {
        name: "Pool",

        components: {Bottom, Modal, PicList},

        data() {
            return {
                seq: "",
                circle: "",
                collection: "",
                post: "",
                lastUpdate: "",

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

            onCircleClick: function () {
                this.$router.push({name:"book", params:{name: this.circle}});
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
    }
</style>
