<template>
    <div class="post with-footer">
        <div class="image">
            <el-image :src="src" ref="img" @load="imageLoad">
                <div slot="error">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <div v-if="prev" class="prev area" :style="{'height': navigateHeight}" @click="nextPost(false)">
                <i class="el-icon-arrow-left" :style="{'line-height': navigateHeight}"></i>
            </div>
            <div v-if="next" class="next area" :style="{'height': navigateHeight}" @click="nextPost(true)">
                <i class="el-icon-arrow-right" :style="{'line-height': navigateHeight}"></i>
            </div>
        </div>
        <div class="meta">
            <h4 class="name">{{name}}</h4>
            <span class="size">{{size}}</span>
            <span class="pixel">{{width + " × " + height}}</span>
        </div>
        <el-divider></el-divider>
        <div class="info">
            <div>
                <h3 class="content" @click="onCircleClick()">{{circle}}</h3>
                <span class="type">circle</span>
            </div>
            <div>
                <h3 class="content" @click="onCollectionClick()">{{collection}}</h3>
                <span class="type">collection</span>
            </div>
            <div>
                <template v-for="i in illustrators">
                    <span class="illustrator" @click="onIllustratorClick(i)">{{i}}</span>
                </template>
            </div>
        </div>

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
                <el-form-item label="Illustrators">
                    <el-input v-model="modifyForm.illustrators"></el-input>
                </el-form-item>
            </el-form>
        </modal>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import Bottom from "../../components/Bottom";
    import Modal from "../../components/Modal";
    import qs from "querystring";
    import urls from "../../utils/urls";

    export default {
        name: "Post",

        components: {Modal, Bottom},

        data() {
            return {
                seq: "",
                src: "",
                name: "",
                size: "",
                width: "",
                height: "",

                circle: "",
                cId: "",
                collection: "",
                illustrators: [],

                prev: "",
                next: "",
                navigateHeight: 0,

                showModifyModal: false,
                modifyForm: {
                    name: "",
                    illustrators: ""
                }
            }
        },

        created: function () {
            this.seq = this.$route.params.seq;
            this.init();
        },

        mounted: function () {
            window.onresize = this.imageLoad;
            window.onkeydown = this.keyDown;
        },

        destroyed: function () {
            window.onresize = null;
            window.onkeydown = null;
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
                axios.get("/gallery/" + this.seq).then(function (data) {
                    self.name = data.name;
                    self.circle = data.group;
                    self.cId = data.cId;
                    self.collection = data.collection;
                    self.illustrators = data.illustrator;
                    self.size = data.size;
                    self.width = data.width;
                    self.height = data.height;

                    self.prev = data.prev == -1 ? null : data.prev;
                    self.next = data.next == -1 ? null : data.next;

                    self.modifyForm.name = data.name;
                    self.modifyForm.illustrators = data.illustrator.join("，");
                });
                this.src = urls("/p/" + this.seq);
            },

            imageLoad: function (e) {
                this.navigateHeight = this.$refs.img.$el.offsetHeight + "px";
            },

            keyDown: function (e) {
                if (this.showModifyModal)
                    return;

                let key = e.key;
                switch (key) {
                    case "ArrowLeft":
                        if (this.prev)
                            this.nextPost(false);
                        break;
                    case "ArrowRight":
                        if (this.next)
                            this.nextPost(true);
                        break;
                    case "Delete":
                        this.onDelete(true);
                        break;
                }
            },

            nextPost: function (next) {
                if (next) {
                    this.$router.push({name:"post", params:{seq: this.next}});
                } else {
                    this.$router.push({name:"post", params:{seq: this.prev}});
                }
            },

            onCircleClick: function () {
                console.log(this.circle);
            },

            onCollectionClick: function () {
                console.log(this.cId);
            },

            onIllustratorClick: function (illustrator) {
                console.log(illustrator);
            },

            onDelete: function () {
                const self = this;
                this.$confirm("Delete?", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let opts = {
                        headers: {"Content-Type": "application/x-www-form-urlencoded"},
                        data: qs.stringify({sequence: self.seq})
                    };
                    axios.post("/gallery/delete", opts).then(function (data) {
                        self.$notify({
                            message: data.msg,
                            type: "success"
                        });
                        if (self.next) {
                            self.$router.push({name:"post", params:{seq: self.next}});
                        } else if (self.prev) {
                            self.$router.push({name:"post", params:{seq: self.prev}});
                        } else {
                            self.$router.push(path + "/gallery");
                        }
                    });
                }).catch(() => {
                });
            },

            onModalSubmit: function () {
                const self = this;

                let opts = {
                    data: {
                        sequence: this.seq,
                        name: this.modifyForm.name,
                        illustrators: this.modifyForm.illustrators ? this.modifyForm.illustrators.split("，") : []
                    }
                };
                axios.post("/gallery/modify", opts).then(function (data) {
                    self.$notify({
                        message: data.msg,
                        type: "success"
                    });
                    if (self.seq == data.newLink)
                        self.init();
                    else
                        self.$router.push({name:"post", params:{seq: data.newLink}});
                });
                this.showModifyModal = false;
            }
        }
    }
</script>

<style lang="less">
    .post {
        .image {
            text-align: center;
            position: relative;

            .area {
                position: absolute;
                width: 20%;
                top: 0;
                opacity: 0;
                transition: opacity 0.2s;
                &:hover {
                    cursor: pointer;
                    opacity: 1;
                }

                i {
                    font-size: 80px;
                }
            }
            .prev {
                left: 0;
                background: linear-gradient(to left, #ffffff00, #ffffff7f);
                text-align: left;
            }
            .next {
                right: 0;
                background: linear-gradient(to right, #ffffff00, #ffffff7f);
                text-align: right;
            }
        }

        .meta {
            margin-top: 5px;
            padding: 0 5px;

            .name {
                display: inline;
            }
            .size {
                color: #909399;
                font-size: small;
                margin-left: 15px;
                vertical-align: bottom;
            }
            .pixel {
                color: #909399;
                float: right;
            }
        }

        .info {
            padding: 0 5px;

            div {
                margin-bottom: 10px;
                padding: 5px 0;
            }
            .content {
                display: inline;
                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                    color: #337ab7;
                }
            }
            .type {
                color: #909399;
                font-size: small;
                margin-left: 10px;
            }

            .illustrator {
                padding: 5px 10px;
                border-radius: 5px;
                background-color: #f4f4f5;
                margin: 0 5px;
                &:hover {
                    cursor: pointer;
                    background-color: #e9e9eb;
                }
            }
        }

        .modify-form {
            .el-input__inner {
                padding: 0 10px;
            }
        }
    }
</style>