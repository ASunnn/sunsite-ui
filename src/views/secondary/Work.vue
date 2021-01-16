<template>
    <div class="work with-footer">
        <div class="head">
            <el-row class="head-line">
                <el-col :span="20">
                    <span class="title">{{name}}</span>
                </el-col>
                <el-col :span="4">
                    <span class="more">{{post}}</span>
                </el-col>
            </el-row>
            <el-row class="head-line">
                <template v-for="a in alias">
                    <span class="alias">{{a}}</span>
                </template>
                <span class="more">{{lastUpdate}}</span>
            </el-row>
        </div>
        <pic-list url="/gallery/listByIllustrator" :params="{n: name}"></pic-list>
        <bottom>
            <span @click="showModifyModal = true">Modify</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="onDelete">Delete</span>
        </bottom>
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
    import PicList from "../../components/pic/PicList";
    import time from "../../utils/time";

    export default {
        name: "Work",

        components: {Bottom, Modal, PicList},

        data() {
            return {
                name: "",
                alias: [],
                post: "",
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
                axios.get("/illustrator/" + this.name).then(function (data) {
                    self.alias = data.alias;
                    self.post = data.post;
                    self.lastUpdate = time(data.lastUpdate);

                    self.modifyForm.name = self.name;
                    self.modifyForm.aliases = data.alias.join("，");
                });
            },

            onModalSubmit: function () {
                const self = this;
                let opts = {
                    data: {
                        newName: this.modifyForm.name,
                        alias: this.modifyForm.aliases ? this.modifyForm.aliases.split("，") : []
                    }
                };
                axios.post("/illustrator/modify/" + this.name, opts).then(function (data) {
                    self.$notify({
                        message: data.msg,
                        type: "success"
                    });
                    if (self.name == data.newLink)
                        self.init();
                    else
                        self.$router.push({name:"work", params:{name: data.newLink}});
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
                    axios.post("/illustrator/delete/" + this.name).then(function (data) {
                        self.$notify({
                            message: data.msg,
                            type: "success"
                        });
                        self.$router.push(path + "/illustrator");
                    });
                }).catch(() => {
                });
            }
        }
    }
</script>

<style lang="less">
    .work {
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
